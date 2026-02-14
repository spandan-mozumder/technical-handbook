"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState<string>("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki")
        const html = await codeToHtml(code, {
          lang: language || "text",
          theme: "catppuccin-mocha",
        })
        if (!cancelled) setHighlightedHtml(html)
      } catch {
        // Fallback: if language not supported, try plaintext
        try {
          const { codeToHtml } = await import("shiki")
          const html = await codeToHtml(code, {
            lang: "text",
            theme: "catppuccin-mocha",
          })
          if (!cancelled) setHighlightedHtml(html)
        } catch {
          if (!cancelled) setHighlightedHtml("")
        }
      }
    }
    highlight()
    return () => { cancelled = true }
  }, [code, language])

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="group my-4 overflow-hidden rounded-lg border border-[#313244] bg-[#1e1e2e] shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#313244] px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <span className="block size-3 rounded-full bg-[#f38ba8]" />
            <span className="block size-3 rounded-full bg-[#f9e2af]" />
            <span className="block size-3 rounded-full bg-[#a6e3a1]" />
          </div>
          <span className="text-xs font-medium text-[#a6adc8]">
            {title || language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 px-2 text-xs text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#313244] opacity-0 group-hover:opacity-100 transition-all"
        >
          {copied ? "✓ Copied" : "Copy"}
        </Button>
      </div>
      {/* Code area */}
      <div className="relative">
        {highlightedHtml ? (
          <div
            ref={containerRef}
            className="shiki-container overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-[#cdd6f4]">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
