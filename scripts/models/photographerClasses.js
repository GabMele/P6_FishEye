// photographerClasses.js

import createElementWithOptions from "../utils/utilities.js";
import { PORTRAIT_BASE_PATH } from "../constants.js";

/**
 * Base class to generate Photographer-related components.
 * needed in the page Index.html and Photographer.html
 */
export default class PhotographerBase {
    /**
     * Creates an instance of PhotographerBase (common elements).
     * @param {Object} data - The photographer data.
     * @param {string} data.name - The photographer's name.
     * @param {string} data.city - The photographer's city.
     * @param {string} data.country - The photographer's country.
     * @param {string} data.tagline - The photographer's tagline.
     * @param {number} data.price - The photographer's daily price.
     * @param {string} data.portrait - The photographer's portrait image file name.
     */
    constructor(data) {
        this.data = data;
        this.nameElement = null;
        this.divInfo = null;
        this.imagePortrait = null;
    }

    /**
     * Creates and configures common HTML elements.
     */

    createElements() {

            this.nameElement = createElementWithOptions('h1', 'photographer-name', this.data.name);
            this.divInfo = createElementWithOptions('div');
    
            const locationElement = createElementWithOptions('p', 'location', `${this.data.city}, ${this.data.country}`);
            const taglineElement = createElementWithOptions('p', 'tagline', this.data.tagline);
            const priceElement = createElementWithOptions('p', 'price', `${this.data.price}€/jour`);
    
            this.divInfo.append(locationElement, taglineElement, priceElement);
    
            this.imagePortrait = createElementWithOptions('img', 'photographer-portrait');
            this.imagePortrait.src = `${PORTRAIT_BASE_PATH}${this.data.portrait}`;
            this.imagePortrait.alt = `portrait de ${this.data.name}`;
            this.imagePortrait.setAttribute('aria-label', `portrait de ${this.data.name}`);

    }

}

/**
 * Class representing a photographer card component
 * that will be displayed on the index page.
 * @extends PhotographerBase
 */
export class PhotographerCard extends PhotographerBase {
    /**
     * Creates an instance of PhotographerCard.
     * @param {Object} data - The photographer data.
     */
    constructor(data) {
        super(data);
    }


    /**
     * Fills the photographer card node with the elements
     * needed in the index page.
     * @returns {HTMLElement} The figure element representing the photographer card.
     */
    fillPhotographerNode() {
        super.createElements();

        const figure = document.createElement('figure');
        const photographerThumb = document.createElement('a');
        photographerThumb.setAttribute("href", `photographer.html?id=${this.data.id}&name=${this.data.name}`);

        photographerThumb.appendChild(this.imagePortrait);
        figure.appendChild(photographerThumb);

        const photographerInfo = document.createElement('figcaption');
        const h2name = createElementWithOptions('h2', '', this.nameElement.textContent);

        photographerInfo.append(h2name, this.divInfo);
        figure.appendChild(photographerInfo);

        return figure;
    }
}

/**
 * Class representing a photographer header component
 * that will be displayed on the Photographer page.
 * @extends PhotographerBase
 */
export class PhotographerHeader extends PhotographerBase {
    /**
     * Creates an instance of PhotographerHeader.
     * @param {Object} data - The photographer data.
     */
    constructor(data) {
        super(data);
    }

    /**
     * Fills the photographer header node with the elements
     * needed in the Photographer page.
     */
    fillPhotographerNode() {
        super.createElements();

        const photographerHeaderInfo = document.querySelector(".photographer-info");
        photographerHeaderInfo.append(this.nameElement, this.divInfo);

        const photographerHeaderPortrait = document.querySelector(".photographer-portrait-container");
        photographerHeaderPortrait.appendChild(this.imagePortrait);

        const price = document.querySelector(".daily-price");
        price.textContent = this.data.price;
    }

}