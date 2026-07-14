"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Item = { n: string; d?: string; p: string; v?: boolean };
type Cat = { key: string; title: string; note?: string; items: Item[] };

// Sel Noir's actual menu (selnoir.ca). Prices in CAD.
const MENU: Cat[] = [
  {
    key: "appetizers",
    title: "Appetizers",
    items: [
      { n: "Burrata", d: "Heirloom tomatoes, fried garlic, basil, capers, olive caramel, panko, homemade focaccia", p: "32" },
      { n: "Bone Marrow Beef Tartare", d: "Filet mignon AAA, bone marrow, capers, pickles, bone marrow emulsion", p: "36" },
      { n: "Bluefin Tuna Tartare", d: "Tomato water, shishito peppers, cucumber, yuzu aioli, puffed rice, chive oil, wonton chips", p: "32" },
      { n: "Chilled Poached Salmon", d: "Radish salad, kumquats, pickled chilies, puffed rice, Mujol caviar, dill yogurt, lemon oil", p: "32" },
      { n: "Beef Carpaccio", d: "Fried bocconcini, balsamic reduction, arugula, blueberries, black garlic aioli, parmesan", p: "32" },
      { n: "Grilled Octopus", d: "Olive tapenade, seasonal vegetables, crispy chorizo, homemade focaccia", p: "32" },
      { n: "Colossal Shrimp Cocktail (3)", d: "Served with spicy bourbon cocktail sauce", p: "32" },
      { n: "Caesar Salad", d: "Parmesan, anchovies, bacon, herb croutons", p: "18" },
      { n: "Vegan Caesar Salad", d: "Capers, pita chips, vegan Caesar dressing", p: "18", v: true },
      { n: "Beet Salad", d: "Beets, candied pecans, goat cheese, balsamic", p: "20" },
      { n: "Oysters", d: "Served with horseradish, mignonette and hot sauce", p: "MP" },
      { n: "Seafood Platter", d: "Salmon tartare, bluefin tuna tartare, giant shrimps (2), oysters (4) — for two", p: "80" },
      { n: "Cheese & Charcuterie Board", d: "Ask your waiter", p: "MP" },
    ],
  },
  {
    key: "turf",
    title: "Turf",
    note: "Served with cherry tomato confit & fresh horseradish. Recommended rare to medium-rare.",
    items: [
      { n: "Filet Mignon AAA · 8 oz", p: "68" },
      { n: "NY Strip AAA · 14 oz", p: "66" },
      { n: "Ribeye AAA · 16 oz", p: "74" },
      { n: "Full Rack of Lamb", d: "Mint sauce, blueberry purée & rosemary", p: "68" },
      { n: "Australian Wagyu NY Strip · 10 oz", p: "150" },
      { n: "Tomahawk · 21 days dry-aged · 40 oz", p: "160" },
      { n: "Bone-in Ribeye · 21 days dry-aged · 50 oz", p: "180" },
    ],
  },
  {
    key: "surf-turf",
    title: "Surf & Turf",
    note: "Choice of two sides, two sauces and two butters.",
    items: [
      { n: "Tomahawk 40 oz · 2 Tiger Shrimp · 1 Lobster Tail", d: "For two", p: "250" },
      { n: "Bone-in Ribeye 50 oz · 3 Tiger Shrimp · 2 Lobster Tail", d: "For three", p: "320" },
    ],
  },
  {
    key: "mains",
    title: "Mains",
    items: [
      { n: "Lobster & Shrimp Risotto", d: "Shrimp, lobster tail, squid ink, parmesan, bisque", p: "54" },
      { n: "AAA Black Angus Burger", d: "Bacon jam, caramelized onions, black garlic aioli, cheddar, fries & creamy coleslaw", p: "42" },
      { n: "Cavatelli", d: "Vodka rosé bolognese, burrata, basil", p: "40" },
      { n: "Branzino Filet", d: "Corn purée, seasonal vegetables, grilled pineapple salsa", p: "38" },
      { n: "Half BBQ Cornish Hen", d: "Served with fries and creamy homemade coleslaw", p: "38" },
    ],
  },
  {
    key: "sides",
    title: "Sides",
    items: [
      { n: "Fries", d: "Add truffle & parmesan +6", p: "12" },
      { n: "Garlic-Sautéed Mushrooms", d: "Button, portobello, oyster", p: "14", v: true },
      { n: "Mac & Cheese", d: "Add bacon jam +3", p: "14" },
      { n: "Fried Brussels Sprouts", d: "Truffle sour cream, pickled chilies, maple syrup", p: "14" },
      { n: "Loaded Baked Potato", d: "Bacon, cheddar, sour cream, green onions", p: "14" },
      { n: "Mashed Potatoes au Gratin", d: "Cheddar, parmesan, green onions", p: "14" },
      { n: "Homemade Coleslaw", p: "14" },
      { n: "Vegetables of the Day", d: "Ask your waiter", p: "14" },
    ],
  },
  {
    key: "extras",
    title: "Add-ons, Butters & Sauces",
    items: [
      { n: "Lobster Tail", p: "34" },
      { n: "Bone Marrow", d: "Parsley, confit garlic, pickled chilies, panko", p: "16" },
      { n: "Colossal Shrimp", p: "10" },
      { n: "Homemade Focaccia", d: "Parmesan, olive oil", p: "5" },
      { n: "Butters — Truffle · Wild Garlic · Herbs · Cajun", p: "7–9" },
      { n: "Sauces — Red Wine · Pepper · Blue Cheese · Chimichurri · Horseradish", p: "8" },
    ],
  },
];

