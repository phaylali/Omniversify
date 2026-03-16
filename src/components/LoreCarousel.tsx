import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

interface WikiEntry {
  id: string;
  data: {
    title: string;
    type: 'Character' | 'Event' | 'Era' | 'Location' | 'Artifact';
    description: string;
    color: string;
  };
}

interface Props {
  wiki: WikiEntry[];
}

export function LoreCarousel({ wiki }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="carousel-wrapper">
      <h2>Lore: Characters & Events</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {wiki.map((item) => (
            <div className="embla__slide" key={item.id}>
              <div className="lore-card" style={{ backgroundColor: item.data.color }}>
                <span className="lore-type">{item.data.type}</span>
                <h3>{item.data.title}</h3>
                <p>{item.data.description}</p>
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
