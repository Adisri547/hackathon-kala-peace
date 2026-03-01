import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { SoundTherapyPage } from "./pages/sound-therapy-page";
import { BreathingMandalaPage } from "./pages/breathing-mandala-page";
import { StorytellingPage } from "./pages/storytelling-page";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "sound-therapy", Component: SoundTherapyPage },
      { path: "breathing-mandala", Component: BreathingMandalaPage },
      { path: "storytelling", Component: StorytellingPage },
    ],
  },
]);
