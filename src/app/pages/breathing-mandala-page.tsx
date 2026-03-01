import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Slider } from "../components/ui/slider";

type MandalaPattern = "lotus" | "rangoli" | "chakra" | "yantra";

export function BreathingMandalaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCycle, setBreathCycle] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState<MandalaPattern>("lotus");
  const [breathDuration, setBreathDuration] = useState(4);
  const [colorIntensity, setColorIntensity] = useState(80);

  const patterns = [
    {
      id: "lotus" as MandalaPattern,
      name: "Lotus Mandala",
      description: "Sacred lotus pattern for purity and enlightenment",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "rangoli" as MandalaPattern,
      name: "Rangoli Design",
      description: "Traditional floor art for prosperity and joy",
      color: "from-orange-400 to-red-500",
    },
    {
      id: "chakra" as MandalaPattern,
      name: "Chakra Wheel",
      description: "Energy center visualization for balance",
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: "yantra" as MandalaPattern,
      name: "Sri Yantra",
      description: "Sacred geometry for meditation and focus",
      color: "from-yellow-400 to-amber-500",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const size = Math.min(window.innerWidth - 80, 600);
      canvas.width = size;
      canvas.height = size;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isBreathing) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isBreathing, selectedPattern, breathDuration, colorIntensity]);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() / 1000;

    // Calculate breathing cycle (0 to 1)
    const cycle = (Math.sin(time * (2 * Math.PI) / (breathDuration * 2)) + 1) / 2;
    setBreathCycle(cycle);

    // Clear canvas
    ctx.fillStyle = "#FFF8F0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw mandala based on selected pattern
    drawMandala(ctx, centerX, centerY, cycle);

    animationRef.current = requestAnimationFrame(animate);
  };

  const drawMandala = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, cycle: number) => {
    const baseRadius = Math.min(centerX, centerY) * 0.7;
    const radius = baseRadius * (0.5 + cycle * 0.5);
    const intensity = colorIntensity / 100;

    ctx.save();
    ctx.translate(centerX, centerY);

    switch (selectedPattern) {
      case "lotus":
        drawLotus(ctx, radius, cycle, intensity);
        break;
      case "rangoli":
        drawRangoli(ctx, radius, cycle, intensity);
        break;
      case "chakra":
        drawChakra(ctx, radius, cycle, intensity);
        break;
      case "yantra":
        drawYantra(ctx, radius, cycle, intensity);
        break;
    }

    ctx.restore();
  };

  const drawLotus = (ctx: CanvasRenderingContext2D, radius: number, cycle: number, intensity: number) => {
    const petals = 8;
    const layers = 3;

    for (let layer = 0; layer < layers; layer++) {
      const layerRadius = radius * (1 - layer * 0.25);
      const rotation = (cycle * Math.PI * 2) + (layer * Math.PI / petals);

      for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals + rotation;

        ctx.beginPath();
        ctx.ellipse(
          Math.cos(angle) * layerRadius * 0.3,
          Math.sin(angle) * layerRadius * 0.3,
          layerRadius * 0.4,
          layerRadius * 0.2,
          angle,
          0,
          Math.PI * 2
        );

        const hue = (340 + layer * 10) % 360;
        const alpha = intensity * (1 - layer * 0.2);
        ctx.fillStyle = `hsla(${hue}, 70%, ${50 + cycle * 20}%, ${alpha})`;
        ctx.fill();

        ctx.strokeStyle = `hsla(${hue}, 80%, 30%, ${alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Center circle
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(45, 90%, 60%, ${intensity})`;
    ctx.fill();
  };

  const drawRangoli = (ctx: CanvasRenderingContext2D, radius: number, cycle: number, intensity: number) => {
    const points = 12;
    const layers = 5;

    for (let layer = 0; layer < layers; layer++) {
      const layerRadius = radius * (1 - layer * 0.18);
      const rotation = (cycle * Math.PI * 2) - (layer * Math.PI / points);

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i * 2 * Math.PI) / points + rotation;
        const r = layerRadius * (1 + Math.sin(i * 6 + cycle * Math.PI * 2) * 0.1);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const hue = (20 + layer * 30) % 360;
      const alpha = intensity * (1 - layer * 0.15);
      ctx.fillStyle = `hsla(${hue}, 85%, ${45 + cycle * 25}%, ${alpha * 0.4})`;
      ctx.fill();

      ctx.strokeStyle = `hsla(${hue}, 90%, 40%, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  const drawChakra = (ctx: CanvasRenderingContext2D, radius: number, cycle: number, intensity: number) => {
    const spokes = 7;
    const colors = [
      { h: 280, s: 80, l: 60 }, // Purple (Crown)
      { h: 260, s: 75, l: 55 }, // Indigo (Third Eye)
      { h: 200, s: 80, l: 50 }, // Blue (Throat)
      { h: 140, s: 70, l: 50 }, // Green (Heart)
      { h: 50, s: 85, l: 55 },  // Yellow (Solar Plexus)
      { h: 25, s: 90, l: 55 },  // Orange (Sacral)
      { h: 0, s: 80, l: 50 },   // Red (Root)
    ];

    // Draw concentric circles for chakras
    colors.forEach((color, index) => {
      const r = radius * (1 - index * 0.13);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      const alpha = intensity * (1 - index * 0.1);
      ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l + cycle * 15}%, ${alpha * 0.3})`;
      ctx.fill();
      ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l - 20}%, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw spokes
    for (let i = 0; i < spokes; i++) {
      const angle = (i * 2 * Math.PI) / spokes + (cycle * Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      ctx.strokeStyle = `hsla(45, 90%, 50%, ${intensity * 0.6})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  const drawYantra = (ctx: CanvasRenderingContext2D, radius: number, cycle: number, intensity: number) => {
    // Outer square
    const squareSize = radius * 1.4;
    ctx.strokeStyle = `hsla(45, 90%, 50%, ${intensity})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

    // Lotus petals (outer)
    const outerPetals = 16;
    for (let i = 0; i < outerPetals; i++) {
      const angle = (i * 2 * Math.PI) / outerPetals + (cycle * Math.PI);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(angle) * radius * 0.9,
        Math.sin(angle) * radius * 0.9
      );
      ctx.strokeStyle = `hsla(${40 + i * 5}, 80%, 55%, ${intensity * 0.4})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Interlocking triangles
    const triangles = 9;
    for (let i = 0; i < triangles; i++) {
      const size = radius * (0.8 - i * 0.08);
      const rotation = (i % 2 === 0 ? 0 : Math.PI) + (cycle * Math.PI * 2);

      ctx.save();
      ctx.rotate(rotation);

      ctx.beginPath();
      for (let j = 0; j < 3; j++) {
        const angle = (j * 2 * Math.PI) / 3;
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const hue = 45 + i * 10;
      const alpha = intensity * (1 - i * 0.08);
      ctx.fillStyle = `hsla(${hue}, 80%, ${50 + cycle * 20}%, ${alpha * 0.2})`;
      ctx.fill();
      ctx.strokeStyle = `hsla(${hue}, 90%, 45%, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    }

    // Center bindu (point)
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05 * (1 + cycle * 0.5), 0, Math.PI * 2);
    ctx.fillStyle = `hsla(0, 90%, 50%, ${intensity})`;
    ctx.fill();
  };

  const handleReset = () => {
    setIsBreathing(false);
    setBreathCycle(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    // Redraw static mandala
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFF8F0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawMandala(ctx, canvas.width / 2, canvas.height / 2, 0);
      }
    }
  };

  const breathPhase = breathCycle < 0.5 ? "Inhale" : "Exhale";

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Wind className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
          Breathing Mandala
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Synchronize your breath with beautiful, evolving mandalas and rangoli patterns.
          Watch as ancient art responds to your breathing rhythm, creating a meditative experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Canvas Section */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-2 border-primary/20">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-primary/20 rounded-lg shadow-lg"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                {isBreathing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full"
                  >
                    {breathPhase}
                  </motion.div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-4 w-full max-w-md">
                <Button
                  onClick={() => setIsBreathing(!isBreathing)}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-accent to-primary hover:opacity-90"
                >
                  {isBreathing ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" /> Start Breathing
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>

              {/* Breathing Progress */}
              {isBreathing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 w-full max-w-md"
                >
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-primary"
                      style={{
                        width: `${breathCycle * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-center mt-2 text-sm text-muted-foreground">
                    Breath Cycle: {breathPhase}
                  </p>
                </motion.div>
              )}
            </div>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Pattern Selection */}
          <Card className="p-6 border-2 border-primary/20">
            <h3 className="text-lg mb-4">Select Pattern</h3>
            <div className="space-y-3">
              {patterns.map((pattern) => (
                <motion.div
                  key={pattern.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => {
                      setSelectedPattern(pattern.id);
                      if (!isBreathing) handleReset();
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedPattern === pattern.id
                        ? "border-2 border-primary bg-primary/10"
                        : "border-2 border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${pattern.color} mb-2`} />
                    <div className="font-semibold mb-1">{pattern.name}</div>
                    <div className="text-sm text-muted-foreground">{pattern.description}</div>
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Breath Settings */}
          <Card className="p-6 border-2 border-primary/20">
            <h3 className="text-lg mb-4">Breathing Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-2 block">
                  Breath Duration: {breathDuration}s
                </label>
                <Slider
                  value={[breathDuration]}
                  onValueChange={(val) => setBreathDuration(val[0])}
                  min={2}
                  max={8}
                  step={1}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {breathDuration}s inhale + {breathDuration}s exhale
                </p>
              </div>

              <div>
                <label className="text-sm mb-2 block">
                  Color Intensity: {colorIntensity}%
                </label>
                <Slider
                  value={[colorIntensity]}
                  onValueChange={(val) => setColorIntensity(val[0])}
                  min={20}
                  max={100}
                  step={5}
                />
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-muted/30 to-card">
            <h3 className="text-lg mb-3">How to Use</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1. Select your preferred mandala pattern</li>
              <li>2. Adjust breathing duration to your comfort</li>
              <li>3. Click "Start Breathing" to begin</li>
              <li>4. Follow the expanding and contracting pattern</li>
              <li>5. Inhale as the mandala grows, exhale as it shrinks</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
