"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PROMPT } from './Constants';
import { FaceAnalyzer, type StatusType } from '@/logic/FaceAnalyzer';
import { AppHeader } from './organisms/AppHeader';
import { VideoPane } from './organisms/VideoPane';
import { InspectorPane } from './organisms/InspectorPane';

export default function InspectorApp() {
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
      <AppHeader status={status} />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_480px] min-h-0 overflow-hidden relative z-10">
        <VideoPane 
          videoRef={videoRef}
          overlayRef={overlayRef}
          capRef={capRef}
          meshReady={meshReady}
          status={status}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          capturePayload={capturePayload}
          isCapturing={isCapturing}
        />

        <InspectorPane 
          capturedData={capturedData}
          copyPayload={copyPayload}
          copied={copied}
          syntaxHighlight={syntaxHighlight}
          colorPrompt={colorPrompt}
        />
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
