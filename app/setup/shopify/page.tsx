"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import confetti from "canvas-confetti";

export default function ShopifySetupPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    // Simple password check (in production, this should be server-side)
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can change this password to whatever you want
        if (password === "shoppyisavibe") {
            setIsAuthenticated(true);
            setShowError(false);
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const toggleStep = (step: number) => {
        const isCompleting = !completedSteps.includes(step);

        setCompletedSteps(prev =>
            prev.includes(step)
                ? prev.filter(s => s !== step)
                : [...prev, step]
        );

        // Trigger confetti when completing a step
        if (isCompleting) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8FA68E', '#E8B4B8', '#F4D19B', '#CC6B49', '#93C572', '#D4A574']
            });
        }
    };

    const shopifySteps: Array<{
        title: string;
        description: string;
        content: (string | React.ReactElement)[];
        note?: string | React.ReactElement;
    }> = [
            {
                title: "Install Cursor via Okta",
                description: "Use the Shopify-approved installation method",
                content: [
                    <span key="okta">Go to <a href="http://shopify.okta.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Shopify Okta</a></span>,
                    "Search for 'Cursor' in the apps",
                    "Click 'Add' and follow the installation prompts",
                    "Once installed, open Cursor from your Applications folder",
                    "Log in through Okta ONLY - do not use GitHub or Google login"
                ],
                note: "Do NOT download Cursor from cursor.sh - always use Okta for Shopify devices"
            },
            {
                title: "Enable Agent Mode",
                description: "So Cursor can run full prompts",
                content: [
                    "Open Cursor",
                    "Press Cmd + L to open the Chat panel",
                    "At the bottom of the chat window, open the model dropdown (it might say GPT-4)",
                    "Choose the latest Claude model"
                ]
            },
            {
                title: "Turn On Format on Save",
                description: "Cleaner code, automatically",
                content: [
                    "Press Cmd + , (comma) to open Settings",
                    "In the search bar, type \"format on save\"",
                    "Check the box when you find it",
                    "Close the Settings tab"
                ]
            },
            {
                title: "Learn Some Shortcuts",
                description: "These will save you time as you build:",
                content: [
                    "Cmd + K — Open Composer (for in-file edits)",
                    "Cmd + L — Open the AI chat panel (for conversations and full project prompts)",
                    "Cmd + P — Open files",
                    "Cmd + Shift + F — Search across files",
                    "Tab — Accept Cursor's code suggestions"
                ]
            },
            {
                title: "Set Up Your Code Environment",
                description: "Install everything you need to build",
                content: [
                    "In Cursor, go to File → Open Folder and select your vibe-coding folder (or create it in your home directory)",
                    "Press Cmd + L to open the Chat panel",
                    "Paste this prompt in the chat:",
                    <span key="3" className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">"Install Node.js on my system. Then create a new Next.js project called 'vibe-starter' with TypeScript and Tailwind CSS. Set up the project with App Router, and install Framer Motion for animations. Configure Tailwind CSS properly and create a clean folder structure."</span>,
                    "Cursor will install Node.js and create your project",
                    "Wait for everything to finish installing"
                ],
                note: "This takes 5-10 minutes. Cursor will install Node.js, then all the packages. Watch the terminal for progress."
            },
            {
                title: "Test Your Setup",
                description: "Make sure everything works",
                content: [
                    "Open Terminal (Cmd + Space, type \"Terminal\", press Enter)",
                    "Navigate to your project:",
                    <span key="2" className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">cd ~/vibe-coding/vibe-starter</span>,
                    "Start the development server:",
                    <span key="4" className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">npm run dev</span>,
                    "Open http://localhost:3000 in your browser",
                    "You should see the Next.js welcome page!"
                ]
            },
            {
                title: "Get Help & Learn More",
                description: "Resources and support",
                content: [
                    <span key="0">Join #cursor on Slack for tips and discussions</span>,
                    <span key="1">Check out <a href="https://www.cursor.com/docs" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Cursor's documentation</a></span>,
                    <span key="2">Review the <a href="https://vault.shopify.io/pages/Security-Awareness/Approved-Tools" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Shopify Approved Tools</a> page</span>,
                    "Ask your manager if you're unsure about any usage"
                ]
            },
            {
                title: "Privacy & Data Rules",
                description: "Keep Shopify data safe",
                content: [
                    "Never share merchant, partner, or buyer data with Cursor",
                    "Be mindful of what Shopify code you share with Cursor's AI",
                    "Cursor is approved for Shopify development work",
                    "Use fake/sample data when working with sensitive information"
                ],
                note: "Critical: Keep vibe coding projects in your home directory, not in Shopify repos"
            }
        ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen">
                <div className="gradient-mesh gradient-mesh-setup" />
                <div className="grain-overlay" />
                <Navigation />

                <section className="pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6 md:px-8">
                    <div className="max-w-md mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="/setup" className="inline-flex items-center gap-2 text-sm text-black hover:underline mb-8">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Setup
                            </Link>

                            <Card className="p-8 border-0 rounded-3xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Lock className="w-6 h-6 text-black" />
                                    <h1 className="text-2xl font-light">Shopify Employee Setup</h1>
                                </div>

                                <p className="text-black mb-6">
                                    This page contains specific setup instructions for Shopify employees. Please enter the password to continue.
                                </p>

                                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            autoFocus
                                        />
                                    </div>

                                    {showError && (
                                        <p className="text-red-600 text-sm">
                                            Incorrect password. Please try again.
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-black text-white hover:bg-gray-800"
                                    >
                                        Enter
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="gradient-mesh gradient-mesh-setup" />
            <div className="grain-overlay" />
            <Navigation />

            {/* Hero Section */}
            <section className="pt-20 sm:pt-24 md:pt-32 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl"
                    >
                        <Link href="/setup" className="inline-flex items-center gap-2 text-sm text-black hover:underline mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Setup
                        </Link>

                        <h1 className="mb-2" style={{ letterSpacing: '-0.04em' }}>
                            Get set up, Shopifolk
                        </h1>
                        <p className="text-lg sm:text-xl text-black">
                            Follow these steps to set up Cursor in compliance with Shopify policies. Setup takes about 15-20 minutes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                        {shopifySteps.map((step, index) => {
                            const isCompleted = completedSteps.includes(index);

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.5 }}
                                    className="h-full"
                                >
                                    <Card className={`h-full border-0 rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer !py-0 ${isCompleted ? 'frosted-glass-blue' : 'bg-white'
                                        }`}
                                        onClick={() => toggleStep(index)}
                                    >
                                        <div className="p-6 sm:p-8 h-full flex flex-col relative">
                                            {/* Title - Big and left aligned */}
                                            <h3 className={`text-2xl sm:text-3xl font-light mb-3 sm:mb-4 ${isCompleted ? 'text-white' : 'text-black'
                                                }`}>
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${isCompleted ? 'text-white/90' : 'text-black'
                                                }`}>
                                                {step.description}
                                            </p>

                                            {/* Bullet list */}
                                            <ul className={`space-y-2 text-xs sm:text-sm flex-grow mb-12 ${isCompleted ? 'text-white/80' : 'text-black'
                                                }`}>
                                                {step.content.map((item, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="mr-2">•</span>
                                                        <span className={`${isCompleted ? '[&_a]:text-white [&_a]:underline [&_.font-mono]:bg-white/20 [&_.font-mono]:text-white [&_.font-mono]:border-white/30' : '[&_.font-mono]:bg-gray-100 [&_.font-mono]:text-black [&_.font-mono]:border-gray-300'} [&_.font-mono]:block [&_.font-mono]:w-full [&_.font-mono]:mt-2 [&_.font-mono]:mb-2 [&_.font-mono]:border [&_.font-mono]:rounded`}>
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Note section if present */}
                                            {step.note && (
                                                <div className={`mt-4 p-3 rounded-lg ${isCompleted ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-900'}`}>
                                                    <div className="text-sm font-medium">{step.note}</div>
                                                </div>
                                            )}

                                            {/* Checkbox evenly positioned in bottom right corner */}
                                            <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
                                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center ${isCompleted
                                                    ? 'bg-black border-black'
                                                    : 'border-black hover:bg-gray-100'
                                                    }`}>
                                                    {isCompleted ? (
                                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                    ) : (
                                                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black/30" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>


                </div>
            </section>
        </div>
    );
} 