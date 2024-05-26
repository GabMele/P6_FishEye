import { fetchData } from '../api/api.js';
import { DATA_JSON_PATH } from '../constants.js';
import PhotographerFactory from "../factories/photographerFactory.js";

/**
 * Fetches photographer data from the specified path defined in constants.js.
 * Throws an Error if there's an issue retrieving the data.
 * @returns {Promise<{ photographers: Array<any> }>} A promise that resolves with the fetched photographers data.
 * @throws {Error} An error object if there's an issue fetching the data.
 */
async function fetchPhotographers() {
    try {
        const { photographers } = await fetchData(DATA_JSON_PATH);
        return { photographers };
    } catch (error) {
        console.error('Error fetching photographer data:', error);
        throw error;
    }
}

/**
 * Initializes the application by creating a PhotographerCard instance for each photographer,
 * using the PhotographerFactory factory method.
 * Throws an Error if initialization fails.
 * @throws {Error} An error object if there's an issue initializing the application.
 */
async function init() {
    try {
        const { photographers } = await fetchPhotographers();

        const section = document.querySelector('.photographers-section');

        photographers.forEach((photographer) => {
            const photographerInstance = PhotographerFactory.generatePhotographerNode(photographer, section);
            const figure = photographerInstance.fillPhotographerNode();
            section.appendChild(figure);
        });
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

// Initialize the application
init();


    
