import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import DishGallery from "@/components/DishGallery";
import Closing from "@/components/Closing";

// 3D centerpiece is client-only (WebGL) — loads after first paint
const SaltCrystal = dynamic(() => import("@/components/SaltCrystal"), { ssr: false });

export default function Home() {
  return (
    <>
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
        <DishGallery />
        <Closing />
      </main>

      <a className="reserve-fab" href="#reserve" data-hot>
        Reserve
      </a>

      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
