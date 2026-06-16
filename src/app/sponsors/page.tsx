import Image from "next/image";

const sponsors = [
  {
    src: "/images/sponsors/sp1.png",
    alt: "SimScale",
    href: "https://www.simscale.com/",
    className: "h-8 sm:h-10",
  },
  {
    src: "/images/sponsors/sp2.png",
    alt: "SolidWorks",
    href: "https://www.solidworks.com/",
    className: "h-24 sm:h-28 md:h-36",
  },
  {
    src: "/images/sponsors/sp5.avif",
    alt: "OnlyScrews",
    href: "https://onlyscrews.in/",
    className: "h-16 sm:h-22 md:h-28",
  },
  {
    src: "/images/sponsors/sp4.png",
    alt: "Onshape",
    href: "https://www.onshape.com/en/",
    className: "h-12 sm:h-16 md:h-20",
  },
  {
    src: "/images/sponsors/sp7.png",
    alt: "BigBinary",
    href: "https://www.bigbinary.com/",
    className: "h-16 sm:h-20 md:h-28",
  },
];

export default function SponsorsPage() {
  return (
    <main>
      <div className="mt-12 pt-10 px-4">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          SPONSORS
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-14 max-w-5xl mx-auto">
          {sponsors.map(({ src, alt, href, className }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-opacity duration-200 hover:opacity-75"
            >
              <Image src={src} alt={alt} width={200} height={100} className={`object-contain ${className}`} />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}