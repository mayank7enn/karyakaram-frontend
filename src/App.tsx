import React from 'react';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { Tournaments } from './components/Tournament';
import { Footer } from './components/Footer';
import { Partners } from './components/Partners';
import UpcomingEvents from './components/Upcoming';

const tournaments = [
  {
    title: "Battle of Boots Junior",
    location: "Rohini",
    image: [
      "../assets/bob-jr/001.JPG",
      "../assets/bob-jr/002.JPG",
      "../assets/bob-jr/003.JPG",
      "../assets/bob-jr/004.JPG",
      "../assets/bob-jr/005.JPG",
    ],
  },
  {
    title: "Youth Soccer League",
    location: "Dr. Ambedkar Stadium",
    image: [
      "../assets/bob-saket/1.JPG",
      "../assets/bob-saket/2.JPG",
      "../assets/bob-saket/3.JPG",
      "../assets/bob-saket/4.JPG",
    ], 
  },
  {
    title: "Corporate Football Tournament",
    location: "Major Dhyan Chand Stadium",
    image: [
      "../assets/racket-ramble/1.JPG",
      "../assets/racket-ramble/2.JPG",
      "../assets/racket-ramble/3.JPG",
      "../assets/racket-ramble/4.JPG",
      "../assets/racket-ramble/5.JPG",
    ],
  },
];

const eventList = ["Battle of Boots 2.0", "Battle of Boots 3.0", "DFC"];

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header eventList={eventList} />
      <Stats />
      <UpcomingEvents />
      <Partners />
      <Tournaments tournaments={tournaments} />
      <Footer />
    </div>
  );
}

export default App;