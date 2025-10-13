"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const NewsletterForm = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 h-12"></div>
        <div className="px-6 py-3 bg-gray-600 rounded-lg h-12 w-24"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" suppressHydrationWarning>
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none placeholder-gray-400"
        suppressHydrationWarning
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2"
        suppressHydrationWarning
      >
        Subscribe
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default NewsletterForm;
