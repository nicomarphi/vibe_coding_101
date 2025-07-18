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
        title: "Build the entire landing page",
        prompt: `Create a beautiful, modern landing page using Next.js with the following specifications:

PROJECT SETUP:
- Create a new Next.js app called "my-landing-page" 
- Use TypeScript, Tailwind CSS v3 (IMPORTANT: use @3.x, NOT v4), and App Router
- Install framer-motion for animations

HERO SECTION:
- Large, bold headline: "Welcome to the Future" 
- Subtitle: "Where ideas become reality"
- Center everything in viewport
- Purple to blue gradient background
- Fully responsive design

CALL-TO-ACTION BUTTON:
- Below subtitle, add "Get Started" button
- Dark background, rounded corners
- Scale up slightly on hover
- Subtle shadow effect
- Add click animation using Framer Motion

FEATURE CARDS SECTION:
- Below hero, add 3 feature cards in a row:
  1. "Lightning Fast" 
  2. "Beautiful Design"
  3. "Easy to Use"
- Each card: white background, subtle shadow, title, subtitle, description
- Responsive: stack on mobile, row on desktop

ANIMATIONS:
- Headline fades in from top
- Subtitle fades in from bottom  
- Feature cards stagger in with scroll
- Cards lift slightly on hover

`,
        tip: "This creates your complete landing page in one go",
        estimatedTime: "5-7 minutes"
      },
      {
        title: "Customize the colors",
        prompt: `Change the gradient to use your favorite colors. Try:
- Sunset theme: orange to pink
- Ocean theme: teal to deep blue  
- Forest theme: green to emerald
- Or pick any colors you like!

Update the button and card hover effects to match the new color scheme.`,
        tip: "Make it yours by changing the color palette",
        estimatedTime: "3-5 minutes"
      },
      {
        title: "Add more content",
        prompt: `Add these sections to make it a complete landing page:

1. Add a navigation bar at the top with:
   - Logo/brand name on the left
   - Menu items: Features, About, Contact
   - Sticky positioning

2. Add a testimonial section with:
   - 2-3 customer quotes
   - Names and titles
   - Subtle background pattern

3. Add a footer with:
   - Copyright notice
   - Social media links
   - Quick links

Keep the same design style and animations.`,
        tip: "Turn it into a full landing page",
        estimatedTime: "5-7 minutes"
      },
      {
        title: "Make it more interactive",
        prompt: `Add these interactive elements:

1. Parallax scrolling effect on the hero background
2. Smooth scroll to sections when clicking nav items
3. Add a "back to top" button that appears on scroll
4. Make the Get Started button open a modal with an email signup form
5. Add confetti animation when form is submitted

Use Framer Motion for all animations.`,
        tip: "Add engaging interactions",
        estimatedTime: "5-7 minutes"
      },
      {
        title: "Polish and optimize",
        prompt: `Final touches for production:

1. Add meta tags for SEO in the layout
2. Optimize images (if any) with next/image
3. Add loading states for any async operations
4. Ensure perfect mobile responsiveness
5. Add subtle hover states to all interactive elements
6. Test and fix any accessibility issues
7. Add a custom 404 page`,
        tip: "Production-ready polish",
        estimatedTime: "3-5 minutes"
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
                  <span className="font-medium">Total time:</span> 20-30 minutes
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  (Includes initial build and iterations)
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
            <h2 className="text-2xl sm:text-3xl font-light">Prompts to try:</h2>
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
                              {index === 0 ? 'Start here:' : 'Then try:'} {prompt.title}
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