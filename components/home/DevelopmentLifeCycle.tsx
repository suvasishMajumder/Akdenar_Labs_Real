"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const developmentLifeCycleData = [
    { id: 1, title: "Requirement Gathering", description: "We start by understanding your vision, goals, and requirements to ensure we're all on the same page." },
    { id: 2, title: "Planning", description: "Our team creates a detailed project plan, including timelines, milestones, and resource allocation." },
    { id: 3, title: "Design", description: "We design a user-friendly and visually appealing interface that aligns with your brand identity." },
    { id: 4, title: "Development", description: "Our expert developers bring the design to life, writing clean and efficient code." },
    { id: 5, title: "Testing", description: "We rigorously test the application to ensure it's bug-free and performs flawlessly." },
    { id: 6, title: "Deployment", description: "We deploy the application to a secure and scalable environment, making it accessible to your users." },
    { id: 7, title: "Maintenance", description: "We provide ongoing support and maintenance to ensure your application remains up-to-date and secure." },
];

export default function DevelopmentLifeCycle() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-90%"]);

    return (
        <section ref={targetRef} className="relative bg-gradient-to-b from-white to-[#F7F3FF] py-20">

            {/* 🌟 Section Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-14"
            >
                Development <span className="text-[#7F56D9]">Life Cycle</span>
            </motion.h2>

            {/* 🌟 MOBILE VIEW */}
            <div className="md:hidden flex flex-col gap-12 px-6 relative">

                {/* Animated Vertical Line */}
                <motion.span
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-6 top-0 w-[3px] bg-[#7F56D9] rounded-full"
                />

                {developmentLifeCycleData.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="relative pl-12"
                    >
                        {/* Node Number */}
                        <div className="absolute left-2 top-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#7F56D9] to-[#6B4CC4] border-2 border-white text-white flex items-center justify-center shadow-lg font-bold">
                            {item.id}
                        </div>

                        {/* Card */}
                        <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-100">
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 🖥 DESKTOP VIEW */}
            <div className="hidden md:block h-[500vh] relative">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    {/* COMPLETE LONG LINE — ONE CONTINUOUS LINE ACROSS */}
                    <motion.div
                        style={{ x }}
                        className="absolute top-1/2 left-0 w-[300vw] h-[4px] bg-purple-300/60 -translate-y-1/2"
                    />

                    {/* Scroll Horizontal Wrapper */}
                    <motion.div style={{ x }} className="flex gap-32 px-32 relative z-10">

                        {developmentLifeCycleData.map((item, index) => (
                            <div key={item.id} className="relative w-[450px]">

                                {/* Node */}
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ amount: 0.4 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute left-1/2 top-1/2 
                          -translate-x-1/2 -translate-y-1/2 
                          h-14 w-14 rounded-full
                          bg-gradient-to-br from-[#7F56D9] to-[#6B4CC4]
                          border-4 border-white shadow-lg 
                          flex items-center justify-center 
                          text-white text-xl font-bold"
                                >
                                    {item.id}
                                </motion.div>

                                {/* Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: index % 2 === 0 ? 100 : -100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.4 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={`absolute left-1/2 w-80 -translate-x-1/2 
    ${index % 2 === 0 ? "top-[calc(50%+50px)]" : "top-[calc(50%-220px)]"}`}
                                >
                                    <div className="p-6 bg-white/90 backdrop-blur-xl shadow-xl rounded-xl border border-purple-200">
                                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                        <p className="mt-3 text-gray-700 leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>


                            </div>
                        ))}

                    </motion.div>
                </div>
            </div>

        </section>
    );
}
