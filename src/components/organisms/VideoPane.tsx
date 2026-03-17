import React from "react";
import { Camera as CameraIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button, cn } from "@/components/ui/Atoms";
import { ZoneLegend } from "@/components/molecules/Molecules";
import { type StatusType } from "@/logic/FaceAnalyzer";

interface VideoPaneProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  overlayRef: React.RefObject<HTMLCanvasElement | null>;
  capRef: React.RefObject<HTMLCanvasElement | null>;
  meshReady: boolean;
  status: { text: string; type: StatusType };
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  capturePayload: () => void;
  isCapturing: boolean;
}

export function VideoPane({
  videoRef,
  overlayRef,
  capRef,
  meshReady,
  status,
  showOverlay,
  setShowOverlay,
  capturePayload,
  isCapturing,
}: VideoPaneProps) {
  return (
    <div className="flex flex-col bg-[#080F0E] border-r border-sage/10">
      <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-black">
        {!meshReady && status.type !== "err" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3.5 bg-black/95">
            <Loader2 className="w-9 h-9 text-mint animate-spin" />
            <p className="text-xs text-sage">Loading FaceMesh model…</p>
          </div>
        )}

        {status.type === "err" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted text-sm text-center p-6">
            <CameraIcon className="w-11 h-11 opacity-30" />
            <p>
              Camera access required.
              <br />
              Allow permissions and reload.
            </p>
          </div>
        )}

        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 w-full h-full object-cover -scale-x-100 transition-opacity duration-500",
            meshReady ? "opacity-100" : "opacity-0",
          )}
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

      <ZoneLegend />

      <div className="flex items-center justify-center gap-2.5 p-3 px-4 border-t border-sage/5 bg-black/20 shrink-0">
        <Button variant="ghost" onClick={() => setShowOverlay(!showOverlay)}>
          {showOverlay ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showOverlay ? "Hide zones" : "Show zones"}
        </Button>
        <Button onClick={capturePayload} disabled={!meshReady}>
          <CameraIcon className="w-4 h-4" />
          Capture & Inspect Payload
        </Button>
      </div>
    </div>
  );
}
