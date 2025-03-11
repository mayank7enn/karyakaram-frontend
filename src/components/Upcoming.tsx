import React, { useState } from 'react';
import RegistrationForm from './RegisterForms';

const events = [
  {
    id: 1,
    title: "Virtual Marathon",
    date: "March 15-30, 2025",
    location: "Virtual Event",
    "location-coords": "",
    image: "../../assets/marathon.jpg",
    register: true,
    detail: "Join our virtual marathon and compete with runners across Delhi! Track your progress through Strava and be part of this unique running experience. Complete the marathon at your own pace within the event duration."
  },
  {
    id: 2,
    title: "Battle of Bats",
    date: "April 5-20, 2025",
    location: "Delhi Corporate Park",
    "location-coords": "Corporate Park, Sector 21, Shahabad Mohammadpur, New Delhi, Delhi, 110077",
    image: "../../assets/cricket.jpg",
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
    <div id="upcoming" className="bg-[#0B192C] py-12 px-6">
      <h2 className="text-center text-3xl font-bold text-orange-500 mb-8">
        Upcoming Events
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative w-80 bg-black rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover filter brightness-50"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{event.title}</h3>
              <p className="text-gray-400 flex items-center mt-2">
                📅 {event.date}
              </p>
              {event["location-coords"] ? (
                <a
                  href={`https://www.google.com/maps?q=${event["location-coords"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 flex items-center"
                >
                  📍 {event.location}
                </a>
              ) : (
                <p className="text-gray-400 flex items-center">
                  📍 {event.location}
                </p>
              )}

              {/* Details Button */}
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2"
                  onClick={() => toggleDetails(event.id)}
                >
                  ℹ️ {expandedEventId === event.id ? "Hide Details" : "Show Details"}
                </button>

                {/* Register Button */}
                {event.register && (
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={() => setShowForm(true)}
                  >
                    📝 Register
                  </button>
                )}
              </div>

              {/* Smooth Transition for Details */}
              <div
                className={`mt-4 overflow-hidden transition-all duration-300 ${
                  expandedEventId === event.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300">{event.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the Registration Form */}
      {showForm && <RegistrationForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default UpcomingEvents;