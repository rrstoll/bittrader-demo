"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import ThreeBackground from "./ThreeBackground";

const Hero = () => {
  const [btcPrice, setBtcPrice] = useState(67234.56);
  const [priceChange, setPriceChange] = useState(2.34);

  // Simulate live Bitcoin price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100;
      setBtcPrice((prev) => prev + change);
      setPriceChange((Math.random() - 0.5) * 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 pb-20 md:pt-10 px-4 sm:px-6 lg:px-8">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Fallback Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated background */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        
        {/* Video section removed - using 3D background instead */}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto text-center relative z-20"
      >
        {/* Live BTC Price Ticker */}
        <motion.div 
          variants={itemVariants} 
          className="mb-8 inline-flex"
        >
          <motion.div
            animate={{ 
              boxShadow: priceChange >= 0 
                ? "0 0 20px rgba(34, 197, 94, 0.5)" 
                : "0 0 20px rgba(239, 68, 68, 0.5)"
            }}
            className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-white font-semibold">BTC/USD</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <motion.span 
                key={btcPrice}
                initial={{ scale: 1.2, color: priceChange >= 0 ? "#22c55e" : "#ef4444" }}
                animate={{ scale: 1, color: "#ffffff" }}
                className="text-2xl font-bold text-white"
              >
                ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.span>
              <span className={`text-sm font-semibold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white px-[1.5rem] sm:px-0 mb-6 drop-shadow-2xl"
        >
          Trade Bitcoin with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
            Confidence
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-200 px-[1.5rem] sm:px-0 mb-12 max-w-3xl mx-auto drop-shadow-lg"
        >
          Professional trading tools, institutional-grade security, and
          lightning-fast execution. Start trading in minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold text-lg shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 transition-all flex items-center gap-2"
          >
            Start Trading Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
          >
            View Live Markets
          </motion.button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Zap, text: "Instant Execution", color: "from-blue-500 to-cyan-500" },
            { icon: Shield, text: "Bank-Level Security", color: "from-green-500 to-emerald-500" },
            { icon: TrendingUp, text: "Advanced Analytics", color: "from-purple-500 to-pink-500" },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{feature.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">$2.5B+</span>
            <span>Trading Volume</span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">500K+</span>
            <span>Active Traders</span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">24/7</span>
            <span>Support & Trading</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
