"use client"
import BackgroundBoxWrapper from "@/components/BackgroundBoxWrapper";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {

    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="min-h-screen relative w-full pt-10 md:pt-0 overflow-hidden bg-slate-900 flex flex-col items-center justify-center">

            {/* background */}
            <BackgroundBoxWrapper hovered={hovered} />

            <div className="absolute container pointer-events-none" />

            {/* HERO SECTION */}
            <motion.div
                className="z-20 mt-20 flex flex-col items-center text-center px-4"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Title */}
                <motion.h1
                    className="text-white font-bold tracking-tight text-3xl md:text-6xl leading-tight"
                    variants={itemVariants}
                >
                    Innovation isn’t an option, <br />
                    it’s our foundation
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-neutral-300 text-lg md:text-xl max-w-2xl mt-4"
                    variants={itemVariants}
                >
                    We build systems that think, learn, and evolve with your business.
                </motion.p>

                {/* Button */}
                <motion.div
                    className="mt-8"
                    variants={itemVariants}
                >
                    <Button onClick={() => router.push("/get-in-touch")} className="rounded-md px-8 py-4 text-xl text-white bg-[#7F56D9] hover:bg-[#6c41cc]">
                        Contact Us
                    </Button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="mt-20 flex flex-row flex-wrap justify-center items-center gap-12 md:gap-20"
                    variants={containerVariants}
                >

                    <motion.div className="flex flex-col items-center text-center" variants={statsVariants}>
                        <h2 className="text-5xl md:text-6xl font-semibold text-white">25+</h2>
                        <p className="text-base mt-2 text-neutral-300">Active clients</p>
                    </motion.div>

                    <div className="hidden md:block h-14 w-px bg-white/20"></div>

                    <motion.div className="flex flex-col items-center text-center" variants={statsVariants}>
                        <h2 className="text-5xl md:text-6xl font-semibold text-white">80+</h2>
                        <p className="text-base mt-2 text-neutral-300">Projects delivered</p>
                    </motion.div>

                    <div className="hidden md:block h-14 w-px bg-white/20"></div>

                    <motion.div className="flex flex-col items-center text-center" variants={statsVariants}>
                        <h2 className="text-5xl md:text-6xl font-semibold text-white">95%</h2>
                        <p className="text-base mt-2 text-neutral-300">Client satisfaction</p>
                    </motion.div>

                    <div className="hidden md:block h-14 w-px bg-white/20"></div>

                    <motion.div className="flex flex-col items-center text-center" variants={statsVariants}>
                        <h2 className="text-5xl md:text-6xl font-semibold text-white">17+</h2>
                        <p className="text-base mt-2 text-neutral-300">countries served</p>
                    </motion.div>

                </motion.div>
            </motion.div>
        </div>
    )
}