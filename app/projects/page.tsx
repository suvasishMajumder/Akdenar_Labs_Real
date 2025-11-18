'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import Footer from "@/components/home/Footer";

export default function Page() {
  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % projects.length);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <>
      <section className="w-full py-20 mt-10 px-6 md:px-10 lg:px-20">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl  tracking-tight text-gray-900 mb-3">
          From our Latest Projects
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore our recent innovations where creativity meets technology — delivering impactful digital solutions that drive growth, enhance user experience, and set new industry standards.
        </p>
        {/* Card Container */}
        <div className="bg-white border border-[#e6e9ff] rounded-3xl shadow-sm p-6 md:p-10 ">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >

              {/* LEFT IMAGE */}
              <div className="relative w-full h-[260px] md:h-[350px] rounded-xl overflow-hidden border">
                <Image
                  src={projects[index].image}
                  alt={projects[index].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="space-y-4">
                {/* Tag */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-xs font-medium">
                  {projects[index].tag}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {projects[index].title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  {projects[index].description}
                </p>

                {/* Read More Link */}
                <div className="pt-2">
                  <a
                    href={projects[index].link}
                    className="text-sm font-medium text-[#7F56D9] hover:underline inline-block"
                  >
                    Read more →
                  </a>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-6">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-gray-50 transition"
                    aria-label="Previous project"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-[#7F56D9] text-white flex items-center justify-center hover:bg-[#6b45cc] transition"
                    aria-label="Next project"
                  >
                    →
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          {projects.map((project, index) =>
            <ProjectCard key={index} project={project} index={index} />
          )}

        </div>
      </section >
      <Footer />
    </>
  );
}
