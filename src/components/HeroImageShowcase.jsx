const showcaseImages = [
  {
    title: 'Company Cleaning',
    src: '/assets/images/hero-company-cleaning.jpeg',
    alt: 'Woman vacuuming a bright modern living room',
    position: 'center',
  },
  {
    title: 'Domestic Cleaning',
    src: '/assets/images/hero-domestic-cleaning.jpeg',
    alt: 'Woman vacuuming a cosy modern home interior',
    position: 'center',
  },
  {
    title: 'Airbnb Turnover',
    src: '/assets/images/hero-interior-workspace.jpeg',
    alt: 'Housekeeper arranging bedding in a refined guest room',
    position: 'center',
  },
  {
    title: 'Property Care',
    src: '/assets/images/hero-property-care.jpeg',
    alt: 'Professional cleaners working in a modern home interior',
    position: 'center',
  },
];

export default function HeroImageShowcase() {
  return (
    <figure
      className="relative z-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-teal-900 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:rounded-[2.5rem]"
      aria-label="Service image showcase for Hearty Home Services"
    >
      <div className="relative h-[34vh] min-h-[280px] overflow-hidden sm:h-[46vh] sm:min-h-[360px] lg:h-[52vh] lg:min-h-[440px] lg:max-h-[560px]">
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
