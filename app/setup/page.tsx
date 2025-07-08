"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import confetti from "canvas-confetti";

export default function SetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

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

  const steps: Array<{
    title: string;
    description: string;
    content: (string | React.ReactElement)[];
    note?: string | React.ReactElement;
  }> = [
      {
        title: "Install Cursor",
        description: "The AI-powered code editor",
        content: [
          <span key="0">Go to <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">cursor.sh</a></span>,
          "Click the big Download button",
          "Open your Downloads folder and double-click the installer",
          "Drag Cursor into your Applications folder"
        ],
        note: <span key="note-shopify">Shopifolk? <Link href="/setup/shopify" className="underline hover:no-underline">Get set up here</Link></span>
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
          "In Cursor, go to File → Open Folder and select where you want to create your project (like your Desktop or Documents folder)",
          "Press Cmd + L to open the Chat panel",
          "Paste this prompt in the chat:",
          <span key="2" className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">"Install Node.js on my system. Then create a new Next.js project called 'vibe-starter' with TypeScript and Tailwind CSS. Set up the project with App Router, and install Framer Motion for animations. Configure Tailwind CSS properly and create a clean folder structure."</span>,
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
          "Navigate to where you created your project:",
          <span key="2" className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">cd vibe-starter</span>,
          "Start the development server:",
          <span key="4" className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">npm run dev</span>,
          "Open http://localhost:3000 in your browser",
          "You should see the Next.js welcome page!"
        ]
      }
    ];

  // Trigger celebration when all steps are completed
  useEffect(() => {
    if (completedSteps.length === steps.length && completedSteps.length > 0) {
      // Big celebration!
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [completedSteps.length, steps.length]);

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
            <h1 className="mb-2" style={{ letterSpacing: '-0.04em' }}>
              Set up Cursor
            </h1>
            <p className="text-lg sm:text-xl text-black">
              Let's get your system ready for vibe coding with Cursor. This takes about 15-20 minutes including all installations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {steps.map((step, index) => {
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
                            <span className={`${isCompleted ? '[&_a]:text-white [&_a]:underline [&_.font-semibold]:bg-transparent [&_.font-semibold]:text-white [&_.font-semibold]:px-0 [&_.font-mono]:bg-white/20 [&_.font-mono]:text-white [&_.font-mono]:border-white/30' : '[&_.font-semibold]:text-black [&_.font-mono]:bg-gray-100 [&_.font-mono]:text-black [&_.font-mono]:border-gray-300'} [&_.font-mono]:block [&_.font-mono]:w-full [&_.font-mono]:mt-2 [&_.font-mono]:mb-2 [&_.font-mono]:border [&_.font-mono]:rounded`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Note section if present */}
                      {step.note && (
                        <div className={`mt-4 p-3 rounded-lg ${isCompleted ? 'bg-white/20 text-white' : 'bg-orange-500 text-white'}`}>
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

          {/* Next Steps - Only show when all complete */}
          {completedSteps.length === steps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-light mb-4">Nice work! You're ready to create!</h2>
                  <p className="text-sm sm:text-base text-black mb-6 sm:mb-8">
                    You've completed all the setup steps. Now you're ready to start building with Cursor!
                  </p>
                </div>
                <Link href="/projects" className="btn-primary">
                  Start Your First Practice Project
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
} 