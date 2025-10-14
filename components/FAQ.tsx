"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I deposit funds into my account?",
    answer:
      "You can deposit funds via bank transfer (ACH/wire), debit card, or cryptocurrency transfer. Bank transfers typically take 1-3 business days, while debit card deposits are instant. Crypto deposits are credited after network confirmations (typically 10-30 minutes for Bitcoin).",
    category: "Getting Started",
  },
  {
    question: "What are your trading fees?",
    answer:
      "Trading fees vary by tier: Basic accounts pay 0.5% per trade, Pro accounts pay 0.25%, and Institutional accounts pay 0.1%. There are no deposit fees, and withdrawal fees are minimal (0.0005 BTC for crypto withdrawals, $0 for bank transfers over $100).",
    category: "Fees",
  },
  {
    question: "Is my Bitcoin secure on BitTrader?",
    answer:
      "Yes. 95% of customer funds are stored in cold storage (offline), and the remaining 5% in hot wallets are insured. We use bank-level 256-bit encryption, 2FA authentication, and are SOC 2 Type II certified. Your account is also protected by our insurance fund.",
    category: "Security",
  },
  {
    question: "Can I withdraw my Bitcoin anytime?",
    answer:
      "Yes, you can withdraw your Bitcoin or cash anytime. Crypto withdrawals are processed within 1 hour during business hours. Bank withdrawals typically take 1-3 business days. There are no lock-up periods or withdrawal restrictions (subject to daily limits based on your account tier).",
    category: "Withdrawals",
  },
  {
    question: "Do you support automated/algorithmic trading?",
    answer:
      "Yes! Pro and Institutional accounts have full API access with REST and WebSocket support. You can build custom trading bots, integrate with TradingView alerts, or use third-party algorithmic trading platforms. We provide comprehensive API documentation and code examples.",
    category: "Features",
  },
  {
    question: "What order types do you support?",
    answer:
      "We support market orders, limit orders, stop-loss orders, stop-limit orders, trailing stops, and OCO (one-cancels-other) orders. Pro accounts also have access to advanced order types like iceberg orders and time-weighted orders.",
    category: "Trading",
  },
  {
    question: "How do I upgrade or downgrade my account tier?",
    answer:
      "You can change your account tier anytime in your account settings. Upgrades take effect immediately. Downgrades take effect at the end of your current billing cycle. There are no fees for changing tiers, and you can switch as often as needed.",
    category: "Account",
  },
  {
    question: "Do you offer a demo account?",
    answer:
      "Yes! All new users get access to a demo account with $100,000 in virtual funds. The demo account uses real market data and is perfect for learning our platform, testing strategies, or practicing without risk. Demo accounts never expire.",
    category: "Getting Started",
  },
  {
    question: "What countries do you support?",
    answer:
      "BitTrader is available in 150+ countries worldwide. We currently don&apos;t operate in the United States due to regulatory requirements, but we support most other jurisdictions. Check our country availability page for the complete list.",
    category: "Account",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Basic accounts have email support (response within 24 hours). Pro accounts get priority email and live chat support (response within 4 hours). Institutional accounts have 24/7 phone support and a dedicated account manager. You can also access our help center and community forum anytime.",
    category: "Support",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      id="faq"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-white mb-6"
          >
            <HelpCircle className="w-8 h-8" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about trading Bitcoin on BitTrader. Can&apos;t
            find your answer?{" "}
            <a
              href="#"
              className="text-orange-600 dark:text-orange-400 hover:underline"
            >
              Contact our 24/7 support team
            </a>
            .
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-orange-500 dark:border-orange-600 shadow-lg shadow-orange-500/10"
                    : "border-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={cn(
                    "w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 transition-colors",
                    isOpen 
                      ? "bg-white" 
                      : "bg-white hover:bg-gray-50 dark:hover:bg-gray-750"
                  )}
                >
                  <div className="flex-1">
                    {/* Category Badge */}
                    {faq.category && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isOpen ? { opacity: 1, scale: 1 } : {}}
                        className="inline-block px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full mb-3"
                      >
                        {faq.category}
                      </motion.span>
                    )}

                    <h3
                      className={cn(
                        "text-lg sm:text-xl font-semibold transition-colors",
                        isOpen
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-gray-900"
                      )}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      isOpen
                        ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.3,
                          },
                          opacity: {
                            duration: 0.25,
                            delay: 0.1,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 sm:px-8 pb-6 sm:pb-8 bg-white"
                      >
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Start Trading?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join 500,000+ traders who trust BitTrader for their Bitcoin trading.
            Create your free account in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Create Free Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-200 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
            >
              Try Demo Account
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
