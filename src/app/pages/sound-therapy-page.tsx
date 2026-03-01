import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Slider } from "../components/ui/slider";

interface Raaga {
  id: string;
  name: string;
  description: string;
  benefits: string;
  time: string;
  color: string;
  frequency: number;
}

export function SoundTherapyPage() {
  const [selectedRaaga, setSelectedRaaga] = useState<Raaga | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const raagas: Raaga[] = [
    {
      id: "bhairav",
      name: "Raag Bhairav",
      description: "A morning raaga that evokes devotion and serenity",
      benefits: "Reduces anxiety, promotes spiritual awakening, ideal for morning meditation",
      time: "Best practiced at dawn (6-9 AM)",
      color: "from-orange-400 to-yellow-500",
      frequency: 256, // C4
    },
    {
      id: "yaman",
      name: "Raag Yaman",
      description: "An evening raaga that brings peace and joy",
      benefits: "Calms the mind, relieves stress, enhances creativity",
      time: "Best practiced at sunset (6-9 PM)",
      color: "from-purple-400 to-pink-500",
      frequency: 288, // D4
    },
    {
      id: "bhairavi",
      name: "Raag Bhairavi",
      description: "An all-time raaga expressing deep emotions",
      benefits: "Emotional healing, promotes introspection and self-awareness",
      time: "Can be practiced anytime",
      color: "from-blue-400 to-indigo-500",
      frequency: 320, // E4
    },
    {
      id: "darbari",
      name: "Raag Darbari Kanada",
      description: "A majestic night raaga for deep relaxation",
      benefits: "Deep sleep, releases tension, grounds the mind",
      time: "Best practiced late night (10 PM - 1 AM)",
      color: "from-indigo-600 to-purple-700",
      frequency: 240, // B3
    },
  ];

  const vedicChants = [
    {
      id: "om",
      name: "Om Meditation",
      description: "The primordial sound of the universe",
      benefits: "Balances all chakras, promotes universal consciousness",
      time: "Anytime",
      color: "from-amber-400 to-orange-600",
      frequency: 432, // A4 (healing frequency)
    },
    {
      id: "gayatri",
      name: "Gayatri Mantra",
      description: "Ancient chant for wisdom and enlightenment",
      benefits: "Enhances mental clarity, spiritual growth, removes negative energy",
      time: "Best at sunrise",
      color: "from-yellow-400 to-amber-500",
      frequency: 396, // G4
    },
  ];

  useEffect(() => {
    // Initialize Audio Context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const playSound = (raaga: Raaga) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Stop any existing sound
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    // Create new oscillator
    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(raaga.frequency, audioContextRef.current.currentTime);
    oscillator.connect(gainNodeRef.current);
    oscillator.start();

    oscillatorRef.current = oscillator;
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!selectedRaaga) return;

    if (isPlaying) {
      stopSound();
    } else {
      playSound(selectedRaaga);
    }
  };

  const handleRaagaSelect = (raaga: Raaga) => {
    stopSound();
    setSelectedRaaga(raaga);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Music className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl mb-4 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
          Sound Therapy
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the healing power of Indian Raagas and Vedic chants. Each raaga has specific therapeutic
          properties designed to balance your mind, body, and spirit.
        </p>
      </motion.div>

      {/* Player Section */}
      {selectedRaaga && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <Card className={`p-8 bg-gradient-to-br ${selectedRaaga.color} text-white border-none`}>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl mb-2">{selectedRaaga.name}</h2>
              <p className="text-white/90 mb-6">{selectedRaaga.description}</p>

              {/* Visualizer */}
              <div className="mb-6 h-32 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <motion.div
                  animate={isPlaying ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 rounded-full bg-white/30"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mb-6">
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>

                <div className="flex-1 flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Slider
                    value={[volume]}
                    onValueChange={(val) => setVolume(val[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white/90 text-sm w-12">{volume}%</span>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="font-semibold mb-1">Benefits</div>
                  <div className="text-white/90">{selectedRaaga.benefits}</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="font-semibold mb-1">Best Time</div>
                  <div className="text-white/90">{selectedRaaga.time}</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Raagas Grid */}
      <div className="mb-12">
        <h2 className="text-2xl mb-6">Indian Raagas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {raagas.map((raaga, index) => (
            <motion.div
              key={raaga.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRaaga?.id === raaga.id
                    ? "border-2 border-primary ring-4 ring-primary/20"
                    : "border-2 border-border hover:border-primary/50"
                }`}
                onClick={() => handleRaagaSelect(raaga)}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${raaga.color} mb-4 flex items-center justify-center`}>
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg mb-2">{raaga.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{raaga.description}</p>
                <div className="text-xs text-muted-foreground">{raaga.time}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vedic Chants Grid */}
      <div>
        <h2 className="text-2xl mb-6">Vedic Chants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vedicChants.map((chant, index) => (
            <motion.div
              key={chant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRaaga?.id === chant.id
                    ? "border-2 border-primary ring-4 ring-primary/20"
                    : "border-2 border-border hover:border-primary/50"
                }`}
                onClick={() => handleRaagaSelect(chant)}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${chant.color} mb-4 flex items-center justify-center`}>
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg mb-2">{chant.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{chant.description}</p>
                <div className="text-xs text-muted-foreground">{chant.time}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
