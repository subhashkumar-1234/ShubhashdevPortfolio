import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-1 z-[60]"
    >
      <div className="w-full h-full bg-gradient-to-r from-primary to-accent" />
    </motion.div>
  );
}
