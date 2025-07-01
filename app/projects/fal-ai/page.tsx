"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
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
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const prompts = [
        {
            title: "Give Cursor context",
            prompt: `I'm creating an AI fortune teller app in Next.js that uses the Fal.ai API to generate mystical fortunes. Use Tailwind CSS for styling with a dark, mystical theme (purples, deep blues, gold accents). Include a centered layout, a glowing button to request a fortune, and an elegant card to display the AI's prediction. I'll provide the API key manually.`,
            tip: "Set the mystical mood from the start"
        },
        {
            title: "Set up Tailwind and Framer Motion",
            prompt: `Install and configure Tailwind CSS and Framer Motion in this project. Set up tailwind.config.js and postcss.config.js, and update globals.css with base styles. Make sure Framer Motion is ready to use in components.`,
            tip: "Combine tools into one setup prompt"
        },
        {
            title: "Add the .env file and API key",
            prompt: `Access the FAL_API_KEY using process.env and use it in the fetch request. Don't hardcode the key in the code.`,
            tip: "You'll do this part manually—Cursor won't touch your secrets",
            note: "In the root of your project, create a new file called .env.local and add: FAL_API_KEY=your-key-here"
        },
        {
            title: "Connect to the mystical AI",
            prompt: `Create a fetch request to the Fal.ai API using my key stored in FAL_API_KEY. Send a prompt asking for a mystical fortune reading. When the fortune arrives, display it in an elegant card with a fade-in animation, styled like an ancient scroll or crystal ball revelation.`,
            tip: "Make the API connection feel magical"
        },
        {
            title: "Add mystical loading states",
            prompt: `While the fortune is being divined, show a mystical loading animation - maybe spinning stars, a glowing crystal ball, or pulsing mystical symbols. If the connection to the spirit realm fails, show an elegant error message like "The spirits are silent... Please try again."`,
            tip: "Keep the mystical vibe even during loading"
        },
        {
            title: "Polish the mystical interface",
            prompt: `Center everything on a dark starry background. Add a mystical title like "AI Oracle" with glowing text effects. Include an input field for users to ask their question, styled like an ancient text scroll. The fortune button should glow and pulse. Add particle effects or floating stars for extra magic.`,
            tip: "Make it feel like real magic"
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
                        <Badge className="mb-4" variant="secondary">
                            Level Up
                        </Badge>
                        <h1 className="mb-2" style={{ letterSpacing: '-0.04em' }}>
                            Build an AI Fortune Teller App
                        </h1>
                        <p className="text-lg sm:text-xl text-black mb-4">
                            Create a mystical app powered by AI
                        </p>
                        <p className="text-sm sm:text-base text-black mb-8">
                            Turn Fal.ai into your personal fortune teller! You'll guide Cursor to create an interactive fortune-telling experience with a mystical UI, smooth animations, and AI-generated fortunes. No coding required—just clear prompts and a few setup steps like adding your API key.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What You'll Learn Section */}
            <section className="py-2 sm:py-3 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-white shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">What you'll learn:</h2>
                            <ul className="space-y-2 sm:space-y-3">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-black">How to describe a themed app with personality to Cursor</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-black">Where to safely store your magical API keys</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-black">How to connect AI services to create interactive experiences</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-black">Creating immersive loading animations and elegant error states</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-black">Making AI responses feel magical with animations and styling</span>
                                </li>
                            </ul>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Prompts Section */}
            <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                        {prompts.map((prompt, index) => {
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
                                        <div className="p-6 sm:p-8 pb-16 sm:pb-20 h-full flex flex-col relative">
                                            {/* Title - Big and left aligned */}
                                            <h3 className={`text-2xl sm:text-3xl font-light mb-4 sm:mb-6 ${isCompleted ? 'text-white' : 'text-black'
                                                }`}>
                                                Step {index + 1}: {prompt.title}
                                            </h3>

                                            {/* Tip */}
                                            <div className={`mb-4 sm:mb-6 ${isCompleted ? 'text-white/90' : 'text-black'}`}>
                                                <p className="text-xs sm:text-sm">
                                                    {prompt.tip}
                                                </p>
                                            </div>

                                            {/* Special note for .env step */}
                                            {prompt.note && (
                                                <div className={`mb-4 sm:mb-6 p-3 rounded-lg ${isCompleted ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-900'}`}>
                                                    <p className="text-xs sm:text-sm font-medium">{prompt.note}</p>
                                                </div>
                                            )}

                                            {/* Prompt */}
                                            <div className="flex-grow">
                                                <div className={`rounded-lg p-3 sm:p-4 border relative ${isCompleted
                                                    ? 'bg-white/20 border-white/30'
                                                    : 'bg-gray-50 border-gray-200'
                                                    }`}>
                                                    <p className={`text-xs sm:text-sm font-mono pr-8 sm:pr-10 whitespace-pre-line ${isCompleted ? 'text-white' : 'text-black'
                                                        }`}>
                                                        {prompt.prompt}
                                                    </p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard(prompt.prompt, index);
                                                        }}
                                                        className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1 rounded transition-colors ${isCompleted
                                                            ? 'hover:bg-white/20'
                                                            : 'hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {copiedStep === index ? (
                                                            <Check className={`w-3 h-3 sm:w-4 sm:h-4 ${isCompleted ? 'text-white' : 'text-green-600'}`} />
                                                        ) : (
                                                            <Copy className={`w-3 h-3 sm:w-4 sm:h-4 ${isCompleted ? 'text-white/70' : 'text-black'}`} />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

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

                    {/* Bonus Tip Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-8 sm:mt-12"
                    >
                        <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-purple-50">
                            <h3 className="text-xl sm:text-2xl font-light mb-4">Bonus Tip: Test Your API Key</h3>
                            <p className="text-sm sm:text-base text-black">
                                If the request doesn't work, double-check that your .env.local file is correctly formatted, and make sure the key name matches in both your file and the code.
                            </p>
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
                                    <span className="text-base sm:text-lg font-medium">I completed this project</span>
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
                </div>
            </section>
        </div>
    );
} 