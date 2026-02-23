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
        <div className="w-full min-h-screen">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-lg px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <MobileSidebar />
                    <Link
                        href="/"
                        className="text-sm font-semibold flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
                    >
                        <span className="text-base">📘</span>
                        <span className="hidden sm:inline">Tech Handbook</span>
                        <span className="sm:hidden">Handbook</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </header>

            <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[260px_minmax(0,1fr)_200px] xl:gap-12">
                    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 md:sticky md:block lg:w-[250px] xl:w-[260px]">
                        <div className="h-full overflow-y-auto py-6 pr-4 scrollbar-thin lg:py-8">
                            <DocsSidebar />
                        </div>
                    </aside>

                    <main className="relative w-full min-w-0 py-6 lg:py-8">
                        <div className="mx-auto w-full max-w-2xl lg:max-w-3xl">
                            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
                                {children}
                            </article>
                            <DocsPagination />
                        </div>
                    </main>

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
