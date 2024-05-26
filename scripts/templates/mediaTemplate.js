// mediaTemplate.js

import createElementWithOptions from '../utils/utilities.js';

/**
 * Factory function for creating a media card HTML element.
 * @param {Object} media - Media object containing media details.
 * @param {string} photographerFirstName - First name of the photographer.
 * @returns {HTMLElement} The created media card element.
 */
export default function createMediaCard(media, photographerFirstName) {
    const figureNode = createElementWithOptions('figure', 'figureThumb');
    const linkNode = createElementWithOptions('a', 'gallery-item', undefined, ['tabindex="0"']);
    linkNode.tabIndex = 0; // Corrected property name to follow DOM API convention

    const mediaElement = media.addMediaElement(photographerFirstName);
    linkNode.appendChild(mediaElement);

    figureNode.appendChild(linkNode);
    const captionNode = createMediaCaption(media);
    figureNode.appendChild(captionNode);

    return figureNode;
}



/**
 * Factory function for creating a media caption component.
 * @param {Object} media - Media object containing media details.
 * @returns {HTMLElement} The created media caption element.
 */
export function createMediaCaption(media) {
    const mediaCaptionContainer = createElementWithOptions('figcaption', 'media-caption');

    const mediaTitleDiv = createElementWithOptions('div', 'media-title', media.title);
    mediaCaptionContainer.appendChild(mediaTitleDiv);

    const likesDiv = createElementWithOptions('div', 'likes-div');

    const likesCounter = createElementWithOptions('span', 'likes-counter', media.likes);
    likesDiv.appendChild(likesCounter);

    const likeButton = createElementWithOptions('button', 'like-button', '', ['far', 'fa-heart']);
    likeButton.dataset.id = media.id; // Use dataset property needed for "likes" handling
    likeButton.setAttribute('aria-label', 'J\'aime');
    likeButton.setAttribute('role', 'button');
    likeButton.setAttribute('aria-pressed', 'false');
    likesDiv.appendChild(likeButton);

    mediaCaptionContainer.appendChild(likesDiv);
    return mediaCaptionContainer;
}


