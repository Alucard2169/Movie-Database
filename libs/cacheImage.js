// imageData.js

// Function to fetch image details from the API
const fetchImageDetails = async () => {
  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;
  return images;
};

// Cache for storing the image details
let imageDetailsCache = null;

// Function to get the image details
const getImageDetails = async () => {
  // If image details are already cached, return them
  if (imageDetailsCache) {
    return imageDetailsCache;
  }

  // Fetch the image details from the API
  const imageDetails = await fetchImageDetails();

  // Cache the image details
  imageDetailsCache = imageDetails;

  return imageDetails;
};

module.exports = {
  getImageDetails,
};
