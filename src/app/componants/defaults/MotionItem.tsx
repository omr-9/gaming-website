"use client";
import React from "react";
import { motion } from "framer-motion";

const MotionItem = ({
  children,
  className,
  initial,
  animate,
  whileInView,
  exit,
}: {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileInView?: any;
  exit?:any;
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      className={`${className || ""}`}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
