import React, { useState } from 'react';
import RegistrationForm from './RegisterForms';

const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "../..";
const events = [
  {
    id: 1,
    title: "Virtual Marathon",
    date: "March 15-30, 2025",
    location: "Virtual Event",
    "location-coords": "",
    image: `${frontendUrl}/assets/marathon.jpg`,
    register: true,
    detail: "Join our virtual marathon and compete with runners across Delhi! Track your progress through Strava and be part of this unique running experience. Complete the marathon at your own pace within the event duration."
  },
  {
    id: 2,
    title: "Battle of Bats",
    date: "April 5-20, 2025",
    location: "Delhi Corporate Park",
    "location-coords": "Corporate Park, Sector 21, Shahabad Mohammadpur, New Delhi, Delhi, 110077",
    image: `${frontendUrl}/assets/cricket.jpg`,
    register: false,
    detail: "The ultimate corporate cricket league! Bringing together Delhi's top companies for an exciting T20 format tournament. Experience corporate rivalry at its sporting best."
  },
];

const UpcomingEvents = () => {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const toggleDetails = (id: number) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div id="upcoming" className="bg-[#0B192C] py-8 sm:py-12 px-4 sm:px-6">
      {/* Section Title */}
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-orange-500 mb-6 sm:mb-8">
        Upcoming Events
      </h2>

      {/* Responsive Grid Layout */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative w-full sm:w-80 bg-black rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Event Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 sm:h-64 object-cover filter brightness-50"
              loading="lazy" // Lazy load images for better performance
            />
            <div className="p-4 sm:p-6">
              {/* Event Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white">{event.title}</h3>
              {/* Event Date */}
              <p className="text-xs sm:text-sm text-gray-400 flex items-center mt-2">
                📅 {event.date}
              </p>
              {/* Event Location */}
              {event["location-coords"] ? (
                <a
                  href={`https://www.google.com/maps?q=${event["location-coords"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-400 flex items-center"
                >
                  📍 {event.location}
                </a>
              ) : (
                <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                  📍 {event.location}
                </p>
              )}
              {/* Buttons */}
              <div className="mt-4 flex justify-between items-center">
                {/* Show/Hide Details Button */}
                <button
                  className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-2"
                  onClick={() => toggleDetails(event.id)}
                >
                  ℹ️ {expandedEventId === event.id ? "Hide Details" : "Show Details"}
                </button>

                {/* Register Button */}
                {event.register && (
                  <button
                    className="bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-2"
                    onClick={() => setShowForm(true)}
                  >
                    📝 Register
                  </button>
                )}
              </div>

              {/* Details Section */}
              <div
                className={`mt-4 overflow-hidden transition-all duration-300 ${expandedEventId === event.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                style={{ minHeight: expandedEventId === event.id ? "100px" : "0px" }} // Ensures consistency
              >
                <p className="text-xs sm:text-sm text-gray-300">{event.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the Registration Form */}
      {showForm && (
        <RegistrationForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default UpcomingEvents;
