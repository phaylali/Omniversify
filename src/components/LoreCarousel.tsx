import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

interface WikiEntry {
  id: string;
  data: {
    title: string;
    category: 'characters' | 'realms' | 'weapons' | 'events';
    description: string;
    color: string;
  };
}

interface Props {
  wiki: WikiEntry[];
}

const categoryLabels: Record<string, string> = {
  characters: "Character",
  realms: "Realm",
  weapons: "Weapon",
  events: "Event",
};

export function LoreCarousel({ wiki }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="carousel-wrapper">
      <h2>Lore: Characters & Events</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {wiki.map((item) => {
            const slug = item.id.split('/').pop();
            return (
            <div className="embla__slide" key={item.id}>
              <a href={`/wiki/${item.data.category}/${slug}`} className="lore-card" style={{ backgroundColor: item.data.color }}>
                <span className="lore-type">{categoryLabels[item.data.category]}</span>
                <h3>{item.data.title}</h3>
                <p>{item.data.description}</p>
              </a>
            </div>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={() => emblaApi?.scrollPrev()}>←</button>
        <button onClick={() => emblaApi?.scrollNext()}>→</button>
      </div>
    </div>
  );
}
