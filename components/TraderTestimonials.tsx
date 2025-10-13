"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, TrendingUp } from "lucide-react";

interface TraderTestimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  profit: string;
  tradingStyle: string;
}

const traderTestimonials: TraderTestimonial[] = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Day Trader",
    location: "Singapore",
    content:
      "The execution speed is incredible. I've been trading Bitcoin for 3 years and BitTrader has the fastest order fills I've experienced. The advanced charts and real-time data have helped me increase my win rate by 15%.",
    rating: 5,
    avatar: "MC",
    profit: "+$47K in 6 months",
    tradingStyle: "Scalping & Day Trading",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Swing Trader",
    location: "London, UK",
    content:
      "As a part-time trader, I needed a platform I could trust. BitTrader's mobile app is fantastic - I can manage positions on the go. The AI signals have been surprisingly accurate, and customer support is always helpful.",
    rating: 5,
    avatar: "SW",
    profit: "+$23K in 4 months",
    tradingStyle: "Swing Trading",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Crypto Fund Manager",
    location: "Miami, FL",
    content:
      "Managing a $5M crypto fund requires institutional-grade tools. BitTrader's API is robust, the OTC desk is professional, and our account manager is excellent. The low fees make a huge difference at our volume.",
    rating: 5,
    avatar: "DR",
    profit: "+$890K in 12 months",
    tradingStyle: "Institutional Trading",
  },
  {
    id: 4,
    name: "Emma Thompson",
    role: "Beginner Trader",
    location: "Toronto, Canada",
    content:
      "I started with zero trading experience 3 months ago. The educational resources and demo account helped me learn risk-free. Now I'm consistently profitable with small positions. The interface is intuitive and not overwhelming.",
    rating: 5,
    avatar: "ET",
    profit: "+$3.2K in 3 months",
    tradingStyle: "Conservative Position Trading",
  },
  {
    id: 5,
    name: "James Park",
    role: "Algorithmic Trader",
    location: "Seoul, South Korea",
    content:
      "The API documentation is excellent and the WebSocket feed is reliable. I run 5 trading bots 24/7 without any issues. The low latency and high uptime are crucial for my strategies. Highly recommend for algo traders.",
    rating: 5,
    avatar: "JP",
    profit: "+$156K in 8 months",
    tradingStyle: "Automated Trading",
  },
];

const TraderTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % traderTestimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + traderTestimonials.length) % traderTestimonials.length
    );
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      id="testimonials"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Traders Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real traders, real results. See how BitTrader has helped thousands
            achieve their trading goals.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                style={{ x, opacity }}
                className="absolute w-full max-w-4xl cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-100">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-1 mb-6"
                  >
                    {Array.from({ length: traderTestimonials[currentIndex].rating }).map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <Star
                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                          />
                        </motion.div>
                      )
                    )}
                  </motion.div>

                  {/* Trading Stats Badges */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {traderTestimonials[currentIndex].profit}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium"
                    >
                      {traderTestimonials[currentIndex].tradingStyle}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
                  >
                    &ldquo;{traderTestimonials[currentIndex].content}&rdquo;
                  </motion.p>

                  {/* Author Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg"
                    >
                      {traderTestimonials[currentIndex].avatar}
                    </motion.div>

                    {/* Details */}
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {traderTestimonials[currentIndex].name}
                      </p>
                      <p className="text-gray-600">
                        {traderTestimonials[currentIndex].role} •{" "}
                        {traderTestimonials[currentIndex].location}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {traderTestimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-orange-600 dark:bg-orange-400 w-8"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Auto-play indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-sm text-gray-500 dark:text-gray-500"
          >
            {isAutoPlaying ? (
              <span>Auto-playing • Hover to pause</span>
            ) : (
              <span>Paused • Move away to resume</span>
            )}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: "500K+", label: "Active traders" },
            { value: "4.9/5", label: "Average rating" },
            { value: "99.9%", label: "Uptime guarantee" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TraderTestimonials;
