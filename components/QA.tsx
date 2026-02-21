import React from 'react';

export function QA({ question, children }: { question: string; children: React.ReactNode }) {
    return (
        <div className="my-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-primary mb-2">💬 {question}</p>
            <div className="text-sm text-foreground/90">{children}</div>
        </div>
    );
}
