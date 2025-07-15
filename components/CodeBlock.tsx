"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
    code: string;
    className?: string;
    inline?: boolean;
}

export default function CodeBlock({ code, className = "", inline = false }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        // Inline code without copy button
        return <span className={`font-mono bg-gray-100 px-1 py-0.5 rounded text-xs ${className}`}>{code}</span>;
    }

    // Block code with copy button
    return (
        <div className="mb-2 sm:mb-3 w-full">
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 group relative w-full">
                <p className={`text-xs sm:text-sm font-mono pr-8 sm:pr-10 break-words ${className}`}>
                    {code}
                </p>
                <button
                    onClick={handleCopy}
                    className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 rounded hover:bg-gray-200 transition-colors"
                    title="Copy code"
                >
                    {copied ? (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    ) : (
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    )}
                </button>
            </div>
        </div>
    );
} 