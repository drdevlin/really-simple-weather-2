const fetchResults = async (url) => {
  let data;
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.text();
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export default fetchResults;