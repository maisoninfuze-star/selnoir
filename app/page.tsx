import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Marquee from "@/components/Marquee";
import DishGallery from "@/components/DishGallery";
import MenuSection from "@/components/MenuSection";
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
        <a className="brand" href="#top">SEL NOIR</a>
        <div className="links">
          <a href="#menu">Menu</a>
          <a href="#room">The Room</a>
          <a href="#reserve">Reserve</a>
        </div>
      </nav>

      <main id="top">
        <Hero />
        <SaltCrystal />
        <Story />
        <Marquee />
        <DishGallery />
        <MenuSection />
        <Closing />
      </main>

      <ReserveFab />

      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
