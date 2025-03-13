import React from "react";

const partners = [
  "../../assets/partners/SleepyOwlLogoBlack.png", // Sleepy owl logo
  "../../assets/partners/hudl.png", // Hudl logo
  "../../assets/partners/Decathlon.png", // Decathlon logo
  "../../assets/partners/momomia.png", // Momomia logo
  "../../assets/partners/HelloSearch.png", // HelloSearch logo
  "../../assets/partners/careerWill.png", // CareerWill logo
];

export const Partners = () => {
  return (
    <section className="bg-black py-8 sm:py-12 text-white overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">
          Our Partners
        </h2>
      </div>

      {/* Scrolling Wrapper */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        {/* Duplicating the items for smooth infinite scrolling */}
        <div className="animate-scroll flex gap-4 sm:gap-8">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="bg-[#0B192C] px-4 sm:px-8 py-4 sm:py-6 rounded-lg text-white shadow-lg min-w-[150px] sm:min-w-[300px] text-center"
            >
              {/* Lazy load images and optimize for responsiveness */}
              <img
                src={partner}
                alt={`Partner ${index}`}
                className="mx-auto max-h-12 sm:max-h-16 w-auto object-contain"
                loading="lazy" // Lazy load images for better performance
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
