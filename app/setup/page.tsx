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
import CodeBlock from "@/components/CodeBlock";

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
        title: "Configure Cursor",
        description: "Essential settings",
        content: [
          <span key="37">
            Install cursor command: <CodeBlock code="Cmd+Shift+P" inline /> → type "Shell Command: Install 'cursor' command" → click it
          </span>,
          <span key="38">
            Enable format on save: <CodeBlock code="Cmd+," inline /> → search "format on save" → toggle on
          </span>,
          <span key="39">
            Set AI models: Cursor menu → Cursor Settings → Models → enable Claude Sonnet & Opus
          </span>,
        ],
      },
      {
        title: "Install Node.js",
        description: "Required to run your apps",
        content: [
          <span key="29">
            Open Terminal in Cursor: go to Terminal → New Terminal or press <CodeBlock code="Ctrl+`" inline /> (Control + backtick)
          </span>,
          <span key="30">
            Check if Node is already installed by typing: <CodeBlock code="node -v" inline />
          </span>,
          "If you see a version number, skip to the next card. If not, continue below.",
          <span key="36">
            Install <a href="https://brew.sh/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Homebrew</a> by pasting this in Terminal:
          </span>,
          <CodeBlock
            code='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
            className="text-xs break-all overflow-x-auto"
          />,
          "Press Enter and wait for installation (you'll need your password)",
          <span key="37">
            After Homebrew installs, run: <CodeBlock code="brew install node" inline />
          </span>,
          <span key="38">
            Verify by running: <CodeBlock code="node -v" inline />
          </span>,
        ],
        note: "⚠️ If installation fails, don't retry—ask a friend or developer for help",
      },
      {
        title: "Set Up Your Workspace",
        description: "Organize your projects",
        content: [
          "In Finder, go to your Home folder (or choose a location for your projects)",
          "Create a `vibe-coding` folder",
          "Inside that, create a `my-first-app` folder",
          "Open this folder in Cursor (drag it onto Cursor or use File → Open Folder)",
          <span key="37">
            💡 Optional upgrades:
            <ul className="ml-4 mt-1">
              <li>• Install <a href="https://www.iterm2.com/" target="_blank" rel="noopener noreferrer" className="underline">iTerm2</a> for a better terminal</li>
              <li>• Install <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer" className="underline">Oh My Zsh</a> for terminal superpowers</li>
            </ul>
          </span>,
        ],
        note: "Keep each project in its own folder—agents create many files!",
      },
      {
        title: "Using AI Agents",
        description: "Let Cursor write and implement code for you",
        content: [
          <span key="37">
            <CodeBlock code="Cmd+I" inline /> → Agent mode (implements code)
          </span>,
          <span key="38">
            <CodeBlock code="Cmd+L" inline /> → Chat mode (answers questions)
          </span>,
          "Select the Claude model with the 🧠 icon for best results",
          <span key="39">
            💡 Pro tips:
            <ul className="ml-4 mt-1 text-sm">
              <li>• Be specific—one task at a time</li>
              <li>• Add <a href="https://docs.cursor.com/context/rules/" target="_blank" rel="noopener noreferrer" className="underline">custom rules</a> for better results</li>
              <li>• Restart the chat if it gets stuck</li>
            </ul>
          </span>,
        ],
        note: "Clear instructions = better results. Vague prompts = messy code.",
      },
      {
        title: "Your First Project",
        description: "Build something real",
        content: [
          <span key="1">Open Agent mode (<CodeBlock code="Cmd+I" inline />) and paste:</span>,
          <CodeBlock
            key="2"
            code="Create a Next.js app with JavaScript and Tailwind CSS. Use App Router, install Framer Motion for animations. Run the dev server when done."
            className="text-sm"
          />,
          "Wait for the setup to complete, then visit http://localhost:3000",
          <span key="3">
            Server controls:
            <ul className="ml-4 mt-1 text-sm">
              <li>• <CodeBlock code="Ctrl+C" inline /> → stop server</li>
              <li>• <CodeBlock code="npm run dev" inline /> → restart server</li>
            </ul>
          </span>,
        ],
        note: "If Claude creates multiple servers, stop extras with Ctrl+C",
      },
      {
        title: "Working with Context",
        description: "Help Claude understand your needs",
        content: [
          <span key="37">
            Reference files with <CodeBlock code="@filename" inline /> or drag & drop
          </span>,
          "Add screenshots or mockups for Claude to replicate",
          <span key="38">
            Try this: Create hello.txt → write "hello world" → use <CodeBlock code="@hello.txt" inline /> to reference it
          </span>,
          "💡 Write complex prompts in .txt files instead of the chat box",
        ],
      },
      {
        title: "Essential Shortcuts",
        description: "Speed up your workflow",
        content: [
          <span key="1"><CodeBlock code="Cmd+K" inline className="text-sm" /> → Edit code in-file</span>,
          <span key="2"><CodeBlock code="Cmd+L" inline className="text-sm" /> → Chat with AI</span>,
          <span key="3"><CodeBlock code="Cmd+I" inline className="text-sm" /> → Agent mode</span>,
          <span key="4"><CodeBlock code="Cmd+P" inline className="text-sm" /> → Find files</span>,
          <span key="5"><CodeBlock code="Tab" inline className="text-sm" /> → Accept suggestions</span>,
          <span key="6"><CodeBlock code="Shift+Cmd+`" inline className="text-sm" /> → Terminal</span>,
          <span key="7"><CodeBlock code="Ctrl+C" inline className="text-sm" /> → Stop server (in terminal)</span>,
        ],
      },
      {
        title: "Set Up GitHub",
        description: "Save and share your code",
        content: [
          <span key="1">
            Create a free account at <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline">github.com</a>
          </span>,
          "In Cursor, open the Source Control panel (icon on left sidebar)",
          <span key="3">
            Initialize repository: click "Initialize Repository" button
          </span>,
          <span key="4">
            Stage changes: click the + icon next to "Changes"
          </span>,
          <span key="5">
            Commit: type a message like "Initial commit" and click checkmark
          </span>,
          <span key="6">
            Push to GitHub: click "Publish Branch" and follow prompts
          </span>,
          <span key="7">
            💡 Your code is now backed up and shareable!
          </span>,
        ],
        note: "GitHub saves your work online—never lose code again",
      },
      {
        title: "What's Next?",
        description: "You're ready to start vibe coding!",
        content: [
          <span key="1">
            🎯 <Link href="/projects" className="underline font-medium">Start a practice project</Link> - Choose from 3 guided tutorials
          </span>,
          <span key="2">
            💡 <Link href="/prompts" className="underline font-medium">Browse tips & prompts</Link> - Level up your Cursor skills
          </span>,
          <span key="3">
            🐛 <Link href="/debug" className="underline font-medium">Check debug guide</Link> - Solutions for when things break
          </span>,
          "✨ Remember: Done is better than perfect. Start building!"
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
            <h1 className="mb-2 uppercase" style={{ letterSpacing: '-0.01em' }}>
              Set up cursor
            </h1>
            <p className="text-lg sm:text-xl text-black">
              Let's get your system ready for vibe coding with Cursor. This takes about 15-20 minutes including all installations.
              <span className="text-sm block mt-2 text-gray-600">(Not including breaking things, fixing them, and iterating)</span>
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
                  <Card className={`h-full border-0 rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden !py-0 ${isCompleted ? 'frosted-glass-blue' : 'bg-white'
                    }`}
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
                            <span className={`${isCompleted ? '[&_a]:text-white [&_a]:underline [&_.font-semibold]:bg-transparent [&_.font-semibold]:text-white [&_.font-semibold]:px-0 [&_.font-mono]:bg-white/20 [&_.font-mono]:text-white [&_.font-mono]:border-white/30' : '[&_.font-semibold]:text-black [&_.font-mono]:bg-gray-100 [&_.font-mono]:text-black [&_.font-mono]:border-gray-300'} [&_.font-mono]:block [&_.font-mono]:w-full [&_.font-mono]:mt-2 [&_.font-mono]:mb-2 [&_.font-mono]:border [&_.font-mono]:rounded [&_.font-mono]:select-all [&_.font-mono]:cursor-text`}>
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
                      <div
                        className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 cursor-pointer group"
                        onClick={() => toggleStep(index)}
                        title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                      >
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110 ${isCompleted
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