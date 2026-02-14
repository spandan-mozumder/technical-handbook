"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ className }: { className?: string }) {
    const [headings, setHeadings] = React.useState<TocItem[]>([]);
    const [activeId, setActiveId] = React.useState<string>("");

    React.useEffect(() => {
        const elements = document.querySelectorAll("h2, h3");
        const items: TocItem[] = [];
        elements.forEach((element) => {
            if (element.id) {
                items.push({
                    id: element.id,
                    text: element.textContent || "",
                    level: element.tagName === "H2" ? 2 : 3,
                });
            }
        });
        setHeadings(items);
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-80px 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className={cn("space-y-3", className)}>
            <p className="font-semibold text-sm text-foreground">On This Page</p>
            <ul className="space-y-1 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={cn("relative", heading.level === 3 && "ml-4")}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "group flex items-center py-1 text-muted-foreground hover:text-foreground transition-colors duration-150",
                                activeId === heading.id && "text-primary font-medium"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(heading.id);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                    setActiveId(heading.id);
                                }
                            }}
                        >
                            <span
                                className={cn(
                                    "absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-primary transition-opacity duration-150",
                                    activeId === heading.id ? "opacity-100" : "opacity-0"
                                )}
                            />
                            <span className="truncate">{heading.text}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
