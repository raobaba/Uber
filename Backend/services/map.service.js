import axios from "axios";
import captainModel from "../models/captain.model.js";

// ✅ Get Address Coordinates using OpenStreetMap (Nominatim API)
export const getAddressCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const location = response.data[0];
      return {
        ltd: parseFloat(location.lat),
        lng: parseFloat(location.lon),
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

// ✅ Function to get coordinates from city name
const getCoordinates = async (place) => {
  const API_KEY = process.env.OPENROUTESERVICE_API; // Your OpenRouteService API Key
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(
    place
  )}`;

  try {
    const response = await axios.get(url);
    if (response.data.features.length > 0) {
      const { coordinates } = response.data.features[0].geometry;
      return { lng: coordinates[0], ltd: coordinates[1] }; // OpenRouteService gives [lng, lat]
    } else {
      throw new Error(`Coordinates not found for ${place}`);
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${place}:`, error);
    throw error;
  }
};

// ✅ Get Distance & Time using OpenRouteService (Free API Key Required)
export const getDistanceTimes = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.OPENROUTESERVICE_API; // Get free API key from openrouteservice.org

  try {
    const origin1 = await getCoordinates(origin);
    const destination1 = await getCoordinates(destination);


    const url = `https://router.project-osrm.org/route/v1/driving/${origin1.lng},${origin1.ltd};${destination1.lng},${destination1.ltd}?overview=false`;
    const response = await axios.get(url);

    if (response.data.routes.length > 0) {
      const route = response.data.routes[0];
      return {
        distance: (route.distance / 1000).toFixed(2), // Convert meters to km
        duration: (route.duration / 60).toFixed(2), // Convert seconds to minutes
      };
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error("Error fetching distance & time:", error);
    throw error;
  }
};

// ✅ Get AutoComplete Suggestions using OpenStreetMap (Nominatim API)
export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=json&addressdetails=1&limit=5`;

  try {
    const response = await axios.get(url);
    return response.data.map((place) => place.display_name);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    throw error;
  }
};

// ✅ Get Captains in the Radius (No Change, Uses MongoDB Geospatial Query)
export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, ltd], radius / 6371], // Convert km to radians
        },
      },
    });
    return captains;
  } catch (error) {
    console.error("Error fetching captains:", error);
    throw error;
  }
};
