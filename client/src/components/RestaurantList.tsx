import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchRestaurants, resetRestaurants } from "../redux/restaurantsSlice";
import RestaurantItem from "./RestaurantItem";
import {
  APIProvider,
  Map,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import PlaceAutocomplete from "./PlaceAutocomplete";
import defaultImage from "../images/menuplate.jpg";

const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";
const mapId = process.env.REACT_APP_MAP_ID || "";

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { restaurants, status, error } = useAppSelector(
    (state) => state.restaurants
  );
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showStaticImage, setShowStaticImage] = useState(true);

  // New state for the cuisine filter
  const [filterCategory, setFilterCategory] = useState("");

  // When location or filter changes, fetch restaurants with the chosen keyword
  useEffect(() => {
    if (location) {
      dispatch(fetchRestaurants({ location, keyword: filterCategory }));
    }
  }, [dispatch, location, filterCategory]);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location) {
      setLocation({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });
      setShowStaticImage(false);
    }
  }, [selectedPlace]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowStaticImage(false);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleReset = () => {
    setLocation(null);
    setSelectedPlace(null);
    setShowStaticImage(true);
    setFilterCategory(""); // Reset filter
    dispatch(resetRestaurants());
  };

  return (
    <div className="">
      <div>
        <div className="hero min-h-[75vh] bg-gradient-to-r from-[#2B241F] to-black">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content flex flex-col items-center justify-start text-neutral-content h-full w-full">
            <div className="p-4 rounded-md text-center ">
              <h1 className="mb-5 text-3xl font-bold">
                Find Nearby Restaurants
              </h1>
              <p className="mb-5">
                Easily find nearby restaurants, discover new dining options in
                their vicinity with their distance from the user's location,
                ratings, and a link to view them on Google Maps.
              </p>
              {/* Cuisine Filter Dropdown */}
              <div className="mb-4">
                <label className="mr-2 text-white">Filter by Your Craving:</label>
                <select
                  className="bg-white text-black px-2 py-1 rounded-md"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Restaurants</option>
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="fast food">Fast Food</option>
                  <option value="italian">Italian</option>
                  <option value="japanese">Japanese</option>
                </select>
              </div>
              <button
                className="bg-neutral-700 text-white px-3 py-1 rounded-md hover:bg-neutral-900 mx-2"
                onClick={handleGetLocation}
              >
                Search My Location
              </button>
              <button
                className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 mx-2"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            {status === "loading" && <p>Loading...</p>}
            {status === "succeeded" && restaurants.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {restaurants.map((restaurant, index) => (
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
            {status === "succeeded" && restaurants.length === 0 && (
              <div className="flex flex-col items-center mt-4">
                <p>No restaurants found</p>
              </div>
            )}
            {status === "failed" && <p>{error}</p>}
            {showStaticImage && (
              <div className="flex justify-center items-center">
                <img
                  className="rounded-md"
                  src={defaultImage}
                  alt="Default"
                  style={{
                    width: "100%",
                    height: "50vh",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
          <div className="bg-white w-full"></div>
        </div>
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
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              defaultZoom={3}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <AdvancedMarker ref={markerRef} position={null} />
              <MapHandler
                selectedPlace={selectedPlace}
                marker={marker}
                location={location}
              />
            </Map>
            <MapControl position={ControlPosition.TOP}>
              <div className="autocomplete-control">
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
              </div>
            </MapControl>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

interface MapHandlerProps {
  selectedPlace: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
  location: { lat: number; lng: number } | null;
}

const MapHandler: React.FC<MapHandlerProps> = ({
  selectedPlace,
  marker,
  location,
}) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location && marker && map) {
      const placeLocation = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      marker.position = new google.maps.LatLng(
        placeLocation.lat,
        placeLocation.lng
      );
      if (selectedPlace.geometry.viewport) {
        map.fitBounds(selectedPlace.geometry.viewport);
      } else {
        map.setCenter(placeLocation);
        map.setZoom(15);
      }
    } else if (location && marker && map) {
      marker.position = new google.maps.LatLng(location.lat, location.lng);
      map.setCenter(location);
      map.setZoom(15);
    } else if (marker && map) {
      marker.position = null;
      map.setCenter({ lat: 22.54992, lng: 0 });
      map.setZoom(3);
    }
  }, [selectedPlace, location, marker, map]);
  return null;
};

export default RestaurantList;
