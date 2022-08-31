export const api = async (url) => {
  const host = "https://search.outdoorsy.com/rentals?";

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(host + url, options);

    if (response.ok !== true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();

  } catch (error) {
    throw error;
  }
};
