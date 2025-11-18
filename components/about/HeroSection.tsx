"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-bg-primary w-full py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-20 text-center flex flex-col items-center"
        >

            {/* Main Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                    mt-6 md:mt-10 
                    tracking-tight leading-snug md:leading-tight lg:leading-[1.3]
                    text-gray-900 
                    max-w-4xl lg:max-w-5xl mx-auto
                "
            >
                Revolutionizing industries with innovative <br className="hidden md:block" />
                technology that empowers businesses and <br className="hidden md:block" />
                people.
            </motion.h2>

            {/* Subheading */}
            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="
                    text-neutral-600
                    text-sm sm:text-base md:text-lg 
                    leading-relaxed 
                    max-w-2xl md:max-w-3xl mx-auto 
                    mt-4 md:mt-6
                    px-2
                "
            >
                Akdenar Labs is a global technology leader delivering SaaS, cloud,
                and full-stack solutions. We empower businesses with intelligent, secure,
                and scalable technology to drive growth and innovation.
                Trusted across industries, we help organizations thrive in a digital-first world.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-6 md:mt-8"
            >
                <Link href="/get-in-touch">
                    <button className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-base bg-[#7F56D9] hover:bg-[#6b45cc] text-white rounded-full transition shadow-sm">
                        Contact Us
                    </button>
                </Link>
            </motion.div>

            {/* Responsive Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
                className="mt-10 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[1200px]"
            >
                <Image
                    src="/about/HeroWrapper.svg"
                    width={1200}
                    height={450}
                    alt="hero image"
                    className="w-full h-auto mx-auto rounded-md"
                    priority
                />
            </motion.div>

        </motion.section>
    );
}
