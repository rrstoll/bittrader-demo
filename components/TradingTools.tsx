"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  LineChart, 
  Zap, 
  Brain, 
  Smartphone, 
  Code, 
  PieChart 
} from "lucide-react";

const tradingTools = [
  {
    icon: LineChart,
    title: "Advanced Charts",
    description:
      "TradingView integration with 50+ technical indicators, multiple timeframes, and customizable layouts.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description:
      "Orders filled in milliseconds with our high-performance matching engine. Never miss a trading opportunity.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Brain,
    title: "AI Market Analysis",
    description:
      "Machine learning-powered insights, sentiment analysis, and automated trading signals based on market data.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Trading",
    description:
      "Full-featured iOS and Android apps with real-time notifications, biometric security, and touch ID.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Code,
    title: "API Access",
    description:
      "RESTful and WebSocket APIs for algorithmic trading. Build custom bots and automated strategies.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: PieChart,
    title: "Portfolio Tracking",
    description:
      "Real-time P&L tracking, performance analytics, tax reporting, and detailed transaction history.",
    color: "from-red-500 to-orange-500",
  },
];

const TradingTools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Trading Tools
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to trade Bitcoin like a pro. Advanced features
            for traders of all levels.
          </p>
        </motion.div>

        {/* Tools grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tradingTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} text-white mb-6 shadow-lg`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Want to see our trading platform in action?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-orange-600 font-semibold hover:underline"
          >
            Watch platform demo →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingTools;
