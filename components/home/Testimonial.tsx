"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        image: "/home/testimonial1.svg",
        text: "I am incredibly impressed with the transformative technology solutions provided by FutureSphere. Their cutting-edge innovations have revolutionized our business operations, streamlining processes and boosting productivity. The seamless connectivity and intuitive user interface have made a significant impact on our team’s efficiency. Thanks to their advanced data analytics capabilities, we now make data-driven decisions with confidence. I highly recommend FutureSphere to any organization seeking to stay ahead in the digital era.",
        name: "Nitesh Mishra",
        company: "Deshmitra"
    },
    {
        image: "/testimonials/sarah-jones.webp",
        text: "FutureSphere’s cloud modernization and DevOps automation have been game-changing for us. Deployment times dropped drastically, and system reliability improved beyond expectations. Their team’s professionalism and deep expertise truly set them apart.",
        name: "Sarah Jones",
        company: "BlueStone Retail"
    },
    {
        image: "/testimonials/rohan-patel.webp",
        text: "Partnering with FutureSphere allowed us to scale our SaaS platform seamlessly. Their engineering team built a secure, high-performance backend, resulting in a 40% improvement in user experience.",
        name: "Rohan Patel",
        company: "TechNova Labs"
    },
    {
        image: "/testimonials/emily-walker.webp",
        text: "The UI/UX redesign crafted by FutureSphere transformed our product entirely. User engagement and conversions improved significantly thanks to their world-class design thinking.",
        name: "Emily Walker",
        company: "BrightPixel Studios"
    },
    {
        image: "/testimonials/jatin-verma.webp",
        text: "FutureSphere automated our critical workflows and integrated AI-driven analytics. Our decision-making is now faster, smarter, and based on reliable insights.",
        name: "Jatin Verma",
        company: "Quantify Global"
    },
    {
        image: "/testimonials/laura-smith.webp",
        text: "From strategy to execution, FutureSphere exceeded expectations. They modernized our legacy systems, enhanced security, and stabilized our enterprise operations.",
        name: "Laura Smith",
        company: "FinEdge Solutions"
    }
];

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);

    const nextSlide = () =>
        setIndex((prev) => (prev + 1) % testimonials.length);

    const prevSlide = () =>
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <motion.section
            className="w-full py-20 px-6 md:px-10 lg:px-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >

            {/* Pill */}
            <div className="flex justify-center mb-3">
                <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Testimonials
                </span>
            </div>

            {/* Heading */}
            <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-900 mb-10">
                1M+ Global Customers
            </h2>

            {/* Card Container */}
            <div className="bg-bg-primary border border-box-border rounded-3xl shadow-sm p-6 md:p-10">

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
                                src={testimonials[index].image}
                                alt={testimonials[index].name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="space-y-4 text-sm md:text-base text-neutral-700 leading-relaxed">
                            <p>{testimonials[index].text}</p>

                            <div className="mt-4">
                                <h4 className="font-semibold text-lg text-gray-900">
                                    {testimonials[index].name}
                                </h4>
                                <p className="text-sm text-neutral-500">
                                    {testimonials[index].company}
                                </p>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-gray-50 transition"
                                >
                                    ←
                                </button>

                                <button
                                    onClick={nextSlide}
                                    className="w-10 h-10 rounded-full bg-[#7F56D9] text-white flex items-center justify-center hover:bg-[#6b45cc] transition"
                                >
                                    →
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>

            </div>
        </motion.section>
    );
}
