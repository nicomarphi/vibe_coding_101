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
        title: "Set Up Your Code Environment",
        description: "What you need to build",
        content: [
          "If you know for sure you have Node already installed, you can go to the next step.",
          <span key="31">
            If you think but aren't sure, open up the Terminal app, type the
            following line and hit enter
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              node -v
            </span>
            If the terminal returns a version, you're all set !
          </span>,
          <span key="32">
            If you're still there, we will install Node.js. Node is a tool for you
            to run javaScript code on your computer. It will be useful later to
            run apps and spin websites.
            <span
              key="34"
              className="font-mono bg-orange-200 px-2 py-1 rounded text-sm"
            >
              This might take a while, don't do this in a rush and do not close
              the terminal unless there is a clear error.
            </span>
          </span>,
          <span key="36">
            First install{" "}
            <a
              href="https://brew.sh/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Homebrew
            </a>{" "}
            by pasting the Install Homebrew command at the top of the page in your
            Terminal app.
          </span>,
          <span key="36">
            Once it's done, you can hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + k
            </span>
            to clear the terminal, and then type
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              brew install node
            </span>
          </span>,
          "Wait for everything to finish installing",
          <span key="37">
            Once it's done, you can hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + k
            </span>
            again and then type
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              node -v
            </span>
            If the terminal returns a version, you're all set !
          </span>,
        ],
        note: "If the installation failed, you don't get a version back in the terminal or if you're unsure, do not run it twice, reach out to your manager or your favorite dev",
      },
      {
        title: "Install Cursor via Okta",
        description: "The Shopify-approved installation method",
        content: [
          <span key="okta">
            Go to{" "}
            <a
              href="http://shopify.okta.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Shopify Okta
            </a>
          </span>,
          "Search for 'Cursor' in the apps",
          "Bonus : While you're here, request access to the shopify/playground and shopify/world github",
          "Click 'Add' and follow the installation prompts",
          "Once installed, open Cursor from your Applications folder",
          "Unless it prompts you an error, we're all set !",
          "Download and login in Cursor through Okta ONLY - do not use GitHub or Google login as it might fail and create issues.",
          "Bonus : Not required but it's a good time to check if you have access to your github account.",
        ],
        note: "Generally speaking, there are ways to install commonly used tools and repositories at Shopify. If you feel like you're hacking your computer, you might be doing something wrong. In doubt ask the Vault Agent or your manager",
      },
      {
        title: "Set Up Your Code Environment part. 2",
        description: "Keep your computer clean",
        content: [
          "In the Finder, click on the `Go` tab in the menu bar and then on `Home`",
          "Create a `vibe-coding` folder, use this folder to put other folders, do not install anything directly in there.",
          "Create a folder `my-first-app` inside.",
          "Get into Cursor and either, navigate to `my-first-app` using the Open folder button, or drag and drop the folder in the app window. You should see an empty window with a navbar on the left, with `my-first-app` at the top.",

          <span key="37">
            Bonus : For a better experience in the Terminal
            <br />
            <ul>
              <li>- Install the iTerm2 app from Self Service</li>
              <li>
                - Install{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                  href="https://ohmyz.sh/"
                >
                  Oh My Zsh
                </a>
              </li>
            </ul>
          </span>,
        ],
        note: "Agents have the tendency to create a lot of files, it can go wild pretty fast and can mess up the AI results with conflicting contexts, make sure to keep at least one level of organization.",
      },
      {
        title: "Set Up Cursor",
        description: "Just what's needed !",
        content: [
          <span key="37">
            First, hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + shift + p
            </span>
            a bar should open, type ( it should auto-complete )
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              Shell Command : Install Cursor command
            </span>
            This will allow us to run the Terminal from within Cursor.
          </span>,
          <span key="37">
            Then, hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + , (comma)
            </span>
            to open the Settings, then hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + f
            </span>
            and search for " Format on Save" and toggle it.
          </span>,

          <span key="37">
            Then click on Cursor in the menu bar and go to
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              {`Cursor Settings > Models`}
            </span>
            and check that Claude 4 Sonnet and Opus are turned on ( you can pick
            some others if you want to try, or disable the one that you don't need
            )
          </span>,
        ],
      },
      {
        title: "Using the Agents",
        description:
          "Cursor can not only generate code but implement it for you.",
        content: [
          <span key="37">
            In Cursor, hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + I
            </span>
            to open the Chat panel.
          </span>,
          "At the bottom of the chat box, in the second dropdown, make sure to use the latest Claude model.",
          "Some models have a reasoning, some don't, indicated by a little brain next to it, only the reasoning models can be used with Agents. ",
          <span key="37">
            Most of the time, the agents will automatically act on your prompt. If
            you have a question, hit
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              cmd + L
            </span>
            instead to open use the Ask command.
          </span>,
          <span key="37">
            Bonus : Agents work better when they are given{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
              href="https://docs.cursor.com/context/rules/"
            >
              custom rules
            </a>
            {" "}(check Cursor's documentation on how to set them up). Don't hesitate to restart a conversation if you feel it's stuck in
            a loop. You can also reference a previous conversation in the prompt
            or ask it to search the web.
          </span>,
        ],
        note: "Agents are like humans, if you give vague instructions or ask for too much things at the same time, it will often do a bad job. Take the time to give precise indications on what you want to do.",
      },
      {
        title: "Kickstart Your First Project",
        description: "And make sure everything works",
        content: [
          "Open an Agent panel ( Cmd + I )",
          "Paste the following prompt",
          <span
            key="2"
            className="font-mono bg-gray-100 px-2 py-1 rounded text-sm"
          >
            Create a new Next.js project, use the current folder as the root. Use
            JavaScript and Tailwind CSS. Set up the project with the React App
            Router, and install GSAP for animations. Configure Tailwind CSS
            properly and create a clean folder structure for me to add pages to my
            app. Run the app once you're done and do not create any other servers
            unless i tell you.
          </span>,
          "Once done, you should be able to open http://localhost:3000 ( you might have different numbers after the :, look in the Claude answer to confirm which port is being used ) in your browser and see the Next.js welcome page!",
          <span>
            Sometimes the app will crash, forcing you to restart the server, in
            this case click in the Terminal panel and hit,
            <span
              key="2"
              className="font-mono bg-gray-100 px-2 py-1 rounded text-sm"
            >
              Ctrl + C
            </span>{" "}
            to kill the app and then you will need to type
            <span
              key="21"
              className="font-mono bg-gray-100 px-2 py-1 rounded text-sm"
            >
              npm run dev
            </span>{" "}
            to re-run the server. Cursor and Claude are still not great at
            managing this part, so it's better to kill and restart the server
            yourself instead of asking the AI to do it !.
          </span>,
        ],
        note: " Also keep an eye on Claude because he sometimes will start a new server after each code update, make sure to include that in your prompt and always close these extra servers if you see one.",
      },
      {
        title: "Understanding Context",
        description: "It's all about the context !",
        content: [
          <span key="37">
            The most important piece of an agentic workflow is how well you define
            the context, Cursor can read files and look at images. Add the context
            to your folder and you can then type
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
              @ + the name of your file
            </span>
            or drag and drop it, or click on the little @ at the top left and
            navigate to your file for Claude to include. A good idea is to write
            your prompt in a .txt file instead of the chat box. Or you can provide
            a screenshot or images to replicate. Be mindful of file sizes, this is
            not Midjourney or Figma, this will crash your computer.
          </span>,
          "As an exercice, right-click on the empty space in the left panel, add a new file, name it 'hello.txt', write 'hello world' in it, then ask the Agent to read this file instead of scanning the whole codebase everytime.This is important because you now realize you can ask Cursor to look at specific files. This will speed up your debugging process.",
          "Bonus : Typing in the chat box is often a little bit clunky, you can write your complex prompts as text files and pass them to Cursor.",
        ],
      },

      {
        title: "Learn Some Shortcuts",
        description: "These will save you time as you build:",
        content: [
          "Cmd + K — Open Composer (for in-file edits)",
          "Cmd + L — Open the AI Chat panel (for conversations and full project prompts)",
          "Cmd + I — Open the AI Agent panel",
          "Cmd + P — Open the file navigator",
          "Cmd + F — Search a specific word in the current file",
          "Cmd + D  — Select the next instance of a specific chain of character ( useful to navigate a file quickly )",
          <span>Shift + Cmd +{"`"} - Open the Terminal panel </span>,
          "In the terminal : Ctrl + C — Kill the current Node app and shut the server.",
          "Tab — Accept Cursor's code suggestions",
          "Hotreload — By default, Next.js and Remix use hot reload, which means that when you save your files, it will automatically udpate the browser for you. If you're exploring and try to use other tech ( as you should ), this might not be implemented and asking Claude to use Vite.js will usually solve this.",
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
          "Never ever agree to Cursor asking for more Read or Write permissions",
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
          "Do not mix your experimentations with the Shopify codebase, e.g. do not save anything within the World or B3 folder if you have them.",
          "If you want to access Shopify infrastructure, use dev and not git. Ask the Vault Agent about it",
          <span>
            If you want to share your prototypes, use your personal github account
            with Vercel or use{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
              href="https://github.com/shopify-playground/stitch"
            >
              Stitch
            </a>
            . Prefer Stitch if you're prototyping with anything related to the
            Shoppy IP ( logos are ok but do not upload a portion of Supply on
            Vercel )
          </span>,
          "Use MCP servers with caution",
          "And we will never repeat it enough, in any doubt, ask your manager or favorite dev.",
        ],
      },
      {
        title: "Have fun and test ideas !",
        description: "And don't forget to share often",
        content: [],
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
              policies. Setup takes about 15-20 minutes.
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
                    className={`h-full border-0 rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer !py-0 ${isCompleted ? "frosted-glass-blue" : "bg-white"
                      }`}
                    onClick={() => toggleStep(index)}
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
                                } [&_.font-mono]:block [&_.font-mono]:w-full [&_.font-mono]:mt-2 [&_.font-mono]:mb-2 [&_.font-mono]:border [&_.font-mono]:rounded`}
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
                      <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center ${isCompleted
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
