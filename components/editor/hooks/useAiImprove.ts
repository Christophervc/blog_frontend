"use client"

import { useState, useRef, useCallback } from "react"

export type AiStatus = "idle" | "selecting-tone" | "streaming" | "done" | "error"
export type Tone = "professional" | "enthusiast" | "casual"

export const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "enthusiast", label: "Enthusiast" },
  { value: "casual", label: "Casual" },
]

export function useAiImprove() {
  const [aiStatus, setAiStatus] = useState<AiStatus>("idle")
  const [aiResult, setAiResult] = useState("")
  const [aiError, setAiError] = useState("")
  const abortRef = useRef<AbortController | null>(null)

  const startStream = useCallback(
    async (content: string, categoryId: string, tone: Tone) => {
      abortRef.current = new AbortController()
      setAiStatus("streaming")
      setAiResult("")
      setAiError("")

      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

      try {
        const response = await fetch(`${baseURL}/ai/improve/stream`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, categoryId, tone }),
          signal: abortRef.current.signal,
        })

        if (!response.ok) {
          const errBody = await response.text().catch(() => "")
          throw new Error(errBody || `Server responded with ${response.status}`)
        }

        const reader = response.body!.getReader()
        const decoder = new TextDecoder()
        let acc = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")
          for (const line of lines) {
            if (line.startsWith("data:")) {
              acc += line.slice(5).trim()
            }
          }
          setAiResult(acc)
        }

        if (!acc.trim()) throw new Error("AI returned empty content")
        setAiStatus("done")
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setAiStatus("idle")
          setAiResult("")
          return
        }
        setAiStatus("error")
        setAiError(err instanceof Error ? err.message : "Failed to improve content")
      }
    },
    []
  )

  const insertResult = useCallback(() => {
    const result = aiResult
    setAiStatus("idle")
    setAiResult("")
    setAiError("")
    return result
  }, [aiResult])

  const discardResult = useCallback(() => {
    setAiStatus("idle")
    setAiResult("")
    setAiError("")
  }, [])

  const cancelStream = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return {
    aiStatus,
    setAiStatus,
    aiResult,
    aiError,
    startStream,
    insertResult,
    discardResult,
    cancelStream,
  }
}
