export const api = async (url) => {
  const host = "https://search.outdoorsy.com/rentals?";

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(host + url, options);

    if (response.ok !== true) {
      if (response.status === 403) localStorage.removeItem("user");
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};
