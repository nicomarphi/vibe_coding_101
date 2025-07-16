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

export default function StartSmallProject() {
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
  }> = [
      {
        title: "Create your project",
        prompt: `Create a new Next.js app called "my-landing-page" with TypeScript, Tailwind CSS, and the App Router. 
Keep it simple and clean.`,
        tip: "This creates all the files and folders you need",
        estimatedTime: "30 seconds"
      },
      {
        title: "Build the hero section",
        prompt: `Create a beautiful hero section for the homepage with:
- A large, bold headline that says "Welcome to the Future"
- A subtitle that says "Where ideas become reality"
- Center everything in the viewport
- Add a subtle gradient background from purple to blue
- Make it fully responsive`,
        tip: "The hero section is the first thing visitors see",
        estimatedTime: "1 minute"
      },
      {
        title: "Add an animated button",
        prompt: `Below the subtitle, add a call-to-action button that:
- Says "Get Started"
- Has rounded corners and a dark background
- Scales up slightly on hover
- Has a subtle shadow
- Bounces when clicked
Use Framer Motion for the animations`,
        tip: "Interactive elements make your site feel alive",
        estimatedTime: "45 seconds"
      },
      {
        title: "Create feature cards",
        prompt: `Below the hero section, add a row of 3 feature cards:
1. "Lightning Fast" 
2. "Beautiful Design"
3. "Easy to Use"

Each card should have:
- A white background with subtle shadow
- A title and subtitle
- A short description
- Fade in animation when scrolling
Make them stack on mobile`,
        tip: "Features help explain what makes your product special",
        estimatedTime: "1 minute"
      },
      {
        title: "Polish with animations",
        prompt: `Add these final touches:
- Make the headline fade in from the top
- Make the subtitle fade in from the bottom
- Stagger the feature cards animation
- Add a hover effect to the cards (lift up slightly)
- Ensure everything looks great on mobile`,
        tip: "Small animations create a premium feel",
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
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200" variant="secondary">
              Beginner Friendly
            </Badge>
            <h1 className="mb-2 uppercase" style={{ letterSpacing: '-0.01em' }}>
              Super Simple Page
            </h1>
            <p className="text-lg sm:text-xl text-black mb-8">
              Practice building a landing page with Tailwind CSS and Framer Motion
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
                    <p className="font-medium text-black">Beautiful Hero Section</p>
                    <p className="text-sm text-gray-600">Eye-catching headlines with gradient backgrounds</p>
                  </div>
                  <div>
                    <p className="font-medium text-black">Interactive Button</p>
                    <p className="text-sm text-gray-600">Hover effects and click animations</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-black">Feature Cards</p>
                    <p className="text-sm text-gray-600">Showcase your product's best features</p>
                  </div>
                  <div>
                    <p className="font-medium text-black">Smooth Animations</p>
                    <p className="text-sm text-gray-600">Professional transitions and effects</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-black">
                  <span className="font-medium">Total time:</span> 15-20 minutes including setup
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
                    <span>A few minutes to build something cool</span>
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
                              : 'bg-gray-50 text-black border border-gray-200'
                              }`}>
                              {prompt.prompt}
                            </div>
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

          {/* Preview Your Work Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12"
          >
            <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-2xl sm:text-3xl font-light mb-6">Preview your creation</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Quick way (using Cursor's terminal):</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">1</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">
                          Open the terminal in Cursor with <code className="px-2 py-0.5 bg-white rounded text-sm">Ctrl+`</code> (that's the backtick key)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">2</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">Navigate to your project folder:</p>
                        <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">
                          cd my-landing-page
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">3</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">Start your development server:</p>
                        <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">
                          npm run dev
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">4</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">Open your browser and visit:</p>
                        <div className="bg-white rounded-lg p-3 font-mono text-sm text-blue-600">
                          http://localhost:3000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-black mb-2">That's it! Your site should now be live locally.</p>
                  <p className="text-sm text-gray-600">
                    If something doesn't look right, check out our <Link href="/debug" className="text-blue-600 hover:text-blue-800 underline">debug guide</Link> for quick fixes.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Completion Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 sm:mt-12"
          >
            <Card className="p-6 sm:p-10 border-0 rounded-3xl bg-white shadow-sm">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-light mb-4">
                  {projectComplete ? "You did it!" : "Ready to celebrate?"}
                </h2>
                <p className="text-sm sm:text-lg text-black mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {projectComplete
                    ? "You just built a modern, animated landing page from scratch. That's seriously impressive! Your site has gradient backgrounds, smooth animations, and interactive elements — all the hallmarks of professional web design."
                    : "Once your site is running and looking good, you've officially completed your first Cursor project!"}
                </p>
                <button
                  onClick={() => {
                    setProjectComplete(!projectComplete);
                    if (!projectComplete) {
                      confetti({
                        particleCount: 200,
                        spread: 70,
                        origin: { y: 0.6 }
                      });
                    }
                  }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105"
                >
                  <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${projectComplete ? 'bg-white' : ''
                    }`}>
                    {projectComplete && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <span className="font-medium">I completed this project!</span>
                </button>

                {projectComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 space-y-6"
                  >
                    <div className="p-4 bg-green-50 rounded-lg inline-block">
                      <p className="text-sm text-green-800 font-medium">
                        Pro tip: Try changing the colors, text, or animations in your project. Just describe what you want to Cursor!
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <Link href="/projects/ambitious" className="btn-primary">
                        Level Up: Try the Ambitious Project
                      </Link>
                      <Link href="/prompts" className="btn-secondary">
                        Explore More Prompts
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