"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

export default function Home() {
  const [randomDebugTip, setRandomDebugTip] = useState({ bug: "", solution: "" });
  const [randomPrompt, setRandomPrompt] = useState({ title: "", prompt: "" });
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedTip, setCopiedTip] = useState(false);
  const [isRefreshingDebug, setIsRefreshingDebug] = useState(false);
  const [isRefreshingPrompt, setIsRefreshingPrompt] = useState(false);

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

  const prompts = [
    {
      title: "Start Your First Practice Project",
      prompt: `Create a simple one-page website with:
- A centered hero section with a large headline
- A subheading paragraph
- A primary button with hover effects
- Use Tailwind CSS for all styling
- Make it responsive for mobile devices`
    },
    {
      title: "Create a Hero Section",
      prompt: `Build a hero section component with:
- Large headline using text-6xl
- Subheading in a lighter color
- Two buttons side by side (stack on mobile)
- Add fade-in animation on page load
- Optional image on the right side`
    },
    {
      title: "Build a Card Grid",
      prompt: `Create a responsive card grid:
- Each card: image, title, description, link
- Grid: 1 col mobile, 2 tablet, 3 desktop
- Hover effect: lift up with shadow
- Cards should have equal height`
    },
    {
      title: "Add Gradient Background",
      prompt: `Add a gradient background:
- Direction: to bottom right
- Colors: from purple-400 to blue-600
- Ensure text readability
- Consider animated gradient`
    },
    {
      title: "Simple Contact Form",
      prompt: `Build a contact form with:
- Name field (required)
- Email field (with validation)
- Message textarea
- Submit button with your brand color
- Show success/error states`
    },
    {
      title: "Fade In Animation",
      prompt: `Add Framer Motion fade-in:
- Initial: { opacity: 0, y: 20 }
- Animate: { opacity: 1, y: 0 }
- Transition: { duration: 0.5 }
- Optional: viewport trigger`
    },
    {
      title: "Navigation Menu",
      prompt: `Create a responsive navigation menu:
- Logo on the left
- Menu items on the right
- Hamburger menu on mobile
- Smooth open/close animation
- Sticky header with blur background`
    },
    {
      title: "Image Gallery",
      prompt: `Build an image gallery with lightbox:
- Grid of thumbnail images
- Click to open full-size view
- Previous/next navigation
- Close button or click outside to close
- Smooth transitions between images`
    },
    {
      title: "Testimonial Carousel",
      prompt: `Create a testimonial slider:
- Quote text with quotation marks
- Author name and title
- Auto-play with pause on hover
- Dots or arrows for navigation
- Smooth slide transitions`
    },
    {
      title: "Pricing Cards",
      prompt: `Design pricing cards:
- 3 tiers: Basic, Pro, Enterprise
- Price, features list, CTA button
- Highlight the recommended plan
- Hover effects on cards
- Responsive layout`
    },
    {
      title: "Footer Section",
      prompt: `Build a footer component:
- Company logo and description
- Links organized in columns
- Social media icons
- Newsletter signup form
- Copyright text at bottom`
    },
    {
      title: "Loading Animation",
      prompt: `Create a loading spinner:
- Centered on page
- Smooth rotation animation
- Optional: progress percentage
- Use Tailwind animate-spin
- Customizable size and color`
    },
    {
      title: "FAQ Accordion",
      prompt: `Build an FAQ section:
- Questions that expand on click
- Plus/minus icon that rotates
- Smooth height animation
- Only one open at a time
- Clean borders and spacing`
    },
    {
      title: "Team Grid",
      prompt: `Create a team member grid:
- Photo, name, role for each person
- Social links on hover
- 2 columns mobile, 4 desktop
- Consistent card heights
- Subtle hover effects`
    },
    {
      title: "Video Background",
      prompt: `Add a video background section:
- Full-width video background
- Text overlay with dark gradient
- Muted, looping autoplay
- Fallback image for mobile
- Keep file size optimized`
    },
    {
      title: "Blog Post Card",
      prompt: `Design a blog post card:
- Featured image
- Title, excerpt, author
- Read time and date
- Category tag
- Hover state with shadow`
    },
    {
      title: "Modal Popup",
      prompt: `Create a modal component:
- Centered with backdrop
- Close button in corner
- Click outside to close
- Smooth fade in/out
- Scrollable content if needed`
    },
    {
      title: "Progress Bar",
      prompt: `Build an animated progress bar:
- Fills from 0 to specified percentage
- Percentage label
- Smooth animation on load
- Customizable colors
- Optional striped pattern`
    }
  ];

  useEffect(() => {
    setRandomDebugTip(debugCards[Math.floor(Math.random() * debugCards.length)]);
    setRandomPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(randomPrompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refreshDebugTip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshingDebug(true);
    const newTip = debugCards[Math.floor(Math.random() * debugCards.length)];
    setRandomDebugTip(newTip);
    setIsFlipped(false);
    setTimeout(() => setIsRefreshingDebug(false), 500);
  };

  const refreshPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshingPrompt(true);
    const newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setRandomPrompt(newPrompt);
    setTimeout(() => setIsRefreshingPrompt(false), 500);
  };

  return (
    <div className="min-h-screen">
      <div className="gradient-mesh gradient-mesh-home" />
      <div className="grain-overlay" />
      <Navigation />

      {/* Bento Grid Layout */}
      <section className="min-h-screen md:h-screen pt-20 pb-8 px-4 sm:px-6 md:px-8 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto w-full h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full md:h-[calc(100vh-160px)] md:[grid-template-rows:1fr_1fr]">

            {/* Row 1: 2 prominent blocks */}
            {/* Left block - Title */}
            <motion.div
              className="col-span-1 md:col-span-6 rounded-3xl bg-black text-white p-6 md:p-4 lg:p-6 flex flex-col justify-between relative overflow-hidden min-h-[350px] md:min-h-0 order-1 md:order-none group transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Fluid fire effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                {/* Base warm glow with animation */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-800/50 via-red-700/30 to-transparent animate-pulse" />

                {/* Large glowing orbs with enhanced movement */}
                <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-orange-600 rounded-full blur-[60px] animate-ember-glow opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-600 rounded-full blur-[50px] animate-ember-glow-slow opacity-50 group-hover:scale-125 transition-transform duration-1500" />
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-56 h-56 bg-yellow-600 rounded-full blur-[45px] animate-ember-glow-slower opacity-40 group-hover:scale-115 transition-transform duration-2000" />

                {/* Additional flickering flames */}
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-500 rounded-full blur-[40px] animate-ember-float opacity-30" />
                <div className="absolute bottom-5 right-10 w-48 h-48 bg-red-500 rounded-full blur-[35px] animate-spark-rise opacity-25" />

                {/* Inner heat glow with gradient animation */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center bottom, rgba(251, 146, 60, 0.35) 0%, rgba(220, 38, 38, 0.25) 50%, transparent 80%)',
                  animation: 'gradient-shift 8s ease infinite'
                }} />
              </div>

              {/* Original text that fades out on hover */}
              <div className="flex justify-between items-start relative z-10 transition-all duration-500 group-hover:opacity-0">
                <h1 className="text-7xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-none" style={{ letterSpacing: '-0.035em' }}>
                  Vibe
                </h1>
                <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-light uppercase leading-none" style={{ letterSpacing: '-0.02em' }}>
                  101
                </h2>
              </div>
              <h1 className="text-7xl sm:text-8xl md:text-[6rem] lg:text-[8rem] xl:text-[10.5rem] font-light leading-[0.8] relative z-10 transition-all duration-500 group-hover:opacity-0" style={{ letterSpacing: '-0.02em' }}>
                Coding
              </h1>

              {/* New text that appears on hover */}
              <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 p-6 md:p-8">
                <p className="text-[1.81rem] md:text-[1.73rem] lg:text-[2.06rem] font-light text-left leading-[1.15] text-white w-[75%] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out" style={{ letterSpacing: '-0.02em' }}>
                  For designers who want to get set up with Cursor and start making things
                </p>
              </div>
            </motion.div>

            {/* Right block - Animated Visual */}
            <motion.div
              className="col-span-1 md:col-span-6 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 relative min-h-[300px] md:min-h-0 order-2 md:order-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Video: video-vibe.mp4 */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/video-vibe.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* Row 2: All other content in one row */}
            {/* Stacked circles */}
            <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col justify-center gap-2 order-3 md:order-none">
              {/* Top circle - Bright Red Orange */}
              <motion.div
                className="rounded-full bg-[#FF4500] text-white flex items-center justify-center w-[48%] md:w-auto h-24 md:h-[47%] relative overflow-hidden group transition-all duration-500"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 360,
                  transition: {
                    scale: { duration: 0.3, ease: "easeOut" },
                    rotate: { duration: 0.8, ease: "easeInOut" }
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6347] to-[#FF5733] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                <Link href="/setup" className="w-full h-full flex items-center justify-center p-3 md:p-4 lg:p-6 relative z-10">
                  <span className="text-center text-lg sm:text-lg md:text-xl lg:text-2xl uppercase font-light leading-none">GET SET UP<br />WITH CURSOR</span>
                </Link>
              </motion.div>

              {/* Bottom circle - Pistachio Green */}
              <motion.div
                className="rounded-full bg-gradient-to-r from-[#93C572] to-[#A8D8A0] text-white flex items-center justify-center w-[48%] md:w-auto h-24 md:h-[47%] relative overflow-hidden group transition-all duration-500"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: -360,
                  transition: {
                    scale: { duration: 0.3, ease: "easeOut" },
                    rotate: { duration: 0.8, ease: "easeInOut" }
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6B7F6A] to-[#8FA68E] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                <Link href="/projects" className="w-full h-full flex items-center justify-center p-3 md:p-4 lg:p-6 relative z-10">
                  <span className="text-center text-lg sm:text-lg md:text-xl lg:text-2xl uppercase font-light leading-none">START A<br />PRACTICE<br />PROJECT</span>
                </Link>
              </motion.div>
            </div>

            {/* Grid visual video - moved to second position */}
            <motion.div
              className="col-span-1 md:col-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#F4D19B] to-[#F4C2A1] relative min-h-[350px] md:min-h-0 order-6 md:order-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/grid-visual.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* Sage green content block - flippable debug tip */}
            <div
              className="col-span-1 md:col-span-4 relative preserve-3d min-h-[300px] md:min-h-0 order-4 md:order-none"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <motion.div
                className="relative h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateY: isFlipped ? 180 : 0
                }}
                transition={{
                  opacity: { delay: 0.45, duration: 0.5 },
                  y: { delay: 0.45, duration: 0.5 },
                  rotateY: { duration: 0.6, type: "spring" }
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8FA68E] to-[#6B7F6A] text-white p-3 md:p-4 lg:p-6 flex flex-col cursor-pointer hover:shadow-lg transition-all backface-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs md:text-sm font-light uppercase">Debug</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={refreshDebugTip}
                        className="p-1 rounded hover:bg-white/20 transition-colors"
                        aria-label="Refresh debug tip"
                      >
                        <RefreshCw className={`w-3 h-3 md:w-4 md:h-4 text-white/70 hover:text-white transition-transform ${isRefreshingDebug ? 'animate-spin' : ''}`} />
                      </button>
                      <Link href="/debug" className="text-[10px] md:text-xs opacity-75 hover:opacity-100 transition-opacity uppercase" onClick={(e) => e.stopPropagation()}>
                        SEE ALL →
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-[1.81rem] md:text-[1.73rem] lg:text-[2.06rem] font-light leading-[1.15]">{randomDebugTip.bug}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80">
                    Click to see solution →
                  </p>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8FA68E]/90 to-[#6B7F6A]/90 text-white p-3 md:p-4 lg:p-6 flex flex-col cursor-pointer hover:shadow-lg transition-all"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden"
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs md:text-sm font-light uppercase">Solution</h3>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg leading-relaxed flex-grow overflow-y-auto">
                    {randomDebugTip.solution.split('\n').map((line, lineIndex) => {
                      const hasPrompt = line.includes('"') && line.includes('"');
                      if (hasPrompt) {
                        const promptMatch = line.match(/"([^"]+)"/);
                        if (promptMatch) {
                          return (
                            <div key={lineIndex} className="mb-2 w-full">
                              <div className="bg-white/20 rounded-lg p-2 border border-white/30 group relative w-full">
                                <p className="text-sm md:text-base font-mono pr-6 break-words">{promptMatch[1]}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(promptMatch[1]);
                                    setCopiedTip(true);
                                    setTimeout(() => setCopiedTip(false), 2000);
                                  }}
                                  className="absolute top-1 right-1 p-1 rounded hover:bg-white/20 transition-colors"
                                >
                                  {copiedTip ? (
                                    <Check className="w-3 h-3 text-white" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-white/70" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        }
                      }
                      return <p key={lineIndex} className="mb-1 text-sm md:text-base">{line}</p>;
                    })}
                  </div>
                  <p className="text-xs text-white/80 mt-2">
                    ← Click to flip back
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Prompt showcase - Beige Ivory */}
            <motion.div
              className="col-span-1 md:col-span-4 rounded-3xl bg-[#F5F0E8] text-black p-3 md:p-4 lg:p-6 flex flex-col relative overflow-hidden min-h-[250px] md:min-h-0 order-5 md:order-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Grain texture overlay */}
              <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '128px 128px'
                }} />
              </div>

              <div className="flex items-center justify-between mb-2 relative">
                <h3 className="text-xs md:text-sm font-light uppercase">Ready-to-Use Prompt</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={refreshPrompt}
                    className="p-1 rounded hover:bg-black/10 transition-colors"
                    aria-label="Refresh prompt"
                  >
                    <RefreshCw className={`w-3 h-3 md:w-4 md:h-4 text-black/70 hover:text-black transition-transform ${isRefreshingPrompt ? 'animate-spin' : ''}`} />
                  </button>
                  <Link href="/prompts" className="text-[10px] md:text-xs opacity-75 hover:opacity-100 transition-opacity uppercase">
                    SEE ALL →
                  </Link>
                </div>
              </div>
              <h4 className="text-sm md:text-base lg:text-lg font-light mb-3 relative">{randomPrompt.title}</h4>
              <div className="flex-1 relative">
                <div className="bg-black/5 border border-black/10 rounded-lg p-3 md:p-4 relative h-full">
                  <p className="text-[10px] md:text-xs font-mono text-black pr-8 overflow-y-auto max-h-24">
                    {randomPrompt.prompt}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1 rounded hover:bg-black/10 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-black" />
                    ) : (
                      <Copy className="w-3 h-3 md:w-4 md:h-4 text-black/70" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
