"use client"

import { useRef, useEffect } from "react"
import { Loader2, Sparkles, Briefcase, Heart, Smile, X, Check, AlertCircle } from "lucide-react"
import type { AiStatus, Tone } from "@/components/editor/hooks/useAiImprove"
import { TONE_OPTIONS } from "@/components/editor/hooks/useAiImprove"

const TONE_ICONS: Record<Tone, typeof Briefcase> = {
  professional: Briefcase,
  enthusiast: Heart,
  casual: Smile,
}

interface AiImprovePanelProps {
  aiStatus: AiStatus
  aiResult: string
  aiError: string
  onSelectTone: (tone: Tone) => void
  onInsert: () => void
  onDiscard: () => void
  onCancel: () => void
  onRetry: () => void
}

export function AiImprovePanel({
  aiStatus,
  aiResult,
  aiError,
  onSelectTone,
  onInsert,
  onDiscard,
  onCancel,
  onRetry,
}: AiImprovePanelProps) {
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight
    }
  }, [aiResult])

  if (aiStatus === "idle") return null

  return (
    <div className="border-b border-input bg-white">
      {/* Tone selector */}
      {aiStatus === "selecting-tone" && (
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium" style={{ color: "#757575" }}>
              Improve with AI
            </p>
            <button
              type="button"
              onClick={onDiscard}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" style={{ color: "#757575" }} />
            </button>
          </div>
          <div className="flex gap-2">
            {TONE_OPTIONS.map(({ value, label }) => {
              const Icon = TONE_ICONS[value]
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelectTone(value)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-gray-100"
                  style={{ color: "#242424" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Streaming */}
      {aiStatus === "streaming" && (
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#757575" }} />
            <span className="text-xs" style={{ color: "#757575" }}>
              AI is improving your content...
            </span>
            <button
              type="button"
              onClick={onCancel}
              className="ml-auto text-xs underline hover:no-underline"
              style={{ color: "#757575" }}
            >
              Cancel
            </button>
          </div>
          {aiResult && (
            <div
              ref={resultRef}
              className="max-h-40 overflow-y-auto text-sm leading-relaxed p-2 rounded-md bg-gray-50"
              style={{ color: "#242424" }}
              dangerouslySetInnerHTML={{ __html: aiResult }}
            />
          )}
        </div>
      )}

      {/* Done */}
      {aiStatus === "done" && (
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-600">Improvement complete</span>
          </div>
          {aiResult && (
            <div
              ref={resultRef}
              className="max-h-40 overflow-y-auto text-sm leading-relaxed p-2 rounded-md bg-gray-50"
              style={{ color: "#242424" }}
              dangerouslySetInnerHTML={{ __html: aiResult }}
            />
          )}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onInsert}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#242424" }}
            >
              <Check className="w-3.5 h-3.5" />
              Insert / Replace
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-gray-100"
              style={{ color: "#757575" }}
            >
              <X className="w-3.5 h-3.5" />
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {aiStatus === "error" && (
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-medium text-red-600">
              {aiError || "Failed to improve content"}
            </span>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#242424" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Try Again
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-gray-100"
              style={{ color: "#757575" }}
            >
              <X className="w-3.5 h-3.5" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
