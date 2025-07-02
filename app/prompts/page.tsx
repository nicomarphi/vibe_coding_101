"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";

export default function PromptsPage() {
    const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedPrompt(id);
        setTimeout(() => setCopiedPrompt(null), 2000);
    };

    const generalTips = [
        {
            title: "Use ChatGPT or Claude as Your Product Manager",
            description: "For complex projects, use ChatGPT, Claude, or any AI chat to plan things out first. Ask it to help you break down your idea into features, create a project roadmap, or describe who will use your app and what they'll do. It's like having a product manager to organize your thoughts before you start coding.",
            example: "Try: 'I want to build a recipe sharing app. Can you help me plan out the key features and pages I'll need?'"
        },
        {
            title: "Start with the Structure",
            description: "Before diving into details, get Cursor to create the basic structure first. Create all your pages, components, and navigation. It's easier to fill in content when the skeleton is already there.",
            example: "Start with: 'Create the basic page structure for my app with Home, About, and Contact pages with navigation between them.'"
        },
        {
            title: "Copy Designs You Love",
            description: "See a website you like? Take a screenshot and ask Cursor to recreate something similar. You don't need to reinvent the wheel - remix what already works!",
            example: "Try: 'Create a hero section similar to this screenshot, but with my brand colors and content.'"
        },
        {
            title: "Be Clear, Not Casual",
            description: "Cursor understands plain language, but clear prompts get better results. Try to describe what you want as specifically as you can. Learning the right terms (like padding, margin, or contrast) helps Cursor understand you faster — and helps you get more out of it.",
            example: "Instead of 'Make it pop', try: 'Increase the font size and contrast, and add spacing around this section.'"
        },
        {
            title: "Iterate Quickly",
            description: "Your first result won't be perfect, and that's okay! Keep refining with follow-up prompts. Each iteration gets you closer to what you envision.",
            example: "Follow up with: 'Make the buttons bigger and the colors more vibrant.'"
        },
        {
            title: "Save Your Favorite Prompts",
            description: "When you find prompts that work well, save them! Build your own library of go-to prompts for common tasks. You'll get faster over time.",
            example: "Keep a note of prompts like your perfect button style or animation preferences."
        },
        {
            title: "When Do You Need a Backend?",
            description: "Frontend-only projects work great for static sites and simple portfolio sites (if they don't have a CMS). You'll need a backend when you want to: save user data, handle logins, process payments, send emails, connect to a database, or manage content through a CMS. Start simple with frontend-only projects, then explore backends when you need those features.",
            example: "Frontend only: Simple portfolio sites, landing pages, static blogs. Need backend: User accounts, e-commerce, social features, dynamic content, CMS-powered sites."
        },
        {
            title: "Watch & Learn",
            description: "Sometimes seeing is believing. Watch a quick demo of vibe coding in action to see how natural language prompts turn into real code.",
            isVideo: true,
            videoSrc: "/videos/video-vibe.mp4"
        }
    ];

    const promptCategories = [
        {
            title: "Getting Started",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            prompts: [
                {
                    id: "first-project",
                    title: "Start Your First Practice Project",
                    prompt: `Create a simple one-page website with:
- A centered hero section with a large headline that says "[Your headline text]"
- A subheading paragraph with "[Your description]"
- A primary button that says "[Your CTA text]" with [your color choice] background
- Use Tailwind CSS for all styling
- Center everything vertically and horizontally in the viewport
- Add smooth hover effects on the button
- Make it responsive for mobile devices`
                },
                {
                    id: "install-packages",
                    title: "Install Common Packages",
                    prompt: `Install and configure these essential packages for a modern Next.js project:
1. Tailwind CSS with all necessary config files
2. Framer Motion for animations
3. Lucide React for icons
4. clsx and tailwind-merge for className utilities

After installation:
- Set up the tailwind.config.js with custom colors if needed
- Configure globals.css with Tailwind directives
- Test that all packages are working by creating a simple animated component`
                },
                {
                    id: "basic-layout",
                    title: "Create a Basic Layout",
                    prompt: `Create a reusable layout structure for all pages:
- Navigation bar with logo on left and menu items: [Home, About, Services, Contact]
- The nav should be sticky and have a subtle shadow on scroll
- Footer with [your company name] and copyright year that updates automatically
- Main content area that stretches to fill space between nav and footer
- Add padding and max-width constraints for readability
- Style with [your preferred color scheme]
- Make everything responsive with mobile menu`
                }
            ]
        },
        {
            title: "Common Components",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            prompts: [
                {
                    id: "hero-section",
                    title: "Hero Section",
                    prompt: `Build a hero section component with:
- Large headline: "[Your main headline]" using [font size like text-6xl]
- Subheading: "[Your subheading text]" in a lighter color
- Two buttons side by side:
  - Primary: "[Primary CTA]" with [primary color] background
  - Secondary: "[Secondary CTA]" with outline style
- Background: [gradient/solid/image - specify your choice]
- On mobile: stack buttons vertically and reduce font sizes
- Add fade-in animation on page load
- Include optional image/graphic on the right side`
                },
                {
                    id: "card-grid",
                    title: "Card Grid",
                    prompt: `Create a responsive card grid component:
- Each card needs: image (use placeholder.com/300x200), title, description (2-3 lines), and a link
- Grid layout: 1 column mobile, 2 tablet (md:), 3 desktop (lg:)
- Card styling: [rounded-lg/rounded-xl] corners, white background, subtle shadow
- Hover effect: lift up slightly (transform: translateY(-4px)) with larger shadow
- Add transition-all duration-300 for smooth animations
- Gap between cards: gap-4
- Cards should have equal height in each row
- [Optional: Add category badges or pricing]`
                },
                {
                    id: "contact-form",
                    title: "Simple Contact Form",
                    prompt: `Build a contact form with these fields:
- Name field (required)
- Email field (required, with email validation)
- Message textarea (required, min 10 characters, 4 rows)
- Submit button with [your brand color]

Styling requirements:
- Center the form in a max-w-md container
- Add labels above each field
- Input styling: border-gray-300, rounded-md, focus:ring-2 focus:ring-[your color]
- Error states: red border and error message below field
- Success state: green checkmark and success message
- Disable button and show "Sending..." while submitting
- [Optional: Add phone number or subject field]`
                }
            ]
        },
        {
            title: "Styling & Design",
            color: "text-green-600",
            bgColor: "bg-green-50",
            prompts: [
                {
                    id: "gradient-bg",
                    title: "Gradient Backgrounds",
                    prompt: `Add a gradient background to [specify section/component]:
- Gradient direction: [to bottom right/radial/conic]
- Colors: from [start color like purple-400] via [middle color if needed] to [end color like blue-600]
- Add opacity if over content: [bg-opacity-90]
- For text readability: ensure contrast ratio is at least 4.5:1
- Consider adding a subtle pattern overlay or mesh gradient
- On dark gradients: use white text, on light: use gray-900
- [Optional: Add animated gradient that shifts slowly]`
                },
                {
                    id: "hover-effects",
                    title: "Button Hover Effects",
                    prompt: `Enhance all buttons with these hover effects:
- Scale: hover:scale-105 (slight grow)
- Shadow: hover:shadow-lg (elevated appearance)
- Color: hover:bg-[darker shade of current color]
- For outline buttons: hover:bg-[color] hover:text-white
- Transition: transition-all duration-200 ease-in-out
- Focus states: focus:outline-none focus:ring-2 focus:ring-[color] focus:ring-offset-2
- Active state: active:scale-95 (slight shrink on click)
- [Optional: Add gradient shift or border animation]`
                },
                {
                    id: "custom-font",
                    title: "Apply Custom Fonts",
                    prompt: `Set up custom typography using [Inter/Poppins/your font choice]:
1. Import from Google Fonts or use next/font/google
2. Set as default font in tailwind.config.js or globals.css
3. Font weights: 
   - Body text: 400 (normal)
   - Headings: 600-700 (semibold to bold)
   - Subheadings: 500 (medium)
4. Font sizes following scale: text-sm, text-base, text-lg, text-xl, text-2xl, etc.
5. Line height: relaxed for body text, tighter for headings
6. Add fallback fonts: ui-sans-serif, system-ui, sans-serif
7. [Optional: Add a secondary font for accents]`
                }
            ]
        },
        {
            title: "Making Things Move",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            prompts: [
                {
                    id: "fade-in",
                    title: "Fade In Animation",
                    prompt: `Add Framer Motion fade-in animation to [component name]:
- Import: motion from 'framer-motion'
- Wrap component in motion.div
- Initial state: { opacity: 0, y: 20 }
- Animate to: { opacity: 1, y: 0 }
- Transition: { duration: 0.5, ease: "easeOut" }
- [Optional: Add delay based on index for staggered effect]
- [Optional: Add viewport trigger with whileInView]
- Consider performance: use will-change-transform`
                },
                {
                    id: "stagger-items",
                    title: "Stagger List Items",
                    prompt: `Create staggered animation for [list/grid items]:
- Parent container variants:
  hidden: { opacity: 0 }
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
- Child item variants:
  hidden: { opacity: 0, y: 20 }
  visible: { opacity: 1, y: 0 }
- Add transition: { duration: 0.4, ease: "easeOut" }
- For grids: adjust stagger delay based on viewport
- [Optional: Add hover animations to individual items]
- [Optional: Reverse stagger on exit]`
                },
                {
                    id: "scroll-reveal",
                    title: "Scroll Animations",
                    prompt: `Add scroll-triggered animations to page sections:
- Use Framer Motion's whileInView prop
- Initial: { opacity: 0, scale: 0.95, y: 50 }
- WhileInView: { opacity: 1, scale: 1, y: 0 }
- Viewport settings: { once: true, amount: 0.3 }
- Transition: { duration: 0.6, ease: "easeOut" }
- Add different animations for different sections:
  - Fade up for text
  - Fade in from sides for images
  - Scale for feature cards
- [Optional: Add parallax effects for backgrounds]`
                }
            ]
        },
        {
            title: "Debugging Prompts",
            color: "text-red-600",
            bgColor: "bg-red-50",
            prompts: [
                {
                    id: "understand-issue",
                    title: "Understand What's Going Wrong",
                    prompt: `Please analyze this [component/page/feature] and:
1. Walk through the code execution step by step
2. Identify any potential issues or bugs
3. Explain what each part is supposed to do
4. Point out any missing dependencies or imports
5. Check for common issues like:
   - Undefined variables
   - Missing return statements
   - Incorrect prop types
   - Async/await problems
6. Suggest the most likely cause of [describe the specific issue]`
                },
                {
                    id: "check-layout",
                    title: "Check Layout Issues",
                    prompt: `Review this layout for responsive design issues:
1. Check if flexbox/grid is used correctly
2. Verify mobile breakpoints (sm:, md:, lg:)
3. Look for:
   - Fixed widths that might break on mobile
   - Missing flex-wrap properties
   - Overflow issues with long text
   - Images without responsive sizing
4. Test with different content lengths
5. Ensure proper spacing/padding on all screen sizes
6. Fix any [specific issue you're seeing]`
                },
                {
                    id: "simplify-code",
                    title: "Simplify Complex Code",
                    prompt: `Refactor this code to be cleaner and more maintainable:
1. Extract repeated code into reusable components/functions
2. Simplify complex conditionals
3. Remove unnecessary state variables
4. Combine similar useEffects
5. Use proper naming conventions
6. Add helpful comments only where needed
7. Consider using:
   - Custom hooks for logic
   - Utility functions for calculations
   - Constants for magic numbers
8. Keep the same functionality but make it [easier to read/more performant/more reusable]`
                },
                {
                    id: "component-not-updating",
                    title: "Component Not Updating",
                    prompt: `I made changes to this [component/page] but the browser isn't showing the updates:
1. Check if the development server is still running
2. Look for any syntax errors in the terminal
3. Verify the file was saved (check for unsaved dot in tab)
4. Check if I'm editing the right file (maybe there are duplicates?)
5. Clear browser cache and hard refresh (Cmd+Shift+R)
6. Check if the component is actually being imported and used
7. Look for any conditional rendering that might be hiding it
8. If using state, verify it's updating correctly

Show me what might be preventing my changes from appearing.`
                }
            ]
        },
        {
            title: "Terminal Tips",
            color: "text-teal-600",
            bgColor: "bg-teal-50",
            prompts: [
                {
                    id: "run-site",
                    title: "How do I view my site locally?",
                    prompt: `Navigate to your project folder and run:

npm run dev

Then open your browser to http://localhost:3000.

Make sure you're in the right folder (vibe_101) when you run this.`
                },
                {
                    id: "install-prompt",
                    title: "It's asking me to install something in the terminal?",
                    prompt: `Sometimes, Cursor will generate code that includes new packages. When that happens, run:

npm install

This installs any missing dependencies.`
                },
                {
                    id: "npm-run-dev-not-working",
                    title: "What if npm run dev doesn't work?",
                    prompt: `Make sure you've installed everything with:

npm install

Then try again. If that still doesn't work, open the Debug page for common fixes or try prompting Cursor with:

"Why won't my site run when I use npm run dev? Can you fix the root issue?"`
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="gradient-mesh gradient-mesh-prompts" />
            <div className="grain-overlay" />
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-6 px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl"
                    >
                        <h1 className="mb-2" style={{ letterSpacing: '-0.04em' }}>
                            Vibe coding tips
                        </h1>
                        <p className="text-xl text-black max-w-2xl">
                            Level up your Cursor game with these tips, tricks, and ready-to-use prompts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* General Tips Section */}
            <section className="py-6 px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {generalTips.map((tip, index) => (
                                <motion.div
                                    key={tip.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={tip.isVideo ? "lg:col-span-2" : ""}
                                >
                                    {tip.isVideo ? (
                                        <Card className="h-full border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden relative">
                                            <video
                                                className="absolute inset-0 w-full h-full object-cover"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            >
                                                <source src={tip.videoSrc} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </Card>
                                    ) : (
                                        <Card className="p-6 h-full border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all">
                                            <h3 className="text-3xl font-light mb-4">{tip.title}</h3>
                                            <p className="text-black text-sm mb-3">{tip.description}</p>
                                            {tip.example && (
                                                <p className="text-xs text-black italic">
                                                    {tip.example}
                                                </p>
                                            )}
                                        </Card>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Prompts Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className="mb-8" style={{ letterSpacing: '-0.04em' }}>Copy & paste prompts</h1>
                        <p className="text-black mb-12 max-w-3xl">
                            Battle-tested prompts to help you build faster. Copy, paste, and customize them for your project.
                        </p>

                        {promptCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: categoryIndex * 0.1 + 0.3, duration: 0.5 }}
                                className="mb-16"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-8">
                                    <h3 className="text-2xl font-light">{category.title}</h3>
                                </div>

                                {/* Prompts Grid */}
                                <div className="grid md:grid-cols-2 gap-2">
                                    {category.prompts.map((prompt, promptIndex) => (
                                        <motion.div
                                            key={prompt.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: categoryIndex * 0.1 + promptIndex * 0.05 + 0.3 }}
                                        >
                                            <Card className="p-8 h-full border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all">
                                                <h4 className="text-3xl font-light mb-6">{prompt.title}</h4>
                                                <div className={`rounded-lg p-6 ${category.bgColor} border border-gray-100 relative group max-h-64 overflow-y-auto`}>
                                                    <p className="text-sm font-mono text-black pr-10 whitespace-pre-line">
                                                        {prompt.prompt}
                                                    </p>
                                                    <button
                                                        onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                                                        className="absolute top-4 right-4 p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        {copiedPrompt === prompt.id ? (
                                                            <Check className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-5 h-5 text-black" />
                                                        )}
                                                    </button>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bonus Resource Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-16"
                    >
                        <Card className="p-8 border-0 rounded-3xl bg-white shadow-sm">
                            <h2 className="text-2xl font-light mb-4">Bonus Resource</h2>
                            <div className="space-y-3">
                                <p className="text-black">
                                    Looking for ready-made components to remix and customize?
                                </p>
                                <div className="flex items-start gap-4">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">
                                            <a
                                                href="https://21st.dev/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                21st.dev
                                            </a>
                                        </h3>
                                        <p className="text-black text-sm">
                                            Discover, share & remix the best UI components. Built by design engineers, loved by vibe coders.
                                            Works great with Cursor and other AI coding assistants.
                                        </p>
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