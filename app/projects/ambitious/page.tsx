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

export default function AmbitiousProject() {
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

  const prompts = [
    {
      title: "Set up your layout and grid",
      prompt: `Create a new page component with a responsive image grid layout. At the top, add a heading that says "My Visual Journey" (I'll replace this with my own title later). Below that, build a grid with six image placeholders. The grid should be 1 column on mobile, 2 on tablet, and 3 on desktop. Each item should have a 16:9 aspect ratio, a light border, subtle rounding, and a small hover shadow.`,
      tip: "Start with the structure, then add images!"
    },
    {
      title: "Add static images",
      prompt: `Replace the placeholders with six static images stored in the public folder. Use image paths like /images/image1.jpg through /images/image6.jpg (I'll update these with my own filenames later). Make sure the images fill the grid items and maintain aspect ratio.`,
      tip: "You can use any images - photos, illustrations, or GIFs!"
    },
    {
      title: "Make it responsive",
      prompt: `Refine the layout to be fully responsive using Tailwind. On small screens, the grid should be full-width with padding. On larger screens, limit the max width of the container. Adjust spacing and alignment so the layout looks good across all breakpoints.`,
      tip: "Test on different screen sizes to see the magic!"
    },
    {
      title: "Add animation",
      prompt: `Use Framer Motion to animate the layout. Fade in the heading first, then stagger the grid items with a scale and opacity animation. On hover, slightly scale the image (e.g., 1.05) and increase the box shadow. Keep all animations subtle and polished.`,
      tip: "Subtle animations make everything feel professional."
    },
    {
      title: "Add a custom font",
      prompt: `Apply a custom font to the whole site. You can use a Google Font (like "Space Grotesk") or upload your own WOFF/TTF file. Make it easy to swap the font name later. Set a clean fallback stack with system fonts.`,
      tip: "A unique font can transform the entire feel!"
    },
    {
      title: "Refine layout styling",
      prompt: `Use Tailwind to improve spacing and layout. Add or adjust padding, margins, and background color. Feel free to experiment with different background colors or section spacing as long as the layout stays simple and readable.`,
      tip: "This is where you make it truly yours!"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="gradient-mesh gradient-mesh-projects" />
      <div className="grain-overlay" />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4" variant="secondary">
              Feeling Ambitious?
            </Badge>
            <h1 className="mb-4" style={{ letterSpacing: '-0.04em' }}>
              Build a Responsive Portfolio Grid
            </h1>
            <p className="text-black mb-8">
              This project walks you through building a clean, responsive image grid using Cursor. You'll add your own images, adjust the layout, apply custom fonts and animations, and refine the overall styling. Great if you want to go a little deeper.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Practice Section */}
      <section className="py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 border-0 rounded-3xl bg-white shadow-sm">
              <h2 className="text-2xl font-light mb-6">What you'll practice:</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-black">Prompting Cursor to structure a page</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-black">Displaying static images or GIFs from the public folder</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-black">Creating responsive layouts with Tailwind</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-black">Adding subtle animations with Framer Motion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-black">Applying a custom font site-wide</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-ocean flex-shrink-0" />
                  <span className="text-black">Tuning visual details like spacing and color</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Prompts Section */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {prompts.map((prompt, index) => {
              const isCompleted = completedSteps.includes(index);
              const colors = ['frosted-glass-blue', 'frosted-glass-green', 'frosted-glass-purple', 'frosted-glass-orange', 'frosted-glass-pink', 'frosted-glass-teal'];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="h-full"
                >
                  <Card className={`h-full border-0 rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer !py-0 ${isCompleted ? colors[index] : 'bg-white'
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className="p-8 h-full flex flex-col relative">
                      {/* Title - Big and left aligned */}
                      <h3 className={`text-3xl font-light mb-6 ${isCompleted ? 'text-white' : 'text-black'
                        }`}>
                        Step {index + 1}: {prompt.title}
                      </h3>

                      {/* Tip */}
                      <div className={`mb-6 ${isCompleted ? 'text-white/90' : 'text-black'}`}>
                        <p className="text-sm">
                          {prompt.tip}
                        </p>
                      </div>

                      {/* Prompt */}
                      <div className="flex-grow">
                        <div className={`rounded-lg p-4 border relative ${isCompleted
                          ? 'bg-white/20 border-white/30'
                          : 'bg-gray-50 border-gray-200'
                          }`}>
                          <p className={`text-sm font-mono pr-10 whitespace-pre-line ${isCompleted ? 'text-white' : 'text-black'
                            }`}>
                            {prompt.prompt}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(prompt.prompt, index);
                            }}
                            className={`absolute top-3 right-3 p-1 rounded transition-colors ${isCompleted
                              ? 'hover:bg-white/20'
                              : 'hover:bg-gray-100'
                              }`}
                          >
                            {copiedStep === index ? (
                              <Check className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-green-600'}`} />
                            ) : (
                              <Copy className={`w-4 h-4 ${isCompleted ? 'text-white/70' : 'text-black'}`} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Checkbox evenly positioned in bottom right corner */}
                      <div className="absolute bottom-4 right-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isCompleted
                          ? 'bg-black border-black'
                          : 'border-black hover:bg-gray-100'
                          }`}>
                          {isCompleted ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <Check className="w-4 h-4 text-black/30" />
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
            className="mt-12"
          >
            <Card className="p-8 border-0 rounded-3xl bg-gradient-to-r from-cyan-50 to-blue-50">
              <div className="space-y-4">
                <h2 className="text-3xl font-light">View Your Site Locally in the Browser</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-black font-medium mb-1">Open your Terminal</p>
                    <p className="text-sm text-black">Press Cmd + Space, type "Terminal", then press Enter.</p>
                  </div>

                  <div>
                    <p className="text-black font-medium mb-1">Navigate to your project folder</p>
                    <p className="text-sm text-black mb-2">In the terminal, type:</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                      <p className="text-sm font-mono text-black">cd vibe_101</p>
                    </div>
                    <p className="text-sm text-black mt-2">Then press Enter.</p>
                  </div>

                  <div>
                    <p className="text-black font-medium mb-1">Start the development server</p>
                    <p className="text-sm text-black mb-2">Type:</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                      <p className="text-sm font-mono text-black">npm run dev</p>
                    </div>
                    <p className="text-sm text-black mt-2">Then press Enter.</p>
                  </div>

                  <div>
                    <p className="text-black font-medium mb-1">Open your site in a browser</p>
                    <p className="text-sm text-black mb-2">Go to:</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                      <p className="text-sm font-mono text-black">http://localhost:3000</p>
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
            className="mt-12 md:col-span-2"
          >
            <Card className="p-10 border-0 rounded-3xl bg-white shadow-sm">
              <div className="text-center">
                <h2 className="text-3xl font-light mb-4">
                  {projectComplete ? "Incredible work!" : "Done?"}
                </h2>
                <p className="text-lg text-black mb-8">
                  {projectComplete
                    ? "You've built a professional portfolio grid! Add your own images and share it with friends."
                    : "Once the layout looks solid and everything loads as expected, you're done."
                  }
                </p>
                <div
                  className="inline-flex items-center gap-3 cursor-pointer"
                  onClick={() => setProjectComplete(!projectComplete)}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${projectComplete
                    ? 'bg-black border-black'
                    : 'border-black hover:bg-gray-100'
                    }`}>
                    {projectComplete && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium">I completed this project</span>
                </div>

                {projectComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 space-y-4"
                  >
                    <p className="text-black">
                      Wow! You've really leveled up your Cursor skills. What will you create next?
                    </p>
                    <div className="flex gap-2 sm:gap-3 justify-center">
                      <Link href="/prompts" className="btn-primary">
                        Browse More Prompts
                      </Link>
                      <Link href="/debug" className="btn-secondary">
                        Learn to Debug
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