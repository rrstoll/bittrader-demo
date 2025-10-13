"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradingTier {
  name: string;
  description: string;
  monthlyFee: number;
  tradingFee: string;
  features: string[];
  popular?: boolean;
  cta: string;
  badge?: string;
}

const tradingTiers: TradingTier[] = [
  {
    name: "Basic",
    description: "Perfect for beginners getting started",
    monthlyFee: 0,
    tradingFee: "0.5%",
    features: [
      "Basic charting tools",
      "Market & limit orders",
      "Mobile app access",
      "Email support",
      "Withdrawal limit: $10K/day",
    ],
    cta: "Get Started Free",
    badge: "Free Forever",
  },
  {
    name: "Pro",
    description: "For active traders seeking an edge",
    monthlyFee: 29,
    tradingFee: "0.25%",
    popular: true,
    features: [
      "Advanced TradingView charts",
      "All order types",
      "Priority execution",
      "API access",
      "Priority support (24/7)",
      "Withdrawal limit: $50K/day",
      "Advanced analytics",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Institutional",
    description: "Custom solutions for high-volume traders",
    monthlyFee: 0,
    tradingFee: "0.1%",
    features: [
      "White-glove onboarding",
      "Dedicated account manager",
      "Custom API limits",
      "OTC trading desk",
      "Unlimited withdrawals",
      "Custom integrations",
      "Tax reporting tools",
      "Institutional custody",
    ],
    cta: "Contact Sales",
    badge: "Custom Pricing",
  },
];

const TradingTiers = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Trading Tier
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Lower fees, better tools, and premium support as you grow. No long-term
            commitments.
          </p>

          {/* Fee Comparison Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            All tiers include instant deposits & withdrawals
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {tradingTiers.map((tier, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered =
              hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={cn(
                  "relative p-8 rounded-2xl border-2 transition-all duration-300 bg-white",
                  tier.popular
                    ? "border-orange-500 shadow-2xl shadow-orange-500/20 scale-105"
                    : "border-gray-200 hover:border-orange-300 hover:shadow-xl",
                  isOtherHovered && "opacity-60 scale-95"
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </span>
                  </motion.div>
                )}

                {/* Badge */}
                {tier.badge && !tier.popular && (
                  <div className="absolute -top-3 right-4">
                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${tier.monthlyFee}
                    </span>
                    {tier.monthlyFee > 0 && (
                      <span className="text-gray-600 font-medium">
                        /month
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Trading Fee:
                    </span>
                    <span className="text-xl font-bold text-orange-600">
                      {tier.tradingFee}
                    </span>
                    <span className="text-sm text-gray-500">
                      per trade
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-8",
                    tier.popular
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg hover:shadow-orange-500/50"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  )}
                >
                  {tier.cta}
                </motion.button>

                {/* Features List */}
                <motion.ul className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -10 }
                      }
                      transition={{
                        delay: 0.4 + index * 0.1 + featureIndex * 0.05,
                        duration: 0.3,
                      }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                          tier.popular
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </motion.div>
                      <span className="text-gray-700">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Hover Glow Effect */}
                {isHovered && (
                  <motion.div
                    layoutId="pricing-glow"
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Fee Calculator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Calculate Your Potential Savings
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            Pro traders save an average of $2,400/year on trading fees. See how
            much you could save.
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Open Fee Calculator
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            All plans include instant deposits, 24/7 trading, and bank-level security.
            <br />
            <a href="#" className="text-orange-600 hover:underline">
              Compare all features →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingTiers;
