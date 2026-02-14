"use client"

import { useEffect, useRef, useState } from "react"

interface MermaidDiagramProps {
  chart: string
  title?: string
}

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<string>("")
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 11)}`)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "default",
          securityLevel: "loose",
          fontFamily: "inherit",
        })
        const { svg: renderedSvg } = await mermaid.render(idRef.current, chart)
        if (!cancelled) {
          setSvg(renderedSvg)
          setError("")
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram")
          setSvg("")
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart])

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-xs text-destructive">
        <p className="font-medium">Diagram Error</p>
        <pre className="mt-1 whitespace-pre-wrap">{error}</pre>
      </div>
    )
  }

  return (
    <div className="my-4">
      {title && (
        <p className="mb-2 text-xs font-medium text-muted-foreground">{title}</p>
      )}
      <div
        ref={containerRef}
        className="overflow-x-auto rounded-lg border bg-card p-4 [&_svg]:mx-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )
}
