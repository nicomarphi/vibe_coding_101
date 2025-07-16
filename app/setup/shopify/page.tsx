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
import CodeBlock from "@/components/CodeBlock";

export default function ShopifySetupPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // WARNING: This is NOT secure for production use!
  // Client-side password validation can always be bypassed.
  // For production, implement proper server-side authentication.
  // This is only meant for basic access control in a demo/educational context.
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hash the password using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Compare with pre-computed hash of the password
    // This is the SHA-256 hash of the password - still not fully secure but better than plaintext
    const correctPasswordHash = "a055dcd1c7edda0202d1a2d9767492f71b155868cda0c8736f9d9ba95ffdbc70";

    if (hashHex === correctPasswordHash) {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const toggleStep = (step: number) => {
    const isCompleting = !completedSteps.includes(step);

    setCompletedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );

    // Trigger confetti when completing a step
    if (isCompleting) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [
          "#8FA68E",
          "#E8B4B8",
          "#F4D19B",
          "#CC6B49",
          "#93C572",
          "#D4A574",
        ],
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
        description: "The Shopify-approved installation method",
        content: [
          <span key="okta">
            Go to <a href="https://shopify.okta.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Shopify Okta</a> and search for 'Cursor'
          </span>,
          "Click 'Add' and follow the installation prompts",
          "Once installed, open Cursor from your Applications folder",
          "Log in through Okta ONLY—not GitHub or Google",
          <span key="bonus">
            💡 While in Okta, request access to:
            <ul className="ml-4 mt-1">
              <li>• shopify/playground</li>
              <li>• shopify/world</li>
            </ul>
          </span>,
        ],
        note: "⚠️ Never download Cursor from cursor.sh—always use Okta for Shopify devices",
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
        note: "⚠️ If installation fails, don't retry—ask your manager or a developer for help",
      },
      {
        title: "Set Up Your Workspace",
        description: "Organize your projects",
        content: [
          "In Finder, go to your Home folder (Go → Home)",
          "Create a `vibe-coding` folder",
          "Inside that, create a `my-first-app` folder",
          "Open this folder in Cursor (drag it onto Cursor or use File → Open Folder)",
          <span key="37">
            💡 Optional upgrades:
            <ul className="ml-4 mt-1">
              <li>• Install iTerm2 from Self Service</li>
              <li>• Install <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer" className="underline">Oh My Zsh</a></li>
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
            code="Create a Next.js app with JavaScript and Tailwind CSS. Use App Router, install GSAP for animations. Run the dev server when done."
            className="text-xs overflow-x-auto"
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
        title: "Get Help & Learn More",
        description: "Resources and support",
        content: [
          <span key="0">Join #cursor on Slack for tips and discussions</span>,
          <span key="1">
            Check out{" "}
            <a
              href="https://www.cursor.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Cursor's documentation
            </a>
          </span>,
          <span key="2">
            Review the{" "}
            <a
              href="https://vault.shopify.io/pages/Security-Awareness/Approved-Tools"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Shopify Approved Tools
            </a>{" "}
            page
          </span>,
          "Ask your manager if you're unsure about any usage",
        ],
      },
      {
        title: "Privacy & Data Rules",
        description: "Keep Shopify data safe",
        content: [
          "Never agree to Cursor asking for additional read or write permissions",
          "Never share merchant, partner, or buyer data with Cursor",
          "Be mindful of what Shopify code you share with Cursor's AI",
          "Cursor is approved for Shopify development work",
          "Use fake/sample data when working with sensitive information",
        ],
        note: "Critical: Keep vibe coding projects in your home directory, not in Shopify repos",
      },
      {
        title: "Vibe Coding at Shopify",
        description: "Best practices",
        content: [
          "Don't mix your experiments with the Shopify codebase (e.g., don't save anything in the World or B3 folders)",
          "To access Shopify infrastructure, use dev, not git. Ask the Vault Agent about it.",
          <span>
            To share prototypes, use your personal GitHub account
            with Vercel or use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
              href="https://github.com/shopify-playground/stitch"
            >
              Stitch
            </a>
            . Prefer Stitch if you're prototyping with anything related to
            Shopify IP (logos are OK, but don't upload any portion of Supply to
            Vercel).
          </span>,
          "Use MCP servers with caution.",
          "When in doubt, always ask your manager or a developer.",
        ],
      },
      {
        title: "Set Up GitHub",
        description: "Save and share your code",
        content: [
          <span key="1">
            You can use your Shopify GitHub account, but create personal repositories for vibe coding projects
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
            💡 When publishing, create the repository under your personal namespace, not Shopify org
          </span>,
        ],
        note: "Keep personal projects separate from official Shopify work repositories",
      },
      {
        title: "Start Building!",
        description: "You're ready to vibe code",
        content: [
          "✨ Experiment freely—break things, learn, iterate",
          "🎯 Build something you'd actually use",
          "🚀 Share your projects in #cursor on Slack",
          "💡 Remember: Done is better than perfect",
        ],
      },
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
              <Link
                href="/setup"
                className="inline-flex items-center gap-2 text-sm text-black hover:underline mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Setup
              </Link>

              <Card className="p-8 border-0 rounded-3xl bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-black" />
                  <h1 className="text-2xl font-light uppercase">
                    Shopifolk setup
                  </h1>
                </div>

                <p className="text-black mb-6">
                  This page contains specific setup instructions for Shopifolk.
                  Please enter the password to continue.
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
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 text-sm text-black hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Setup
            </Link>

            <h1 className="mb-2 uppercase" style={{ letterSpacing: "-0.01em" }}>
              Get set up, Shopifolk
            </h1>
            <p className="text-lg sm:text-xl text-black">
              Follow these steps to set up Cursor in compliance with Shopify
              policies. Setup takes about 15–20 minutes.
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
                  <Card
                    className={`h-full border-0 rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden !py-0 ${isCompleted ? "frosted-glass-blue" : "bg-white"
                      }`}
                  >
                    <div className="p-6 sm:p-8 h-full flex flex-col relative">
                      {/* Title - Big and left aligned */}
                      <h3
                        className={`text-2xl sm:text-3xl font-light mb-3 sm:mb-4 ${isCompleted ? "text-white" : "text-black"
                          }`}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm sm:text-base mb-4 sm:mb-6 ${isCompleted ? "text-white/90" : "text-black"
                          }`}
                      >
                        {step.description}
                      </p>

                      {/* Bullet list */}
                      <ul
                        className={`space-y-2 text-s sm:text-m flex-grow mb-12 ${isCompleted ? "text-white/80" : "text-black"
                          }`}
                      >
                        {step.content.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span
                              className={`${isCompleted
                                ? "[&_a]:text-white [&_a]:underline [&_.font-mono]:bg-white/20 [&_.font-mono]:text-white [&_.font-mono]:border-white/30"
                                : "[&_.font-mono]:bg-gray-100 [&_.font-mono]:text-black [&_.font-mono]:border-gray-300"
                                } [&_.font-mono]:block [&_.font-mono]:w-full [&_.font-mono]:mt-2 [&_.font-mono]:mb-2 [&_.font-mono]:border [&_.font-mono]:rounded [&_.font-mono]:select-all [&_.font-mono]:cursor-text`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Note section if present */}
                      {step.note && (
                        <div
                          className={`mt-4 p-3 rounded-lg ${isCompleted
                            ? "bg-white/20 text-white"
                            : "bg-orange-50 text-orange-900"
                            }`}
                        >
                          <div className="text-sm font-medium">{step.note}</div>
                        </div>
                      )}

                      {/* Checkbox evenly positioned in bottom right corner */}
                      <div
                        className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 cursor-pointer group"
                        onClick={() => toggleStep(index)}
                        title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                      >
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110 ${isCompleted
                            ? "bg-black border-black"
                            : "border-black hover:bg-gray-100"
                            }`}
                        >
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
