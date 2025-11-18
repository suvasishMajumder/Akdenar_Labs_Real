"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const industries = [
  {
    title: "E-Commerce",
    img: "/industries/e-commerce.png",
    color: "bg-[#D7EDEB]",
  },
  {
    title: "FinTech",
    img: "/industries/fintech.png",
    color: "bg-[#A4D4DC]",
  },
  {
    title: "Healthcare",
    img: "/industries/healthcare.png",
    color: "bg-[#5CC6D0]",
  },
  {
    title: "Real Estate",
    img: "/industries/realstate.png",
    color: "bg-[#C0E4F7]",
  },
  {
    title: "AI & Automation",
    img: "/industries/ai.png",
    color: "bg-[#F7E18C]",
  },
  {
    title: "EdTech",
    img: "/industries/edtech.png",
    color: "bg-[#F3C2C0]",
  },
];

export default function Industries() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="w-full py-10 px-6 md:px-10 lg:px-20 z-40"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Heading */}
      <motion.div className="text-center mb-10" variants={cardVariants}>
        <h2 className="text-4xl font-bold">Our Industry Expertise</h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          We deliver end-to-end digital solutions tailored to transform industries with
          modern technology, automation, and innovation.
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="w-full max-w-7xl mx-auto py-10"
        variants={containerVariants}
      >
        <div className="grid grid-cols-3 gap-1">

          {/* Row 1 */}
          {[
            {
              title: "Banking & Financial Services",
              bg: "bg-[#BEE3F9]",
              img: "/industries/banking.png",
              bottom: true,
            },
            {
              title: "Insurance",
              bg: "bg-[#FBD38D]",
              img: "/industries/insurance.png",
            },
            {
              title: "Healthcare",
              bg: "bg-[#FEB2B2]",
              img: "/industries/healthcare.png",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`col-span-1 flex md:justify-between flex-col-reverse md:flex-row h-52 md:h-64 ${item.bg} relative`}
              variants={cardVariants}
            >
              <img
                src={item.img}
                className="absolute right-0 bottom-0 md:h-full object-contain"
              />
              <div className="absolute left-4 md:bottom-4 top-3 md:top-auto text-white font-bold">
                {item.title}
              </div>
            </motion.div>
          ))}

          {/* Row 2 */}
          {[
            {
              title: "Fin Tech",
              bg: "bg-[#C6F6D5]",
              img: "/industries/fin-tech.png",
            },
            {
              title: "E Commerce",
              bg: "bg-[#FAF089]",
              img: "/industries/e-commerce.png",
            },
            {
              title: "Software & Hi-Tech",
              bg: "bg-[#D6BCFA]",
              img: "/industries/software.png",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`col-span-1 flex md:justify-between flex-col-reverse md:flex-row h-52 md:h-64 ${item.bg} relative`}
              variants={cardVariants}
            >
              <img
                src={item.img}
                className="absolute right-0 bottom-0 md:h-full object-contain"
              />
              <div className="absolute left-4 md:bottom-4 top-3 md:top-auto text-white font-bold">
                {item.title}
              </div>
            </motion.div>
          ))}

          {/* Row 3 */}
          <motion.div
            className="col-span-1 flex md:justify-between flex-col-reverse md:flex-row h-56 md:h-64 bg-[#90CDF4] relative"
            variants={cardVariants}
          >
            <img
              src="/industries/telecom.png"
              className="absolute right-0 md:h-full object-contain"
            />
            <div className="absolute left-4 top-3 md:top-auto md:bottom-4 text-white font-bold">
              Telecom & Media
            </div>
          </motion.div>

          <motion.div
            className="col-span-2 flex md:justify-between flex-col-reverse md:flex-row h-56 md:h-64 bg-[#FBB6CE] relative overflow-hidden"
            variants={cardVariants}
          >
            <img
              src="/industries/consumer.png"
              className="absolute right-0 -bottom-10 md:h-full object-contain"
            />
            <div className="absolute left-4 md:bottom-4 top-3 md:top-auto text-white font-bold">
              Consumer Tech
            </div>
          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}
