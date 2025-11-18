"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { jobs } from "@/data/jobs";

export default function CareersSection() {
  const router = useRouter();
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-bg-primary py-10 px-6 md:px-10 lg:px-24 text-center"
    >
      {/* Small Badge */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium"
      >
        Careers
      </motion.span>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-5xl mt-4 font-semibold text-gray-900"
      >
        New job opportunities
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-neutral-600 mt-3 max-w-2xl mx-auto"
      >
        Browse through vacancies, internships and job postings at FutureSphere
      </motion.p>

      {/* Job List */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="mt-12 space-y-5 max-w-5xl mx-auto"
      >
        {jobs.map((job, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            onClick={() => router.push(job.link)}
            whileHover={{ y: -6, boxShadow: "0 10px 24px rgba(127,86,217,0.15)" }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-6 
                       flex justify-between items-center cursor-pointer 
                       hover:border-[#D9CEFF] transition-all duration-300"
          >
            {/* Left Side */}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>

              <p className="text-sm text-gray-500 mt-1">
                {job.type} —{" "}
                <span className="text-[#7F56D9] font-medium">{job.location}</span>
              </p>

              <p className="text-gray-600 text-sm mt-2 max-w-2xl leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Right Side Arrow */}
            <motion.button
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 flex items-center justify-center rounded-full 
                         border border-[#E0D9FF] text-[#7F56D9] 
                         hover:bg-[#F4F0FF] transition"
            >
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
