"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectCard from "../ProjectCard";
import { motion, Variants } from "framer-motion";

export default function ProjectsSection() {
    const router = useRouter();
    const pathname = usePathname();

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
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

            {/* Pill */}
            <motion.div className="flex justify-center mb-3" variants={itemVariants}>
                <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Projects
                </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
                className="text-center text-3xl md:text-5xl font-semibold text-gray-900"
                variants={itemVariants}
            >
                From our Latest Projects
            </motion.h2>

            {/* Cards Grid */}
            <motion.div
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={containerVariants}
            >
                {projects.map((project, index) =>
                    pathname === "/" || index < 3 ? (
                        <motion.div key={index} variants={itemVariants}>
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ) : null
                )}
            </motion.div>

            {/* View All */}
            <motion.div className="flex justify-center mt-10" variants={itemVariants}>
                <button
                    onClick={() => router.push("projects")}
                    className="flex items-center gap-2 text-[#7F56D9] font-medium hover:opacity-80 transition"
                >
                    View All
                    <span className="text-lg">→</span>
                </button>
            </motion.div>

        </motion.section>
    );
}
