"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      {/* Outer Ripple Ring */}
      <motion.div
        className="absolute h-40 w-40 rounded-full border-2 border-blue-500/30"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Inner Gradient Loader */}
      <motion.div
        className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />

      {/* Company Text */}
      <motion.p
        className="mt-6 text-lg font-semibold text-gray-700 tracking-wide"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
