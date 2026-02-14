"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig, type NavItem } from "@/config/docs";

function flattenNav(items: NavItem[]): NavItem[] {
    const result: NavItem[] = [];
    for (const item of items) {
        if (item.items) {
            result.push(...flattenNav(item.items));
        } else if (item.href) {
            result.push(item);
        }
    }
    return result;
}

export function DocsPagination() {
    const pathname = usePathname();
    const allPages = flattenNav(docsConfig.sidebarNav);
    const currentIndex = allPages.findIndex((page) => page.href === pathname);

    const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
    const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

    if (!prev && !next) return null;

    return (
        <div className="mt-10 flex items-center justify-between border-t border-border/50 pt-6">
            {prev ? (
                <Link
                    href={prev.href!}
                    className="group flex flex-col items-start gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <span className="text-xs uppercase tracking-wide">Previous</span>
                    <span className="font-medium group-hover:text-primary transition-colors">
                        ← {prev.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}
            {next ? (
                <Link
                    href={next.href!}
                    className="group flex flex-col items-end gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <span className="text-xs uppercase tracking-wide">Next</span>
                    <span className="font-medium group-hover:text-primary transition-colors">
                        {next.title} →
                    </span>
                </Link>
            ) : (
                <div />
            )}
        </div>
    );
}
