import { Image, Video } from '../models/mediaClasses.js';

export default 
function createMediaCard(media, photographerFirstName) {

    const figureNode = document.createElement('figure');
    figureNode.classList.add('figureThumb');
    const linkNode = document.createElement('a');
    linkNode.classList.add('gallery-item');
    linkNode.setAttribute('tabindex', '0');
    linkNode.tabindex = 0;

    const mediaElement = media.addMediaElement(photographerFirstName);
    linkNode.appendChild(mediaElement);

    figureNode.appendChild(linkNode);
    const captionNode = media.createMediaCaption();
    figureNode.appendChild(captionNode);

    return figureNode;

}