// photographerFactory.js

import { PhotographerCard, PhotographerHeader } from '../models/photographerClasses.js';

/**
 * Factory class to generate photographer nodes based on the provided section.
 */
export default class PhotographerFactory {
    /**
     * Generates a photographer node based on the section's class.
     * 
     * @param {Object} photographer - The photographer data object.
     * @param {HTMLElement} section - The section element to determine which node to create.
     * @returns {PhotographerHeader|PhotographerCard|string} - The created photographer node or an error message.
     */
    static generatePhotographerNode(photographer, section) {
        // Check if the section has the class "photographer-header"
        if (section.classList.contains('photographer-header')) {
            return new PhotographerHeader(photographer);
        }

        // Check if the section has the class "photographers-section"
        if (section.classList.contains('photographers-section')) {
            return new PhotographerCard(photographer);
        }

        // Return an error string if neither class is found
        return "Error: Neither 'photographer-header' nor 'photographers-section' class found.";
    }
}