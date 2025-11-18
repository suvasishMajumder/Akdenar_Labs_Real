"use client";

import { Boxes } from "@/components/ui/background-box";
import { motion } from "framer-motion";

export default function BackgroundBoxWrapper({ hovered }: { hovered: boolean }) {
    return (
        <motion.div
            animate={{
                scale: hovered ? 1.05 : 1,
                opacity: hovered ? 1 : 0.7,
                transition: { duration: 0.3 }
            }}
            className="absolute inset-0 z-0"
        >
            <Boxes />
        </motion.div>
    );
}
