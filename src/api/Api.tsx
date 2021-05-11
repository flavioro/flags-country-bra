import axios from 'axios'

const API = async () => {
  try {
    return await axios.get("https://restcountries.eu/rest/v2/all").then(res => res.data)
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export default API;