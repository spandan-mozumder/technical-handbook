"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsConfig, type NavItem } from "@/config/docs";
import * as React from "react";

export function MobileSidebar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted/60 active:bg-muted transition-colors"
                aria-label="Open navigation"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 w-[300px] max-w-[85vw] bg-background border-r border-border/60 overflow-y-auto animate-slide-in-left shadow-2xl">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
                            <Link href="/" className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                <span className="text-base">📘</span>
                                <span>Tech Handbook</span>
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors"
                                aria-label="Close navigation"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-3 py-4 space-y-1">
                            {docsConfig.sidebarNav.map((section, i) => (
                                <MobileSection key={i} section={section} pathname={pathname} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function MobileSection({
    section,
    pathname,
}: {
    section: NavItem;
    pathname: string;
}) {
    const hasActiveItem = section.items?.some((item) => pathname === item.href);
    const [isOpen, setIsOpen] = React.useState(hasActiveItem || false);

    React.useEffect(() => {
        if (hasActiveItem) setIsOpen(true);
    }, [hasActiveItem]);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    hasActiveItem
                        ? "text-foreground bg-muted/60"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
            >
                <span className="truncate text-left">{section.title}</span>
                <svg
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-90"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-200",
                    isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                {section.items && (
                    <div className="mt-1 ml-3 space-y-0.5 border-l border-border/50 pl-3">
                        {section.items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href || "#"}
                                className={cn(
                                    "block px-3 py-2 text-sm rounded-md transition-colors",
                                    pathname === item.href
                                        ? "text-primary font-medium bg-primary/5"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
