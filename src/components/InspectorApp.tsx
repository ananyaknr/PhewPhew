"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Copy, Check, Eye, EyeOff, Info, Code, Image as ImageIcon, MessageSquare, AlertTriangle, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZONES, PROMPT } from './Constants';
import { FaceAnalyzer, type StatusType } from '@/logic/FaceAnalyzer';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function InspectorApp() {
  const [activeTab, setActiveTab] = useState<'payload' | 'image' | 'prompt' | 'info'>('payload');
  const [status, setStatus] = useState<{ text: string; type: StatusType }>({ text: 'Starting…', type: 'idle' });
  const [showOverlay, setShowOverlay] = useState(true);
  const [meshReady, setMeshReady] = useState(false);
  const [capturedData, setCapturedData] = useState<{
    payload: any;
    b64: string;
    url: string;
    size: number;
    prompt: string;
  } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [b64ShowImg, setB64ShowImg] = useState(true);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLCanvasElement>(null);
  const analyzerRef = useRef<FaceAnalyzer | null>(null);

  useEffect(() => {
    if (!videoRef.current || !overlayRef.current || !capRef.current) return;

    const analyzer = new FaceAnalyzer({
      onStatusChange: (s) => setStatus(s),
      onMeshReadyChange: (ready) => setMeshReady(ready),
    });

    analyzer.initialize(videoRef.current, overlayRef.current, capRef.current);
    analyzerRef.current = analyzer;

    return () => {
      analyzer.stop();
    };
  }, []);

  useEffect(() => {
    if (analyzerRef.current) {
      analyzerRef.current.setShowOverlay(showOverlay);
    }
  }, [showOverlay]);

  const capturePayload = () => {
    if (!analyzerRef.current) return;
    
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 600);

    const frameData = analyzerRef.current.captureFrame();
    if (!frameData) return;

    const payload = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: "[BASE64_JPEG_DATA]",
              },
            },
            {
              type: "text",
              text: PROMPT,
            },
          ],
        },
      ],
    };

    setCapturedData({
      payload,
      b64: frameData.b64,
      url: frameData.url,
      size: frameData.size,
      prompt: PROMPT,
    });
    setActiveTab('payload');
  };

  const copyPayload = () => {
    if (!capturedData) return;
    const real = JSON.parse(JSON.stringify(capturedData.payload));
    real.messages[0].content[0].source.data = capturedData.b64;
    navigator.clipboard.writeText(JSON.stringify(real, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const syntaxHighlight = (json: string) => {
    return json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'text-number';
          if (/^"/.test(match)) {
            cls = /:$/.test(match) ? 'text-key' : 'text-string';
          } else if (/true|false/.test(match)) {
            cls = 'text-bool';
          } else if (/null/.test(match)) {
            cls = 'text-null';
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );
  };

  const colorPrompt = (text: string) => {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped
      .replace(/(None\|Low\|Medium\|High)/g, '<span class="text-mint">$1</span>')
      .replace(/(0-100)/g, '<span class="text-mint">$1</span>')
      .replace(
        /("overall_summary"|"conditions"|"name"|"icon"|"severity"|"confidence"|"zone"|"description"|"recommendations"|"limitations")/g,
        '<span class="text-string">$1</span>'
      )
      .replace(/(Respond ONLY with valid JSON)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(You are PhewPhew)/g, '<span class="text-mint font-medium">$1</span>');
  };

  return (
    <div className="flex flex-col h-screen text-white bg-dark overflow-hidden font-sans relative z-10">
      <header className="relative z-20 flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-sage/10 bg-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-teal flex items-center justify-center font-serif text-sm text-white">
            ผ
          </div>
          <div className="font-serif text-[19px]">
            Phew<span className="text-sage">Phew</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-3.5 py-1">
          <span className="text-xs text-mint font-medium">🔍 Payload Inspector — No API Key Required</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-300",
            status.type === 'on' ? "bg-mint shadow-[0_0_8px_rgba(2,195,154,0.5)]" : 
            status.type === 'err' ? "bg-red-500" : "bg-muted"
          )} />
          <span>{status.text}</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_480px] min-h-0 overflow-hidden relative z-10">
        <div className="flex flex-col bg-[#080F0E] border-r border-sage/10">
          <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-black" id="vwrap">
            {!meshReady && status.type !== 'err' && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3.5 bg-black/95">
                <Loader2 className="w-9 h-9 text-mint animate-spin" />
                <p className="text-xs text-sage">Loading FaceMesh model…</p>
              </div>
            )}
            
            {status.type === 'err' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted text-sm text-center p-6">
                <CameraIcon className="w-11 h-11 opacity-30" />
                <p>Camera access required.<br />Allow permissions and reload.</p>
              </div>
            )}

            <video 
              ref={videoRef}
              className={cn("absolute inset-0 w-full h-full object-cover -scale-x-100 transition-opacity duration-500", meshReady ? "opacity-100" : "opacity-0")}
              playsInline 
              muted 
            />
            <canvas 
              ref={overlayRef}
              className="absolute inset-0 w-full h-full -scale-x-100"
              width={1280}
              height={720}
            />
            <canvas ref={capRef} className="hidden" />
            
            {isCapturing && <div className="scan-line" />}
          </div>

          <div className="flex gap-3 flex-wrap p-2 px-4 border-t border-sage/5 bg-black/30 flex-shrink-0">
            {ZONES.map(z => (
              <div key={z.name} className="flex items-center gap-1.5 text-[10.5px] text-muted">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: z.color.replace('rgba', 'rgb').replace(',0.11', '').replace(',0.45', '') + ')' }} />
                {z.name}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 px-4 border-t border-sage/5 bg-black/20 flex-shrink-0">
            <button 
              onClick={() => setShowOverlay(!showOverlay)}
              className="flex items-center gap-2 px-4.5 py-2 rounded-lg bg-white/5 text-sage text-sm font-semibold border border-sage/20 hover:bg-sage/10 transition-all"
            >
              {showOverlay ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showOverlay ? 'Hide zones' : 'Show zones'}
            </button>
            <button 
              onClick={capturePayload}
              disabled={!meshReady}
              className="flex items-center gap-2 px-4.5 py-2 rounded-lg bg-teal text-white text-sm font-semibold hover:bg-teal2 hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all"
            >
              <CameraIcon className="w-4 h-4" />
              Capture & Inspect Payload
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-dark2 overflow-hidden">
          <div className="flex border-b border-sage/10 flex-shrink-0 bg-black/20">
            {(['payload', 'image', 'prompt', 'info'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4.5 py-3 text-xs font-medium transition-all border-b-2 flex items-center gap-1.5 capitalize",
                  activeTab === tab 
                    ? "text-mint border-mint" 
                    : "text-muted border-transparent hover:text-sage"
                )}
              >
                {tab === 'payload' && <Code className="w-3.5 h-3.5" />}
                {tab === 'image' && <ImageIcon className="w-3.5 h-3.5" />}
                {tab === 'prompt' && <MessageSquare className="w-3.5 h-3.5" />}
                {tab === 'info' && <Info className="w-3.5 h-3.5" />}
                {tab === 'payload' ? 'JSON Payload' : tab === 'image' ? 'Captured Image' : tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
            {activeTab === 'payload' && (
              <div className="flex-1 flex flex-col">
                {!capturedData ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <div className="text-4xl opacity-25 font-mono">{"{ }"}</div>
                    <p className="text-xs text-muted leading-relaxed max-w-[260px]">
                      Hit <strong>Capture & Inspect Payload</strong> to see the exact JSON that would be sent to the Anthropic API.
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-black/30 border-b border-sage/10 flex-shrink-0">
                      <span className="text-[11px] font-semibold tracking-wider text-sage uppercase">POST /v1/messages — Request Body</span>
                      <button 
                        onClick={copyPayload}
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] transition-all",
                          copied ? "bg-mint/15 text-mint" : "bg-sage/10 text-sage hover:bg-sage/20"
                        )}
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? '✓ Copied!' : 'Copy JSON'}
                      </button>
                    </div>
                    <pre className="m-0 p-4 font-mono text-[11.5px] leading-relaxed overflow-auto bg-code-bg flex-1 text-[#ABB2BF]">
                      <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(capturedData.payload, null, 2)) }} />
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'image' && (
              <div className="flex-1 flex flex-col">
                {!capturedData ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <div className="text-4xl opacity-25">🖼️</div>
                    <p className="text-xs text-muted leading-relaxed max-w-[260px]">
                      Capture a frame first to preview the image that would be sent.
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-sage/10 bg-black/30 flex-shrink-0">
                      <div>
                        <div className="text-[11px] font-bold tracking-wider text-sage uppercase">Captured Frame</div>
                        <div className="text-[11px] text-muted">
                          <strong className="text-sage font-semibold">{capturedData.size} KB</strong> · JPEG · base64 encoded · {capturedData.b64.length.toLocaleString()} chars
                        </div>
                      </div>
                      <button 
                        onClick={() => setB64ShowImg(!b64ShowImg)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-sage text-[11px] font-semibold border border-sage/20 hover:bg-sage/10 transition-all"
                      >
                        Toggle b64
                      </button>
                    </div>
                    <div className="flex-1 flex flex-col min-h-0 bg-code-bg">
                      {b64ShowImg ? (
                        <div className="flex-1 flex items-center justify-center p-4">
                          <img src={capturedData.url} alt="Captured frame" className="max-w-full max-h-full rounded-xl border border-mint/15" />
                        </div>
                      ) : (
                        <div className="p-4 font-mono text-[10px] text-[#5C6370] leading-relaxed break-all overflow-y-auto">
                          <div className="text-sage mb-2">Base64 JPEG (first 500 chars shown):</div>
                          {capturedData.b64.slice(0, 500)}…<span className="text-muted">[truncated]</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'prompt' && (
              <div className="flex-1 flex flex-col">
                <div className="flex gap-4 flex-wrap px-4 py-2.5 border-b border-sage/10 bg-black/30 flex-shrink-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] tracking-widest uppercase text-muted">Model</span>
                    <span className="text-xs font-semibold text-sage">claude-sonnet-4-20250514</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] tracking-widest uppercase text-muted">Role</span>
                    <span className="text-xs font-semibold text-sage">user</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] tracking-widest uppercase text-muted">Max tokens</span>
                    <span className="text-xs font-semibold text-sage">1 000</span>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed bg-code-bg text-[#ABB2BF] whitespace-pre-wrap">
                  {!capturedData ? (
                    <span className="italic opacity-40">// Hit Capture to bind the prompt with live data</span>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: colorPrompt(capturedData.prompt) }} />
                  )}
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
                <div className="bg-white/5 border border-sage/10 rounded-xl p-4">
                  <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase mb-2">What this demo shows</h4>
                  <p className="text-xs text-white/65 leading-relaxed">This is the exact data PhewPhew would send to the Anthropic API. No API key needed here — the request is built but never fired. You can inspect every field, copy the JSON, and paste it into any API client.</p>
                </div>

                <div className="bg-white/5 border border-sage/10 rounded-xl p-4">
                  <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase mb-2">API Endpoint</h4>
                  <p className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-mint/15 text-mint text-[10px] font-bold uppercase tracking-wider">POST</span>
                    <code className="bg-mint/10 text-mint px-1.5 py-0.5 rounded text-[10.5px] font-mono">https://api.anthropic.com/v1/messages</code>
                  </p>
                  <p className="text-[11px] text-white/50 mb-1.5">Headers required in production:</p>
                  <div className="flex flex-col gap-1.5 text-[10.5px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded">x-api-key</span>
                      <span className="text-muted">Your Anthropic key</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded">anthropic-version</span>
                      <span className="text-mint">2023-06-01</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded">content-type</span>
                      <span className="text-mint">application/json</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-sage/10 rounded-xl p-4">
                  <h4 className="text-[11px] font-bold tracking-wider text-sage uppercase mb-2">Request flow</h4>
                  <div className="flex flex-col">
                    {[
                      "MediaPipe FaceMesh detects face + draws zone overlays at ~30fps on-device (no network)",
                      "On capture: current video frame is drawn to a hidden canvas and encoded as base64 JPEG",
                      "JSON payload is built: model, max_tokens, and a messages array with one user turn containing the image + text prompt",
                      "In production, payload is POSTed to /v1/messages — Claude returns structured JSON with conditions, severity, confidence, and recommendations",
                      "Response is parsed and rendered as the skin analysis cards in the sidebar"
                    ].map((step, i) => (
                      <div key={i} className="flex gap-3 py-2 border-b border-sage/5 last:border-0 items-start">
                        <div className="w-[22px] h-[22px] rounded-full bg-teal flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-xs text-white/65 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-warn/10 border border-warn/20 rounded-xl p-3.5 flex gap-2.5 items-start">
                  <AlertTriangle className="w-4 h-4 text-warn flex-shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-warn/85 leading-relaxed">
                    <strong>Production note:</strong> The API key must never live in client-side code. PhewPhew's production build would proxy this request through a FastAPI backend endpoint that holds the key server-side.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .text-key { color: #61AFEF; }
        .text-string { color: #98C379; }
        .text-number { color: #D19A66; }
        .text-bool { color: #C678DD; }
        .text-null { color: #56B6C2; }
      `}</style>
    </div>
  );
}
