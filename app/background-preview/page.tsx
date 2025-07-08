"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BackgroundPreview() {
    const [selectedBg, setSelectedBg] = useState(0);

    const backgrounds = [
        {
            name: "Deep Amethyst",
            description: "Dark purple to midnight blue",
            gradient: "radial-gradient(circle at 20% 80%, #1a0033 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2d1b69 0%, transparent 50%), radial-gradient(circle at 40% 40%, #0c0032 0%, transparent 50%), radial-gradient(circle at 90% 90%, #130a43 0%, transparent 50%), linear-gradient(to bottom right, #0f0c29 0%, #24243e 100%)"
        },
        {
            name: "Emerald Depths",
            description: "Deep emerald to black jade",
            gradient: "radial-gradient(circle at 30% 70%, #0b3d0b 0%, transparent 50%), radial-gradient(circle at 70% 30%, #1a4d2e 0%, transparent 50%), radial-gradient(circle at 50% 50%, #0f3d0f 0%, transparent 50%), radial-gradient(circle at 80% 80%, #0a2a0a 0%, transparent 50%), linear-gradient(to bottom right, #0a1f1a 0%, #1a3a2e 100%)"
        },
        {
            name: "Sapphire Night",
            description: "Deep sapphire to navy black",
            gradient: "radial-gradient(circle at 25% 75%, #000851 0%, transparent 50%), radial-gradient(circle at 75% 25%, #0a1929 0%, transparent 50%), radial-gradient(circle at 45% 45%, #000428 0%, transparent 50%), radial-gradient(circle at 85% 85%, #00091a 0%, transparent 50%), linear-gradient(to bottom right, #000428 0%, #004e92 100%)"
        },
        {
            name: "Ruby Twilight",
            description: "Deep burgundy to black cherry",
            gradient: "radial-gradient(circle at 35% 65%, #3d0000 0%, transparent 50%), radial-gradient(circle at 65% 35%, #5d0e0e 0%, transparent 50%), radial-gradient(circle at 55% 55%, #2a0000 0%, transparent 50%), radial-gradient(circle at 90% 10%, #1a0000 0%, transparent 50%), linear-gradient(to bottom right, #1a0000 0%, #4a0e0e 100%)"
        },
        {
            name: "Obsidian Pearl",
            description: "Charcoal to deep pearl",
            gradient: "radial-gradient(circle at 20% 50%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 80% 50%, #16213e 0%, transparent 50%), radial-gradient(circle at 50% 20%, #0f1419 0%, transparent 50%), radial-gradient(circle at 50% 80%, #1e1e30 0%, transparent 50%), linear-gradient(to bottom right, #0f0f0f 0%, #1a1a2e 100%)"
        },
        {
            name: "Dusty Amethyst",
            description: "Soft purple to lavender grey",
            gradient: "radial-gradient(circle at 30% 60%, #4a3a5c 0%, transparent 60%), radial-gradient(circle at 70% 40%, #6b5b7b 0%, transparent 60%), radial-gradient(circle at 50% 80%, #524263 0%, transparent 60%), linear-gradient(to bottom right, #3e3548 0%, #7d6d87 50%, #f5f3f7 100%)"
        },
        {
            name: "Soft Sapphire",
            description: "Muted blue to sky grey",
            gradient: "radial-gradient(circle at 25% 65%, #2e4057 0%, transparent 60%), radial-gradient(circle at 75% 35%, #3e5573 0%, transparent 60%), radial-gradient(circle at 50% 50%, #344a68 0%, transparent 60%), linear-gradient(to bottom right, #2a3f5f 0%, #5b7399 50%, #e8eef7 100%)"
        },
        {
            name: "Rose Quartz",
            description: "Dusty rose to warm grey",
            gradient: "radial-gradient(circle at 40% 60%, #8e5a6c 0%, transparent 60%), radial-gradient(circle at 60% 40%, #a67b88 0%, transparent 60%), radial-gradient(circle at 30% 30%, #7d4e5f 0%, transparent 60%), linear-gradient(to bottom right, #6b4656 0%, #9b7b84 50%, #f7f3f4 100%)"
        },
        {
            name: "Current (Warm Pastels)",
            description: "The current muted, warm color scheme",
            gradient: "radial-gradient(ellipse at center bottom, #D4A574 0%, #E8B4B8 10%, #B8C5A6 20%, #F4C2A1 30%, #E5D4CE 40%, #EED9D0 50%, #F5F0E8 70%, #FFFFFF 90%)"
        }
    ];

    return (
        <div className="min-h-screen relative">
            {/* Dynamic background based on selection */}
            <div
                className="fixed inset-0 transition-all duration-1000"
                style={{
                    background: backgrounds[selectedBg].gradient,
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 30s ease infinite'
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8">
                        ← Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl font-light mb-4 text-white drop-shadow-lg">
                            Choose your background colors
                        </h1>
                        <p className="text-xl text-white/90 drop-shadow">
                            Click on any option below to preview richer, more vibrant backgrounds
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {backgrounds.map((bg, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedBg(index)}
                                className={`p-6 rounded-2xl backdrop-blur-md transition-all ${selectedBg === index
                                    ? 'bg-white/30 ring-4 ring-white/50 scale-105'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <h3 className="text-xl font-medium text-white mb-2">{bg.name}</h3>
                                <p className="text-white/80 text-sm">{bg.description}</p>
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white"
                    >
                        <h2 className="text-2xl font-light mb-4">CSS for: {backgrounds[selectedBg].name}</h2>
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm">background: {backgrounds[selectedBg].gradient};</code>
                        </pre>
                        <p className="mt-4 text-white/80">
                            Copy this CSS and update the gradient-mesh classes in globals.css to apply this background site-wide.
                        </p>
                    </motion.div>

                    {/* Example content to see how it looks */}
                    <div className="mt-12 grid md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-2xl font-light mb-2">Sample Card</h3>
                            <p className="text-gray-600">This shows how content looks against the background.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-2xl font-light mb-2">Another Card</h3>
                            <p className="text-gray-600">The contrast between cards and background is important.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-2xl font-light mb-2">Third Card</h3>
                            <p className="text-gray-600">Make sure text remains readable with your choice.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 