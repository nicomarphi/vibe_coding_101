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
        note?: string;
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
                title: "Set Up Your Personal Workspace",
                description: "Create a space for vibe coding",
                content: [
                    "Create a new folder called 'personal-projects' in your home directory",
                    "Open this folder in Cursor",
                    "Create subfolders for different projects (e.g., 'vibe-coding', 'learning')",
                    "Keep your vibe coding projects organized in this folder"
                ],
                note: "This tutorial focuses on personal vibe coding projects, not Shopify work"
            },
            {
                title: "Learn the AI Features",
                description: "Key Cursor features for vibe coding",
                content: [
                    "Chat (Cmd+L) - Ask questions and get code help in plain language",
                    "Commands (Cmd+K) - Type /edit to change code, /explain to understand it",
                    "Natural language search (Cmd+Shift+O) - Search code using regular words",
                    "AI suggestions - Get smart code completions as you type"
                ],
                note: "You get 500 premium AI requests per month - use them wisely!"
            },
            {
                title: "Privacy & Data Rules",
                description: "Keep Shopify data safe",
                content: [
                    "Never share merchant, partner, or buyer data with Cursor",
                    "Don't paste any Shopify code into Cursor prompts",
                    "Only use Cursor for personal learning projects",
                    "Use fake/sample data for all your vibe coding projects"
                ]
            },
            {
                title: "Best Practices for Beginners",
                description: "Tips for effective vibe coding",
                content: [
                    "Focus on describing what you want, not how to code it",
                    "Be specific - 'Make a blue button' is better than 'Make a button'",
                    "Try multiple times - refine your prompts if the first result isn't perfect",
                    "Always review what Cursor creates before running it"
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
                            Cursor Setup for Shopify
                        </h1>
                        <p className="text-lg sm:text-xl text-black">
                            Follow these specific guidelines to use Cursor safely and in compliance with Shopify policies.
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
                                                        <span className={`${isCompleted ? '[&_a]:text-white [&_a]:underline' : ''}`}>
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Note section if present */}
                                            {step.note && (
                                                <div className={`mt-4 p-3 rounded-lg ${isCompleted ? 'bg-white/20 text-white' : 'bg-green-50 text-green-900'
                                                    }`}>
                                                    <p className="text-sm font-medium">{step.note}</p>
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

                    {/* Important Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-12"
                    >
                        <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50">
                            <h2 className="text-xl sm:text-2xl font-light mb-4">Remember</h2>
                            <ul className="space-y-2 text-sm sm:text-base text-black">
                                <li>• Cursor is approved for Shopify code when installed via Okta</li>
                                <li>• Perfect for getting familiar with vibe coding, learning and prototyping</li>
                                <li>• Never share merchant, partner, or buyer data with the AI</li>
                                <li>• You get 500 premium AI requests per month</li>
                            </ul>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 