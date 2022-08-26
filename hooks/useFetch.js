




















const host = "https://search.outdoorsy.com/rentals";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const token = user.accessToken;
    options.headers["X-Authorization"] = token;
  }

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
}

const get = request.bind(null, "get");
const post = request.bind(null, "post");
const patch = request.bind(null, "patch");
const put = request.bind(null, "put");
const del = request.bind(null, "delete");

export { get, post, put, patch, del as delete };