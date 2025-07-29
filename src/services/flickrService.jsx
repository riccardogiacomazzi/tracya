import axios from "axios";

const FlickrPhotos = async () => {
  // itemData structure
  // itemData = [{ img: { small: "", large: "", original: "" }, title: "", tags: "" }];

  let itemData = [];

  const apiKey = import.meta.env.VITE_API_KEY;
  const userId = import.meta.env.VITE_USER_ID;

  const baseUrl = `https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const fetchPhotoSize = async (photoId) => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );

      const sizes = response.data.sizes?.size || [];

      const getSize = (...labels) => {
        for (const label of labels) {
          const match = sizes.find((s) => s.label === label);
          if (match) return match.source;
        }
        return null;
      };

      const small = getSize("Small", "Thumbnail", "Square");
      const large = getSize("Large", "Medium 800", "Medium 640", "Medium");
      const original = getSize("Original", "Large", "Medium 800"); // optional fallback, not required

      if (!small && !large) {
        console.warn(`No usable sizes found for photo ID: ${photoId}`);
        return null;
      }

      return { small, large, original };
    } catch (error) {
      console.error(`Error fetching sizes for photo ID ${photoId}:`, error.message);
      return null;
    }
  };

  const fetchPhotoTag = async (photoId) => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
      const data = response.data.photo.tags.tag;
      const tags = data.map((item) => item.raw);

      return { tag: tags };
    } catch (error) {
      error.message;
    }
  };

  const fetchPhotoDetails = async (photoId) => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
      const data = response.data.photo.description._content;
      return { description: data };
    } catch (error) {
      error.message;
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      const photo = response.data.photos.photo;

      const promises = [];

      for (const pic of photo) {
        promises.push(
          Promise.all([fetchPhotoSize(pic.id), fetchPhotoTag(pic.id), fetchPhotoDetails(pic.id)]).then(
            ([urlPics, tagPics, detailsPics]) => {
              const newPic = {
                img: { small: urlPics.small, large: urlPics.large, original: urlPics.original },
                title: pic.title,
                tag: tagPics.tag,
                details: detailsPics,
              };

              return newPic;
            }
          )
        );
      }

      const results = await Promise.all(promises);

      itemData.push(...results);
    } catch (error) {
      console.error(error.message);
    }
  };

  await fetchPhotos();

  return { itemData };
};

const loadOne = async (url) => {
  await axios.get(url);
};

const FlickrAPI = { FlickrPhotos, loadOne };

export default FlickrAPI;
