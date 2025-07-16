"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import confetti from "canvas-confetti";

export default function FalAiProject() {
    const [copiedStep, setCopiedStep] = useState<number | null>(null);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [projectComplete, setProjectComplete] = useState(false);

    const copyToClipboard = (text: string, stepIndex: number) => {
        navigator.clipboard.writeText(text);
        setCopiedStep(stepIndex);
        setTimeout(() => setCopiedStep(null), 2000);
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
                particleCount: 50,
                spread: 40,
                origin: { y: 0.7 },
                colors: ['#22c55e', '#3b82f6', '#f59e0b']
            });
        }
    };

    const prompts: Array<{
        title: string;
        prompt: string;
        tip: string;
        estimatedTime?: string;
        isManual?: boolean;
    }> = [
            {
                title: "Create the project",
                prompt: `Create a new Next.js app called "ai-fortune-teller" with TypeScript and Tailwind CSS.
Set up a mystical fortune teller interface with a dark theme.`,
                tip: "This creates the foundation for your AI app",
                estimatedTime: "30 seconds"
            },
            {
                title: "Build the interface",
                prompt: `Create a fortune teller interface with:
- Dark background with purple gradient
- Centered title "AI Oracle"
- Input field for user questions
- Glowing button that says "Reveal My Fortune"
- Empty card area for displaying fortunes
- Use Tailwind for all styling`,
                tip: "The UI sets the mystical mood",
                estimatedTime: "1 minute"
            },
            {
                title: "Get your Fal.ai API key",
                prompt: `Manual step:
1. Visit fal.ai and sign up for a free account
2. Go to your dashboard
3. Find the API Keys section
4. Create a new API key and copy it`,
                tip: "You'll need this to connect to the AI",
                estimatedTime: "2 minutes",
                isManual: true
            },
            {
                title: "Set up environment variable",
                prompt: `Create a .env.local file in the root of your project with:
FAL_API_KEY=your-api-key-here

Then update your code to use process.env.FAL_API_KEY for API calls.`,
                tip: "Keep your API key secure",
                estimatedTime: "30 seconds"
            },
            {
                title: "Connect to Fal.ai API",
                prompt: `Create an API route that:
- Accepts the user's question
- Sends it to Fal.ai's text generation API
- Formats the prompt to request mystical fortunes
- Returns the AI-generated fortune
Use the FAL_API_KEY from environment variables`,
                tip: "This brings the AI magic to life",
                estimatedTime: "1.5 minutes"
            },
            {
                title: "Add animations and polish",
                prompt: `Use Framer Motion to:
- Fade in fortunes when they appear
- Add a loading spinner while waiting
- Make the button pulse on hover
- Add error handling with friendly messages
- Polish the overall mystical aesthetic`,
                tip: "Animations make it feel magical",
                estimatedTime: "1 minute"
            }
        ];

    return (
        <div className="min-h-screen">
            <div className="gradient-mesh gradient-mesh-projects" />
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
                        <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200" variant="secondary">
                            Level Up
                        </Badge>
                        <h1 className="mb-2 uppercase" style={{ letterSpacing: '-0.01em' }}>
                            AI Fortune Teller
                        </h1>
                        <p className="text-lg sm:text-xl text-black mb-8">
                            Build an AI-powered fortune teller app with Fal.ai
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What You'll Build Section */}
            <section className="py-2 sm:py-3 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-white shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">What you'll build:</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-medium text-black">AI-Powered Fortunes</p>
                                        <p className="text-sm text-gray-600">Connect to Fal.ai to generate mystical predictions</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-black">Dark Mystical Theme</p>
                                        <p className="text-sm text-gray-600">Purple gradients and glowing effects</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-medium text-black">Interactive Interface</p>
                                        <p className="text-sm text-gray-600">Input field and animated fortune cards</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-black">Loading States</p>
                                        <p className="text-sm text-gray-600">Mystical animations while AI thinks</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-black">
                                    <span className="font-medium">Total time:</span> 25-30 minutes including API setup
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    (Not including breaking things, fixing them, and iterating)
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Before You Start */}
            <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-white shadow-sm">
                            <h2 className="text-lg sm:text-xl font-medium mb-3">
                                Before you start
                            </h2>
                            <div className="space-y-2 text-sm sm:text-base">
                                <p className="text-black">Make sure you have:</p>
                                <ul className="space-y-1 ml-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>Cursor open and ready</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>Opened the chat panel with <code className="px-2 py-0.5 bg-gray-100 rounded text-sm">Cmd+L</code></span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>A Fal.ai account (free signup at fal.ai)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>A GitHub account (for saving your work)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>About 25-30 minutes to complete</span>
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Prompts Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-6"
                    >
                        <h2 className="text-2xl sm:text-3xl font-light">Steps:</h2>
                    </motion.div>

                    <div className="space-y-3 sm:space-y-4">
                        {prompts.map((prompt, index) => {
                            const isCompleted = completedSteps.includes(index);

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                >
                                    <Card className={`border-0 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden ${isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-white'
                                        }`}>
                                        <div className="p-6 sm:p-8">
                                            <div className="flex items-start gap-4">
                                                {/* Step number */}
                                                <div className="flex-shrink-0">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-gray-100'
                                                        }`}>
                                                        {isCompleted ? (
                                                            <Check className="w-6 h-6 text-white" />
                                                        ) : (
                                                            <span className={`text-lg font-medium ${isCompleted ? 'text-white' : 'text-gray-600'}`}>
                                                                {index + 1}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className={`text-lg sm:text-xl font-medium ${isCompleted ? 'text-green-700' : 'text-black'
                                                            }`}>
                                                            Step {index + 1}: {prompt.title}
                                                        </h3>
                                                        {prompt.estimatedTime && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                {prompt.estimatedTime}
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <p className={`text-sm mb-4 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                                                        {prompt.tip}
                                                    </p>

                                                    {/* Prompt box */}
                                                    <div className="relative">
                                                        <div className={`rounded-lg p-4 font-mono text-sm whitespace-pre-line ${isCompleted
                                                            ? 'bg-green-100 text-green-800 border border-green-200'
                                                            : prompt.isManual
                                                                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                                                                : 'bg-gray-50 text-black border border-gray-200'
                                                            }`}>
                                                            {prompt.prompt}
                                                        </div>
                                                        {!prompt.isManual && (
                                                            <button
                                                                onClick={() => copyToClipboard(prompt.prompt, index)}
                                                                className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${isCompleted
                                                                    ? 'bg-green-200 hover:bg-green-300'
                                                                    : 'bg-white hover:bg-gray-100'
                                                                    }`}
                                                            >
                                                                {copiedStep === index ? (
                                                                    <Check className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Copy className={`w-4 h-4 ${isCompleted ? 'text-green-700' : 'text-gray-600'}`} />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Checkbox */}
                                                <div className="flex-shrink-0">
                                                    <button
                                                        onClick={() => toggleStep(index)}
                                                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all hover:scale-110 ${isCompleted
                                                            ? 'bg-green-500 border-green-500'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                            }`}
                                                        title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                                                    >
                                                        {isCompleted && <Check className="w-4 h-4 text-white" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bonus Tip Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8 sm:mt-12"
                >
                    <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-red-50">
                        <h3 className="text-xl sm:text-2xl font-light mb-4">Bonus Tip: Test Your API Key</h3>
                        <p className="text-sm sm:text-base text-black">
                            If the request doesn't work, double-check that your .env.local file is correctly formatted, and make sure the key name matches in both your file and the code.
                        </p>
                    </Card>
                </motion.div>

                {/* Run Your Project Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-8 sm:mt-12"
                >
                    <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-gradient-to-r from-red-50 to-orange-50">
                        <div className="space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-light">View your fortune teller in the browser</h2>

                            <div className="space-y-4">
                                <div className="mb-4 p-3 rounded-lg bg-purple-50 border border-purple-200">
                                    <p className="text-xs sm:text-sm text-purple-900 font-medium">What's Terminal?</p>
                                    <p className="text-xs sm:text-sm text-purple-800 mt-1">Think of Terminal as a text-based remote control for your computer. You type commands, press Enter, and your computer does things!</p>
                                </div>

                                <div>
                                    <p className="text-sm sm:text-base text-black font-medium mb-1">Open your Terminal</p>
                                    <p className="text-xs sm:text-sm text-black">Press Cmd + Space, type "Terminal", then press Enter.</p>
                                </div>

                                <div>
                                    <p className="text-sm sm:text-base text-black font-medium mb-1">Navigate to your project folder</p>
                                    <p className="text-xs sm:text-sm text-black mb-2">In the terminal, type:</p>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 relative">
                                        <p className="text-xs sm:text-sm font-mono text-black">cd ai-fortune-teller</p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-black mt-2">Then press Enter.</p>
                                </div>

                                <div>
                                    <p className="text-sm sm:text-base text-black font-medium mb-1">Start the development server</p>
                                    <p className="text-xs sm:text-sm text-black mb-2">Type:</p>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 relative">
                                        <p className="text-xs sm:text-sm font-mono text-black">npm run dev</p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-black mt-2">Then press Enter.</p>
                                    <div className="mt-2 p-2 rounded bg-blue-50">
                                        <p className="text-xs text-blue-800"><strong>What's happening?</strong> This starts a local web server on your computer - like a mini version of the internet just for you to preview your site!</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm sm:text-base text-black font-medium mb-1">Open your site in a browser</p>
                                    <p className="text-xs sm:text-sm text-black mb-2">Go to:</p>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 relative">
                                        <p className="text-xs sm:text-sm font-mono text-black">http://localhost:3000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-black font-medium mb-2">Common hiccups:</p>
                                <ul className="text-xs sm:text-sm text-black space-y-1 ml-4">
                                    <li>• <strong>API not working?</strong> Check your .env.local file has FAL_API_KEY=your-actual-key</li>
                                    <li>• <strong>Mystical fonts not showing?</strong> Save all files (Cmd+S) and refresh</li>
                                    <li>• <strong>Nothing appears?</strong> Check if npm is still installing (look for activity in Terminal)</li>
                                    <li>• <strong>Error messages?</strong> Head to the <Link href="/debug" className="text-blue-600 hover:text-blue-800 underline">Debug page</Link> for solutions</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Completion Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8 sm:mt-12"
                >
                    <Card className="p-6 sm:p-10 border-0 rounded-3xl bg-white shadow-sm">
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl font-light mb-4">
                                {projectComplete ? "Well done!" : "Done?"}
                            </h2>
                            <p className="text-sm sm:text-lg text-black mb-6 sm:mb-8">
                                {projectComplete
                                    ? "Your AI fortune teller is ready! Ask it any question and receive mystical insights powered by AI—well done!"
                                    : "Once your app runs, you can ask the AI Oracle any question and receive a mystical fortune."
                                }
                            </p>
                            <div
                                className="inline-flex items-center gap-3 cursor-pointer"
                                onClick={() => setProjectComplete(!projectComplete)}
                            >
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center ${projectComplete
                                    ? 'bg-black border-black'
                                    : 'border-black hover:bg-gray-100'
                                    }`}>
                                    {projectComplete && (
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    )}
                                </div>
                                <span className="text-base sm:text-lg font-medium">I completed this practice project</span>
                            </div>

                            {projectComplete && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6 sm:mt-8 space-y-4"
                                >
                                    <p className="text-sm sm:text-base text-black">
                                        Want to enhance the magic? Try adding zodiac signs, tarot card imagery, sound effects, or ask Cursor to create different fortune-telling modes like love predictions or career guidance.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
                                        <Link href="/projects" className="btn-primary w-full sm:w-auto">
                                            Back to Projects
                                        </Link>
                                        <Link href="/prompts" className="btn-secondary w-full sm:w-auto">
                                            Browse More Prompts
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            </section>
        </div>
    );
} 