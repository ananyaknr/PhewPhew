import React, { useState } from "react";
import {
  Code,
  Image as ImageIcon,
  MessageSquare,
  Info,
  Check,
  Copy,
  AlertTriangle,
} from "lucide-react";
import { Button, Tag, cn } from "@/components/ui/Atoms";
import {
  SectionHeader,
  InfoCard,
  FlowStep,
} from "@/components/molecules/Molecules";

type TabType = "payload" | "image" | "prompt" | "info";

interface InspectorPaneProps {
  capturedData: {
    payload: any;
    b64: string;
    url: string;
    size: number;
    prompt: string;
  } | null;
  copyPayload: () => void;
  copied: boolean;
  syntaxHighlight: (json: string) => string;
  colorPrompt: (text: string) => string;
}

export function InspectorPane({
  capturedData,
  copyPayload,
  copied,
  syntaxHighlight,
  colorPrompt,
}: InspectorPaneProps) {
  const [activeTab, setActiveTab] = useState<TabType>("payload");
  const [b64ShowImg, setB64ShowImg] = useState(true);

  const tabs = [
    { id: "payload" as TabType, label: "JSON Payload", icon: Code },
    { id: "image" as TabType, label: "Captured Image", icon: ImageIcon },
    { id: "prompt" as TabType, label: "Prompt", icon: MessageSquare },
    { id: "info" as TabType, label: "How it works", icon: Info },
  ];

  return (
    <div className="flex flex-col bg-dark2 overflow-hidden">
      <div className="flex border-b border-sage/10 shrink-0 bg-black/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4.5 py-3 text-xs font-medium transition-all border-b-2 flex items-center gap-1.5",
              activeTab === tab.id
                ? "text-mint border-mint"
                : "text-muted border-transparent hover:text-sage",
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        {activeTab === "payload" && (
          <div className="flex-1 flex flex-col">
            {!capturedData ? (
              <EmptyState
                icon="{ }"
                text="Hit Capture & Inspect Payload to see the exact JSON that would be sent to the Anthropic API."
                isEmoji={false}
              />
            ) : (
              <div className="flex-1 flex flex-col">
                <SectionHeader title="POST /v1/messages — Request Body">
                  <Button
                    variant="sm"
                    onClick={copyPayload}
                    className={cn(copied && "bg-mint/15 text-mint")}
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {copied ? "✓ Copied!" : "Copy JSON"}
                  </Button>
                </SectionHeader>
                <pre className="m-0 p-4 font-mono text-[11.5px] leading-relaxed overflow-auto bg-code-bg flex-1 text-[#ABB2BF]">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: syntaxHighlight(
                        JSON.stringify(capturedData.payload, null, 2),
                      ),
                    }}
                  />
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === "image" && (
          <div className="flex-1 flex flex-col">
            {!capturedData ? (
              <EmptyState
                icon="🖼️"
                text="Capture a frame first to preview the image that would be sent."
              />
            ) : (
              <div className="flex-1 flex flex-col">
                <SectionHeader title="Captured Frame">
                  <div className="text-[11px] text-muted text-right">
                    <strong className="text-sage font-semibold">
                      {capturedData.size} KB
                    </strong>{" "}
                    · JPEG · {capturedData.b64.length.toLocaleString()} chars
                  </div>
                  <Button
                    variant="ghost"
                    className="px-2 py-1 h-7 text-[10px]"
                    onClick={() => setB64ShowImg(!b64ShowImg)}
                  >
                    Toggle b64
                  </Button>
                </SectionHeader>
                <div className="flex-1 flex flex-col min-h-0 bg-code-bg">
                  {b64ShowImg ? (
                    <div className="flex-1 flex items-center justify-center p-4">
                      <img
                        src={capturedData.url}
                        alt="Captured frame"
                        className="max-w-full max-h-full rounded-xl border border-mint/15"
                      />
                    </div>
                  ) : (
                    <div className="p-4 font-mono text-[10px] text-[#5C6370] leading-relaxed break-all overflow-y-auto">
                      <div className="text-sage mb-2">
                        Base64 JPEG (first 500 chars shown):
                      </div>
                      {capturedData.b64.slice(0, 500)}…
                      <span className="text-muted">[truncated]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "prompt" && (
          <div className="flex-1 flex flex-col">
            <div className="flex gap-4 flex-wrap px-4 py-2.5 border-b border-sage/10 bg-black/30 shrink-0">
              <MetaItem label="Model" value="claude-sonnet-4-20250514" />
              <MetaItem label="Role" value="user" />
              <MetaItem label="Max tokens" value="1 000" />
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed bg-code-bg text-[#ABB2BF] whitespace-pre-wrap">
              {!capturedData ? (
                <span className="italic opacity-40">
                  // Hit Capture to bind the prompt with live data
                </span>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: colorPrompt(capturedData.prompt),
                  }}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
            <InfoCard title="What this demo shows">
              This is the exact data PhewPhew would send to the Anthropic API.
              No API key needed here — the request is built but never fired. You
              can inspect every field, copy the JSON, and paste it into any API
              client.
            </InfoCard>

            <InfoCard title="API Endpoint">
              <p className="flex items-center gap-2 mb-2">
                <Tag variant="post">POST</Tag>
                <code className="bg-mint/10 text-mint px-1.5 py-0.5 rounded text-[10.5px] font-mono">
                  https://api.anthropic.com/v1/messages
                </code>
              </p>
              <p className="text-[11px] text-white/50 mb-1.5">
                Headers required in production:
              </p>
              <div className="flex flex-col gap-1.5 text-[10.5px] font-mono">
                <HeaderTag label="x-api-key" value="Your Anthropic key" />
                <HeaderTag label="anthropic-version" value="2023-06-01" />
                <HeaderTag label="content-type" value="application/json" />
              </div>
            </InfoCard>

            <InfoCard title="Request flow">
              <div className="flex flex-col">
                {[
                  "MediaPipe FaceMesh detects face + draws zone overlays at ~30fps on-device (no network)",
                  "On capture: current video frame is drawn to a hidden canvas and encoded as base64 JPEG",
                  "JSON payload is built: model, max_tokens, and a messages array with one user turn containing the image + text prompt",
                  "In production, payload is POSTed to /v1/messages — Claude returns structured JSON with conditions, severity, confidence, and recommendations",
                  "Response is parsed and rendered as the skin analysis cards in the sidebar",
                ].map((step, i) => (
                  <FlowStep key={i} num={i + 1} text={step} />
                ))}
              </div>
            </InfoCard>

            <div className="bg-warn/10 border border-warn/20 rounded-xl p-3.5 flex gap-2.5 items-start">
              <AlertTriangle className="w-4 h-4 text-warn shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-warn/85 leading-relaxed">
                <strong>Production note:</strong> The API key must never live in
                client-side code. PhewPhew's production build would proxy this
                request through a FastAPI backend endpoint that holds the key
                server-side.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  text,
  isEmoji = true,
}: {
  icon: string;
  text: string;
  isEmoji?: boolean;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
      <div
        className={cn(
          "opacity-25",
          isEmoji ? "text-4xl" : "text-4xl font-mono",
        )}
      >
        {icon}
      </div>
      <p className="text-xs text-muted leading-relaxed max-w-65">{text}</p>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] tracking-widest uppercase text-muted">
        {label}
      </span>
      <span className="text-xs font-semibold text-sage">{value}</span>
    </div>
  );
}

function HeaderTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Tag variant="purple">{label}</Tag>
      <span className="text-mint">{value}</span>
    </div>
  );
}
