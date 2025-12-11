'use client'

import { motion } from "framer-motion";

export default function MotionImage() {
  return (
    <motion.img
      className="object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1 }}
    />
  );
}