import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectChat from "@/assets/project-chat.jpg";
import projectAnalytics from "@/assets/project-analytics.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";

const projects = [
  {
    title: "E-Commerce Web App",
    slug: "e-commerce-web-app",
    desc: "A full-featured online store with cart, checkout, payment integration, and responsive product catalog.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: projectEcommerce,
    github: "https://github.com/subhashkumar68/ecommerce-web-app",
    live: "https://ecommerce-demo.vercel.app",
  },
  {
    title: "Chat Application",
    slug: "chat-application",
    desc: "Real-time messaging app with socket connections, typing indicators, and media sharing capabilities.",
    tech: ["React", "Socket.io", "Express", "Firebase"],
    image: projectChat,
    github: "https://github.com/subhashkumar68/chat-application",
    live: "https://chat-app-demo.vercel.app",
  },
  {
    title: "AI Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    desc: "Data visualization platform with AI-powered insights, interactive charts, and custom reporting tools.",
    tech: ["React", "D3.js", "Python", "TensorFlow"],
    image: projectAnalytics,
    github: "https://github.com/subhashkumar68/ai-analytics-dashboard",
    live: "https://analytics-demo.vercel.app",
  },
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    desc: "Modern developer portfolio with 3D animations, smooth transitions, and optimized performance scores.",
    tech: ["React", "Three.js", "Tailwind", "Vite"],
    image: projectPortfolio,
    github: "https://github.com/subhashkumar68/portfolio-website",
    live: "https://subhashkumar.vercel.app",
  },
];

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 2 : 1);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    } else if (offset.x > swipeThreshold) {
      setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
    }
  };

  return (
  <section id="projects" className="py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-[30px]">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="code-font text-xs text-primary tracking-widest uppercase">My Work</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          </p>
        </div>
      </ScrollReveal>

      <div className={`grid grid-cols-1 ${itemsPerPage === 2 ? 'md:grid-cols-2 md:max-w-none' : 'max-w-4xl'} gap-6 min-h-[500px] mx-auto w-full`}>
        <AnimatePresence mode="popLayout">
          {paginatedProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.4 }}
              drag={itemsPerPage === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={itemsPerPage === 1 ? handleDragEnd : undefined}
              className={`h-full ${itemsPerPage === 1 ? 'cursor-grab active:cursor-grabbing touch-pan-y' : ''}`}
            >
              <div className="glass-card hover-lift group overflow-hidden h-full flex flex-col rounded-3xl">
                <Link to={`/project/${p.slug}`} className="block">
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1 pl-7">
                  <Link to={`/project/${p.slug}`}>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {p.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-secondary text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-border/50 w-full">
                    <div className="flex items-center gap-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Github size={14} /> Code
                      </a>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover-glow">
                        <ExternalLink size={14} /> Demo
                      </a>
                    </div>
                    <Link
                      to={`/project/${p.slug}`}
                      className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center items-center gap-4 mt-12 pb-4">
            <button 
              onClick={() => setCurrentPage(prev => prev === 1 ? totalPages : prev - 1)}
              className="p-2 rounded-full glass-card hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`h-2.5 rounded-full transition-all ${currentPage === idx + 1 ? "bg-primary w-8" : "bg-primary/30 w-2.5 hover:bg-primary/50"}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => prev === totalPages ? 1 : prev + 1)}
              className="p-2 rounded-full glass-card hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>
      )}
    </div>
  </section>
  );
}