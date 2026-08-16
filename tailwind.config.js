/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void:     "#060B14",
        abyss:    "#0A0E17",
        slate:    "#121926",
        graphite: "#1E293B",
        steel:    "#334155",
        mist:     "#94A3B8",
        ash:      "#CBD5E1",
        bone:     "#E2E8F0",
        phosphor: "#33FF88",
        glow:     "#1AFF7A",
        ember:    "#F59E0B",
        signal:   "#3B82F6",
        coral:    "#F472B6",
      },
      fontFamily: {
        mono:    ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
      animation: {
        "cursor-blink":   "blink 1.1s step-end infinite",
        "fade-up":        "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":        "fadeIn 0.6s ease-out forwards",
        "slide-right":    "slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse":     "glowPulse 3s ease-in-out infinite",
        "grid-draw":      "gridDraw 1.5s ease-out forwards",
        "count-up":       "countUp 2s ease-out forwards",
        "scan-line":      "scanLine 4s linear infinite",
      },
      keyframes: {
        blink:      { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        fadeUp:     { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:     { from: { opacity: "0" }, to: { opacity: "1" } },
        slideRight: { from: { opacity: "0", transform: "translateX(-32px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        glowPulse:  { "0%,100%": { boxShadow: "0 0 12px rgba(51,255,136,0.15)" }, "50%": { boxShadow: "0 0 28px rgba(51,255,136,0.35)" } },
        gridDraw:   { from: { strokeDashoffset: "1000" }, to: { strokeDashoffset: "0" } },
        countUp:    { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scanLine:   { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(100vh)" } },
      },
      backgroundImage: {
        "grid-fine": "linear-gradient(rgba(51,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(51,255,136,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-fine": "40px 40px",
      },
    },
  },
  plugins: [],
};
