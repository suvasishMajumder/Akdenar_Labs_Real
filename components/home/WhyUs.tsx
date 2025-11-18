'use client';

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function WhyUsSection() {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <motion.section
            className="w-full py-20 px-6 md:px-10 lg:px-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >

            <motion.div
                className="border bg-bg-primary border-box-border rounded-3xl shadow-sm p-6 md:p-12 flex flex-col md:flex-row gap-10 md:gap-14 items-center"
                variants={containerVariants}
            >

                {/* LEFT SIDE CONTENT */}
                <motion.div className="flex-1" variants={containerVariants}>
                    {/* Pill */}
                    <motion.div className="flex mb-4" variants={itemVariants}>
                        <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                            Why Us
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4"
                        variants={itemVariants}
                    >
                        Empowering Businesses Through <br />
                        Next-Generation Technology
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-neutral-700 leading-relaxed text-sm md:text-base whitespace-pre-line"
                        variants={itemVariants}
                    >
                        At Akdenar Labs, we empower businesses with next-generation
                        technology that drives growth and innovation.
                        Our team of experts blends strategy, engineering, and design to deliver
                        intelligent, secure solutions.
                        We create scalable SaaS, cloud, and full-stack applications tailored
                        to diverse industries.
                        With a focus on performance and customer success, we help
                        organizations streamline operations and thrive.
                        We don’t just build technology — we shape the future of how businesses
                        work, connect, and grow.
                    </motion.p>
                </motion.div>

                {/* RIGHT SIDE IMAGE */}
                <motion.div className="flex-1 flex justify-center" variants={imageVariants}>
                    <div className="relative w-full max-w-sm md:max-w-md min-h-[260px] h-[260px] md:h-48 rounded-2xl overflow-hidden">
                        <Image
                            src="/home/whyus.svg"
                            alt="Why Us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>
            </motion.div>

        </motion.section>
    );
}
