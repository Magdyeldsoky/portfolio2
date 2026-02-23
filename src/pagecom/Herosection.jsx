"use client";
import React, { useEffect, useState, Suspense } from "react";
import Antigravity from "@/components/Antigravity";
import Nav from "../components/nav";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import Model from "../components/Male_avatar";

const Herosection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative min-h-svh w-full bg-background overflow-hidden">
      <Nav />

      <section className="relative container mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-svh pt-20">
        <div className="relative z-10 flex flex-col items-start text-left space-y-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-2">
              Based in Egypt
            </h2>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-foreground">
              MAGDY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/40">
                DEV.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md space-y-4"
          >
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              Frontend Craftman with a{" "}
              <span className="text-foreground italic underline decoration-primary/30 underline-offset-4">
                Backend mindset
              </span>
              . I build scalable web architectures and immersive digital
              experiences.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-lg shadow-primary/20 transition-all"
          >
            View My Projects
          </motion.button>
        </div>

        <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center order-1 lg:order-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full" />

          <Canvas
            camera={{ position: [0, 0, 6.5], fov: 42 }}
            dpr={[1, 1.2]}
            flat
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
              depth: true,
              stencil: false,
            }}
            className="z-10"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={1.5} />
              <Environment preset="city" />

              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
                <Model />
              </Float>

              {!isMobile && (
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.4}
                  scale={8}
                  blur={2.5}
                  far={4}
                />
              )}
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Antigravity
            count={isMobile ? 40 : 150}
            particleSize={isMobile ? 0.8 : 1.2}
            magnetRadius={isMobile ? 8 : 16}
            lerpSpeed={0.05}
            colorVar="--primary"
          />
        </div>
      </section>
    </main>
  );
};

export default Herosection;
