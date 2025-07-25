"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function ProjectsPage() {
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
            <h1 className="mb-2 uppercase" style={{ letterSpacing: '-0.01em' }}>
              Let's vibe
            </h1>
            <p className="text-black max-w-2xl">
              Choose a project to get started
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {/* Start Small Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/projects/small">
                <Card className="p-6 sm:p-8 h-full border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <Badge variant="secondary" className="text-xs font-medium uppercase tracking-wide bg-emerald-100 text-emerald-700 border-emerald-200">
                        Beginner Friendly
                      </Badge>
                    </div>

                    <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl">
                      Super Simple Page
                    </h2>

                    <p className="text-black mb-auto text-sm sm:text-base">
                      Practice building a landing page with Tailwind CSS and Framer Motion. Create a hero section, animated button, and feature cards.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm text-black">
                      <span>20-30 minutes</span>
                      <span className="hidden sm:inline">•</span>
                      <span>5 prompts</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Feeling Ambitious Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/projects/ambitious">
                <Card className="p-6 sm:p-8 h-full border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <Badge variant="secondary" className="text-xs font-medium uppercase tracking-wide bg-orange-100 text-orange-700 border-orange-200">
                        Beginner 2.0
                      </Badge>
                    </div>

                    <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl">
                      Responsive Portfolio Grid
                    </h2>

                    <p className="text-black mb-auto text-sm sm:text-base">
                      Practice building a responsive image grid with animations. Create a layout that adapts from 1 to 3 columns with hover effects.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm text-black">
                      <span>25-35 minutes</span>
                      <span className="hidden sm:inline">•</span>
                      <span>5 prompts</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* AI Fortune Teller Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/projects/fal-ai">
                <Card className="p-6 sm:p-8 h-full border-0 rounded-3xl bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <Badge variant="secondary" className="text-xs font-medium uppercase tracking-wide bg-purple-100 text-purple-700 border-purple-200">
                        Level Up
                      </Badge>
                    </div>

                    <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl">
                      AI fortune teller
                    </h2>

                    <p className="text-black mb-auto text-sm sm:text-base">
                      Create a mystical AI-powered fortune teller with glowing animations and magical UI. Connect to Fal.ai to generate personalized fortunes while learning API integration through themed prompts.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm text-black">
                      <span>30-40 minutes</span>
                      <span className="hidden sm:inline">•</span>
                      <span>5 prompts</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto"
          >
            <h3 className="mb-4">Need help choosing?</h3>
            <p className="text-black text-sm sm:text-base mb-2">
              Start with Super Simple Page if you're new! Looking for something different?
            </p>
            <p className="text-black text-sm sm:text-base">
              <Link href="/prompts" className="underline">Browse prompts</Link> to create your own practice project or <Link href="/debug" className="underline">learn debugging tips</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 