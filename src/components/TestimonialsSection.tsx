import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Startup Founder",
    quote: "Subhash delivered an exceptional frontend that exceeded our expectations. His attention to detail and performance optimization skills are outstanding.",
    rating: 5,
    color: "from-primary to-accent",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    quote: "Working with Subhash was a fantastic experience. He transformed our designs into pixel-perfect, responsive interfaces with smooth animations.",
    rating: 5,
    color: "from-accent to-primary",
  },
  {
    name: "Amit Verma",
    role: "Tech Lead",
    quote: "His React expertise and clean coding practices made our collaboration seamless. The codebase he delivered was well-structured and maintainable.",
    rating: 4,
    color: "from-primary to-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TestimonialsSection() {
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

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedTestimonials = testimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    else if (offset.x > swipeThreshold) setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase text-center">What People Say</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Client <span className="gradient-text">Reviews</span>
          </h2>
        </motion.div>

        <div className={`grid grid-cols-1 ${itemsPerPage === 3 ? 'md:grid-cols-3 md:max-w-[1050px]' : 'max-w-md'} gap-6 lg:gap-8 min-h-[350px] mx-auto w-full`}>
          <AnimatePresence mode="popLayout">
            {paginatedTestimonials.map((t) => (
              <motion.div
                key={t.name}
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
                <div className="glass-card rounded-2xl p-8 flex flex-col h-full pl-7">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < t.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}
                      />
                    ))}
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8 flex-1 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full shrink-0 bg-gradient-to-br ${t.color} flex items-center justify-center text-primary-foreground font-bold text-lg`}>
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
