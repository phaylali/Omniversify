import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

const loreItems = [
  { id: 1, name: "Aether", type: "Character", description: "The First Wanderer", color: "#1abc9c" },
  { id: 2, name: "Nexus War", type: "Event", description: "The Great Convergence", color: "#3498db" },
  { id: 3, name: "Lyra", type: "Character", description: "Queen of Shadows", color: "#9b59b6" },
  { id: 4, name: "The Fracture", type: "Event", description: "When worlds broke", color: "#e74c3c" },
  { id: 5, name: "Kairos", type: "Character", description: "Time Keeper", color: "#f1c40f" },
  { id: 6, name: "Crystal Age", type: "Era", description: "Age of Magic", color: "#2ecc71" },
];

export function LoreCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="carousel-wrapper">
      <h2>Lore: Characters & Events</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {loreItems.map((item) => (
            <div className="embla__slide" key={item.id}>
              <div className="lore-card" style={{ backgroundColor: item.color }}>
                <span className="lore-type">{item.type}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={() => emblaApi?.scrollPrev()}>←</button>
        <button onClick={() => emblaApi?.scrollNext()}>→</button>
      </div>
    </div>
  );
}
