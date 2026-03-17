import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { CollectionEntry } from 'astro:content';

interface Project {
  id: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    color: string;
    gradient: string;
    cover?: string;
  };
}

interface Props {
  projects: Project[];
}

export function ProjectsCarousel({ projects }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="carousel-wrapper">
      <h2>Our Projects</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {projects.map((project) => (
            <div className="embla__slide project-slide" key={project.id}>
              <a href={`/projects/${project.id}`} className="project-card">
                <div 
                  className="project-image" 
                  style={project.data.cover 
                    ? { backgroundImage: `url(${project.data.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: project.data.gradient }
                  }
                >
                  {!project.data.cover && (
                    <div className="image-placeholder">
                      <span>{project.data.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.data.title}</h3>
                  <div className="project-tags">
                    {project.data.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p>{project.data.description}</p>
                </div>
              </a>
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
