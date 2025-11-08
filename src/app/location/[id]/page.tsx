"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { MapPin, Phone, Star, Navigation, Users, Calendar } from "lucide-react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "next/navigation";

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
  distance: string;
  cover: string;
  hours: {
    [key: string]: string;
  };
  description: string;
  website: string;
  features: string[];
  upcomingEvents: Array<{
    id: string;
    name: string;
    date: string;
    time: string;
  }>;
  photos: string[];
}

const LocationPage = () => {
  const params = useParams();
  const locationId = params.id as string;

  // Mock data for different locations based on ID
  const getLocationData = (id: string): Location => {
    switch (id) {
      case "karaoke-central":
        return {
          id: "karaoke-central",
          name: "Karaoke Central",
          address: "123 Music Street, Downtown",
          phone: "+1-555-0123",
          rating: 4.8,
          reviews: 324,
          distance: "0.5 km",
          cover: "https://placehold.co/800x400/6366f1/white?text=KC",
          hours: {
            monday: "10:00 AM - 11:00 PM",
            tuesday: "10:00 AM - 11:00 PM",
            wednesday: "10:00 AM - 11:00 PM",
            thursday: "10:00 AM - 12:00 AM",
            friday: "10:00 AM - 2:00 AM",
            saturday: "9:00 AM - 2:00 AM",
            sunday: "12:00 PM - 10:00 PM",
          },
          description:
            "The best karaoke experience in the city with private rooms and premium sound systems. Our state-of-the-art equipment ensures crystal-clear audio and the largest song selection in town.",
          website: "https://karaokcentral.com",
          features: [
            "Private Rooms",
            "Premium Sound",
            "Food & Drinks",
            "VIP Packages",
          ],
          upcomingEvents: [
            {
              id: "1",
              name: "Open Mic Night",
              date: "2023-10-15",
              time: "8:00 PM",
            },
            {
              id: "2",
              name: "80s Theme Night",
              date: "2023-10-20",
              time: "9:00 PM",
            },
            {
              id: "3",
              name: "Karaoke Tournament",
              date: "2023-10-25",
              time: "7:00 PM",
            },
          ],
          photos: [
            "https://placehold.co/600x400/6366f1/white?text=Room+1",
            "https://placehold.co/600x400/8b5cf6/white?text=Room+2",
            "https://placehold.co/600x400/10b981/white?text=Bar",
            "https://placehold.co/600x400/f59e0b/white?text=Stage",
            "https://placehold.co/600x400/ec4899/white?text=VIP+Room",
            "https://placehold.co/600x400/06b6d4/white?text=Entrance",
          ],
        };
      case "sing-dance-lounge":
        return {
          id: "sing-dance-lounge",
          name: "Sing & Dance Lounge",
          address: "456 Harmony Ave, Entertainment District",
          phone: "+1-555-0456",
          rating: 4.6,
          reviews: 287,
          distance: "1.2 km",
          cover: "https://placehold.co/800x400/8b5cf6/white?text=SDL",
          hours: {
            monday: "12:00 PM - 11:00 PM",
            tuesday: "12:00 PM - 11:00 PM",
            wednesday: "12:00 PM - 11:00 PM",
            thursday: "12:00 PM - 1:00 AM",
            friday: "12:00 PM - 2:00 AM",
            saturday: "10:00 AM - 2:00 AM",
            sunday: "1:00 PM - 10:00 PM",
          },
          description:
            "Fun atmosphere with themed rooms and special events every weekend. Perfect for groups and parties. Dance floors and professional lighting create an amazing experience.",
          website: "https://singdancelounge.com",
          features: [
            "Dance Floors",
            "Themed Rooms",
            "Group Packages",
            "Professional Lighting",
          ],
          upcomingEvents: [
            {
              id: "1",
              name: "Weekend Party",
              date: "2023-10-14",
              time: "9:00 PM",
            },
            {
              id: "2",
              name: "Couple's Night",
              date: "2023-10-17",
              time: "7:00 PM",
            },
            {
              id: "3",
              name: "Family Day",
              date: "2023-10-22",
              time: "2:00 PM",
            },
          ],
          photos: [
            "https://placehold.co/600x400/8b5cf6/white?text=Main+Room",
            "https://placehold.co/600x400/6366f1/white?text=VIP+Section",
            "https://placehold.co/600x400/ec4899/white?text=Dance+Floor",
            "https://placehold.co/600x400/10b981/white?text=Themed+Room",
            "https://placehold.co/600x400/f59e0b/white?text=Bar+Area",
            "https://placehold.co/600x400/06b6d4/white?text=Event+Space",
          ],
        };
      case "echo-karaoke":
        return {
          id: "echo-karaoke",
          name: "Echo Karaoke Bar",
          address: "789 Rhythm Road, Arts Quarter",
          phone: "+1-555-0789",
          rating: 4.9,
          reviews: 412,
          distance: "1.8 km",
          cover: "https://placehold.co/800x400/10b981/white?text=EK",
          hours: {
            monday: "5:00 PM - 12:00 AM",
            tuesday: "5:00 PM - 12:00 AM",
            wednesday: "5:00 PM - 12:00 AM",
            thursday: "5:00 PM - 1:00 AM",
            friday: "5:00 PM - 2:00 AM",
            saturday: "2:00 PM - 2:00 AM",
            sunday: "3:00 PM - 11:00 PM",
          },
          description:
            "Premium karaoke with high-quality microphones and sound engineering. Our professional-grade equipment provides the perfect sound for your performance.",
          website: "https://echokaraoke.com",
          features: [
            "Professional Mics",
            "Sound Engineering",
            "Recording",
            "VIP Treatment",
          ],
          upcomingEvents: [
            {
              id: "1",
              name: "Singing Competition",
              date: "2023-10-16",
              time: "8:00 PM",
            },
            {
              id: "2",
              name: "Music Night",
              date: "2023-10-19",
              time: "7:00 PM",
            },
            {
              id: "3",
              name: "Artist Showcase",
              date: "2023-10-26",
              time: "9:00 PM",
            },
          ],
          photos: [
            "https://placehold.co/600x400/10b981/white?text=Studio+View",
            "https://placehold.co/600x400/ec4899/white?text=Premium+Mic",
            "https://placehold.co/600x400/8b5cf6/white?text=Control+Room",
            "https://placehold.co/600x400/f59e0b/white?text=VIP+Setup",
            "https://placehold.co/600x400/06b6d4/white?text=Ambiance",
            "https://placehold.co/600x400/6366f1/white?text=Stage+Setup",
          ],
        };
      default:
        return {
          id: "default",
          name: "Location Name",
          address: "123 Default Street, City",
          phone: "+1-555-0000",
          rating: 0,
          reviews: 0,
          distance: "Unknown",
          cover: "https://placehold.co/800x400/000000/white?text=NA",
          hours: {
            monday: "Closed",
            tuesday: "Closed",
            wednesday: "Closed",
            thursday: "Closed",
            friday: "Closed",
            saturday: "Closed",
            sunday: "Closed",
          },
          description: "Description not available.",
          website: "https://example.com",
          features: ["Feature 1", "Feature 2"],
          upcomingEvents: [],
          photos: [],
        };
    }
  };

  const location = getLocationData(locationId);

  // State for header
  const { state: authState } = useAuth();
  const [searchQuery] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={() => {}} // No-op for location page
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Location header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
          <Image
            src={location.cover}
            alt={location.name}
            width={600}
            height={300}
            className="w-full md:w-2/3 rounded-lg object-cover"
          />

          <div className="w-full md:w-1/3">
            <h1 className="text-4xl font-bold mb-4">{location.name}</h1>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-300">{location.address}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">{location.phone}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Navigation className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">{location.distance}</span>
              </div>

              <div className="flex items-center space-x-1 bg-gray-800 w-fit px-3 py-1 rounded">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">{location.rating}</span>
                <span className="text-gray-400 text-sm ml-1">
                  ({location.reviews} reviews)
                </span>
              </div>

              <div className="pt-4">
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Book Room</span>
                </button>

                <button className="w-full mt-3 border border-gray-600 hover:bg-gray-800 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Navigation className="h-5 w-5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-300 leading-relaxed">
                {location.description}
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {location.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Hours</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(location.hours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between py-2 border-b border-gray-700"
                  >
                    <span className="capitalize text-gray-400">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {location.photos.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover aspect-video"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Upcoming Events */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              {location.upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {location.upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="font-medium">{event.name}</h3>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No upcoming events scheduled.</p>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">
                    Interactive map would appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LocationPage;
