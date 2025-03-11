import React, { useState, useEffect } from "react";

interface Tournament {
  image: string[]; // Array of image paths
  title: string;
  location: string;
}

interface TournamentsProps {
  tournaments: Tournament[];
}

export const Tournaments: React.FC<TournamentsProps> = ({ tournaments }) => {
  // State to track the current image index for each tournament
  const [currentImages, setCurrentImages] = useState<{ [key: number]: number }>(
    () =>
      Object.fromEntries(
        tournaments.map((_, index) => [index, 0]) // Initialize all indexes to 0
      )
  );

  useEffect(() => {
    const intervals = tournaments.map((tournament, index) => {
      return setInterval(() => {
        setCurrentImages((prev) => ({
          ...prev,
          [index]: (prev[index] ?? 0) + 1 >= tournament.image.length
            ? 0
            : (prev[index] ?? 0) + 1,
        }));
      }, 3000); // Change image every 3 seconds
    });

    // Cleanup intervals on unmount
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [tournaments]);

  return (
    <section id="tournaments" className="py-20 bg-[#0B192C]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Recent <span className="text-orange-500">Tournaments</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tournaments.map((tournament, index) => (
            <div
              key={index}
              className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-500"
            >
              {/* Display one image at a time */}
              <div className="relative w-full h-48 overflow-hidden">
                {tournament.image.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`${tournament.title} - Image ${imgIndex + 1}`}
                    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
                      imgIndex === (currentImages[index] ?? 0)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {tournament.title}
                </h3>

                <div className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 12.414a6 6 0 10-8.486 8.486l4.243-4.243M12 10v6m0 0V4m0 6h6m-6 0H6"
                    />
                  </svg>
                  <span>{tournament.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
