import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselNavButton } from "./CarouselNavButton";

interface WikiEntry {
  id: string;
  data: {
    title: string;
    category: 'characters' | 'realms' | 'weapons' | 'events' | 'locations';
    description: string;
    color: string;
  };
}

interface Props {
  wiki: WikiEntry[];
  category: string;
  title: string;
  icon?: string;
}

export function LoreCarousel({ wiki, category, title, icon }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  if (wiki.length === 0) return null;

  return (
    <div className="carousel-wrapper">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <h2 className="gradient-section-title">{icon ? `${icon} ` : ''}{title}</h2>
        <a
          href={`/wiki/${category}`}
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          View all →
        </a>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {wiki.map((item) => {
            const slug = item.id.split('/').pop();
            return (
            <div className="embla__slide" key={item.id}>
              <a href={`/wiki/${item.data.category}/${slug}`} className="lore-card" style={{ backgroundColor: item.data.color }}>
                <span className="lore-type">{title.replace(/s$/, '')}</span>
                <h3>{item.data.title}</h3>
                <p>{item.data.description}</p>
              </a>
            </div>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <CarouselNavButton direction="prev" onClick={() => emblaApi?.scrollPrev()} ariaLabel={`Previous ${title}`} />
        <CarouselNavButton direction="next" onClick={() => emblaApi?.scrollNext()} ariaLabel={`Next ${title}`} />
      </div>
    </div>
  );
}
