import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, MapPin, Phone, Sparkles, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Stars animation canvas
function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const stars: { x: number; y: number; size: number; alpha: number; speed: number; twinkleSpeed: number; phase: number }[] = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.4 + 0.6;
        const alpha = s.alpha * twinkle;

        // Draw star glow
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        gradient.addColorStop(0, `hsla(190, 90%, 70%, ${alpha * 0.6})`);
        gradient.addColorStop(0.5, `hsla(270, 80%, 60%, ${alpha * 0.2})`);
        gradient.addColorStop(1, `hsla(190, 90%, 50%, 0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw star core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 90%, 80%, ${alpha})`;
        ctx.fill();

        // Slowly drift
        s.y -= s.speed * 0.2;
        if (s.y < -10) {
          s.y = h + 10;
          s.x = Math.random() * w;
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // ⚠️ Get your free access key from https://web3forms.com/ by entering subhashkumar05241@gmail.com
          access_key: "664cb6b4-1019-445d-8556-7d05169be541",
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setIsSuccess(true);
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "subhashkumar05241@gmail.com", color: "from-primary to-primary" },
    { icon: Phone, label: "+91 6206085795", color: "from-accent to-accent" },
    { icon: MapPin, label: "India", color: "from-primary to-accent" },
  ];

  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
    { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 00000 00000", required: false },
    { id: "subject", label: "Subject", type: "text", placeholder: "Project Inquiry", required: true },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Stars animation background */}
      <StarsCanvas />

      <motion.div
        style={{ y: blobY }}
        className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-accent/8 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute bottom-10 -left-20 w-64 h-64 rounded-full bg-primary/8 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4"
          >
            <Sparkles size={14} />
            Let's Connect
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto"
        >
          {/* Left info panel */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <MessageSquare size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Let's Talk</h3>
                  <p className="text-xs text-muted-foreground">I usually respond within 24 hours</p>
                </div>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, color }, i) => (
                  <motion.a
                    key={label}
                    href={i === 0 ? `mailto:${label}` : i === 1 ? `tel:${label.replace(/\s/g, "")}` : "#"}
                    whileHover={{ x: 6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                  >
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} text-primary-foreground`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Available for Work</span>
              </div>
              <p className="text-xs text-muted-foreground">Open to freelance & full-time opportunities</p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 glass-card rounded-2xl p-8 flex flex-col relative min-h-[400px]"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center flex-1 py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30"
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </motion.div>
                <div className="space-y-2 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors font-medium border border-border"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 flex-1 w-full">
                <div className="grid sm:grid-cols-2 gap-5">
                  {fields.map((field) => (
                    <div key={field.id} className="relative">
                      <label htmlFor={field.id} className="text-sm font-medium mb-2 block text-foreground flex items-center justify-between">
                        {field.label}
                        {!field.required && <span className="text-muted-foreground/50 font-normal text-xs">(Optional)</span>}
                      </label>
                      <div className="relative">
                        <input
                          id={field.id}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          className={`w-full px-4 py-3 rounded-xl bg-secondary text-foreground border transition-all text-sm placeholder:text-muted-foreground/50 ${focused === field.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            } focus:outline-none`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block text-foreground">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary text-foreground border transition-all text-sm resize-none placeholder:text-muted-foreground/50 ${focused === "message"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                      } focus:outline-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover-glow disabled:opacity-50 transition-all text-base"
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
