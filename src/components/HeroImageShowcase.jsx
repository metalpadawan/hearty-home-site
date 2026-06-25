const showcaseImages = [
  {
    title: 'Team Cleaning',
    src: '/assets/images/hero-company-cleaning.jpeg',
    alt: 'Group of professional cleaners working in a modern dining room',
    position: 'center',
  },
  {
    title: 'Professional Crew',
    src: '/assets/images/hero-domestic-cleaning.jpeg',
    alt: 'Three professional cleaners standing with cleaning equipment indoors',
    position: 'center',
  },
  {
    title: 'Home Cleaning Team',
    src: '/assets/images/hero-interior-workspace.jpeg',
    alt: 'Cleaning team in uniforms ready to work in a modern home',
    position: 'center',
  },
  {
    title: 'Focused Cleaning',
    src: '/assets/images/hero-property-care.jpeg',
    alt: 'Professional cleaners caring for a modern living room',
    position: 'center',
  },
];

export default function HeroImageShowcase() {
  return (
    <figure
      className="relative z-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-teal-900 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:rounded-[2.5rem]"
      aria-label="Service image showcase for Hearty Home Services"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {showcaseImages.map((image, index) => (
          <img
            src={image.src}
            alt={image.alt}
            className="hero-slide absolute inset-0 h-full w-full object-cover object-center"
            key={image.title}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            style={{ animationDelay: `${index * 5}s`, objectPosition: image.position }}
          />
        ))}
      </div>
      <figcaption className="sr-only">Full-width hero images showing cleaning, property, business, and interior service themes.</figcaption>
    </figure>
  );
}
