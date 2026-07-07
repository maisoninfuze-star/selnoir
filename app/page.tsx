import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Marquee from "@/components/Marquee";
import DishGallery from "@/components/DishGallery";
import Closing from "@/components/Closing";
import ReserveFab from "@/components/ReserveFab";

// Video-driven centerpiece is client-only — loads after first paint
const SaltCrystal = dynamic(() => import("@/components/SaltCrystal"), { ssr: false });

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Cursor />

      <nav className="nav">
        <span className="brand">SEL NOIR</span>
        <div className="links">
          <a href="#reserve">Menu</a>
          <a href="#reserve">The Room</a>
          <a href="#reserve">Reserve</a>
        </div>
      </nav>

      <main>
        <Hero />
        <SaltCrystal />
        <Story />
        <Marquee />
        <DishGallery />
        <Closing />
      </main>

      <ReserveFab />

      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
