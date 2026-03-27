import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Palette, Zap, Code2, Smartphone } from "lucide-react";

const highlights = [
  { icon: Palette, title: "UI/UX Focused", desc: "Pixel-perfect interfaces" },
  { icon: Zap, title: "Performance First", desc: "Optimized for speed" },
  { icon: Code2, title: "Clean Code", desc: "Maintainable & scalable" },
  { icon: Smartphone, title: "Responsive", desc: "Works on every device" },
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟩" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git", icon: "🔀" },
  { name: "Three.js", icon: "🧊" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Parallax blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-20 -left-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-20 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase text-center">
            Get to know me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Bio + Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a passionate React Frontend Developer with a keen eye for design and a love for creating
              smooth, performant web applications. I specialize in building modern UIs with React.js, Tailwind CSS,
              and cutting-edge web technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects,
              and continuously improving my craft.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                <MapPin size={14} className="text-primary" /> India
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                <Briefcase size={14} className="text-primary" /> 1+ Years Experience
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {highlights.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-card rounded-2xl p-6 text-center cursor-default"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={22} className="text-primary" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{title}</h4>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack 4-col grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto" style={{ boxShadow: 'none' }}>
            <h3 className="text-lg font-semibold mb-6 text-center">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="glass-card rounded-2xl p-4 text-center hover-lift cursor-default group"
                >
                  <span className="text-2xl mb-2 block">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
