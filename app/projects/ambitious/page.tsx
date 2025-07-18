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

export default function AmbitiousProject() {
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
        title: "Build the complete portfolio grid",
        prompt: `Create a beautiful responsive portfolio grid with animations using Next.js:

PROJECT SETUP:
- Create new Next.js app called "my-portfolio-grid"
- Use TypeScript, Tailwind CSS v3 (IMPORTANT: use @3.x, NOT v4), and App Router
- Install framer-motion for animations

LAYOUT STRUCTURE:
- Large, bold heading at the top: "My Creative Work"
- Subtitle: "A collection of my favorite projects"
- Add padding and center the content

IMAGE GRID:
- Create a 6-image grid layout
- Use real images from Unsplash: https://source.unsplash.com/random/800x600?sig=1 (change sig=1,2,3 etc for different images)
- Or use placeholder images: https://via.placeholder.com/800x600/purple/white?text=Project+1
- Responsive breakpoints:
  - Mobile: 1 column
  - Tablet (md): 2 columns  
  - Desktop (lg): 3 columns
- Use aspect-[16/9] for consistent sizing
- Add subtle borders and rounded corners (rounded-lg)
- Include proper alt text for accessibility

ANIMATIONS WITH FRAMER MOTION:
- Fade in heading from top with 0.5s duration
- Fade in subtitle with 0.2s delay
- Stagger grid items appearance (0.1s delay between each)
- On hover: scale to 1.05 and increase shadow
- Smooth transitions (0.3s duration)

STYLING:
- Clean white background
- Subtle shadows on cards
- Consistent spacing between elements
- Beautiful typography

Make it portfolio-ready and impressive!`,
        tip: "This creates your entire portfolio grid in one prompt",
        estimatedTime: "2 minutes"
      },
      {
        title: "Make it more dynamic",
        prompt: `Transform the static grid into an interactive gallery:

1. Add category filters at the top:
   - "All", "Design", "Photography", "Development"
   - Smooth filter animations when switching categories
   - Active filter highlighted

2. Add a lightbox effect:
   - Click any image to open in fullscreen
   - Dark overlay background
   - Close button and ESC key to exit
   - Smooth zoom animation

3. Add image overlays on hover:
   - Project title appears
   - View project button
   - Semi-transparent dark overlay

Keep all existing animations smooth!`,
        tip: "Add professional gallery features",
        estimatedTime: "1 minute"
      },
      {
        title: "Add loading states and polish",
        prompt: `Enhance the user experience with these additions:

1. Add skeleton loading states:
   - Show gray placeholder boxes while images load
   - Pulse animation on skeletons
   - Smooth transition when images appear

2. Add lazy loading:
   - Load images as user scrolls
   - Use Intersection Observer

3. Add a "Load More" button:
   - Initially show 6 images
   - Load 3 more each time
   - Smooth animation for new items

4. Add subtle parallax effect on scroll`,
        tip: "Professional loading experience",
        estimatedTime: "1 minute"
      },
      {
        title: "Create different layouts",
        prompt: `Add a layout switcher to toggle between different views:

1. Grid view (current)
2. Masonry layout (Pinterest-style with varied heights)
3. List view (larger images with descriptions)
4. Carousel view (horizontal scrolling)

Add smooth transitions between layout changes using Framer Motion's layout animations.

Include toggle buttons at the top right to switch views.`,
        tip: "Multiple viewing options",
        estimatedTime: "1 minute"
      },
      {
        title: "Final touches",
        prompt: `Polish for a professional portfolio:

1. Add a hero section above the grid:
   - Your name and title
   - Brief introduction
   - Social media links

2. Add footer with:
   - Contact information
   - Copyright notice
   - Back to top button

3. Performance optimizations:
   - Use next/image for optimization
   - Add blur placeholders
   - Optimize for Core Web Vitals

4. Make it fully accessible:
   - Keyboard navigation
   - Screen reader friendly
   - Focus indicators

Ready to showcase your work!`,
        tip: "Portfolio-ready finishing touches",
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
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200" variant="secondary">
              Beginner 2.0
            </Badge>
            <h1 className="mb-2 uppercase" style={{ letterSpacing: '-0.01em' }}>
              Responsive Portfolio Grid
            </h1>
            <p className="text-lg sm:text-xl text-black mb-8">
              Practice building a responsive image grid with animations
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
                    <p className="font-medium text-black">Responsive Grid Layout</p>
                    <p className="text-sm text-gray-600">Adapts from 1 to 3 columns based on screen size</p>
                  </div>
                  <div>
                    <p className="font-medium text-black">Image Gallery</p>
                    <p className="text-sm text-gray-600">Display 6 images with consistent aspect ratios</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-black">Hover Effects</p>
                    <p className="text-sm text-gray-600">Scale and shadow animations on interaction</p>
                  </div>
                  <div>
                    <p className="font-medium text-black">Staggered Animations</p>
                    <p className="text-sm text-gray-600">Items appear sequentially for visual impact</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-black">
                  <span className="font-medium">Total time:</span> 5-10 minutes for initial build
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  (Plus time for iterations and enhancements)
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
                    <span>5 minutes to build something cool</span>
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
                  <h3 className="text-lg font-medium mb-3">Using Cursor's terminal:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">1</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">
                          Open the terminal in Cursor with <code className="px-2 py-0.5 bg-white rounded text-sm">Ctrl+`</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">2</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">Navigate to your project:</p>
                        <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">
                          cd my-portfolio-grid
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-medium text-blue-600">3</span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm sm:text-base text-black mb-2">Start your server:</p>
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
                        <p className="text-sm sm:text-base text-black mb-2">Visit in your browser:</p>
                        <div className="bg-white rounded-lg p-3 font-mono text-sm text-blue-600">
                          http://localhost:3000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-black mb-2">Your portfolio grid is now live!</p>
                  <p className="text-sm text-gray-600">
                    If something doesn't look right, check out our <Link href="/debug" className="text-blue-600 hover:text-blue-800 underline">debug guide</Link>.
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
                  {projectComplete ? "Nice work!" : "Ready to wrap up?"}
                </h2>
                <p className="text-sm sm:text-lg text-black mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {projectComplete
                    ? "You built a responsive portfolio grid with animations. Try adding your own images or changing the layout to make it yours."
                    : "Once your grid is displaying properly with all animations working, you're done!"}
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
                        Try customizing the grid size, animations, or colors to make it unique!
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <Link href="/projects/fal-ai" className="btn-primary">
                        Try the AI Fortune Teller
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