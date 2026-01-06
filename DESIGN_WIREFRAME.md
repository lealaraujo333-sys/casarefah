# Casa Refah - Design System "Ethereal Modern"

## Overview
A redesign focused on bridging the gap between "artisanal warmth" and "tech-forward precision". We blend the organic textures of home goods with the interaction fidelity of top-tier SaaS products (Stripe/Linear).

## 1. Color Palette (HSL)
We move from "creamy" to "sculpted". Sharper contrasts, deeper accents.

### Base
- **Canvas**: `Paper White` (#FDFCFC / `30 5% 99%`) - Not pure white, but closer to paper.
- **Surface**: `Limestone` (#F5F4F0 / `38 10% 95%`) - Use for cards/sections.
- **Ink**: `Charcoal` (#1A1918 / `30 5% 10%`) - Primary text, softer than black.

### Accents
- **Primary**: `Clay` (#8E7C68 / `32 18% 48%`) - Earthy, refined.
- **Secondary**: `Dried Sage` (#9CA592 / `100 8% 61%`) - Organic touch.
- **Highlight**: `Burnished Gold` (#C8A675 / `35 45% 62%`) - For primary actions/focus.

## 2. Typography
**Pairing**: *Cormorant Garamond* (Display) + *Outfit* (UI/Functional).
- **Headings**: *Cormorant Garamond*. Italicize key words for emphasis. Tight tracking for display sizes (`-0.02em`).
- **Body/UI**: *Outfit*. Clean, legible, high x-height. 

## 3. Spacing & Layout (The "Breath" System)
- **Base Unit**: 4px.
- **Container**: Max 1400px (broad).
- **Grid**: 12-column, but frequent use of 4/8 or 5/7 splits (asymmetry).
- **Whitespace**: "Radical Generosity". Sections padded by `py-24` or `py-32`.

## 4. Visual Effects & Motion
- **Shadows**: "Ambient Light". No harsh drop shadows. `box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05)`.
- **Glassmorphism**: Subtle usage in sticky headers (`backdrop-blur-md` + `bg-white/80`).
- **Motion**: 
  - *Reveal*: Staggered text execution (lines slide up).
  - *Images*: Parallax or subtle scale-out on scroll.
  - *Interactions*: Buttons lift and glow, not just color swap.

---

# Wireframe: Home Page (Index)

## 1. Hero Section ("The Hook")
- **Layout**: Split screen. Left 60% (Typos + GTA), Right 40% (Abstract Image/Product montage).
- **Content**: Large Serif Headline: "Elevate your *Sanctuary*."
- **Interaction**: Mouse move affects the lighting on the right image (3d tilt effect).

## 2. "Philosophy" Ticker
- **Layout**: Full width scrolling marquee (infinite loop).
- **Content**: "Handmade in Brazil • Sustainable Materials • Timeless Design •" using a serif font.

## 3. The "Spotlight" (Bento Grid)
- **Layout**: 3 distinct cards in a grid.
  - Card 1 (Large, tall): Featured collection (Candles). Text at bottom.
  - Card 2 (Square): "New Arrivals" with a hover-reveal image.
  - Card 3 (Square): About the artisan (Story).
- **Style**: Rounded corners (`rounded-2xl`), subtle border (`border-black/5`).

## 4. Product Carousel "Curated"
- **Layout**: Horizontal scroll, but snapped.
- **Cards**: Minimalist. Image takes 85% of height. Name and price in small sans-serif below.

## 5. Footer "Monumental"
- **Layout**: Large typograph "CASA REFAH" spanning full width. Links organized in 4 columns.
- **Vibe**: Architectural.
