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

export default function StartSmallProject() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [projectComplete, setProjectComplete] = useState(false);
  const [sidebarTip, setSidebarTip] = useState<string>("");

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

  const prompts: Array<{
    title: string;
    prompt: string;
    tip: string;
    note?: string;
  }> = [
      {
        title: "Give Cursor context",
        prompt: `I'm building a beginner front-end page using Next.js.
It should include Tailwind CSS for styling and Framer Motion for animation.
The layout should be centered, with a custom font, a large headline, and a button.
Keep the design clean, modern, and responsive.`,
        tip: "Always start by describing what you're trying to make."
      },
      {
        title: "Set up Tailwind and Framer Motion",
        prompt: `Set up Tailwind CSS and Framer Motion in this project.
Configure Tailwind and PostCSS, update globals.css with base styles, and ensure Framer Motion is ready to use in components.`,
        tip: "Install both at once to keep things tidy."
      },
      {
        title: "Create a base layout",
        prompt: `Create a layout component that wraps all pages using a <main> tag.
Center all content both vertically and horizontally in the viewport.
Add padding and a soft background gradient that fades from light gray to white.`,
        tip: "This becomes the foundation for the rest of your page."
      },
      {
        title: "Upload and apply a custom font",
        prompt: `I've uploaded a font file to the public folder. Now apply this custom font globally using Tailwind CSS.
Set up the @font-face in globals.css and configure it in the Tailwind config.
Add a clean, modern sans-serif fallback font stack.`,
        tip: "First, manually drag your font file (WOFF or TTF) into the public folder, then use this prompt.",
        note: "Manual step: Download a font file (.woff or .ttf) and drag it into your project's 'public' folder before using this prompt"
      },
      {
        title: "Add a headline",
        prompt: `On the homepage, add a centered headline that says: "Hello, beautiful world!"
Make it bold, responsive, and add a small text shadow for contrast.`,
        tip: "Big, clear type makes a strong first impression."
      },
      {
        title: "Add a button with animation",
        prompt: `Below the headline, add a large button with rounded corners and a gradient background.
Style it using Tailwind. Use Framer Motion to scale slightly on hover and bounce on click.
The button should say: "[[insert your own button text here]]"
This button doesn't need to perform any action yet—just make sure the styling and animation work.`,
        tip: "Use Tailwind for the styling, and Framer Motion for animation."
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
              Start Small
            </Badge>
            <h1 className="mb-2" style={{ letterSpacing: '-0.04em' }}>
              Build a simple front-end page
            </h1>
            <p className="text-lg sm:text-xl text-black mb-4">
              Build a simple, responsive front-end layout using Cursor
            </p>
            <p className="text-sm sm:text-base text-black mb-8">
              In this project, you'll prompt Cursor to build a clean layout using Tailwind and Framer Motion. You'll also upload a custom font, add a headline, and style an animated button. No coding needed—just clear, step-by-step prompts.
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
              <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">What you'll practice:</h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest flex-shrink-0" />
                  <span className="text-sm sm:text-base text-black">Giving Cursor clear context before a build</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest flex-shrink-0" />
                  <span className="text-sm sm:text-base text-black">Setting up Tailwind and Framer Motion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest flex-shrink-0" />
                  <span className="text-sm sm:text-base text-black">Uploading and applying a custom font</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-forest flex-shrink-0" />
                  <span className="text-sm sm:text-base text-black">Prompting for layout structure and animation</span>
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

                      {/* Special note for manual steps */}
                      {prompt.note && (
                        <div className={`mb-4 sm:mb-6 p-3 rounded-lg ${isCompleted ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-900'}`}>
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

          {/* Run Your Project Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 sm:mt-12"
          >
            <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-light">View Your Site Locally in the Browser</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm sm:text-base text-black font-medium mb-1">Open your Terminal</p>
                    <p className="text-xs sm:text-sm text-black">Press Cmd + Space, type "Terminal", then press Enter.</p>
                  </div>

                  <div>
                    <p className="text-sm sm:text-base text-black font-medium mb-1">Navigate to your project folder</p>
                    <p className="text-xs sm:text-sm text-black mb-2">In the terminal, type:</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 relative">
                      <p className="text-xs sm:text-sm font-mono text-black">cd vibe_101</p>
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
                  <p className="text-sm text-black">
                    <strong>If something looks off:</strong><br />
                    Don't stress. Sometimes Cursor is still finishing up in the background. Give it a few seconds, refresh the page, or head to the <Link href="/debug" className="text-blue-600 hover:text-blue-800 underline">Debug page</Link> for tips.
                  </p>
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
                  {projectComplete ? "Amazing work!" : "Done?"}
                </h2>
                <p className="text-sm sm:text-lg text-black mb-6 sm:mb-8">
                  {projectComplete
                    ? "You've created your first beautiful page with Cursor! Take a moment to admire your work."
                    : "If everything looks good and you've prompted Cursor through all six steps, you're done! You can always come back and tweak the project later."
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
                      Ready for more? Try the ambitious project or explore the debug section!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
                      <Link href="/projects/ambitious" className="btn-primary w-full sm:w-auto">
                        Try Ambitious Project
                      </Link>
                      <Link href="/prompts" className="btn-secondary w-full sm:w-auto">
                        Browse Prompts
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