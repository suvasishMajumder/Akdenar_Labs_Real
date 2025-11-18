"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ServiceCarousel() {
    const slides = [
        {
            pill: "Services",
            title: "Web & App Development",
            description:
                "We build fast, scalable, and high-performance web and mobile applications using modern full-stack technologies. From MVPs to enterprise-grade systems, our apps deliver smooth user experiences, secure architectures, and measurable business growth.",
            image: "/home/webTool.svg",
        },
        {
            pill: "Services",
            title: "Cloud & DevOps",
            description:
                "We automate, scale, and optimize your infrastructure with AWS, Azure, and GCP. Using CI/CD, Docker, Kubernetes, and monitoring systems, we ensure faster deployments, high availability, and efficient cloud operations.",
            image: "/home/cloudTool.png",
        },
        {
            pill: "Services",
            title: "UI/UX & Branding",
            description:
                "We craft clean, modern, and user-centric UI/UX designs backed by user research and scalable design systems. Your product becomes intuitive, visually appealing, and brand-consistent.",
            image: "/home/uiuxTool.png",
        },
        {
            pill: "Services",
            title: "AI & Automation",
            description:
                "We build intelligent automation workflows and AI-powered solutions using LLMs, NLP, and machine learning. Our systems reduce manual work, improve efficiency, and enable smart data-driven decision-making.",
            image: "/home/aiTool.png",
        },
        {
            pill: "Services",
            title: "Digital Marketing & SEO",
            description:
                "We grow businesses with data-driven digital marketing, performance campaigns, and advanced SEO. From organic content strategy to paid ads, we help brands boost reach, engagement, and conversions.",
            image: "/home/seoTool.png",
        },
        {
            pill: "Services",
            title: "Video Editing & Animation",
            description:
                "We produce high-quality videos, motion graphics, and 2D/3D animations that engage audiences and enhance brand communication. From reels to full product videos, we deliver cinematic storytelling.",
            image: "/home/editing.png",
        },
        {
            pill: "Services",
            title: "QA & Testing",
            description:
                "We ensure flawless product performance with manual, automated, functional, and load testing. Our QA processes guarantee reliability, high usability, and bug-free product releases.",
            image: "/home/testingTool.png",
        },
        {
            pill: "Services",
            title: "Graphic Designing",
            description:
                "We design visually compelling graphics, branding kits, marketing creatives, social media designs, and promotional visuals that strengthen your brand identity across platforms.",
            image: "/home/graphicTool.png",
        },
        {
            pill: "Services",
            title: "Content Writing",
            description:
                "We deliver SEO-optimized, research-based content that improves brand communication and boosts search rankings. From blogs to landing pages, we craft content that converts and engages.",
            image: "/home/contentWritingTool.png",
        },
    ];


    const [index, setIndex] = useState(0);

    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <motion.section
            className="w-full py-10 px-6 md:px-10 lg:px-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // 👈 triggers only when visible
        >
            <div className="bg-white border border-box-border rounded-3xl shadow-sm p-6 md:px-16">
                <div className="relative overflow-hidden">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                        >
                            {/* LEFT SIDE */}
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                                    {slides[index].pill}
                                </span>

                                <h2 className="text-3xl md:text-4xl font-semibold text-[#3C3C3C]">
                                    {slides[index].title}
                                </h2>

                                <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                                    {slides[index].description}
                                </p>

                                {/* Buttons */}
                                <div className="flex items-center gap-3 pt-4">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 rounded-full bg-[#7F56D9] text-white flex items-center justify-center hover:bg-[#6a4bcb] transition"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT SIDE IMAGE */}
                            <div className="flex justify-center md:justify-end">
                                <div className="relative w-[240px] md:w-[400px] h-[240px] md:h-[350px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={slides[index].image}
                                        alt={slides[index].title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>
        </motion.section>
    );
}
