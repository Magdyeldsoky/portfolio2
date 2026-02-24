"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlipCard from "./Flibcard";
import { Search } from "lucide-react";

const skillsData = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Semantic markup and web standards.",
    level: 90,
    color: "#E34F26",
    category: "Languages",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Advanced styling and animations.",
    level: 88,
    color: "#1572B6",
    category: "Languages",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Modern ES6+ and functional programming.",
    level: 80,
    color: "#F7DF1E",
    category: "Languages",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-safe development for scalable apps.",
    level: 70,
    color: "#3178C6",
    category: "Languages",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "Scripting and backend automation.",
    level: 70,
    color: "#3776AB",
    category: "Languages",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Building interactive UIs with Hooks & Context.",
    level: 85,
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    description: "Utility-first CSS framework for rapid UI.",
    level: 90,
    color: "#06B6D4",
    category: "Frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Event-driven server-side runtime.",
    level: 80,
    color: "#339933",
    category: "Backend",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    description: "Fast, unopinionated web framework.",
    level: 75,
    color: "#ffffff",
    category: "Backend",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    description: "NoSQL document-based database.",
    level: 60,
    color: "#47A248",
    category: "Backend",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    description: "Powerful open-source relational database.",
    level: 70,
    color: "#4169E1",
    category: "Backend",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Version control and collaborative workflow.",
    level: 80,
    color: "#F05032",
    category: "Tools",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "UI/UX design and prototyping.",
    level: 60,
    color: "#F24E1E",
    category: "Tools",
  },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    description: "API development and testing tool.",
    level: 75,
    color: "#FF6C37",
    category: "Tools",
  },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Languages", "Frontend", "Backend", "Tools"];

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className="relative py-24 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Expertise
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-foreground mb-8 italic">
            Tech Stack.
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-secondary/20 border border-white/5 rounded-2xl text-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-secondary/10 backdrop-blur-md rounded-2xl border border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <FlipCard {...skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No skills found matching your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
