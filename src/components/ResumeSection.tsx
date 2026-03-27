import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, FileText, Eye, Award, Briefcase, GraduationCap, Cloud, Printer, MoreVertical, X } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const highlights = [
  { icon: Briefcase, label: "2+ Years Experience", desc: "Frontend Development" },
  { icon: Award, label: "10+ Projects", desc: "Delivered Successfully" },
  { icon: GraduationCap, label: "B.Tech CS", desc: "Computer Science" },
];

export default function ResumeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isModalOpen]);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="resume" className="py-24 sm:py-32 relative overflow-hidden">
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-10 -left-20 w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-accent/8 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase text-center">My Resume</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Download <span className="gradient-text">CV</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Resume Preview Card */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Resume Preview */}
              <div className="flex-shrink-0 w-full lg:w-[300px] flex flex-col glass-card overflow-hidden rounded-2xl border border-primary/20 shadow-2xl h-[300px]">
                {/* PDF Toolbar */}
                <div className="bg-secondary/90 border-b border-border p-3 flex items-center justify-between backdrop-blur-md z-10">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    <span className="text-sm font-semibold truncate max-w-[150px]">Resume.pdf</span>
                  </div>
                  <div className="flex items-center justify-end gap-0.5">
                    <button onClick={() => alert("Save to Google Drive feature coming soon!")} title="Save to Drive" className="p-2 hover:bg-primary/20 rounded-lg text-muted-foreground hover:text-primary transition-all active:scale-95">
                      <Cloud size={16} />
                    </button>
                    <button onClick={() => {
                      const win = window.open("/Subhash_Developer_NewResumeex12.pdf", "_blank");
                      win?.print();
                    }}
                      title="Print" className="p-2 hover:bg-primary/20 rounded-lg text-muted-foreground hover:text-primary transition-all active:scale-95">
                      <Printer size={16} />
                    </button>
                    <a href="/Subhash_Developer_NewResumeex12.pdf" download title="Download" className="p-2 hover:bg-primary/20 rounded-lg text-muted-foreground hover:text-primary transition-all active:scale-95 flex">
                      <Download size={16} />
                    </a>
                    <button onClick={() => alert("More Actions")} title="More Actions" className="p-2 hover:bg-primary/20 rounded-lg text-muted-foreground hover:text-primary transition-all active:scale-95">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer content */}
                <div className="flex-1 w-full bg-muted/20 relative">
                  <iframe
                    src="/Subhash_Developer_NewResumeex12.pdf#toolbar=0&navpanes=0&view=FitH"
                    title="Resume Preview"
                    className="w-full h-full border-0 absolute inset-0"
                  />
                </div>
              </div>

              {/* Info & Download */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-3">Subhash Kumar</h3>
                <p className="text-primary font-mono text-sm mb-4">React Frontend Developer</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  React Frontend Developer • 1+ Years Experience • Available for opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <motion.a
                    href="/Subhash_Developer_NewResumeex12.pdf"
                    download
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover-glow"
                  >
                    <Download size={18} />
                    Download PDF
                  </motion.a>
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass-card font-semibold text-foreground gradient-border hover-glow"
                  >
                    <Eye size={18} />
                    View
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-xl p-5 text-center"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-3">
                  <Icon size={22} />
                </div>
                <p className="font-bold text-foreground">{label}</p>
                <p className="text-muted-foreground text-xs mt-1">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full Screen Resume Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] glass-card rounded-2xl border border-primary/20 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <FileText className="text-primary" size={20} />
                  <h3 className="font-bold">Resume.pdf</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href="/Subhash_Developer_NewResumeex12.pdf" 
                    download 
                    className="p-2 bg-background/50 hover:bg-primary/20 hover:text-primary rounded-full transition-colors"
                    title="Download"
                  >
                    <Download size={18} />
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 bg-background/50 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full bg-muted/20">
                <iframe
                  src="/Subhash_Developer_NewResumeex12.pdf#view=FitH"
                  title="Resume Full View"
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
