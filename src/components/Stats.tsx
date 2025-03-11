import React from "react";
import { Trophy, Users, Handshake, MapPin } from "lucide-react";

const statsData = [
  { icon: Trophy, value: "10+", label: "Tournaments" },
  { icon: Users, value: "1000+", label: "Athletes Served" },
  { icon: Handshake, value: "10+", label: "Brands Collaborated" },
  { icon: MapPin, value: "20+", label: "Venues" },
];

export const Stats = () => {
  return (
    <section id="about" className="bg-black py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        {/* About Us Section */}
        <h2 className="text-3xl font-bold text-orange-500 mb-4">About Us</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
        Karyakaram started as a sports event management company, bringing people together through tournaments across Delhi. Now, we’re evolving into a community-driven platform, where people connect through events and online challenges. Whether on the field or online, we create spaces for competition, collaboration, and growth, making every interaction meaningful.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="relative flex justify-center">
              {/* Orange Background Card (Rotated) */}
              <div
                className="absolute w-full h-full bg-orange-500 rounded-lg transform rotate-2 -z-10"
                style={{ height: "100%", width: "100%" }}
              ></div>

              {/* Black Foreground Card */}
              <div
                className="relative bg-[#0B192C] p-6 rounded-lg shadow-lg flex flex-col items-center 
                  transition-transform duration-300 hover:-translate-y-3"
                style={{ width: "100%" }}
              >
                <stat.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-orange-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};