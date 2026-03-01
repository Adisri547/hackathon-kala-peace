import { Link } from "react-router";
import { motion } from "motion/react";
import { Music, Wind, BookOpen, Sparkles, Heart, Brain } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function HomePage() {
  const features = [
    {
      icon: Music,
      title: "Sound Therapy",
      description: "Immerse yourself in healing Indian Raagas and Vedic chants for deep relaxation and stress relief.",
      link: "/sound-therapy",
      color: "from-secondary to-primary",
      image: "https://images.unsplash.com/photo-1681731030418-8e11499ebd66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjbGFzc2ljYWwlMjBtdXNpYyUyMGluc3RydW1lbnRzfGVufDF8fHx8MTc3MjMzOTkxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Wind,
      title: "Breathing Mandala",
      description: "Interactive digital Mandalas and Rangoli that respond to your breathing, creating a meditative experience.",
      link: "/breathing-mandala",
      color: "from-accent to-primary",
      image: "https://images.unsplash.com/photo-1628450860617-97f211be90b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW5kYWxhJTIwYXJ0JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzcyMzM5OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: BookOpen,
      title: "Storytelling",
      description: "Experience wisdom from Panchatantra and Jataka Tales designed for emotional regulation and inner peace.",
      link: "/storytelling",
      color: "from-primary to-destructive",
      image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIweW9nYSUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjMzOTkxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const stats = [
    { icon: Heart, value: "5,000+", label: "Years of Heritage" },
    { icon: Brain, value: "3", label: "Healing Modalities" },
    { icon: Sparkles, value: "∞", label: "Peace Achieved" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block mb-6">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary via-primary to-accent rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
          Welcome to Kala & Peace
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Transforming 5,000 years of Indian art, sound, and stories into modern Digital Medicine
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/sound-therapy">
            <Button className="bg-gradient-to-r from-secondary to-primary hover:opacity-90">
              Begin Your Healing Journey
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center border-2 border-primary/20 bg-gradient-to-br from-card to-muted">
                <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* The Problem Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-16 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border-2 border-primary/20"
      >
        <h2 className="text-3xl mb-4 text-center">The Modern Challenge</h2>
        <p className="text-lg text-center max-w-2xl mx-auto text-muted-foreground">
          In today's fast-paced world, stress and anxiety have become the norm. Traditional data-driven solutions
          often miss what we truly need: a <span className="text-primary font-semibold">soulful intervention</span> that connects us to
          our roots and brings genuine peace.
        </p>
      </motion.div>

      {/* Features Grid */}
      <h2 className="text-3xl text-center mb-8">Explore Our Healing Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link to={feature.link}>
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 border-primary/20 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explore →
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Objective Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 rounded-2xl p-12 border-2 border-primary/30"
      >
        <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl mb-4">Our Mission</h2>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
          We believe that ancient wisdom holds the key to modern healing. By converting 5,000 years of
          aesthetic heritage into accessible digital tools, we're creating a bridge between tradition
          and technology—making <span className="text-primary font-semibold">Digital Medicine</span> that truly heals the soul.
        </p>
      </motion.div>
    </div>
  );
}
