const { fetchWithRetry } = require("./fetchWithRetry");

const fetchImageDetails = async () => {
  const data = await fetchWithRetry(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!data?.images) return null;
  // Use secure_base_url (https) instead of base_url (http) to avoid mixed content
  const images = data.images;
  images.base_url = images.secure_base_url || images.base_url;
  return images;
};

let imageDetailsCache = null;

const getImageDetails = async () => {
  if (imageDetailsCache) return imageDetailsCache;
  const imageDetails = await fetchImageDetails();
  imageDetailsCache = imageDetails;
  return imageDetails;
};

module.exports = { getImageDetails };
