/**
 * Factory class for creating instances of Image Class or Video Classbased on the input data.
 */
import { Image, Video } from '../models/mediaClasses.js';

/**
 * Constructs a new instance of either Image or Video based on the provided data.
 *
 * @param {Object} data - The data object containing either an image or video property.
 * @param {string} data.image - An optional string representing the path to an image file.
 * @param {string} data.video - An optional string representing the path to a video file.
 * @returns {Image | Video} A new instance of Image or Video, depending on the data provided.
 * @throws Will throw an error if neither an image nor a video property is found in the data object.
 */
export default class MediaFactory {
    /**
     * Creates a new instance of the class.
     * 
     * @constructor
     * @param {Object} data - The data object to determine whether to create an Image or Video instance.
     */
    constructor(data) {
        if (data.image) {
            return new Image(data);
        } else if (data.video) {
            return new Video(data);
        } else {
            throw new Error('Error : data type (image/video) not found');
        }
    }
}
