"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navigation from "@/components/Navigation";

export default function DebugPage() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [copiedCard, setCopiedCard] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const copyPrompt = (text: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Extract just the prompt from the solution (text within quotes)
    const promptMatch = text.match(/"([^"]+)"/);
    if (promptMatch) {
      navigator.clipboard.writeText(promptMatch[1]);
      setCopiedCard(index);
      setTimeout(() => setCopiedCard(null), 2000);
    }
  };

  const debugCards = [
    {
      bug: "My localhost page is blank or broken",
      solution: "This doesn't mean your whole project is broken.\nRestart with:\n\"Something isn't showing up on my local server. Can you help me troubleshoot?\""
    },
    {
      bug: "Cursor isn't doing anything when I prompt",
      solution: "Make sure:\n• You selected code first\n• You pressed Cmd + K\n• Agent Mode is ON\n\nIf it's still stuck:\n\"Nothing happened when I submitted this prompt. Can you tell me why?\""
    },
    {
      bug: "My layout is all messed up",
      solution: "\"The layout looks broken. Can you check for missing containers, spacing issues, or layout bugs?\""
    },
    {
      bug: "My image isn't showing up",
      solution: "\"This image isn't displaying. Can you check if the path is correct and the file is imported properly?\""
    },
    {
      bug: "I broke something and I don't know what",
      solution: "You probably didn't break it. Try:\n\"Can you check the last change and fix whatever caused the page to break?\""
    },
    {
      bug: "I pasted a prompt and now I can't find the file",
      solution: "Ask:\n\"Where did you put the new file you created? Can you show me how to find and open it?\""
    },
    {
      bug: "I got an error in the terminal",
      solution: "Copy the exact error message. Then say:\n\"I got this error: [paste error]. Can you explain what's wrong and fix it?\""
    },
    {
      bug: "Cursor added too much stuff",
      solution: "\"This looks overcomplicated. Can you simplify it and remove anything unnecessary?\""
    },
    {
      bug: "I want to undo what I just did",
      solution: "Use Cmd + Z to undo the edit.\nOr ask Cursor:\n\"Undo the last change and go back to how it was before.\""
    },
    {
      bug: "Everything feels messy and unorganized",
      solution: "\"Can you clean this up and organize the files so everything's easier to follow?\""
    },
    {
      bug: "My styles aren't applying",
      solution: "\"The CSS/Tailwind classes I added aren't working. Can you check for typos, conflicting styles, missing imports, or specificity issues and fix them?\""
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="gradient-mesh gradient-mesh-debug" />
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
              Bugs and Fixes
            </h1>
            <p className="text-lg sm:text-xl text-black max-w-2xl mb-4">
              Don't light your laptop on fire just yet. When things break (and they will), these tips will help you troubleshoot without spiraling.
            </p>
            <p className="text-base sm:text-lg text-black max-w-2xl">
              Cursor's not perfect, but a few smart fixes can get you back on track fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flip Cards Grid */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2">
            {debugCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="break-inside-avoid"
              >
                <div
                  className="relative h-64 sm:h-80 md:h-96 cursor-pointer preserve-3d"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  onClick={() => toggleFlip(index)}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      rotateY: flippedCards.includes(index) ? 180 : 0
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Front of card */}
                    <Card className="absolute inset-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all backface-hidden flex flex-col">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-light flex-grow">
                        {card.bug}
                      </h3>
                      <p className="text-xs sm:text-sm text-black mt-auto">
                        Click to see solution →
                      </p>
                    </Card>

                    {/* Back of card */}
                    <Card
                      className="absolute inset-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 border-0 rounded-3xl bg-gradient-to-br from-forest/5 to-ocean/5 shadow-sm flex flex-col"
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden"
                      }}
                    >
                      <Badge variant="outline" className="text-xs font-medium uppercase tracking-wide mb-3 sm:mb-4 self-start">
                        Solution
                      </Badge>
                      <div className="text-sm sm:text-base leading-relaxed flex-grow overflow-y-auto">
                        {/* Parse and display solution with copyable prompts */}
                        {card.solution.split('\n').map((line, lineIndex) => {
                          // Check if this line contains a prompt (text in quotes)
                          const hasPrompt = line.includes('"') && line.includes('"');
                          if (hasPrompt) {
                            const promptMatch = line.match(/"([^"]+)"/);
                            if (promptMatch) {
                              return (
                                <div key={lineIndex} className="mb-2 sm:mb-3 w-full">
                                  <div className="bg-white/50 rounded-lg p-2 sm:p-3 border border-gray-200 group relative w-full">
                                    <p className="text-xs sm:text-sm font-mono pr-8 sm:pr-10 break-words">{promptMatch[1]}</p>
                                    <button
                                      onClick={(e) => copyPrompt(line, index, e)}
                                      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 rounded hover:bg-gray-100 transition-colors"
                                    >
                                      {copiedCard === index ? (
                                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                      ) : (
                                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          }
                          return <p key={lineIndex} className="mb-1 sm:mb-2 text-xs sm:text-base">{line}</p>;
                        })}
                      </div>
                      <p className="text-xs sm:text-sm text-black mt-3 sm:mt-4">
                        ← Click to flip back
                      </p>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Prompting Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <Card className="p-6 sm:p-8 border-0 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-light mb-4">Prompting Tips</h2>
                  <div className="space-y-3 text-sm sm:text-base text-black">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="font-medium">If you get an error, copy paste the error message directly into the chat, and Cursor will help you troubleshoot</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Describe the issue clearly: what's broken, what you expected</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Paste any error messages word-for-word</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Ask for one fix at a time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>If you're overwhelmed: ask Cursor to explain what's going on</span>
                    </li>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 