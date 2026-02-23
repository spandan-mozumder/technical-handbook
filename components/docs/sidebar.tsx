"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsConfig, type NavItem } from "@/config/docs";
import * as React from "react";

interface DocsSidebarProps {
    className?: string;
}

export function DocsSidebar({ className }: DocsSidebarProps) {
    const pathname = usePathname();
    const sidebarRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (sidebarRef.current) {
            const activeLink = sidebarRef.current.querySelector('[data-active="true"]');
            if (activeLink) {
                const scrollParent = sidebarRef.current.closest('[class*="overflow-y-auto"]');
                if (scrollParent) {
                    const linkTop = (activeLink as HTMLElement).offsetTop;
                    const containerHeight = scrollParent.clientHeight;
                    scrollParent.scrollTop = Math.max(0, linkTop - containerHeight / 2);
                }
            }
        }
    }, [pathname]);

    return (
        <aside ref={sidebarRef} className={cn("w-full", className)}>
            <div className="space-y-0.5 pb-8">
                {docsConfig.sidebarNav.map((section, index) => (
                    <SidebarSection
                        key={index}
                        section={section}
                        pathname={pathname}
                        defaultOpen={index < 2}
                    />
                ))}
            </div>
        </aside>
    );
}

function SidebarSection({
    section,
    pathname,
    defaultOpen = false,
}: {
    section: NavItem;
    pathname: string;
    defaultOpen?: boolean;
}) {
    const hasActiveItem = section.items?.some((item) => pathname === item.href);
    const [isOpen, setIsOpen] = React.useState(hasActiveItem || defaultOpen);

    React.useEffect(() => {
        if (hasActiveItem) setIsOpen(true);
    }, [hasActiveItem]);

    return (
        <div className="py-0.5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-[0.8125rem] font-semibold rounded-lg transition-all duration-200",
                    hasActiveItem
                        ? "text-foreground bg-muted/60"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
            >
                <span className="truncate text-left">{section.title}</span>
                <svg
                    className={cn(
                        "h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-transform duration-200",
                        isOpen && "rotate-90"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
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
                    <div className="mt-1 ml-3 space-y-px border-l border-border/40 pl-3">
                        {section.items.map((item, index) => (
                            <SidebarLink key={index} item={item} pathname={pathname} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function SidebarLink({
    item,
    pathname,
}: {
    item: NavItem;
    pathname: string;
}) {
    const isActive = pathname === item.href;

    return (
        <div className="relative flex items-center">
            <Link
                href={item.href || "#"}
                scroll={true}
                data-active={isActive}
                className={cn(
                    "flex-1 flex items-center gap-2 px-2.5 py-1.5 text-[0.8125rem] rounded-md transition-all duration-150",
                    isActive
                        ? "text-primary font-medium bg-primary/[0.07] dark:bg-primary/[0.12]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
            >
                <span
                    className={cn(
                        "absolute left-0 w-[2px] h-4 rounded-r-full bg-primary transition-opacity duration-150",
                        isActive ? "opacity-100" : "opacity-0"
                    )}
                />
                <span className="truncate">{item.title}</span>
            </Link>
        </div>
    );
}
