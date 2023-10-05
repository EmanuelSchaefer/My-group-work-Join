// Define a constant for the local storage token name
const STORAGE_TOKEN = "Q0PV46GL6FMMI9AYQ838I4531P8DMA2I6YX0JTJP";
// Constant variable to store the name of the local storage token
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Asynchronous function to set an item in the remote storage using a POST request.
 *
 * @param {string} key - The key or identifier for the data to be stored.
 * @param {any} value - The data to be stored. This can be any valid JSON-serializable value.
 * @returns {Promise<Object>} - A Promise that resolves to the response data from the storage API in JSON format.
 */
const setItem = async (key, value) => {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

/**
 * Asynchronous function to get an item from the remote storage using a GET request.
 *
 * @param {string} key - The key or identifier for the data to be retrieved.
 * @returns {Promise<any>} - A Promise that resolves to the data value associated with the provided key.
 */
const getItem = async (key) => {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
};
