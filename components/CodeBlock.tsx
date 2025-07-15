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

    // Block code with copy button - minimal style
    return (
        <div className="relative group inline-block w-full mb-2">
            <code className={`font-mono text-xs sm:text-sm bg-gray-100 px-3 py-2 rounded block w-full pr-12 ${className}`}>
                {code}
            </code>
            <button
                onClick={handleCopy}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                )}
            </button>
        </div>
    );
} 