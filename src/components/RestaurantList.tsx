import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchRestaurants, resetRestaurants } from "../redux/restaurantsSlice";
import RestaurantItem from "./RestaurantItem";
import MapUpdater from "./MapUpdater";

import {
  APIProvider,
  Map,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import PlaceAutocomplete from "./PlaceAutocomplete";
import defaultImage from "../images/menuplate.jpg";

const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";
const mapId = process.env.REACT_APP_MAP_ID || "";

// The available cuisine checkboxes (customize as needed)
const CUISINES = ["chinese", "indian", "italian", "japanese", "seafood"];

// The available rating checkboxes (1★ to 5★)
const RATINGS = [1, 2, 3, 4, 5];

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants: rawRestaurants, status, error } = useAppSelector(
    (state) => state.restaurants
  );

  // User location & selected place
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  // We no longer need a single marker ref because we'll render multiple markers
  // const [markerRef, marker] = useAdvancedMarkerRef();

  // Controls whether to show the hero’s background image overlay
  const [showStaticImage, setShowStaticImage] = useState(true);

  // Cuisine filters (array of selected cuisines)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  // Rating filters (array of selected rating values)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Fetch restaurants when location or cuisines change (ratings are filtered client-side)
  useEffect(() => {
    if (location) {
      const keyword =
        selectedCuisines.length > 0 ? selectedCuisines.join("|") : "";
      dispatch(fetchRestaurants({ location, keyword }));
    }
  }, [dispatch, location, selectedCuisines]);

  // If user selects a place from autocomplete, set that location
  useEffect(() => {
    if (selectedPlace?.geometry?.location) {
      setLocation({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });
    }
  }, [selectedPlace]);

  // Geolocation
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.error(err.message)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Reset everything
  const handleReset = () => {
    setLocation(null);
    setSelectedPlace(null);
    setShowStaticImage(true);
    setSelectedCuisines([]);
    setSelectedRatings([]);
    dispatch(resetRestaurants());
  };

  // Client-side rating filter: only display restaurants whose floor rating matches
  const displayedRestaurants = rawRestaurants.filter((r) => {
    if (selectedRatings.length > 0) {
      const floorRating = Math.floor(r.rating || 0);
      if (!selectedRatings.includes(floorRating)) {
        return false;
      }
    }
    return true;
  });

  // Cuisine checkbox handler
  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  // Rating checkbox handler
  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="">
      {/* 1) HERO SECTION */}
      <div
        className="hero min-h-[30vh] bg-cover bg-center relative"
        style={
          showStaticImage
            ? { backgroundImage: `url(${defaultImage})` }
            : {}
        }
      >
        {showStaticImage && (
          <div className="hero-overlay bg-black bg-opacity-60 absolute inset-0"></div>
        )}

        <div className="hero-content flex flex-col items-center justify-center text-neutral-content h-full w-full relative">
          <h1 className="mb-3 text-3xl font-bold">Find Nearby Restaurants</h1>
          <p className="mb-5 max-w-xl text-center">
            Easily find nearby restaurants, discover new dining options
            in their vicinity with their distance from the user's location,
            ratings, and a link to view them on Google Maps.
          </p>
          <div className="flex gap-3">
            <button
              className="bg-neutral-700 text-white px-3 py-1 rounded-md hover:bg-neutral-900"
              onClick={handleGetLocation}
            >
              Search My Location
            </button>
            <button
              className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 2) MAIN CONTENT SECTION: Filter Panel and Restaurant List */}
      <div className="bg-[#636363] py-8">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          {/* LEFT COLUMN: Filter Panel */}
          <div className="w-1/4 bg-[#222831] p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">Filter</h2>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => {
                  setSelectedCuisines([]);
                  setSelectedRatings([]);
                }}
              >
                Clear filters
              </button>
            </div>

            {/* CUISINE FILTERS */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-white">Cuisine Type</h3>
              {CUISINES.map((cuisine) => (
                <label key={cuisine} className="flex items-center mb-2 text-white">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedCuisines.includes(cuisine)}
                    onChange={() => handleCuisineChange(cuisine)}
                  />
                  {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                </label>
              ))}
            </div>

            {/* RATINGS FILTERS */}
            <div>
              <h3 className="font-semibold mb-2 text-white">Ratings</h3>
              {RATINGS.map((rating) => (
                <label key={rating} className="flex items-center mb-2 text-white">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {"★".repeat(rating)}
                </label>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Restaurant List */}
          <div className="w-3/4">
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>{error}</p>}

            {status === "succeeded" && displayedRestaurants.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedRestaurants.map((restaurant, index) => (
                  <RestaurantItem
                    key={index}
                    name={restaurant.name}
                    vicinity={restaurant.vicinity}
                    rating={restaurant.rating}
                    userRatingsTotal={restaurant.user_ratings_total}
                    distance={restaurant.distance}
                    photoUrl={restaurant.photoUrl || undefined}
                    placeId={restaurant.place_id}
                  />
                ))}
              </div>
            )}

            {status === "succeeded" && displayedRestaurants.length === 0 && (
              <div className="flex flex-col items-center mt-4">
                <p>No restaurants found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3) MAP SECTION: Render multiple markers for each restaurant */}
      <div className="flex justify-center items-center">
        <APIProvider apiKey={apiKey}>
        <Map
    mapId={mapId}
    style={{
      width: "100vw",
      height: "50vh",
      alignItems: "center",
      justifyContent: "center",
      padding: "2px",
      margin: "1px",
    }}
    defaultCenter={location || { lat: 22.54992, lng: 0 }}
    defaultZoom={location ? 15 : 3}
    gestureHandling={"greedy"}
    disableDefaultUI={true}
  >
    {location && <MapUpdater location={location} />}
    {displayedRestaurants.map((restaurant, index) => (
      <AdvancedMarker
        key={restaurant.place_id || index}
        position={restaurant.location}
      />
    ))}
  </Map>
  <MapControl position={ControlPosition.TOP}>
    <div className="autocomplete-control">
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
    </div>
  </MapControl>
        </APIProvider>
      </div>
    </div>
  );
};

export default RestaurantList;
