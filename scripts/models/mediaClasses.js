// mediaClasses.js
/**
 * Base and Extended classes for media items (images and videos).
 */
import { MEDIA_BASE_PATH } from '../constants.js';

/**
 * Creates an HTML element with options.
 * @param {string} tag The type of HTML element to create.
 * @param {string} className The CSS class name(s) for the element.
 * @param {string} [textContent=''] The inner text content of the element.
 * @param {Array<string>} [additionalClasses=[]] Additional CSS class names.
 * @returns {HTMLElement} The created HTML element.
 */
import createElementWithOptions from "../utils/utilities.js";

/**
 * Represents a media item that can be either an image or a video.
 * @constructor
 * @param {Object} data - An object containing media data.
 * @param {number} data.id - The unique identifier of the media item.
 * @param {number} data.photographerId - The ID of the photographer who took the photo/video.
 * @param {string} data.title - The title of the media item.
 * @param {number} data.likes - The number of likes the media item has received.
 * @param {boolean} data.liked - Indicates if the current user has liked the media item.
 * @param {Date} data.date - The date of the media item.
 * @param {number} data.price - The price of the media item.
 */
class Media {
    /**
     * Constructs a new Media instance.
     * @param {Object} data - The data for the media item.
     */
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.liked = false;
        this.date = data.date;
        this.price = data.price;
    }

    /**
     * Generates the path to the media asset that is based on the photographer's first name.
     * @param {string} photographerFirstName - The first name of the photographer.
     * @returns {string} The full path to the media asset.
     */
    createAssetPath(photographerFirstName) {
        return `${MEDIA_BASE_PATH}${photographerFirstName}/${this.image || this.video}`;
    }

    /**
     * Creates an HTML element for the media item with optional attributes.
     * @param {string} tag - The type of HTML element to create ('img' or 'video').
     * @param {string} className - The CSS class name(s) for the element.
     * @param {string} [textContent=''] - The inner text content of the element.
     * @param {Array<string>} [additionalClasses=[]] - Additional CSS class names.
     * @returns {HTMLElement} The created HTML element.
     */
    createElementWithOptions(tag, className, textContent = '', additionalClasses = []) {
        return createElementWithOptions(tag, className, textContent, additionalClasses);
    }
}

/**
 * Represents an image media item.
 * Inherits from Media.
 */
class Image extends Media {
    /**
     * Constructs a new Image instance.
     * @param {Object} data - The data for the image.
     */
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    /**
     * Adds the image element to the <figure> HTML element.
     * @param {string} photographerFirstName - The first name of the photographer.
     * @returns {HTMLImageElement} The image element.
     */
    addMediaElement(photographerFirstName) {
        const assetPath = this.createAssetPath(photographerFirstName);
        const imgElement = this.createElementWithOptions('img', 'img-thumb');
        imgElement.src = assetPath;
        imgElement.alt = this.title;
        return imgElement;
    }
}

/**
 * Represents a video media item.
 * Inherits from Media.
 */
class Video extends Media {
    /**
     * Constructs a new Video instance.
     * @param {Object} data - The data for the video.
     */
    constructor(data) {
        super(data);
        this.video = data.video;
    }

    /**
     * Adds the video element to the <figure> HTML element.
     * @param {string} photographerFirstName - The first name of the photographer.
     * @returns {HTMLVideoElement} The video element.
     */
    addMediaElement(photographerFirstName) {
        const assetPath = this.createAssetPath(photographerFirstName);
        const videoElement = this.createElementWithOptions('video', 'img-thumb');
        videoElement.controls = true;

        const sourceElement = document.createElement('source');
        sourceElement.src = assetPath;
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement);

        const fallbackText = document.createTextNode('Your browser does not support the video tag.');
        videoElement.appendChild(fallbackText);

        return videoElement;
    }
}

export { Media, Image, Video };
