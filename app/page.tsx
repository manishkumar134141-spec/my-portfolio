"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Youtube, MapPin, ChevronDown, Download, Terminal, BookOpen } from "lucide-react";
import Link from "next/link";
import { Oswald, Share_Tech_Mono } from 'next/font/google';
import { useEffect, useState } from "react";

// Load Fonts
const oswald = Oswald({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  display: 'swap',
});

// Monospace font for the receipt/logs
const techMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// --- DATA ---
const projects = [
  {
    id: "01",
    title: "ISAGI AI",
    category: "VIRTUAL ASSISTANT",
    description: "Next-gen Virtual Assistant controlling your PC through Voice & Hand Gestures.",
    tech: ["Python", "PyQt6", "MediaPipe", "Vosk"],
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "AUTOMATION BOTS",
    category: "WHATSAPP & TELEGRAM",
    description: "High-performance bots handling mass traffic using unofficial APIs and Dockerized containers.",
    tech: ["Python", "n8n", "Docker", "Node.js"],
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "ML WORKFLOWS",
    category: "DATA SCIENCE",
    description: "End-to-end Machine Learning lifecycle management. From Linear Regression to Transformers.",
    tech: ["MLFlow", "Hugging Face", "Scikit-Learn"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "TECH CONTENT CREATION",
    category: "YOUTUBE & EDUCATION",
    description: "Producing educational videos on AI/ML engineering, simplifying complex topics like LLMs, computer vision, and automation for a growing developer community.",
    tech: ["YouTube", "OBS Studio", "DaVinci Resolve", "AI Tools"],
    img: "/youtube.png"
  }
];

const skills = [
  "Linear Regression", "Logistic Regression", "SVM", "KNN", "Decision Trees", 
  "Random Forest", "Docker", "Ollama", "n8n", "React", "Django"
];

export default function Home() {
  // --- STATE ---
  const [isHovered, setIsHovered] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false); // Controls the receipt animation
  
  // Raw Mouse Position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  // Parallax Text
  const textX = useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-50, 50]);
  const textY = useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-50, 50]);

  // Track Mouse
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [x, y]);

  // Handlers
  const cursorEnter = () => setIsHovered(true);
  const cursorLeave = () => setIsHovered(false);
  const handlePrintLogs = () => setShowReceipt(!showReceipt);

  return (
    <main className={`min-h-screen bg-[#0a0a0a] text-[#ededed] ${oswald.className} selection:bg-[#ff4d29] selection:text-black cursor-none overflow-x-hidden`}>
      
      {/* --- CUSTOM CURSOR --- */}
      <motion.div 
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-1 h-1 bg-[#ff4d29] rounded-full pointer-events-none z-[10000]"
      />
      <motion.div 
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovered ? 2.5 : 1 }}
        className="fixed top-0 left-0 w-4 h-4 bg-[#ff4d29] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ease-out"
      />

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between p-6 md:p-12 border-b border-gray-800 relative overflow-hidden">
        <div className="flex justify-between items-start text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase z-20 relative">
          <div className="flex flex-col gap-1">
            <span className="text-white">Rungta University</span>
            <span className="text-[#ff4d29]">B.Tech AIML</span>
          </div>
          <div className="text-right">
            <span>Bhilai, Chhattisgarh</span>
          </div>
        </div>

        <div className="z-10 mt-10 md:mt-0 perspective-1000" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
          <motion.div style={{ x: textX, y: textY }}>
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[16vw] leading-[0.85] font-bold uppercase text-[#ff4d29]"
            >
              Manish
            </motion.h1>
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[16vw] leading-[0.85] font-bold uppercase text-white"
            >
              Kumar
            </motion.h1>
          </motion.div>
          
          <div className="mt-12 pl-6 border-l-4 border-[#ff4d29] z-20 relative">
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
              Building <span className="text-white font-bold">AI</span> that controls the <span className="text-white font-bold">Real World</span>.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 animate-bounce hidden md:block z-20">
          <ChevronDown size={48} className="text-[#ff4d29]" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full bg-[#ff4d29] py-4 overflow-hidden border-y border-black" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex gap-8 pr-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                 <span className="text-black font-bold text-4xl md:text-6xl uppercase">Artificial Intelligence</span>
                 <span className="text-black font-bold text-4xl md:text-6xl uppercase">•</span>
                 <span className="text-black font-bold text-4xl md:text-6xl uppercase">Automation</span>
                 <span className="text-black font-bold text-4xl md:text-6xl uppercase">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS SECTION (Sticky Stack Effect) */}
      <section className="px-6 md:px-12 py-24">
        <h2 className="text-6xl md:text-9xl font-bold uppercase text-[#222] mb-20">Selected Works</h2>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sticky top-0 min-h-screen bg-[#0a0a0a] border-t border-gray-800 flex flex-col justify-center pt-24 group"
              style={{ zIndex: index + 1 }}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-center pb-24">
                {/* LEFT: Text */}
                <div className="flex flex-col justify-center">
                  <div>
                    <span className="text-[#ff4d29] text-3xl font-bold font-mono">/{project.id}</span>
                    <h3 className="text-5xl md:text-7xl font-bold uppercase mt-4 mb-8 group-hover:text-[#ff4d29] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((t) => (
                        <span key={t} className="px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-300 uppercase hover:border-[#ff4d29] hover:text-white transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-[#ff4d29] group-hover:text-black transition-all cursor-pointer">
                      <ArrowUpRight size={28} />
                  </div>
                </div>

                {/* RIGHT: Image */}
                <div className="relative aspect-video bg-gray-900 border border-gray-800 overflow-hidden group-hover:border-[#ff4d29] transition-colors duration-300 rounded-lg">
                   <div className="absolute inset-0 bg-[#ff4d29] opacity-0 group-hover:opacity-10 transition-opacity duration-300 mix-blend-overlay z-10" />
                   <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"/>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-24 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
             <h2 className="text-4xl md:text-6xl font-bold uppercase text-[#ff4d29] mb-6">Arsenal</h2>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-x-6 gap-y-4">
            {skills.map((skill, i) => (
              <span key={i} className="text-3xl md:text-5xl font-bold text-gray-700 hover:text-white transition-colors cursor-default uppercase" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
                {skill}<span className="text-[#ff4d29]">.</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESUME GENERATOR / FOOTER --- */}
      <section className="py-32 px-6 md:px-12 border-t border-gray-800 flex flex-col items-center">
        
        {/* THE RECEIPT BUTTON */}
        <div className="relative z-10 w-full max-w-lg mb-32" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
          
          {/* Button */}
          <button 
            onClick={handlePrintLogs}
            className="w-full bg-[#1a1a1a] border-2 border-[#ff4d29] text-[#ff4d29] font-bold text-xl md:text-3xl py-6 uppercase hover:bg-[#ff4d29] hover:text-black transition-all duration-300 flex items-center justify-center gap-4 relative z-20"
          >
            <Terminal size={32} />
            [ GENERATE_SYSTEM_LOGS ]
          </button>

          {/* Thermal Receipt Animation */}
          <AnimatePresence>
            {showReceipt && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-[95%] mx-auto bg-white text-black overflow-hidden relative shadow-2xl origin-top"
              >
                {/* Jagged Edge (CSS Trick using simple dashes for performance) */}
                <div className="absolute bottom-0 w-full h-4 bg-transparent border-b-4 border-dashed border-[#0a0a0a] translate-y-2"></div>

                <div className={`p-6 ${techMono.className} text-sm md:text-base leading-relaxed pb-10`}>
                  <div className="text-center mb-4 border-b-2 border-dashed border-black pb-2">
                    <h3 className="font-bold text-xl">SYSTEM REPORT</h3>
                    <p>{new Date().toLocaleDateString()} -- {new Date().toLocaleTimeString()}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between"><span>USER:</span><span>MANISH KUMAR</span></div>
                    <div className="flex justify-between"><span>ROLE:</span><span>AIML ENGINEER</span></div>
                    <div className="flex justify-between"><span>STATUS:</span><span>ONLINE</span></div>
                    <div className="flex justify-between"><span>LOCATION:</span><span>RAIPUR, IN</span></div>
                  </div>

                  <div className="border-t-2 border-dashed border-black py-4 mb-4">
                     <p className="font-bold mb-2">LOADING MODULES:</p>
                     <p>[OK] PYTHON CORE</p>
                     <p>[OK] TENSORFLOW / PYTORCH</p>
                     <p>[OK] DOCKER CONTAINERS</p>
                     <p>[OK] AUTOMATION SCRIPTS</p>
                  </div>

                  <div className="text-center">
                    <p className="mb-4">*** FILE READY ***</p>
                    {/* DOWNLOAD LINK - REPLACE '/resume.pdf' WITH YOUR FILE */}
                    <a 
                      href="/resume.pdf" 
                      download 
                      className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold hover:bg-[#ff4d29] hover:text-black transition-colors"
                    >
                      <Download size={18} />
                      DOWNLOAD_RESUME.PDF
                    </a>
                  </div>

                  <div className="mt-8 text-center text-xs opacity-50">
                    END OF TRANSMISSION
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Standard Footer Info */}
        <h2 className="text-[11vw] leading-[0.85] font-bold uppercase mb-20 text-center md:text-left text-[#333] hover:text-[#ff4d29] transition-colors duration-500 cursor-pointer w-full">
          Let's Make <br/>Things Click.
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-gray-800 pt-12">
           <div className="lg:col-span-2">
             <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-6">Contact</h4>
             <a href="mailto:manishkumar134141@gmail.com" className="text-2xl md:text-3xl font-bold underline decoration-[#ff4d29] underline-offset-8 hover:text-gray-300 break-all" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
               manishkumar134141@gmail.com
             </a>
           </div>
           
           <div>
             <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-6">Socials</h4>
             <div className="flex gap-4">
               <Link href="https://github.com/manishkumar134141-spec" className="hover:text-[#ff4d29] transition-all"><Github size={32} /></Link>
               <Link href="https://www.linkedin.com/in/manish-kumar-258821328" className="hover:text-[#ff4d29] transition-all"><Linkedin size={32} /></Link>
               <Link href="https://www.youtube.com/@AIMLWithManish" className="hover:text-[#ff4d29] transition-all"><Youtube size={32} /></Link>
               <Link href="https://medium.com/@manishkumar134141" className="hover:text-[#ff4d29] transition-all"><BookOpen size={32} /></Link>
             </div>
           </div>

           <div>
             <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-6">Location</h4>
             <div className="flex items-center gap-2 text-xl">
               <MapPin className="text-[#ff4d29]" size={24} />
               <span>Raipur, India</span>
             </div>
           </div>
        </div>
        
        <div className="w-full mt-24 pt-8 border-t border-gray-900 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Manish Kumar.
        </div>
      </section>
    </main>
  );
}