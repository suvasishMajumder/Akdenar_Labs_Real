"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        image: "/client1.jpg",
        text: "Akdenar helped transform our operations with fast and reliable tech solutions. The workflow improvements were immediate, and our team became far more efficient in day-to-day tasks.",
        name: "Lily scherbatsky",
    },
    {
        image: "/client2.jpg",
        text: "Thanks to Akdenar’s DevOps automation and cloud modernization, our deployment process became incredibly fast and stable. System reliability improved far beyond our expectations.",
        name: "Sarah Jones",
    },
    {
        image: "/client3.jpg",
        text: "Partnering with Akdenar made scaling our SaaS platform effortless. The backend is now secure, optimized, and capable of delivering a noticeably better user experience.",
        name: "Roshni Patel",
    },
    {
        image: "/client4.jpg",
        text: "Akdenar’s UI/UX expertise completely elevated our product’s design. The interface feels smoother, more intuitive, and significantly more engaging for our users.",
        name: "Emily Walker",
    },
    {
        image: "/client5.jpg",
        text: "Akdenar automated our key workflows and introduced AI-driven insights that improved our decision-making process. We now operate faster and with far more clarity.",
        name: "Jatin Verma",
    },
    {
        image: "/client6.jpg",
        text: "The solutions delivered by Akdenar were practical, modern, and perfectly aligned with our goals. We experienced a clear boost in both performance and productivity.",
        name: "Phuwin Tangsakyuen",
    },
    {
        image: "/client7.jpg",
        text: "Akdenar optimized our system architecture and greatly improved performance. Managing higher traffic loads has become much easier, and the speed improvements are clearly visible.",
        name: "Depali Singh",
    },
    {
        image: "/client8.jpg",
        text: "Akdenar optimized our system architecture and greatly improved performance. Managing higher traffic loads has become much easier, and the speed improvements are clearly visible.",
        name: "Park Bo Gum",
    },
    {
        image: "/client9.jpg",
        text: "The redesign by Akdenar received amazing feedback from our users. The new flows are clean, the visuals are premium, and overall usability is significantly better.",
        name: "Michael Smith",
    },
    {
        image: "/client11.jpg",
        text: "Akdenar’s AI-driven reporting and automation brought accuracy and speed to our operations. We can now make decisions with stronger insights and far more confidence.",
        name: "Fahad Al Kubaisi",
    },
];

export default function TestimonialsSection() {
    const [index, setIndex] = useState(0);

    const nextSlide = () =>
        setIndex((prev) => (prev + 1) % testimonials.length);

    const prevSlide = () =>
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <motion.section
            className="w-full py-20 px-6 md:px-10 lg:px-20 container mx-auto    "
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
                        <div className="relative w-full h-[260px] md:h-[350px] rounded-xl overflow-hidden border border-box-border">
                            <Image
                                src={testimonials[index].image}
                                alt={testimonials[index].name}
                                fill
                                loading="eager"
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
