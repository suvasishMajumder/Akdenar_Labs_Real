"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ClientsSection() {
    const clients = [
        { name: "Astro Mudra", logo: "/home/client1.svg" },
        { name: "Baazi Games", logo: "/home/client2.svg" },
        { name: "Gaira", logo: "/home/client3.svg" },
        { name: "Yela", logo: "/home/client4.svg" },
        { name: "Clubmate", logo: "/home/client5.svg" },
    ];

    const scrollRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    /* Measure total width of scroll container */
    useEffect(() => {
        if (scrollRef.current) {
            setWidth(scrollRef.current.scrollWidth / 2); // Original list width
        }
    }, []);

    return (
        <section className="w-full py-10 px-6 md:px-10 lg:px-20">

            {/* Pill */}
            <div className="flex justify-center mb-4">
                <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Our Clients
                </span>
            </div>

            {/* Heading */}
            <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-900">
                Trusted by Industry Leaders
            </h2>

            {/* Subtitle */}
            <p className="text-center text-neutral-600 mt-3 max-w-2xl mx-auto">
                Join our roster of satisfied clients and experience exceptional results.
            </p>

            <div className="mt-12 bg-[#CDD4FF] border border-[#DCE0FF] rounded-3xl p-6 md:p-8">

                {/* Desktop Static */}
                <div className="hidden md:flex flex-wrap items-center justify-center gap-10 md:gap-16">
                    {clients.map((client) => (
                        <Image
                            key={client.name}
                            src={client.logo}
                            alt={client.name}
                            width={160}
                            height={56}
                            className="h-14 w-auto object-contain"
                        />
                    ))}
                </div>

                {/* Mobile Infinite Scroll */}
                <div className="relative md:hidden overflow-hidden 
                [mask-image:_linear-gradient(to_right,transparent_0,black_70px,black_calc(100%-70px),transparent_100%)]">

                    <motion.div
                        ref={scrollRef}
                        className="flex gap-10 items-center whitespace-nowrap"
                        animate={{ x: [-0, -width] }}
                        transition={{
                            repeat: Infinity,
                            duration: 18,
                            ease: "linear",
                        }}
                    >
                        {/* Original */}
                        {clients.map((client) => (
                            <Image
                                key={client.name}
                                src={client.logo}
                                alt={client.name}
                                width={140}
                                height={50}
                                className="h-12 w-auto object-contain"
                            />
                        ))}

                        {/* Duplicate for loop */}
                        {clients.map((client) => (
                            <Image
                                key={`${client.name}-duplicate`}
                                src={client.logo}
                                alt={client.name}
                                width={140}
                                height={50}
                                className="h-12 w-auto object-contain"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
