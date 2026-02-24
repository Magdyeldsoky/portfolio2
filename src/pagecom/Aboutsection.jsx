"use client";
import React from "react";
import { motion } from "framer-motion";

const Aboutsection = () => {
  const stats = [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Completed", value: "8+" },
    { label: "Technologies", value: "10+" },
  ];

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">
                01. About Me
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                Engineering digital <br />
                <span className="text-muted-foreground">
                  experiences that matter.
                </span>
              </h3>
            </motion.div>

            <motion.div
              className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>
                Hello! I'm Magdy, a developer who loves bridging the gap between
                <span className="text-foreground font-semibold">
                  {" "}
                  complex logic{" "}
                </span>
                and{" "}
                <span className="text-foreground font-semibold">
                  {" "}
                  fluid design
                </span>
                . My journey in tech is driven by a passion for clean
                architecture and pixel-perfect execution.
              </p>
              <p>
                I don't just write code; I build scalable systems. Whether it's
                architecting a robust backend or crafting an immersive 3D
                frontend interface, I focus on performance and user experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex flex-col items-start"
                >
                  <span className="text-3xl md:text-4xl font-black text-primary font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mt-2">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* الجانب الأيمن: صورة أو عنصر بصري تقني */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square rounded-2xl border border-primary/20 bg-primary/5 p-4 overflow-hidden group">
              {/* طبقة جمالية (Overlay) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* محاكاة كود (Code Snippet) بشكل جمالي */}
              <div className="h-full w-full bg-background/80 rounded-xl p-6 font-mono text-sm text-primary/80 overflow-hidden shadow-2xl">
                <p className="text-blue-400">const developer = {"{"}</p>
                <p className="pl-4 text-emerald-400">name: "Magdy",</p>
                <p className="pl-4 text-emerald-400">role: "Fullstack",</p>
                <p className="pl-4 text-emerald-400">passion: "Clean Code",</p>
                <p className="pl-4 text-purple-400">
                  status: "Building the Future",
                </p>
                <p className="pl-4 text-amber-400 text-xs mt-4">// Skills</p>
                <p className="pl-4 text-emerald-400">
                  stack: ["React", "Node", "ThreeJS"]
                </p>
                <p className="text-blue-400">{"}"};</p>

                {/* شكل زخرفي خلف الكود */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary blur-[80px] opacity-20 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
