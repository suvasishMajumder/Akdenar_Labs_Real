"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

type ServiceCardProps = {
  service: {
    title: string;
    description: string;
    link: string;
    path: string;
    alt: string;
  };
  i: number;
};

export default function ServiceCard({ service, i }: ServiceCardProps) {
  const router = useRouter();

  return (
    <motion.div
      key={i}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="group relative rounded-2xl p-8 bg-white border border-gray-200
                 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >

      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                      transition duration-300 pointer-events-none 
                      bg-gradient-to-br from-[#7F56D9]/40 via-transparent to-[#7F56D9]/40">
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.3 }}
          className="mb-5"
        >
          <Image src={service.path} alt={service.alt} width={40} height={40} />
        </motion.div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          {service.description}
        </p>

        {/* ✅ Read More Button (always visible) */}
        <button
          onClick={() => router.push(service.link)}
          className="mt-2 px-4 py-2 rounded-full bg-[#F4F1FF] text-[#7F56D9] 
                     text-sm font-semibold hover:bg-[#E9E3FF] transition-colors"
        >
          Read More →
        </button>

        {/* Mobile View More Button */}
        <div
          onClick={() => router.push(service.link)}
          className="mt-4 text-center md:hidden"
        >
          <Button className="bg-[#7F56D9] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#6941C6] transition-colors">
            View More
          </Button>
        </div>
      </div>

      {/* Desktop Hover Overlay */}
      <div
        onClick={() => router.push(service.link)}
        className="absolute inset-0 bg-white/50 backdrop-blur-sm 
                   flex items-end justify-center pb-8 rounded-2xl
                   opacity-0 group-hover:opacity-100 
                   transition-all duration-300 md:flex"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{}} // required for framer
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
            View More
          </Button>
        </motion.div>
      </div>

    </motion.div>
  );
}
