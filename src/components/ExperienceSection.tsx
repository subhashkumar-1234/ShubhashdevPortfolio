import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className=" mx-auto py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase text-center">My Journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Experience & <span className="gradient-text">Internship</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative pl-16"
          >
            {/* Dot */}
            <div className="absolute left-3 top-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Briefcase size={14} className="text-primary-foreground" />
            </div>

            <ScrollReveal delay={0.1}>
              <div className="relative  pl-0 md:pl-1 pb-12">
                <div className="glass-card rounded-2xl p-6 top-20 hover-lift">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      <Calendar size={12} /> 2023 – 2024
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Briefcase size={12} /> Internship
                    </span>
                  </div>

                  <h3 className="text-lg font-bold">Frontend Developer Intern</h3>
                  <p className="text-primary font-medium text-sm mt-0.5">Meander Software Pvt. Ltd.</p>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      Built responsive React components with Tailwind CSS for client projects.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      Collaborated with designers and backend team to deliver pixel-perfect UIs.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      Implemented state management with Redux and API integration with REST endpoints.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary mt-1">▹</span>
                      Optimized web performance and improved Lighthouse scores by 30%.
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["React", "Redux", "Tailwind CSS", "REST APIs", "Git"].map((t) => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary/80 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="relative pl-0 md:pl-1">
                <div className="absolute -left-[50px] md:-left-[48px] top-7 w-5 h-5 rounded-full bg-accent shadow-lg shadow-accent/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                </div>
                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      <Calendar size={12} /> 2022 – 2023
                    </span>
                  </div>

                  <h3 className="text-lg font-bold">Self-Learning & Projects</h3>
                  <p className="text-accent font-medium text-sm mt-0.5">Freelance / Open Source</p>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                      Built multiple personal projects to strengthen frontend development skills
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                      Contributed to open-source repositories and online developer communities
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
