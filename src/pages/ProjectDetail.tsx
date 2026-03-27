import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar, Clock } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectChat from "@/assets/project-chat.jpg";
import projectAnalytics from "@/assets/project-analytics.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";

const projectData: Record<string, {
  title: string;
  desc: string;
  image: string;
  tech: string[];
  duration: string;
  year: string;
  role: string;
  overview: string;
  features: string[];
  challenges: string[];
  github: string;
  live: string;
}> = {
  "e-commerce-web-app": {
    title: "E-Commerce Web App",
    desc: "A full-featured online store with cart, checkout, payment integration, and responsive product catalog.",
    image: projectEcommerce,
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    duration: "3 months",
    year: "2024",
    role: "Full Stack Developer",
    overview: "Built a comprehensive e-commerce platform with product browsing, cart management, secure checkout via Stripe, user authentication, and an admin dashboard for inventory management.",
    features: [
      "Product catalog with filtering, sorting, and search",
      "Shopping cart with persistent state across sessions",
      "Secure payment integration with Stripe",
      "User authentication and order history",
      "Admin dashboard for product and order management",
      "Responsive design for all devices",
    ],
    challenges: [
      "Implemented optimistic UI updates for cart operations to ensure instant feedback",
      "Designed a scalable MongoDB schema for products with variants and categories",
      "Built a custom image optimization pipeline for product images",
    ],
    github: "https://github.com/subhashkumar68/ecommerce-web-app",
    live: "https://ecommerce-demo.vercel.app",
  },
  "chat-application": {
    title: "Chat Application",
    desc: "Real-time messaging app with socket connections, typing indicators, and media sharing capabilities.",
    image: projectChat,
    tech: ["React", "Socket.io", "Express", "Firebase"],
    duration: "2 months",
    year: "2024",
    role: "Frontend Developer",
    overview: "Developed a real-time chat application supporting 1-on-1 and group messaging with features like typing indicators, read receipts, and media sharing.",
    features: [
      "Real-time messaging with WebSocket connections",
      "Typing indicators and read receipts",
      "Media sharing (images, files, links)",
      "Group chat creation and management",
      "Push notifications for new messages",
      "Message search and chat history",
    ],
    challenges: [
      "Managed WebSocket connection lifecycle and reconnection logic",
      "Implemented efficient message pagination for large chat histories",
      "Built a custom notification system with service workers",
    ],
    github: "https://github.com/subhashkumar68/chat-application",
    live: "https://chat-app-demo.vercel.app",
  },
  "ai-analytics-dashboard": {
    title: "AI Analytics Dashboard",
    desc: "Data visualization platform with AI-powered insights, interactive charts, and custom reporting tools.",
    image: projectAnalytics,
    tech: ["React", "D3.js", "Python", "TensorFlow"],
    duration: "4 months",
    year: "2023",
    role: "Frontend Developer",
    overview: "Created an analytics dashboard that visualizes complex datasets with interactive charts, AI-powered trend analysis, and customizable reports.",
    features: [
      "Interactive D3.js charts with drill-down capabilities",
      "AI-powered trend detection and anomaly alerts",
      "Custom report builder with export options",
      "Real-time data streaming and updates",
      "Role-based access control for teams",
      "Dark/light theme with responsive layout",
    ],
    challenges: [
      "Optimized D3.js rendering for datasets with 100k+ data points",
      "Integrated Python ML models via REST API for real-time predictions",
      "Built a custom virtualized table for large dataset browsing",
    ],
    github: "https://github.com/subhashkumar68/ai-analytics-dashboard",
    live: "https://analytics-demo.vercel.app",
  },
  "portfolio-website": {
    title: "Portfolio Website",
    desc: "Modern developer portfolio with 3D animations, smooth transitions, and optimized performance scores.",
    image: projectPortfolio,
    tech: ["React", "Three.js", "Tailwind", "Vite"],
    duration: "1 month",
    year: "2024",
    role: "Designer & Developer",
    overview: "Designed and developed a modern portfolio website featuring 3D particle animations, smooth scroll-triggered reveals, and optimized Lighthouse scores.",
    features: [
      "3D particle field background with mouse interaction",
      "Smooth scroll-triggered section animations",
      "Dark/light theme with CSS variable system",
      "Responsive design for all screen sizes",
      "Optimized performance with lazy loading",
      "Contact form with validation",
    ],
    challenges: [
      "Created a performant canvas-based particle system",
      "Implemented smooth section transitions without layout shift",
      "Achieved 90+ Lighthouse scores across all categories",
    ],
    github: "https://github.com/subhashkumar68/portfolio-website",
    live: "https://subhashkumar.vercel.app",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <ParticleField />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-sm font-medium hover:text-primary transition-all active:scale-95"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </motion.div>

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{project.desc}</p>

            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {project.year}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {project.duration}</span>
              <span className="font-medium text-foreground">{project.role}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-btn text-sm">
                <ExternalLink size={14} /> Live Demo
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card font-medium text-sm active:scale-95 transition-all hover:text-primary">
                <Github size={14} /> Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-bold mb-4">Challenges & Solutions</h2>
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;