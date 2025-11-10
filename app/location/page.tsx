"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Heart,
  Navigation,
  Users,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LocationIndexPage = () => {
  // Mock data for karaoke locations
  const locations = [
    {
      id: "1",
      name: "Karaoke Central",
      address: "123 Music Street, Downtown",
      phone: "+1-555-0123",
      rating: 4.8,
      reviews: 324,
      distance: "0.5 km",
      cover: "https://placehold.co/400x200/6366f1/white?text=KC",
      hours: "10:00 AM - 12:00 AM",
      description:
        "The best karaoke experience in the city with private rooms and premium sound systems.",
    },
    {
      id: "2",
      name: "Sing & Dance Lounge",
      address: "456 Harmony Ave, Entertainment District",
      phone: "+1-555-0456",
      rating: 4.6,
      reviews: 287,
      distance: "1.2 km",
      cover: "https://placehold.co/400x200/8b5cf6/white?text=SDL",
      hours: "12:00 PM - 2:00 AM",
      description:
        "Fun atmosphere with themed rooms and special events every weekend.",
    },
    {
      id: "3",
      name: "Echo Karaoke Bar",
      address: "789 Rhythm Road, Arts Quarter",
      phone: "+1-555-0789",
      rating: 4.9,
      reviews: 412,
      distance: "1.8 km",
      cover: "https://placehold.co/400x200/10b981/white?text=EK",
      hours: "5:00 PM - 1:00 AM",
      description:
        "Premium karaoke with high-quality microphones and sound engineering.",
    },
    {
      id: "4",
      name: "Voice Box Studio",
      address: "321 Vocal Lane, Cultural Center",
      phone: "+1-555-0012",
      rating: 4.5,
      reviews: 198,
      distance: "2.3 km",
      cover: "https://placehold.co/400x200/f59e0b/white?text=VB",
      hours: "2:00 PM - 11:00 PM",
      description:
        "Professional-grade karaoke experience with recording options.",
    },
    {
      id: "5",
      name: "Melody Palace",
      address: "654 Tune Terrace, Central Plaza",
      phone: "+1-555-0345",
      rating: 4.7,
      reviews: 265,
      distance: "2.8 km",
      cover: "https://placehold.co/400x200/ec4899/white?text=MP",
      hours: "11:00 AM - 1:00 AM",
      description:
        "Family-friendly karaoke with special deals during weekdays.",
    },
    {
      id: "6",
      name: "SoundWave Karaoke",
      address: "987 Beat Boulevard, West End",
      phone: "+1-555-0678",
      rating: 4.4,
      reviews: 176,
      distance: "3.1 km",
      cover: "https://placehold.co/400x200/06b6d4/white?text=SWK",
      hours: "3:00 PM - 12:00 AM",
      description:
        "Great selection of songs in multiple languages with private and group rooms.",
    },
  ];

  // State for header
  const { state: authState } = useAuth();
  const [searchQuery] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={() => {}} // No-op for locations page
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Karaoke Locations</h1>
            <p className="text-gray-400">
              Find the best karaoke spots near you
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
            <MapPin className="h-4 w-4" />
            <span>Your Location</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/30 transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Image
                    src={location.cover}
                    alt={location.name}
                    width={400}
                    height={200}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{location.name}</h2>
                      <div className="flex items-center space-x-1 mt-1 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{location.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-700 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{location.rating}</span>
                      <span className="text-gray-400 ml-1">
                        ({location.reviews})
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mt-3">{location.description}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{location.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Navigation className="h-4 w-4" />
                      <span>{location.distance}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm transition-colors">
                      <Navigation className="h-4 w-4" />
                      <span>Directions</span>
                    </button>
                    <button className="p-2 rounded-full border border-gray-400 hover:bg-gray-700">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm transition-colors">
                      <Users className="h-4 w-4" />
                      <span>Book Room</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LocationIndexPage;
