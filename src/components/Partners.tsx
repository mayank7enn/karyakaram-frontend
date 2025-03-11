import React from "react";

const partners = [
  "../../assets/partners/SleepyOwlLogoBlack.png", //sleepy owl logo
  "../../assets/partners/hudl.webp", //hudl logo
  "../../assets/partners/Decathlon.png", //decathlon logo
  "../../assets/partners/momomia.png", //momomia logo
  "../../assets/partners/HelloSearch.png", //momomia logo
  "../../assets/partners/careerWill.png", //momomia logo
  "../../assets/partners/SleepyOwlLogoBlack.png", //sleepy owl logo
  "../../assets/partners/hudl.webp", //hudl logo
  "../../assets/partners/Decathlon.png", //decathlon logo
  "../../assets/partners/momomia.png", //momomia logo
  "../../assets/partners/HelloSearch.png", //momomia logo
  "../../assets/partners/careerWill.png", //momomia logo
];

export const Partners = () => {
  return (
    <section className="bg-black py-12 text-white overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Our Partners</h2>
      </div>

      {/* Scrolling Wrapper */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        {/* Duplicating the items for smooth infinite scrolling */}
        <div className="animate-scroll flex gap-8">
            {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="bg-[#0B192C] px-20 py-6 rounded-lg text-white shadow-lg min-w-[300px] text-center"
            >
              <img src={partner} alt={`Partner ${index}`} className="mx-auto" />
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};