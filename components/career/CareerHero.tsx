"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CareerHero() {
  return (
    <>
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-bg-primary py-20 mt-16 px-6 md:px-10 lg:px-20 text-center"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl md:text-5xl font-semibold text-gray-900"
        >
          Join Our Team and Shape the Future
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-neutral-600 max-w-3xl mx-auto mt-4 leading-relaxed"
        >
          At Akdenar Labs, we believe innovation starts with people. We’re always
          looking for passionate minds, creative thinkers, and problem-solvers who
          want to make an impact in the digital world. Join a team that values
          growth, collaboration, and excellence—where your ideas matter, your skills
          are nurtured, and your work helps shape the future of technology. Together,
          let’s build solutions that transform industries worldwide.
        </motion.p>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-20 w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{ height: "400px" }}
        >
          <Image
            src="/career.jpg"
            width={1000}
            height={400}
            alt="career hero image"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </motion.section>

      {/* PERKS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-bg-primary py-5 px-6 md:px-10 lg:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl"
          >
            <div className="relative w-full h-[300px] md:h-[350px] lg:h-[380px]">
              <Image
                src="/career/img.png"
                alt="Perks Icons"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Badge */}
            <span className="px-4 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-xs font-medium">
              Perks
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
              Perks That Go Beyond <br /> Borders
            </h2>

            {/* Description */}
            <p className="mt-4 text-neutral-600 leading-relaxed max-w-xl">
              “Experience a world of benefits with our global presence. Enjoy
              flexible work environments, cultural diversity, professional
              development opportunities, travel adventures, global networking,
              and competitive compensation.”
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
