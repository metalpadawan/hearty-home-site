const showcaseImages = [
  {
    title: 'Company Cleaning',
    src: '/assets/images/hero-company-cleaning.jpeg',
    alt: 'Cleaner meeting a business client in a professional workspace',
  },
  {
    title: 'Property Care',
    src: '/assets/images/hero-property-care.jpeg',
    alt: 'Person inspecting a small model house with a magnifying glass',
  },
  {
    title: 'Interior Spaces',
    src: '/assets/images/hero-interior-workspace.jpeg',
    alt: 'Modern styled interior workspace',
  },
  {
    title: 'Domestic Cleaning',
    src: '/assets/images/hero-domestic-cleaning.jpeg',
    alt: 'Mop and cleaning supplies on a bright tiled floor',
  },
];

export default function HeroImageShowcase() {
  return (
    <figure className="absolute inset-0 overflow-hidden bg-teal-950" aria-label="Service image showcase for Hearty Home Services">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(213,180,106,0.22),transparent_34%),radial-gradient(circle_at_60%_70%,rgba(22,127,143,0.32),transparent_36%)]" />
      <div className="absolute left-0 right-0 top-1/2 mx-auto w-full max-w-7xl -translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <div className="relative ml-auto aspect-[16/10] max-h-[66vh] overflow-hidden rounded-[1.5rem] border border-white/10 bg-teal-900/45 shadow-2xl sm:rounded-[2rem] lg:w-[68%]">
          {showcaseImages.map((image, index) => (
            <img
              src={image.src}
              alt={image.alt}
              className="hero-slide absolute inset-0 h-full w-full object-cover object-center"
              key={image.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              style={{ animationDelay: `${index * 5}s` }}
            />
          ))}
        </div>
      </div>
      <figcaption className="sr-only">Full-width hero images showing cleaning, property, business, and interior service themes.</figcaption>
    </figure>
  );
}
