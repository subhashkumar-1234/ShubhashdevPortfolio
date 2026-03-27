import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import ParticleField from "./ParticleField";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Different layers move at different speeds for depth
  const titleX = useTransform(springX, [-1, 1], [-20, 20]);
  const titleY = useTransform(springY, [-1, 1], [-12, 12]);

  const subtitleX = useTransform(springX, [-1, 1], [-12, 12]);
  const subtitleY = useTransform(springY, [-1, 1], [-8, 8]);

  const bodyX = useTransform(springX, [-1, 1], [-6, 6]);
  const bodyY = useTransform(springY, [-1, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleField />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center flex-1"
          >
            <motion.p
              style={{ x: bodyX, y: bodyY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-sm mb-4 tracking-widest uppercase"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              style={{ x: titleX, y: titleY }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              <span className="gradient-text">Subhash Kumar</span>
            </motion.h1>

            <motion.h2
              style={{ x: subtitleX, y: subtitleY }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground mb-6"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              style={{ x: bodyX, y: bodyY }}
              className="text-muted-foreground max-w-xl mx-auto mb-10 text-base sm:text-lg leading-relaxed"
            >
              Designing and developing robust full-stack solutions with modern technologies, ensuring efficient performance, clean architecture, and exceptional user experiences across frontend and backend.
            </motion.p>

            <motion.div
              style={{ x: bodyX, y: bodyY }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover-glow"
              >
                View Projects
              </a>
              {/* <a
                href="/Subhash_Developer_NewResumeex12.pdf"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl glass-card font-semibold text-foreground gradient-border hover-glow"
              >
                Download Resume
              </a> */}
              <a
                href="/Subhash_Developer_NewResumeex12.pdf"
                download
                className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent hover:border-primary font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div style={{ x: bodyX, y: bodyY }} className="flex gap-5 justify-center">
              {[
                { icon: Github, href: "https://github.com/subhashkumar-1234", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/subhashkumar05241/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:subhashkumar05241@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card text-muted-foreground hover:text-primary hover-glow transition-colors"
                  aria-label={label}
                >
                  <Icon size={22} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
