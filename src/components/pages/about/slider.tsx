import { inter, playfairDisplay } from "@components/fonts/typography";
import { ImageSlider } from "@/components/misc/image-slide";
import { Media } from "@/lib/about-us/types";

export default function SliderSection({ media }: { media: Media[] }) {
  const images = media.map((item) => item.url || "");
  const captions = media.map((item) => item.caption || "");

  if (images.length === 0) {
    return (
      <section className="w-full p-16 px-8 max-sm:p-8 flex flex-col justify-center items-center bg-black text-white h-full max-h-screen border-b border-[#2f2f2f]">
        <div className="relative flex flex-col justify-start items-center w-full h-full p-8 mt-16 max-sm:p-2 z-10">
          <div
            className={`${playfairDisplay.className} absolute -top-7.5 left-0 w-full z-20 tracking-wider text-9xl max-sm:text-7xl font-normal flex justify-center items-center`}
          >
            ORBIT
          </div>
          <div className="relative w-full max-w-8xl max-xl:aspect-9/16 aspect-4/3 overflow-hidden select-none border border-[#2f2f2f] flex justify-center items-center">
            <p
              className={`${inter.className} text-2xl text-[#c2c2c2] max-lg:text-xl max-sm:text-lg text-center `}
            >
              No media available at the moment
            </p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full p-16 px-8 max-sm:p-8 flex flex-col justify-center items-center bg-black text-white h-full max-h-screen border-b border-[#2f2f2f]">
      <div className="relative flex flex-col justify-start items-center w-full h-full p-8 mt-16 max-sm:p-2 z-10">
        <div
          className={`${playfairDisplay.className} absolute -top-7.5 left-0 w-full z-20 tracking-wider text-9xl max-sm:text-7xl font-normal flex justify-center items-center`}
        >
          ORBIT
        </div>
        <ImageSlider images={images} captions={captions} />
      </div>
    </section>
  );
}
