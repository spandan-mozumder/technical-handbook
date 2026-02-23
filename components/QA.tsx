"use client";

import React from 'react';

export function QA({ question, children }: { question: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const contentText = React.useMemo(() => {
        const extract = (node: React.ReactNode): string => {
            if (typeof node === 'string') return node.trim();
            if (typeof node === 'number') return String(node);
            if (Array.isArray(node)) return node.map(extract).join('');
            if (React.isValidElement(node)) {
                const props = node.props as { children?: React.ReactNode };
                if (props.children) return extract(props.children);
            }
            return '';
        };
        return extract(children);
    }, [children]);

    const hasAnswer = contentText.length > 0 && contentText !== 'Asked in interviews.';

    return (
        <div
            className={`qa-card group my-3 rounded-xl border transition-all duration-300 ${isOpen
                    ? 'border-primary/30 bg-primary/[0.03] shadow-sm shadow-primary/5 dark:bg-primary/[0.06]'
                    : 'border-border/60 bg-card/50 hover:border-primary/20 hover:bg-primary/[0.02] dark:bg-card/30 dark:hover:bg-primary/[0.03]'
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-start gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                aria-expanded={isOpen}
            >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors duration-300 sm:h-6 sm:w-6 sm:text-sm ${isOpen
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary dark:bg-primary/20'
                    }`}>
                    Q
                </span>
                <span className="flex-1 text-sm font-medium leading-relaxed text-foreground sm:text-[0.9375rem]">
                    {question}
                </span>
                <svg
                    className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className={`border-t px-4 py-3.5 sm:px-5 sm:py-4 ${hasAnswer
                            ? 'border-primary/15'
                            : 'border-border/40'
                        }`}>
                        {hasAnswer ? (
                            <div className="text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem]">
                                {children}
                            </div>
                        ) : (
                            <p className="text-sm italic text-muted-foreground/60 sm:text-[0.9375rem]">
                                Practice answering this question in your own words.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
