import { useEffect, useRef } from "react";

function NetworkBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId;
        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        // Particle network state
        const particles = [];
        const MAX_CONNECTION_DIST = 140;
        const CURSOR_RADIUS = 200;
        const CURSOR_CONNECT_DIST = 150;

        // Mouse tracking with smooth lerp
        const mouse = {
            x: -1000,
            y: -1000,
            targetX: -1000,
            targetY: -1000,
            isInside: false,
            intensity: 0,
        };

        const createParticles = () => {
            particles.length = 0;
            // Density roughly 1 node per 11,000 px^2, clamped
            const count = Math.min(120, Math.max(45, Math.floor((width * height) / 11000)));

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.55,
                    vy: (Math.random() - 0.5) * 0.55,
                    radius: 1.2 + Math.random() * 1.2,
                    baseAlpha: 0.18 + Math.random() * 0.12,
                });
            }
        };

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = window.devicePixelRatio || 1;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            createParticles();
        };

        // ResizeObserver ensures accurate dimension tracking
        const resizeObserver = new ResizeObserver(() => {
            resize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        resize();

        // Mouse interaction listeners on parent container
        const parent = canvas.parentElement || window;

        const handlePointerMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
            mouse.isInside = true;
        };

        const handlePointerLeave = () => {
            mouse.isInside = false;
        };

        parent.addEventListener("pointermove", handlePointerMove);
        parent.addEventListener("pointerleave", handlePointerLeave);

        // Animation loop
        const render = () => {
            // Smooth cursor interpolation
            if (mouse.isInside) {
                if (mouse.x < -500) {
                    mouse.x = mouse.targetX;
                    mouse.y = mouse.targetY;
                } else {
                    mouse.x += (mouse.targetX - mouse.x) * 0.12;
                    mouse.y += (mouse.targetY - mouse.y) * 0.12;
                }
                mouse.intensity += (1 - mouse.intensity) * 0.08;
            } else {
                mouse.intensity += (0 - mouse.intensity) * 0.05;
            }

            ctx.clearRect(0, 0, width, height);

            // 1. Localized radial glow around cursor
            if (mouse.intensity > 0.005) {
                const glowGradient = ctx.createRadialGradient(
                    mouse.x,
                    mouse.y,
                    0,
                    mouse.x,
                    mouse.y,
                    CURSOR_RADIUS
                );
                glowGradient.addColorStop(0, `rgba(201, 169, 110, ${0.13 * mouse.intensity})`);
                glowGradient.addColorStop(0.45, `rgba(201, 169, 110, ${0.04 * mouse.intensity})`);
                glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, CURSOR_RADIUS, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Update particle positions
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Gentle boundary bounce
                if (p.x <= 0) {
                    p.x = 0;
                    p.vx = Math.abs(p.vx);
                } else if (p.x >= width) {
                    p.x = width;
                    p.vx = -Math.abs(p.vx);
                }

                if (p.y <= 0) {
                    p.y = 0;
                    p.vy = Math.abs(p.vy);
                } else if (p.y >= height) {
                    p.y = height;
                    p.vy = -Math.abs(p.vy);
                }
            }

            // Precompute distance to cursor for all particles
            const particleIllums = new Float32Array(particles.length);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distToCursor = Math.hypot(dx, dy);

                if (distToCursor < CURSOR_RADIUS && mouse.intensity > 0.005) {
                    const factor = 1 - distToCursor / CURSOR_RADIUS;
                    particleIllums[i] = factor * mouse.intensity;
                } else {
                    particleIllums[i] = 0;
                }
            }

            // 3. Draw connecting lines between particles
            for (let i = 0; i < particles.length; i++) {
                const pi = particles[i];
                const illum_i = particleIllums[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const pj = particles[j];
                    const dx = pj.x - pi.x;
                    const dy = pj.y - pi.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < MAX_CONNECTION_DIST) {
                        const illum_j = particleIllums[j];
                        const lineIllum = Math.max(illum_i, illum_j);
                        const distFactor = 1 - dist / MAX_CONNECTION_DIST;

                        const baseAlpha = distFactor * 0.08;
                        const illuminatedAlpha = baseAlpha + lineIllum * distFactor * 0.45;

                        ctx.beginPath();
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);

                        if (lineIllum > 0.05) {
                            ctx.strokeStyle = `rgba(201, 169, 110, ${illuminatedAlpha})`;
                            ctx.lineWidth = 0.8 + lineIllum * 0.8;
                        } else {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha})`;
                            ctx.lineWidth = 0.65;
                        }
                        ctx.stroke();
                    }
                }

                // 4. Interactive spider-web connection from cursor directly to nearby particles
                if (illum_i > 0.05 && mouse.intensity > 0.01) {
                    const dx = pi.x - mouse.x;
                    const dy = pi.y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < CURSOR_CONNECT_DIST) {
                        const webAlpha = (1 - dist / CURSOR_CONNECT_DIST) * 0.35 * mouse.intensity;
                        ctx.beginPath();
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(201, 169, 110, ${webAlpha})`;
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }
            }

            // 5. Draw particles (nodes)
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const illum = particleIllums[i];

                const currentRadius = p.radius + illum * 1.8;
                const alpha = Math.min(1, p.baseAlpha + illum * 0.7);

                ctx.beginPath();
                ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);

                if (illum > 0.1) {
                    // Bright accent node under cursor illumination
                    ctx.fillStyle = `rgba(228, 198, 140, ${alpha})`;
                    ctx.fill();

                    // Subtle outer halo for illuminated nodes
                    if (illum > 0.25) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, currentRadius + 2.5 * illum, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(201, 169, 110, ${0.18 * illum})`;
                        ctx.fill();
                    }
                } else {
                    // Subtle idle node
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            parent.removeEventListener("pointermove", handlePointerMove);
            parent.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="home-network-canvas"
            aria-hidden="true"
        />
    );
}

export default NetworkBackground;

