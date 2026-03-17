import { ZONES } from '../components/Constants';

export type StatusType = 'on' | 'err' | 'idle';

export interface CapturedData {
  b64: string;
  url: string;
  size: number;
}

export type StatusCallback = (status: { text: string; type: StatusType }) => void;
export type MeshReadyCallback = (ready: boolean) => void;

export class FaceAnalyzer {
  private faceMesh: any = null;
  private camera: any = null;
  private video: HTMLVideoElement | null = null;
  private overlay: HTMLCanvasElement | null = null;
  private cap: HTMLCanvasElement | null = null;
  
  private showOverlay: boolean = true;
  private isMeshReady: boolean = false;
  private active: boolean = false;

  private onStatusChange?: StatusCallback;
  private onMeshReadyChange?: MeshReadyCallback;

  constructor(callbacks: { onStatusChange: StatusCallback; onMeshReadyChange: MeshReadyCallback }) {
    this.onStatusChange = callbacks.onStatusChange;
    this.onMeshReadyChange = callbacks.onMeshReadyChange;
  }

  async initialize(video: HTMLVideoElement, overlay: HTMLCanvasElement, cap: HTMLCanvasElement) {
    if (typeof window === 'undefined') return;
    
    this.video = video;
    this.overlay = overlay;
    this.cap = cap;
    this.active = true;

    try {
      const { FaceMesh } = await import('@mediapipe/face_mesh');
      const { Camera } = await import('@mediapipe/camera_utils');

      this.faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      this.faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      this.faceMesh.onResults((results: any) => {
        if (!this.active) return;
        this.handleResults(results);
      });

      this.camera = new Camera(this.video, {
        onFrame: async () => {
          if (this.faceMesh && this.video && this.active) {
            await this.faceMesh.send({ image: this.video });
          }
        },
        width: 1280,
        height: 720,
      });

      this.onStatusChange?.({ text: 'Loading model…', type: 'idle' });
      await this.camera.start();
    } catch (error) {
      console.error("FaceAnalyzer initialization error:", error);
      this.onStatusChange?.({ text: 'Camera unavailable', type: 'err' });
    }
  }

  private handleResults(res: any) {
    if (!this.isMeshReady) {
      this.isMeshReady = true;
      this.onMeshReadyChange?.(true);
      this.onStatusChange?.({ text: 'Face detected — ready', type: 'on' });
    }

    if (!this.overlay) return;
    const ctx = this.overlay.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.overlay.width, this.overlay.height);

    if (!res.multiFaceLandmarks?.length) {
      this.onStatusChange?.({ text: 'No face', type: 'idle' });
      return;
    }

    const landmarks = res.multiFaceLandmarks[0];
    this.onStatusChange?.({ text: 'Live · ready to capture', type: 'on' });

    if (this.showOverlay) {
      this.drawZones(ctx, landmarks, this.overlay.width, this.overlay.height);
    }
  }

  private drawZones(ctx: CanvasRenderingContext2D, lm: any[], W: number, H: number) {
    const p = (i: number) => ({ x: lm[i].x * W, y: lm[i].y * H });

    ZONES.forEach((z) => {
      const valid = z.pts.filter((i) => i < lm.length);
      if (valid.length < 3) return;

      ctx.beginPath();
      const firstPt = p(valid[0]);
      ctx.moveTo(firstPt.x, firstPt.y);
      valid.slice(1).forEach((i) => {
        const pt = p(i);
        ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fillStyle = z.color + '0.11)';
      ctx.strokeStyle = z.color + '0.45)';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    });

    // Landmark dots
    [1, 4, 33, 61, 93, 127, 133, 152, 162, 168, 197, 234, 263, 291, 323, 356, 362, 389, 397, 454].forEach((i) => {
      if (i >= lm.length) return;
      const pt = p(i);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(2,195,154,0.65)';
      ctx.fill();
    });
  }

  setShowOverlay(enabled: boolean) {
    this.showOverlay = enabled;
  }

  captureFrame(): CapturedData | null {
    if (!this.video || !this.cap || !this.overlay) return null;

    const cctx = this.cap.getContext('2d');
    if (!cctx) return null;

    this.cap.width = this.overlay.width;
    this.cap.height = this.overlay.height;

    cctx.save();
    cctx.scale(-1, 1);
    cctx.drawImage(this.video, -this.cap.width, 0, this.cap.width, this.cap.height);
    cctx.restore();

    const dataURL = this.cap.toDataURL('image/jpeg', 0.88);
    const b64 = dataURL.split(',')[1];
    const kbSize = Math.round((b64.length * 0.75) / 1024);

    return { b64, url: dataURL, size: kbSize };
  }

  stop() {
    this.active = false;
    if (this.camera) this.camera.stop();
    if (this.faceMesh) this.faceMesh.close();
    
    this.video = null;
    this.overlay = null;
    this.cap = null;
    this.isMeshReady = false;
  }
}
