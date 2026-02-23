import type { MDXComponents } from "mdx/types";
import * as React from "react";
import { cn } from "@/lib/utils";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { CodeBlock } from "@/components/code-block";
import { QA } from "@/components/QA";

function extractText(children: React.ReactNode): string {
    if (typeof children === "string") return children;
    if (typeof children === "number") return String(children);
    if (children === null || children === undefined) return "";
    if (Array.isArray(children)) return children.map(extractText).join("");
    if (React.isValidElement(children)) {
        const props = children.props as { children?: React.ReactNode };
        if (props.children !== undefined) return extractText(props.children);
    }
    return "";
}

function Callout({ variant = "info", children }: { variant?: "info" | "warning" | "tip"; children: React.ReactNode }) {
    const styles = {
        info: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
        warning: "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
        tip: "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
    };
    const icons = { info: "ℹ️", warning: "⚠️", tip: "💡" };
    return (
        <div className={cn("my-4 rounded-lg border p-4 text-sm", styles[variant])}>
            <span className="mr-2">{icons[variant]}</span>
            {children}
        </div>
    );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ className, ...props }) => (
            <h1
                className={cn(
                    "scroll-m-24 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text",
                    className
                )}
                {...props}
            />
        ),
        h2: ({ className, id, ...props }) => (
            <h2
                id={id}
                className={cn(
                    "scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight first:mt-0 mt-10 sm:mt-12 mb-3 sm:mb-4 pb-2 border-b border-border/50",
                    className
                )}
                {...props}
            />
        ),
        h3: ({ className, id, ...props }) => (
            <h3
                id={id}
                className={cn(
                    "scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight mt-8 sm:mt-10 mb-3 sm:mb-4",
                    className
                )}
                {...props}
            />
        ),
        h4: ({ className, id, ...props }) => (
            <h4
                id={id}
                className={cn(
                    "scroll-m-20 text-base sm:text-lg font-semibold tracking-tight mt-6 sm:mt-8 mb-2 sm:mb-3",
                    className
                )}
                {...props}
            />
        ),
        p: ({ className, ...props }) => (
            <p
                className={cn("leading-7 text-sm sm:text-base text-foreground/90 [&:not(:first-child)]:mt-3 sm:[&:not(:first-child)]:mt-4", className)}
                {...props}
            />
        ),
        ul: ({ className, ...props }) => (
            <ul className={cn("my-4 sm:my-5 ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2 marker:text-primary", className)} {...props} />
        ),
        ol: ({ className, ...props }) => (
            <ol className={cn("my-4 sm:my-5 ml-4 sm:ml-6 list-decimal space-y-1.5 sm:space-y-2 marker:text-primary", className)} {...props} />
        ),
        li: ({ className, ...props }) => (
            <li className={cn("text-sm sm:text-base", className)} {...props} />
        ),
        blockquote: ({ className, ...props }) => (
            <blockquote
                className={cn("mt-5 sm:mt-6 border-l-2 border-primary/50 pl-4 sm:pl-6 italic text-sm sm:text-base text-muted-foreground bg-muted/30 py-3 sm:py-4 pr-3 sm:pr-4 rounded-r-lg", className)}
                {...props}
            />
        ),
        hr: ({ ...props }) => <hr className="my-8 sm:my-10 border-border/50" {...props} />,
        table: ({ className, ...props }) => (
            <div className="my-5 sm:my-6 w-full overflow-hidden rounded-lg sm:rounded-xl border border-border/50">
                <div className="overflow-x-auto">
                    <table className={cn("w-full text-xs sm:text-sm", className)} {...props} />
                </div>
            </div>
        ),
        tr: ({ className, ...props }) => (
            <tr className={cn("border-b border-border/50 transition-colors hover:bg-muted/50", className)} {...props} />
        ),
        th: ({ className, ...props }) => (
            <th
                className={cn(
                    "bg-muted/50 px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-foreground",
                    className
                )}
                {...props}
            />
        ),
        td: ({ className, ...props }) => (
            <td
                className={cn("px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm", className)}
                {...props}
            />
        ),
        pre: ({ className, children }) => {
            const childArray = React.Children.toArray(children);
            const firstChild = childArray[0];

            if (React.isValidElement(firstChild)) {
                const codeProps = firstChild.props as { className?: string; children?: React.ReactNode };
                const codeClassName = codeProps.className || "";
                const match = /language-([a-z0-9_+-]+)/i.exec(codeClassName);
                const language = match?.[1];
                const codeChildren = codeProps.children;

                if (language === "mermaid") {
                    const chartCode = typeof codeChildren === "string"
                        ? codeChildren.trim()
                        : extractText(codeChildren).trim();
                    return <MermaidDiagram chart={chartCode} />;
                }

                const codeText = typeof codeChildren === "string"
                    ? codeChildren
                    : extractText(codeChildren);

                return (
                    <CodeBlock code={codeText.replace(/\n$/, "")} language={language || "text"} />
                );
            }

            const fallbackText = typeof children === "string" ? children : extractText(children);
            return <CodeBlock code={fallbackText.replace(/\n$/, "")} language="text" />;
        },
        code: ({ className, ...props }) => {
            const isInline = !className?.includes("language-");
            if (isInline) {
                return (
                    <code
                        className={cn(
                            "relative rounded-md bg-muted/80 px-[0.3rem] sm:px-[0.4rem] py-[0.15rem] sm:py-[0.2rem] font-mono text-[0.85em] sm:text-[0.9em] text-primary/90 before:content-none after:content-none break-words",
                            className
                        )}
                        {...props}
                    />
                );
            }
            return (
                <code className={cn("font-mono text-[0.85em] sm:text-[0.9em] leading-relaxed", className)} {...props} />
            );
        },
        a: ({ className, href, ...props }) => (
            <a
                href={href}
                className={cn(
                    "font-medium text-primary decoration-primary/30 underline-offset-4 hover:text-primary/80 hover:decoration-primary/60 transition-colors break-words",
                    className
                )}
                {...props}
            />
        ),
        strong: ({ className, ...props }) => (
            <strong className={cn("font-semibold text-foreground", className)} {...props} />
        ),
        em: ({ className, ...props }) => (
            <em className={cn("italic text-foreground/90", className)} {...props} />
        ),
        QA,
        Callout,
        MermaidDiagram,
        ...components,
    };
}
