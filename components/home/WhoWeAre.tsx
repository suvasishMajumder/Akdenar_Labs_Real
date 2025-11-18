"use client"
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function WhoWeAre() {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut", // ✅ FIXED
            },
        },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.section
            className="relative container mx-auto w-full py-10 px-6 md:px-10 lg:px-20 bg-white text-[#0F172A]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Section Tag */}
            <motion.div className="flex justify-center mb-6" variants={itemVariants}>
                <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Who Are We
                </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
                className="text-3xl md:text-5xl text-center leading-tight max-w-5xl mx-auto tracking-tight"
                variants={itemVariants}
            >
                Your trusted partner for digital transformation <br /> at scale.
            </motion.h2>

            {/* Sub text */}
            <motion.p
                className="text-center text-neutral-600 mt-4 max-w-3xl mx-auto"
                variants={itemVariants}
            >
                We design and deploy AI technologies that make your business smarter,
                faster, and more efficient.
            </motion.p>

            {/* Content Box */}
            <motion.div
                className="mt-16 bg-bg-primary rounded-3xl border border-box-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
                variants={containerVariants}
            >
                {/* Left Content */}
                <motion.div className="flex-1" variants={contentVariants}>
                    <h3 className="text-2xl font-semibold leading-snug mb-4">
                        Global technology powerhouse specializing in next-generation
                        digital transformation.
                    </h3>

                    <p className="text-neutral-700 leading-relaxed text-sm md:text-base">
                        Akdenar Labs is a global technology company focused on SaaS, cloud
                        solutions, full-stack development, and digital innovation. Their
                        goal is to help businesses scale and automate using next-generation
                        technology. Their expert team combines innovation and engineering to
                        build intelligent, secure, and high-performance solutions. They
                        position themselves as a trusted partner for enterprises needing
                        digital transformation, combining global expertise with local
                        insights to drive growth and efficiency.
                    </p>
                </motion.div>

                {/* Right Image */}
                <motion.div className="flex-1 flex justify-center" variants={imageVariants}>
                    <div className="rounded-2xl overflow-hidden shadow-lg max-w-xs md:max-w-sm lg:max-w-md">
                        <Image
                            src="/home/whoweare.webp" // Change as needed
                            alt="Cloud Technology"
                            width={500}
                            height={350}
                            className="object-cover rounded-2xl"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}