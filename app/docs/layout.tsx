import { DocsSidebar } from "@/components/docs/sidebar";
import { TableOfContents } from "@/components/docs/toc";
import { DocsPagination } from "@/components/docs/pagination";
import { MobileSidebar } from "@/components/docs/mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            {/* Header */}
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 lg:px-6">
                <div className="flex items-center gap-3">
                    <MobileSidebar />
                    <Link
                        href="/"
                        className="text-sm font-semibold flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
                    >
                        <span>📘</span>
                        <span>Tech Handbook</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </header>

            <div className="container mx-auto px-4">
                <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[260px_minmax(0,1fr)_180px] xl:gap-12">
                    {/* Sidebar */}
                    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 md:sticky md:block lg:w-[240px] xl:w-[260px]">
                        <div className="h-full overflow-y-auto py-6 pr-4 scrollbar-thin lg:py-8">
                            <DocsSidebar />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="relative w-full min-w-0 py-6 px-4 md:px-0 lg:py-8">
                        <div className="mx-auto w-full max-w-2xl lg:max-w-3xl">
                            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
                                {children}
                            </article>
                            <DocsPagination />
                        </div>
                    </main>

                    {/* Table of Contents */}
                    <div className="hidden text-sm xl:block">
                        <div className="sticky top-20 -mt-10 pt-4">
                            <div className="h-[calc(100vh-5rem)] overflow-y-auto pb-10 scrollbar-thin">
                                <TableOfContents />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