export default function MenuSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>(".menu-cat").forEach((cat) => {
          gsap.from(cat, {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: cat, start: "top 85%" },
          });
        });
      },
      root
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="menu" className="menu">
      <div className="wrap">
        <header className="menu-head">
          <span className="label">The Table</span>
          <h2>Dinner, in full.</h2>
          <p>
            Prime AAA and dry-aged cuts over live fire, finished with black salt. Prices in CAD.
            <br />Market price (MP) items change with the day&apos;s catch.
          </p>
        </header>

        {MENU.map((cat) => (
          <div key={cat.key} className={`menu-cat menu-cat--${cat.key}`}>
            <div className="menu-cat-head">
              <h3>{cat.title}</h3>
              {cat.note && <p className="menu-cat-note">{cat.note}</p>}
            </div>
            <ul className="menu-items">
              {cat.items.map((it) => (
                <li key={it.n} className="menu-item">
                  <div className="menu-item-line">
                    <span className="menu-item-name">
                      {it.n}
                      {it.v && <span className="veg" aria-label="vegan">V</span>}
                    </span>
                    <span className="menu-leader" aria-hidden />
                    <span className="menu-price">{it.p === "MP" ? "MP" : `${it.p}`}</span>
                  </div>
                  {it.d && <p className="menu-item-desc">{it.d}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="menu-foot">
          <p>Buy the kitchen a beer +15</p>
          <a className="menu-reserve" href="#reserve" data-hot>Reserve a table</a>
        </div>
      </div>

      <style jsx>{`
        .menu {
          background: linear-gradient(to bottom, #0d0908, var(--black));
          padding: 16vh 0 14vh;
        }
        .menu-head { max-width: 640px; margin: 0 auto 8vh; text-align: center; }
        .menu-head h2 {
          font-size: clamp(2.4rem, 6vw, 4.6rem);
          margin: 1.1rem 0 1.3rem;
        }
        .menu-head p { color: var(--muted); line-height: 1.9; font-size: clamp(0.85rem, 1.2vw, 0.98rem); }

        .menu-cat { margin-bottom: 8vh; }
        .menu-cat-head {
          display: flex;
          align-items: baseline;
          gap: 1.4rem;
          padding-bottom: 2.2rem;
          margin-bottom: 2.4rem;
          border-bottom: 1px solid rgba(200, 133, 60, 0.16);
          flex-wrap: wrap;
        }
        .menu-cat-head h3 {
          font-size: clamp(1.7rem, 3.4vw, 2.7rem);
          color: var(--gold);
          letter-spacing: 0.01em;
        }
        .menu-cat-note { color: var(--muted); font-size: 0.82rem; letter-spacing: 0.02em; font-style: italic; }

        .menu-items {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.6rem 5rem;
        }
        /* single-column, roomier for the flagship steak & pairing sections */
        .menu-cat--turf .menu-items,
        .menu-cat--surf-turf .menu-items { grid-template-columns: 1fr; gap: 2rem; }

        .menu-item { break-inside: avoid; }
        .menu-item-line {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
        }
        .menu-item-name {
          font-family: var(--serif);
          font-size: clamp(1.05rem, 1.7vw, 1.35rem);
          color: var(--text);
          font-weight: 500;
        }
        .veg {
          display: inline-block;
          margin-left: 0.5rem;
          font-family: var(--grotesk);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: #8fae7a;
          border: 1px solid rgba(143, 174, 122, 0.5);
          border-radius: 2px;
          padding: 0.05rem 0.3rem;
          vertical-align: middle;
        }
        .menu-leader {
          flex: 1;
          border-bottom: 1px dotted rgba(154, 147, 136, 0.35);
          transform: translateY(-0.28em);
          min-width: 1.2rem;
        }
        .menu-price {
          font-family: var(--serif);
          font-size: clamp(1.05rem, 1.7vw, 1.3rem);
          color: var(--gold);
          white-space: nowrap;
        }
        .menu-item-desc {
          margin-top: 0.45rem;
          color: var(--muted);
          font-size: 0.86rem;
          line-height: 1.6;
          max-width: 42ch;
        }

        .menu-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-top: 4vh;
          padding-top: 3vh;
          border-top: 1px solid rgba(200, 133, 60, 0.16);
          flex-wrap: wrap;
        }
        .menu-foot p { color: var(--muted); font-size: 0.8rem; letter-spacing: 0.16em; text-transform: uppercase; }
        .menu-reserve {
          display: inline-block;
          padding: 1rem 2.2rem;
          border: 1px solid var(--ember-1);
          color: var(--ember-2);
          text-decoration: none;
          font-family: var(--grotesk);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .menu-reserve:hover { background: var(--ember-1); color: var(--black); }

        @media (max-width: 760px) {
          .menu-items { grid-template-columns: 1fr; gap: 2.2rem; }
          .menu-foot { justify-content: center; text-align: center; }
        }
      `}</style>
    </section>
  );
}
