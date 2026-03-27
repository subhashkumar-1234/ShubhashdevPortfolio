import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Redux", level: 80 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 70 },
      { name: "REST APIs", level: 80 },
    ],
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "MongoDB", level: 70 },
      { name: "Firebase", level: 65 },
      { name: "Git", level: 85 },
    ],
  },
];

const CircularProgress = ({
  level,
  name,
  delay,
  isInView,
}: {
  level: number;
  name: string;
  delay: number;
  isInView: boolean;
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="relative w-[100px] h-[100px]">
        <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(190 85% 48%)" />
              <stop offset="100%" stopColor="hsl(260 70% 58%)" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          <span className="text-lg font-bold font-mono">{level}%</span>
        </motion.div>
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
        {name}
      </span>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">What I Know</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto space-y-16">
          {skillCategories.map((cat, ci) => (
            <ScrollReveal key={cat.title} delay={ci * 0.1}>
              <div className="rounded-2xl glass-card p-8">
                <h3 className="text-center font-bold text-lg mb-8 text-primary tracking-wide uppercase">
                  {cat.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center max-w-3xl mx-auto">
                  {cat.skills.map((s, i) => (
                    <CircularProgress
                      key={s.name}
                      level={s.level}
                      name={s.name}
                      delay={ci * 0.15 + i * 0.08 + 0.2}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;