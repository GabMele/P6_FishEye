import { PhotographerCard, PhotographerHeader } from '../models/photographerClasses.js';

export default class PhotographerFactory {
    static generatePhotographerNode(photographer, section) {

        // console.log("photographer Factory : ======= ");
        // console.log(photographer);
        // console.log(section);
        // Check if the section has the class "photographer-header"
        if (section.classList.contains('photographer-header')) {
            return new PhotographerHeader(photographer); // Assuming default name for simplicity
        }

        // Check if the section has the class "photographers-section"
        if (section.classList.contains('photographers-section')) {
            return new PhotographerCard(photographer); // Assuming default values for simplicity
        }

        // Return an error string if neither class is found
        return "Error: Neither 'photographer-header' nor 'photographers-section' class found.";
    }
}
