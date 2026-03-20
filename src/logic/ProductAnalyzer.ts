import { PRODUCTS, INGREDIENT_DB } from '@component/ProductConstants';

// ImageNet normalization — must exactly match training
export const NORM_MEAN = [0.485, 0.456, 0.406];
export const NORM_STD = [0.229, 0.224, 0.225];
export const IMG_SIZE = 224;

// Default Rejection thresholds — will be overridden by config if available
let CONF_THRESHOLD = 0.70;
let ENTROPY_THRESHOLD = 0.85;

export interface AnalysisResult {
  product: any;
  confidence: number;
  entropy: number;
  isUnknown: boolean;
  ocrText: string;
}

// Global declarations for CDN libraries
declare global {
  interface Window {
    tf: any;
    tflite: any;
    Tesseract: any;
  }
}

let tfliteModel: any = null;
let ocrWorker: any = null;
let isInitializing = false;

/**
 * Robust Shannon Entropy calculation
 */
export function shannonEntropy(probs: number[]) {
  const n = probs.length;
  let h = 0;
  for (const p of probs) {
    if (p > 1e-10) h -= p * Math.log2(p);
  }
  return h / Math.log2(n);
}

/**
 * Numerically stable softmax
 */
export function softmax(logits: number[]) {
  const max = Math.max(...logits);
  const exps = logits.map((x: number) => Math.exp(x - max));
  const sum = exps.reduce((a: number, b: number) => a + b, 0);
  return exps.map((e: number) => e / sum);
}

/**
 * Preprocess canvas for TFLite
 */
function preprocessCanvas(canvas: HTMLCanvasElement) {
  const { tf } = window;
  return tf.tidy(() => {
    const raw = tf.browser.fromPixels(canvas)
      .resizeBilinear([IMG_SIZE, IMG_SIZE])
      .toFloat()
      .div(255.0);

    const mean = tf.tensor1d(NORM_MEAN);
    const std = tf.tensor1d(NORM_STD);
    const normalized = raw.sub(mean).div(std);

    return normalized.transpose([2, 0, 1]).expandDims(0);
  });
}

/**
 * Initialize Models and OCR via Browser Globals
 */
export async function initModels() {
  if (tfliteModel && ocrWorker) return;
  if (isInitializing) return;
  
  // Wait for scripts if they aren't ready
  if (!window.tf || !window.tflite || !window.Tesseract) {
    console.log("Waiting for AI scripts to load...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return initModels();
  }

  isInitializing = true;

  try {
    const { tflite, Tesseract } = window;

    // Load config
    try {
      const res = await fetch('/model/skinsense-config.json');
      if (res.ok) {
        const config = await res.json();
        if (config.rejectionPolicy?.confThreshold)
          CONF_THRESHOLD = config.rejectionPolicy.confThreshold;
        if (config.rejectionPolicy?.entropyThreshold)
          ENTROPY_THRESHOLD = config.rejectionPolicy.entropyThreshold;
      }
    } catch (e) {}

    // Set WASM path
    tflite.setWasmPath('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.10/wasm/');

    // Load TFLite model
    tfliteModel = await tflite.loadTFLiteModel('/model/model.tflite');
    console.log("AI Model loaded ✓");

    // Initialize Tesseract
    ocrWorker = await Tesseract.createWorker('eng');
    await ocrWorker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()%,./ -',
    });
    console.log("OCR Engine loaded ✓");

  } catch (err) {
    console.error("AI Initialization error:", err);
    throw err;
  } finally {
    isInitializing = false;
  }
}

/**
 * Actual classification using global TFLite
 */
export async function classifyProduct(canvas: HTMLCanvasElement) {
  if (!tfliteModel) {
    await initModels();
    if (!tfliteModel) throw new Error("Model not loaded");
  }

  const inputTensor = preprocessCanvas(canvas);
  let result;
  try {
    const output = tfliteModel.predict(inputTensor);
    const { tf } = window;
    const outputTensor = output instanceof tf.Tensor ? output : Object.values(output)[0];
    const rawData = await (outputTensor as any).data();
    
    const logits = Array.from(rawData) as number[];
    const probs = softmax(logits);

    const maxConf = Math.max(...probs);
    const classIdx = probs.indexOf(maxConf);
    const entropy = shannonEntropy(probs);
    const isUnknown = maxConf < CONF_THRESHOLD || entropy > ENTROPY_THRESHOLD;

    result = { classIdx, confidence: maxConf, entropy, isUnknown };
  } finally {
    inputTensor.dispose();
  }

  return result;
}

/**
 * Real OCR using global Tesseract
 */
export async function runOCR(imageDataUrl: string): Promise<string> {
  if (!ocrWorker) {
    await initModels();
    if (!ocrWorker) return "";
  }
  
  try {
    const { data: { text } } = await ocrWorker.recognize(imageDataUrl);
    return text;
  } catch (err) {
    return "";
  }
}

export function parseOCRIngredients(text: string): string[] {
  if (!text) return [];
  const match = text.match(/ingredients?[:.]?\s*([\s\S]+?)(?:\n\n|\.|$)/i);
  if (!match) return [];

  return match[1]
    .split(/[,\n]/)
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 2 && s.length < 50)
    .slice(0, 20);
}

export function mergeIngredients(dbList: string[], ocrList: string[]): string[] {
  const all = [...dbList];
  ocrList.forEach(ocr => {
    const exists = all.some(d => d.toLowerCase().includes(ocr.toLowerCase().substring(0, 6)));
    if (!exists && ocr.length > 3) all.push(ocr);
  });
  return all;
}

export async function analyzeProduct(canvas: HTMLCanvasElement): Promise<AnalysisResult> {
  const { classIdx, confidence, entropy, isUnknown } = await classifyProduct(canvas);
  const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
  const ocrText = await runOCR(imageDataUrl);
  
  const keys = ['a', 'b', 'c'];
  const productKey = isUnknown ? 'u' : keys[classIdx];
  const product = PRODUCTS[productKey];
  
  let finalIngredients = product.ingredients;
  if (ocrText) {
    const ocrIngredients = parseOCRIngredients(ocrText);
    finalIngredients = mergeIngredients(product.ingredients, ocrIngredients);
  }
  
  return {
    product: { ...product, ingredients: finalIngredients },
    confidence,
    entropy,
    isUnknown,
    ocrText
  };
}

export function getIngredientData(name: string) {
  const key = name.toLowerCase().trim();
  return INGREDIENT_DB[key] || null;
}
