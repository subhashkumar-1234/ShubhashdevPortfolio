import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Clock, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const articles = [
  {
    title: "Building Performant React Apps with Code Splitting",
    excerpt: "Learn how to optimize your React application bundle size using dynamic imports and React.lazy for faster load times.",
    date: "Mar 2026",
    readTime: "5 min read",
    tags: ["React", "Performance"],
  },
  {
    title: "Mastering Tailwind CSS: Advanced Patterns",
    excerpt: "Explore advanced Tailwind techniques including custom plugins, design tokens, and responsive utility patterns.",
    date: "Feb 2026",
    readTime: "7 min read",
    tags: ["CSS", "Tailwind"],
  },
  {
    title: "Three.js in React: A Practical Guide",
    excerpt: "A hands-on guide to integrating Three.js with React using @react-three/fiber for stunning 3D web experiences.",
    date: "Jan 2026",
    readTime: "8 min read",
    tags: ["Three.js", "3D"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    else if (offset.x > swipeThreshold) setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  };

  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase text-center">Latest Articles</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Blog & <span className="gradient-text">Tutorials</span>
          </h2>
        </motion.div>

        <div className={`grid grid-cols-1 ${itemsPerPage === 3 ? 'md:grid-cols-3 md:max-w-5xl' : 'max-w-md'} gap-6 lg:gap-8 min-h-[300px] mx-auto w-full`}>
          <AnimatePresence mode="popLayout">
            {paginatedArticles.map((article) => (
              <motion.article
                key={article.title}
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
                <div className="glass-card flex flex-col rounded-2xl p-8 h-full group pl-7">
                  <div className="flex gap-2 mb-4 mt-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 font-mono text-[11px] font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-1 leading-snug">
                    {article.title}
                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 translate-y-[1px]" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{article.excerpt}</p>
                  <div className="flex items-center gap-5 text-xs font-medium text-muted-foreground pt-4 border-t border-border/40 w-full">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary/70" /> {article.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary/70" /> {article.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-4 mt-12 pb-4"
          >
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
