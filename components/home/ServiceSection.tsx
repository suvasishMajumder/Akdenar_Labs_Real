'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import ServiceCard from "../ServiceCard";
import { usePathname, useRouter } from "next/navigation";
import { services } from "@/data/services";
import { motion, Variants } from "framer-motion";

export default function ServicesSection() {
    const pathname = usePathname();
    const router = useRouter();

    // Parent container animation
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    // Item animation (for text, pills, etc.)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    // Card animation
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.section
            className="w-full py-10 px-6 md:px-10 lg:px-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div
                className={`${pathname != "/" && "hidden"}`}
                variants={containerVariants}
            >
                {/* Pill */}
                <motion.div className="flex justify-center mb-4" variants={itemVariants}>
                    <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                        Services
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    className="text-center text-3xl md:text-5xl font-semibold text-gray-900"
                    variants={itemVariants}
                >
                    Services That Transform Businesses
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    className="text-center text-neutral-600 mt-3 max-w-2xl mx-auto"
                    variants={itemVariants}
                >
                    We design and deploy AI technologies that make your business smarter,
                    faster, and more efficient
                </motion.p>
            </motion.div>

            {/* Service Cards */}
            <motion.div className="mt-12" variants={containerVariants}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, i) => {
                        if (pathname === "/" && i >= 3) return null;

                        return (
                            <motion.div key={i} variants={cardVariants}>
                                <ServiceCard service={service} i={i} />
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All */}
                {pathname === "/" && (
                    <motion.div
                        className="flex justify-center mt-10"
                        variants={itemVariants}
                    >
                        <button
                            onClick={() => router.push("/services")}
                            className="flex items-center gap-2 text-[#7F56D9] font-medium hover:opacity-80 transition"
                        >
                            View All
                            <span className="text-lg">→</span>
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
}
