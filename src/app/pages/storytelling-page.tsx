import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Heart, Brain, Smile, Target, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Story {
  id: string;
  title: string;
  source: string;
  emotion: string;
  description: string;
  moral: string;
  fullStory: string;
  image: string;
  color: string;
  icon: typeof Heart;
}

export function StorytellingPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const stories: Story[] = [
    {
      id: "monkey-crocodile",
      title: "The Monkey and the Crocodile",
      source: "Panchatantra",
      emotion: "Trust & Wisdom",
      description: "A tale about friendship, betrayal, and quick thinking",
      moral: "Presence of mind can help overcome dangerous situations. True friendship is built on trust.",
      fullStory: `Once upon a time, a monkey lived on a berry tree by a river. He was lonely and longed for a friend. One day, a crocodile swam to the tree and rested under it.

The monkey offered him delicious berries. The crocodile enjoyed them and visited the monkey daily. They became the best of friends.

The monkey sent berries for the crocodile's wife. But the wife was jealous of their friendship and pretended to be ill. She told her husband that only by eating the monkey's heart could she recover.

The crocodile was troubled but agreed to bring his friend. He invited the monkey to his home for dinner. Midway through the river, the crocodile revealed his true intention.

The clever monkey kept his composure and said, "My heart is on the tree! I left it there for safekeeping. Let's go back so I can get it for your wife."

The foolish crocodile believed him and swam back. The monkey jumped onto the tree and said, "You broke my trust. A friendship built on lies is no friendship at all." The crocodile realized his mistake and swam away, ashamed.`,
      image: "https://images.unsplash.com/photo-1680453140919-f535419b3fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaW5kaWFuJTIwYm9vayUyMHdpc2RvbXxlbnwxfHx8fDE3NzIzNDAwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-emerald-400 to-teal-500",
      icon: Heart,
    },
    {
      id: "peacock-crow",
      title: "The Peacock and the Crane",
      source: "Panchatantra",
      emotion: "Self-Worth & Humility",
      description: "Understanding that everyone has unique gifts",
      moral: "True worth lies not in appearance, but in one's abilities and character. Don't judge others by their looks.",
      fullStory: `A beautiful peacock was standing by a lake, admiring his reflection in the water. His magnificent feathers shimmered with brilliant colors, and he felt immensely proud.

A simple crane walked by, and the peacock mocked him, saying, "Look at you! Your feathers are so dull and plain. You have no beauty at all. I am blessed with such splendid colors!"

The crane listened calmly and replied, "It is true that you are very beautiful, friend. Your feathers are indeed magnificent. But tell me, can you soar high into the sky and touch the clouds?"

The peacock was confused. The crane continued, "While you strut on the ground, I can fly to great heights and see the world from above. I can cross rivers and mountains with ease. Beauty is wonderful, but functionality and skills have their own value."

The peacock realized that he had been foolish to mock the crane. He understood that everyone has their own unique strengths and that true worth comes from what one can do, not just how one appears.

From that day on, the peacock never boasted about his beauty again and learned to respect others for their abilities.`,
      image: "https://images.unsplash.com/photo-1771575522385-03403deadd16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwaW5kaWFuJTIwYXJ0fGVufDF8fHx8MTc3MjM0MDAxMXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-400 to-purple-500",
      icon: Smile,
    },
    {
      id: "elephant-dog",
      title: "The Elephant and the Dog",
      source: "Jataka Tales",
      emotion: "Compassion & Kindness",
      description: "An unlikely friendship that teaches us about compassion",
      moral: "Kindness knows no boundaries. True friendship transcends differences in size, status, or species.",
      fullStory: `In ancient times, a royal elephant lived in the king's stable. He was well-fed and well-cared for, but he was lonely.

One day, a small stray dog wandered into the stable, hungry and cold. The elephant, moved by compassion, shared his food with the little dog. The dog was grateful and stayed with the elephant.

Days passed, and the two became inseparable friends. The elephant would protect the dog, and the dog would play around the elephant's feet, bringing joy to his life. They ate together, rested together, and found happiness in each other's company.

One day, a farmer saw the dog and, thinking he was a stray, sold him to someone in a distant village. The elephant was heartbroken. He stopped eating and became ill. The royal veterinarians tried everything, but the elephant grew weaker each day.

The wise king asked, "What has happened to my elephant?" The mahout replied, "Your Majesty, he misses his friend, the little dog who lived with him."

The king immediately sent messengers throughout the kingdom to find the dog. When the dog was found and brought back, the elephant's eyes lit up with joy. He trumpeted happily and began eating again.

The king understood that true friendship has nothing to do with size, status, or species. It is built on genuine care and affection.`,
      image: "https://images.unsplash.com/photo-1641666017729-f2d414711372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHRyYWRpdGlvbmFsJTIwaW5kaWF8ZW58MXx8fHwxNzcyMzQwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-amber-400 to-orange-500",
      icon: Heart,
    },
    {
      id: "deer-reflection",
      title: "The Deer and His Reflection",
      source: "Panchatantra",
      emotion: "Self-Acceptance",
      description: "Learning to appreciate what we have",
      moral: "Often, what we consider our weaknesses turn out to be our greatest strengths. Learn to appreciate yourself.",
      fullStory: `A beautiful deer lived in a forest. He had magnificent antlers that branched like a crown, and he was very proud of them. However, he was ashamed of his thin, delicate legs.

Every day, he would go to a clear pond to admire his antlers in the reflection. "How beautiful my antlers are!" he would say. "But these thin legs of mine are so ugly and weak."

One fateful day, a lion spotted the deer and began to chase him. The deer ran as fast as his legs could carry him. His slender legs were swift and strong, carrying him far ahead of the lion.

But as he ran through the forest, his magnificent antlers became entangled in the branches of a tree. He struggled desperately to free himself, but the antlers held him fast.

The lion was catching up. In those terrifying moments, the deer realized the truth: the legs he had despised had saved his life, while the antlers he had admired had become his downfall.

By fortune, a hunter's shout scared the lion away, and the deer managed to break free. From that day on, he understood that what he considered his weakness was actually his greatest strength, and what he prized most had nearly caused his death.

The deer learned to appreciate all parts of himself and never judged by appearances again.`,
      image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIweW9nYSUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjMzOTkxMnww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-green-400 to-emerald-500",
      icon: Brain,
    },
    {
      id: "tortoise-geese",
      title: "The Tortoise and the Geese",
      source: "Panchatantra",
      emotion: "Self-Control & Patience",
      description: "The importance of listening and restraint",
      moral: "Sometimes silence is golden. Know when to speak and when to remain quiet. Impatience can lead to disaster.",
      fullStory: `A tortoise lived in a lake with two geese who were his dear friends. Year after year, they lived happily together.

But one summer, the lake began to dry up. The geese knew they had to fly to another lake to survive. They were sad to leave their friend behind, for the tortoise could not fly.

The clever tortoise said, "Take me with you! I have an idea. Bring a long stick. I will hold the middle of the stick in my mouth, and you both can hold the ends with your beaks. This way, you can carry me to the new lake."

The geese agreed but warned him, "You must not speak during the journey, no matter what happens. If you open your mouth, you will fall."

The tortoise promised to remain silent. The three friends began their journey through the sky.

As they flew over a village, people looked up in amazement. "Look! Two geese are carrying a tortoise on a stick!" they exclaimed. Some laughed, and some pointed.

The tortoise heard their comments and grew irritated. "What's so funny?" he wanted to shout. Children began to mock them, and the tortoise's patience wore thin.

Finally, unable to control himself, the tortoise opened his mouth to retort, "Mind your own business!"

The moment he spoke, he lost his grip and fell from the sky. His inability to control his tongue cost him his life.

The geese mourned their friend, understanding that had he only listened to their advice and remained patient, he would still be alive.`,
      image: "https://images.unsplash.com/photo-1628450860617-97f211be90b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW5kYWxhJTIwYXJ0JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzcyMzM5OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-rose-400 to-pink-500",
      icon: Target,
    },
  ];

  const emotionCategories = [
    { name: "Trust & Wisdom", icon: Brain, count: stories.filter(s => s.emotion === "Trust & Wisdom").length },
    { name: "Self-Worth & Humility", icon: Smile, count: stories.filter(s => s.emotion === "Self-Worth & Humility").length },
    { name: "Compassion & Kindness", icon: Heart, count: stories.filter(s => s.emotion === "Compassion & Kindness").length },
    { name: "Self-Acceptance", icon: Target, count: stories.filter(s => s.emotion === "Self-Acceptance").length },
    { name: "Self-Control & Patience", icon: Target, count: stories.filter(s => s.emotion === "Self-Control & Patience").length },
  ];

  const storyPages = selectedStory ? selectedStory.fullStory.split('\n\n') : [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl mb-4 bg-gradient-to-r from-secondary via-primary to-destructive bg-clip-text text-transparent">
          Wisdom Through Stories
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ancient tales from Panchatantra and Jataka for emotional regulation and inner peace.
          Each story carries timeless wisdom for modern challenges.
        </p>
      </motion.div>

      {!selectedStory ? (
        <>
          {/* Emotion Categories */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6">Explore by Emotion</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {emotionCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 text-center hover:shadow-lg transition-all cursor-pointer border-2 border-primary/20 hover:border-primary/50">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-sm mb-1">{category.name}</div>
                      <Badge variant="secondary" className="text-xs">{category.count} stories</Badge>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stories Grid */}
          <div>
            <h2 className="text-2xl mb-6">All Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, index) => {
                const Icon = story.icon;
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary h-full"
                      onClick={() => {
                        setSelectedStory(story);
                        setCurrentPage(0);
                      }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${story.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-foreground">
                          {story.source}
                        </Badge>
                        <div className="absolute bottom-4 right-4">
                          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <Badge variant="outline" className="mb-3">{story.emotion}</Badge>
                        <h3 className="text-xl mb-2">{story.title}</h3>
                        <p className="text-sm text-muted-foreground">{story.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Story Reader */
        <AnimatePresence mode="wait">
          <motion.div
            key="story-reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-4xl mx-auto">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStory(null);
                  setCurrentPage(0);
                }}
                className="mb-6"
              >
                ← Back to Stories
              </Button>

              <Card className="overflow-hidden border-2 border-primary/20">
                {/* Story Header */}
                <div className={`relative h-64 bg-gradient-to-br ${selectedStory.color} p-8 flex items-end`}>
                  <div className="absolute inset-0 opacity-20">
                    <ImageWithFallback
                      src={selectedStory.image}
                      alt={selectedStory.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 text-white">
                    <Badge className="bg-white/20 text-white mb-3">{selectedStory.source}</Badge>
                    <h1 className="text-4xl mb-2">{selectedStory.title}</h1>
                    <p className="text-white/90">{selectedStory.emotion}</p>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[300px]"
                    >
                      <p className="text-lg leading-relaxed whitespace-pre-line">
                        {storyPages[currentPage]}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <div className="text-sm text-muted-foreground">
                      Page {currentPage + 1} of {storyPages.length}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(storyPages.length - 1, currentPage + 1))}
                      disabled={currentPage === storyPages.length - 1}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Moral Section */}
                {currentPage === storyPages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 bg-gradient-to-br ${selectedStory.color} text-white`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl mb-2">Moral of the Story</h3>
                        <p className="text-white/90 leading-relaxed">{selectedStory.moral}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
