import { MEDIA_BASE_PATH } from '../constants.js'

class Media {
	constructor(data) {
		this.id = data.id;
		this.photographerId = data.photographerId;
		this.title = data.title;
		this.likes = data.likes;
		this.liked = false;
		this.date = data.date;
		this.price = data.price;
		// this.firstName = firstName;
	}

	// createMediaCaption() {
	// 	const mediaCaptionHTML = `
	// 		<div class="media-title">${this.title}</div>
	// 		<div class="likes-div">
	// 			<span class="likes-counter">${this.likes}</span>
	// 			<button class="like-button far fa-heart" data-id="${this.id}" aria-label="J'aime">
	// 			</button>
	// 		</div>`
	// 	return mediaCaptionHTML
	// }


	createMediaCaption() {

		// console.log("media caption this ========= " + this);
		// console.log(this);
		// const mediaCaptionContainer = document.createElement('div');
		// const mediaCaptionContainer = document.createElement('figcaption');
		// mediaCaptionContainer.classList.add( 'media-caption' );

		const mediaCaptionContainer = this.createElementWithClass('figcaption','media-caption');
	
		// Create and append media title div
		const mediaTitleDiv = this.createElementWithClass('div', 'media-title', this.title);
		mediaCaptionContainer.appendChild(mediaTitleDiv);
	
		// Create likes div
		const likesDiv = this.createElementWithClass('div', 'likes-div');
	
		// Create and append likes counter
		const likesCounter = this.createElementWithClass('span', 'likes-counter', this.likes);
		likesDiv.appendChild(likesCounter);
	
		// Create and append like button
		const likeButton = this.createElementWithClass('button', 'like-button', '', ['far', 'fa-heart']);
		likeButton.setAttribute('data-id', this.id);
		likeButton.setAttribute('aria-label', 'J\'aime');
		likeButton.setAttribute('role', 'button'); // Add role attribute
		likeButton.setAttribute('aria-pressed', 'false'); // Indicates the initial state
		likesDiv.appendChild(likeButton);
	
		// Append likes div to media caption container
		mediaCaptionContainer.appendChild(likesDiv);

		// console.log(mediaCaptionContainer);
	
		return mediaCaptionContainer;
	}

	
	createElementWithClass(tag, className, textContent = '', additionalClasses = []) {
		const element = document.createElement(tag);
		element.classList.add(className);
		additionalClasses.forEach(cls => element.classList.add(cls));
		if (textContent) {
			element.textContent = textContent;
		}
		return element;
	}


	createAssetPath(photographerFirstName) {
        return `${MEDIA_BASE_PATH}${photographerFirstName}/${this.image || this.video}`;
    }
}

class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
	}

	addMediaElement(photographerFirstName) {
		const assetPath = this.createAssetPath(photographerFirstName);
		const imgElement = this.createElementWithClass('img', 'img-thumb');
		imgElement.src = assetPath;
		imgElement.alt = this.title;

		// console.log(imgElement);


		return imgElement;
	}

}



class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
	}
	addMediaElement(photographerFirstName) {
		const assetPath = this.createAssetPath(photographerFirstName);
		const videoElement = this.createElementWithClass('video', 'img-thumb');
		videoElement.controls = true;
		
		const sourceElement = document.createElement('source');
		sourceElement.src = assetPath;
		sourceElement.type = 'video/mp4';
		videoElement.appendChild(sourceElement);

		const fallbackText = document.createTextNode('Your browser does not support the video tag.');
		videoElement.appendChild(fallbackText);

		// console.log(videoElement);

		return videoElement;
	}
}

export { Media, Image, Video };