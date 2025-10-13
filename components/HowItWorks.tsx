"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, CreditCard, TrendingUp, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Sign up in under 2 minutes with just your email. Complete KYC verification to unlock full trading features.",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Fund Your Account",
    description:
      "Deposit via bank transfer, debit card, or crypto. Funds available instantly for most payment methods.",
    icon: CreditCard,
    color: "from-orange-500 to-yellow-500",
  },
  {
    number: "03",
    title: "Start Trading",
    description:
      "Execute your first Bitcoin trade with our intuitive interface. Set stop-losses, take-profits, and more.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Start Trading in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with Bitcoin trading in minutes. No prior experience
            required.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-2 sm:-left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                        }
                        transition={{ delay: 0.5 + index * 0.2 }}
                        className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 text-orange-400"
                      >
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
          >
            Create Free Account
          </motion.button>
          <p className="mt-4 text-gray-600">
            No credit card required • Start with $10 • Withdraw anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
