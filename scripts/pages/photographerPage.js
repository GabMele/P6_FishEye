// photographerPage.js

import { fetchData } from '../api/api.js';
import { DATA_JSON_PATH } from '../constants.js';
import MediaFactory from '../factories/mediaFactory.js';
import createMediaCard from '../templates/mediaTemplate.js';
import PhotographerFactory from '../factories/photographerFactory.js';
import handleContactForm from '../components/contactForm.js';
import handleLightbox from '../components/handleLightbox.js';


/**
 * Fetches photographer data based on the given photographer ID.
 * Ensures that the fetched data includes both the photographer details and their associated media.
 * @param {number} photographerId The unique identifier for the photographer whose data should be fetched.
 * @returns {Promise<{ photographer: Object, photographerMedias: Array<Object> }>} A promise that resolves to an object containing the photographer's details and their media.
 */
async function fetchPhotographerData(photographerId) {
    const { photographers, media } = await fetchData(DATA_JSON_PATH);
    const photographer = photographers
        .find(p => p.id == photographerId);
    const photographerMedias = media
        .map(m => new MediaFactory(m))
        .filter(media => media.photographerId == photographerId);
    return { photographer, photographerMedias };
}


/**
 * Displays the header for the photographer page, including their name and 
 * a modal element that shows the photographer's name.
 * Utilizes accessible practices by ensuring that the content is properly labeled 
 * and structured for screen readers.
 * @param {Object} photographer The photographer object containing their details.
 * @param {HTMLElement} section The DOM element where the photographer's header should be displayed.
 */
function displayPhotographerHeader(photographer, section) {
    const photographerInstance = PhotographerFactory.generatePhotographerNode(photographer, section);
    photographerInstance.fillPhotographerNode();
    const modalPhotographerName = document.querySelector(".modal-photographer-name");
    modalPhotographerName.textContent = photographer.name;
}


/**
 * Displays the media gallery for the selected photographer, 
 * ensuring that each media item is accessible via keyboard navigation and screen readers.
 * @param {Array<Object>} medias An array of media objects representing the photographer's work.
 * @param {string} photographerFirstName The first name of the photographer, 
 * used to retrieve the path to the media asset.
 */
function displayMediaGallery(medias, photographerFirstName) {
    const mediasSection = document.querySelector(".medias-gallery");
    mediasSection.innerHTML = '';
    if (!Array.isArray(medias)) {
        throw new Error('medias must be an array');
    }
    medias.forEach(media => {
        const mediaCardDOM = createMediaCard(media, photographerFirstName);
        mediasSection.appendChild(mediaCardDOM);
    });
    handleLikes(medias);
    handleLightbox();
}


/**
 * Handles the functionality for liking media items, 
 * ensuring that the UI (heart icon and like counter) update appropriately
 * Also ensures that the like buttons are accessible via keyboard navigation.
 * @param {Array<Object>} medias An array of media objects representing the photographer's work.
 */
function handleLikes(medias) {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        const mediaId = button.dataset.id;
        const media = medias.find(media => media.id == mediaId);

        // Restore liked state from media object
        if (media.liked) {
            button.classList.add("liked", "fas");
            button.classList.remove("far");
            button.setAttribute('aria-pressed', 'true');
        }

        button.setAttribute('tabindex', '0'); // Make buttons focusable
        button.addEventListener('click', () => {
            const isLiked = button.classList.contains("liked");
            media.likes += isLiked ? -1 : 1;
            media.liked = !isLiked; // Update liked state in media object

            button.classList.toggle("liked");
            button.classList.toggle('fas');
            button.classList.toggle('far');
            button.setAttribute('aria-pressed', !isLiked); // Update the aria-pressed attribute

            const likesCounter = button.previousElementSibling;
            likesCounter.textContent = `${media.likes}`;

            updateTotalLikes(medias);
        });
    });
}


/**
 * Updates the total likes counter on the page, 
 * calculated by summing up the likes of all liked media item.
 * @param {Array<Object>} medias An array of media objects representing the photographer's work.
 */
function updateTotalLikes(medias) {
    const cumulativeLikesCounter = document.querySelector('.cumulative-likes-counter');
    const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
    cumulativeLikesCounter.textContent = `${totalLikes}`;
}


/**
 * Sets up an event listener for the sort option dropdown, 
 * allowing users to change the order of the media gallery.
 *
 * @param {Array<Object>} photographerMedias An array of media objects representing the photographer's work.
 * @param {string} photographerFirstName The first name of the photographer, 
 * used to retrieve the path to the media asset.
 */
function handleSortOptions(photographerMedias, photographerFirstName) {
    const sortOption = document.getElementById('sortOption');
    sortOption.addEventListener('change', function (event) {
        //event.preventDefault(); // Prevent the form from submitting normally
        const sortValue = event.target.value;
        sortMediaGallery(photographerMedias, sortValue, photographerFirstName);
        //sortMediaGallery();  
    });

}


/**
 * Sorts the media gallery based on the selected sort option, which can be by date, popularity, or title.
 * This function updates the display of the media gallery to reflect the chosen sorting criteria.
 *
 * @param {Array<Object>} medias An array of media objects representing the photographer's work.
 * @param {string} sortType The type of sorting to apply, which can be 'Date', 'Popularity', or 'Title'.
 * @param {string} photographerFirstName The first name of the photographer, used for labeling purposes.
 */
function sortMediaGallery(medias, sortType, photographerFirstName) {
    const sortedMedias = [...medias];
    sortedMedias.sort((a, b) => {
        switch (sortType) {
            case 'Date': return new Date(b.date) - new Date(a.date);
            case 'Popularity': return b.likes - a.likes;
            case 'Title': return a.title.localeCompare(b.title);
            default: console.error(`Invalid sort type: ${sortType}`); 
            return;
        }
    });
    displayMediaGallery(sortedMedias, photographerFirstName);
}


/**
 * Initializes the page, fetching and displaying the photographer's data,
 * setting up event listeners for interactivity.
 * Focuses on accessibility by ensuring that all interactive elements 
 * are keyboard-navigable and properly labeled.
 */
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    const { photographer, photographerMedias } = await fetchPhotographerData(photographerId);
    
    const section = document.querySelector(".photographer-header");
    displayPhotographerHeader(photographer, section);

    const photographerFirstName = photographer.name.split(' ')[0]
    displayMediaGallery(photographerMedias, photographerFirstName);

    updateTotalLikes(photographerMedias);

    handleContactForm();

    handleLightbox();

    handleSortOptions(photographerMedias, photographerFirstName);
}



document.addEventListener('DOMContentLoaded', () => {
    init();
});