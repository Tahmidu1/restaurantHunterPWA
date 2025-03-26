import React from "react";
import defaultImage from "../images/def-restaurant.jpg";

interface RestaurantItemProps {
  name: string;
  vicinity: string;
  rating: number;
  userRatingsTotal: number;
  distance: number;
  photoUrl?: string;
  placeId: string;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
  name,
  vicinity,
  rating,
  userRatingsTotal,
  distance,
  photoUrl,
  placeId,
}) => {
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

  const handleShare = async () => {
    const shareData = {
      title: name,
      text: `Check out ${name} located at ${vicinity} with a rating of ${rating} (${userRatingsTotal} reviews).`,
      url: googleMapsUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(googleMapsUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="p-3 bg-white m-2 shadow-md rounded-md w-80 hover:scale-105 transition ease-in-out">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        {photoUrl ? (
          <img
            className="w-full h-48 object-cover rounded-md"
            src={photoUrl}
            alt={name}
          />
        ) : (
          <img
            className="w-full h-48 object-cover rounded-md"
            src={defaultImage}
            alt="Default"
          />
        )}
        <p className="text-gray-600 mt-1">{vicinity}</p>
        <p className="text-gray-600">
          Rating: {rating} ({userRatingsTotal} reviews)
        </p>
        <p className="text-gray-900 font-semibold">
          Distance: {distance.toFixed(2)} km
        </p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          View on Google Maps
        </a>
        <button
          onClick={handleShare}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default RestaurantItem;
