import { Image, Video } from '../models/mediaClasses.js';
export default class MediaFactory {
	constructor(data) {
		if (data.image) {
			return new Image(data);
		} else if (data.video) {
			return new Video(data);
		} else {
			throw 'Error : data type (image/video) not found';
		}
	}
}