"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const FlipCard = ({ name, icon, description, level, color }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group h-[320px] w-full [perspective:1500px] cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] shadow-2xl ${
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "md:group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-gradient-to-br from-secondary/40 to-background/60 backdrop-blur-xl [backface-visibility:hidden] overflow-hidden">
          <div
            className="absolute w-32 h-32 blur-[60px] opacity-20"
            style={{ backgroundColor: color }}
          />

          <div className="relative z-10 p-6 flex flex-col items-center text-center">
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={icon}
              alt={name}
              className="w-20 h-20 mb-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            />
            <h3 className="text-2xl font-black tracking-tighter text-foreground uppercase">
              {name}
            </h3>
            <span className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest md:hidden">
              Tap to Flip
            </span>
          </div>

          <div
            className="absolute bottom-0 h-1 w-1/2 rounded-full opacity-50"
            style={{ backgroundColor: color }}
          />
        </div>

        <div
          className="absolute inset-0 h-full w-full rounded-3xl p-8 text-foreground [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/10 flex flex-col justify-between overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, #0a0a0a 100%)`,
          }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <img src={icon} className="w-24 h-24 rotate-12 grayscale" />
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-black mb-3 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              {description}
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Expertise Level
              </span>
              <span
                className="text-lg font-mono font-bold"
                style={{ color: color }}
              >
                {level}%
              </span>
            </div>
            <div className="relative h-2 w-full bg-white/5 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute h-full rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
