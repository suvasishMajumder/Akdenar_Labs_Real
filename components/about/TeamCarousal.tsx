"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Facebook, Linkedin } from "lucide-react";
import { XIcon } from "@/components/home/Footer";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  image: string;
  designation: string;
}

type Position = -3 | -2 | -1 | 0 | 1 | 2 | 3;

const TeamCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Nitish Kumar Mishra",
      image: "/about/Nitish.png",
      designation: "CEO",
    },
    {
      id: 2,
      name: "Ajay",
      image: "/about/Ajay.png",
      designation: "Frontend Developer",
    },
    {
      id: 3,
      name: "Suvasish",
      image: "/about/Suvasish.png",
      designation: "Frontend Developer",
    },
    {
      id: 4,
      name: "Samridih",
      image: "/about/Samridih.png",
      designation: "UI Designer",
    },
    {
      id: 5,
      name: "Abhishek",
      image: "/about/Abhishek.png",
      designation: "Frontend Developer",
    },
    {
      id: 6,
      name: "Chaitanya",
      image: "/about/Chaitanya.png",
      designation: "Backend Developer",
    },
    {
      id: 7,
      name: "Akhilesh",
      image: "/about/Akhilesh.png",
      designation: "Full Stack Developer",
    },
    {
      id: 8,
      name: "Asmit",
      image: "/about/Asmit.png",
      designation: "UI Designer",
    },
    {
      id: 9,
      name: "Dhanush",
      image: "/about/Dhanush.png",
      designation: "UI Designer",
    },
    {
      id: 10,
      name: "Kaustubh",
      image: "/about/Kautsubh.png",
      designation: "Frontend Developer",
    },
    {
      id: 11,
      name: "Parag",
      image: "/about/Parag.png",
      designation: "UI Designer",
    },
    {
      id: 12,
      name: "Parul",
      image: "/about/Parul.png",
      designation: "UI Designer",
    },
    {
      id: 13,
      name: "Prakhar",
      image: "/about/Prakhar.png",
      designation: "Frontend Developer",
    },
    {
      id: 14,
      name: "Rajat",
      image: "/about/Rajat.png",
      designation: "Frontend Developer",
    },
    {
      id: 15,
      name: "Ravi",
      image: "/about/Ravi.png",
      designation: "UI Designer",
    },
    {
      id: 16,
      name: "Vijeta",
      image: "/about/Vijeta.png",
      designation: "UI Designer",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : teamMembers.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < teamMembers.length - 1 ? prev + 1 : 0));
  };

  const getVisibleMembers = () => {
    const visible: Array<TeamMember & { position: Position }> = [];
    for (let i = -3 as Position; i <= 3; i++) {
      const index =
        (currentIndex + i + teamMembers.length) % teamMembers.length;
      visible.push({ ...teamMembers[index], position: i });
    }
    visible.sort((a, b) => a.position - b.position);
    return visible;
  };

  const getTranslateX = (pos: Position) => {
    const map: Record<Position, number> = {
      "-3": -340,
      "-2": -270,
      "-1": -170,
      "0": 0,
      "1": 170,
      "2": 270,
      "3": 340,
    };
    return map[pos];
  };

  const getScale = (pos: Position) => {
    if (pos === 0) return 1;
    if (pos === 1 || pos === -1) return 0.75;
    if (pos === 2 || pos === -2) return 0.65;
    return 0.55;
  };

  const getImageSize = (pos: Position) => {
    if (pos === 0) return { width: 272, height: 272, zIndex: 40 };
    if (Math.abs(pos) === 1) return { width: 224, height: 224, zIndex: 30 };
    if (Math.abs(pos) === 2) return { width: 176, height: 176, zIndex: 20 };
    return { width: 144, height: 144, zIndex: 10 };
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center md:p-8 w-full py-10 md:px-10 lg:px-20">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {currentMember.name}
          </h2>
          <p className="text-gray-500 mb-4">{currentMember.designation}</p>

          <div className="flex justify-center gap-4">
            <XIcon className="w-5 h-5 text-blue-600" />
            <Facebook className="w-5 h-5 text-blue-600" />
            <Linkedin className="w-5 h-5 text-blue-700" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative h-80 flex items-center justify-center mb-8 overflow-hidden">
          <div
            className="relative w-full flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {getVisibleMembers().map((member) => {
              const { width, height, zIndex } = getImageSize(member.position);
              return (
                <motion.div
                  key={member.id}
                  className="absolute rounded-full shadow-lg border-4 border-white overflow-hidden"
                  style={{
                    width,
                    height,
                    zIndex,
                  }}
                  animate={{
                    x: getTranslateX(member.position),
                    scale: getScale(member.position),
                    opacity:
                      member.position === 0
                        ? 1
                        : Math.abs(member.position) === 1
                        ? 0.9
                        : 0.6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition text-white shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;
