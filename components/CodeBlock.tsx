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
        <div className="relative group">
            <span className={`font-mono bg-gray-100 px-2 py-1 rounded block pr-10 ${className}`}>
                {code}
            </span>
            <button
                onClick={handleCopy}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
                title="Copy code"
            >
                {copied ? (
                    <Check className="w-3 h-3 text-green-600" />
                ) : (
                    <Copy className="w-3 h-3 text-gray-600" />
                )}
            </button>
        </div>
    );
} 