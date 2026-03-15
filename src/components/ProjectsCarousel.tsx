import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

const projects = [
  { 
    id: 1, 
    title: "Project Alpha", 
    description: "A groundbreaking sci-fi RPG set in a universe where time is currency. Navigate the Temporal Markets and rewrite your destiny.", 
    tags: ["Sci-Fi", "RPG", "Single Player"],
    color: "#4a90d9",
    gradient: "linear-gradient(135deg, #1a3a5c 0%, #4a90d9 100%)"
  },
  { 
    id: 2, 
    title: "Project Beta", 
    description: "Enter a sprawling fantasy MMORPG where ancient gods awakens. Forge alliances, build empires, and battle for cosmic supremacy.", 
    tags: ["Fantasy", "MMORPG", "Multiplayer"],
    color: "#9b59b6",
    gradient: "linear-gradient(135deg, #2d1f4a 0%, #9b59b6 100%)"
  },
  { 
    id: 3, 
    title: "Project Gamma", 
    description: "An action-adventure game spanning multiple dimensions. Fight through interdimensional threats and uncover hidden truths.", 
    tags: ["Action", "Adventure", "3D"],
    color: "#e74c3c",
    gradient: "linear-gradient(135deg, #3d1f20 0%, #e74c3c 100%)"
  },
  { 
    id: 4, 
    title: "Project Delta", 
    description: "A mind-bending puzzle platformer where gravity is your weapon. Navigate impossible architectures and solve cosmic riddles.", 
    tags: ["Puzzle", "Platformer", "2D"],
    color: "#2ecc71",
    gradient: "linear-gradient(135deg, #0f3d2a 0%, #2ecc71 100%)"
  },
  { 
    id: 5, 
    title: "Project Epsilon", 
    description: "Survive the unthinkable in this psychological horror experience. Your sanity is your only weapon against the unknown.", 
    tags: ["Horror", "Survival", "Atmospheric"],
    color: "#f39c12",
    gradient: "linear-gradient(135deg, #3d2e0f 0%, #f39c12 100%)"
  },
];

export function ProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="carousel-wrapper">
      <h2>Our Projects</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {projects.map((project) => (
            <div className="embla__slide project-slide" key={project.id}>
              <div className="project-card">
                <div className="project-image" style={{ background: project.gradient }}>
                  <div className="image-placeholder">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                </div>
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
