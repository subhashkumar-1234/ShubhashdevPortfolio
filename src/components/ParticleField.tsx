import { useEffect, useRef } from "react";

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Regular particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; baseSize: number }[] = [];
    const count = Math.min(80, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size,
        baseSize: size,
      });
    }

    // Stars
    const stars: { x: number; y: number; size: number; alpha: number; twinkleSpeed: number; phase: number }[] = [];
    const starCount = Math.min(40, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // Draw twinkling stars
      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.5 + 0.5;
        const alpha = s.alpha * twinkle;

        // Star glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 5);
        glow.addColorStop(0, `hsla(190, 90%, 80%, ${alpha * 0.4})`);
        glow.addColorStop(0.4, `hsla(270, 80%, 70%, ${alpha * 0.15})`);
        glow.addColorStop(1, `hsla(190, 90%, 50%, 0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Star cross rays
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.strokeStyle = `hsla(190, 90%, 80%, ${alpha})`;
        ctx.lineWidth = 0.5;
        const rayLen = s.size * 4 * twinkle;
        ctx.beginPath();
        ctx.moveTo(s.x - rayLen, s.y);
        ctx.lineTo(s.x + rayLen, s.y);
        ctx.moveTo(s.x, s.y - rayLen);
        ctx.lineTo(s.x, s.y + rayLen);
        ctx.stroke();
        ctx.restore();

        // Star core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha})`;
        ctx.fill();
      });

      // Draw particles with mouse interaction
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const glowRadius = 250;
        const proximity = Math.max(0, 1 - mdist / glowRadius);

        p.size = p.baseSize + proximity * 3;

        if (proximity > 0) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `hsla(190, 90%, 60%, ${0.3 * proximity})`);
          gradient.addColorStop(0.5, `hsla(270, 80%, 60%, ${0.15 * proximity})`);
          gradient.addColorStop(1, `hsla(190, 90%, 50%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        const alpha = 0.4 + proximity * 0.6;
        const lightness = 50 + proximity * 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 90%, ${lightness}%, ${alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(190, 90%, 50%, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (mdist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `hsla(270, 80%, 60%, ${0.2 * (1 - mdist / 200)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default ParticleField;
