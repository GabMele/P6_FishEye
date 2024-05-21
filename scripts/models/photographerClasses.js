import { PORTRAIT_BASE_PATH } from "../constants.js";


export default class PhotographerBase {  
    constructor(data) {
        this.data = data;
        this.nameElement = null;
        this.divInfo = null;
        this.imagePortrait = null;
    }

    createElements() {

        this.nameElement = this.createConfiguredElement('h1', this.data.name, 'photographer-name');

        this.divInfo = document.createElement('div');
        this.divInfo.appendChild(this.createConfiguredElement('p', `${this.data.city}, ${this.data.country}`, 'location'));
        this.divInfo.appendChild(this.createConfiguredElement('p', this.data.tagline, 'tagline'));
        this.divInfo.appendChild(this.createConfiguredElement('p', `${this.data.price}€/jour`, 'price'));

        this.imagePortrait = document.createElement('img');
        this.imagePortrait.src = `${PORTRAIT_BASE_PATH}${this.data.portrait}`;
        this.imagePortrait.classList.add("photographer-portrait");
        this.imagePortrait.alt = `portrait de ${this.data.name}`;
        this.imagePortrait.setAttribute("aria-label", `portrait de ${this.data.name}`);
    }

    createConfiguredElement(tag, textContent, className) {
        const element = document.createElement(tag);
        element.textContent = textContent;
        if (className) { element.classList.add(className) }
        return element;

    }

}


export class PhotographerCard extends PhotographerBase {
    constructor(data) {
        super(data); // Call the parent constructor with the data parameter
    }
    fillPhotographerNode() {
        super.createElements();

        //console.log(this);

        const figure = document.createElement( 'figure' );
        const photographerThumb = document.createElement( 'a' );
        photographerThumb.setAttribute("href", `photographer.html?id=${this.data.id}&name=${this.data.name}`)

        photographerThumb.appendChild(this.imagePortrait);
        figure.appendChild(photographerThumb);

        const photographerInfo = document.createElement( 'figcaption' );

        const h2name = document.createElement( 'h2' );
        h2name.innerHTML = this.nameElement.innerHTML;
        photographerInfo.appendChild(h2name);
        photographerInfo.appendChild(this.divInfo);
        figure.appendChild(photographerInfo);

        return figure;

    }

}


export class PhotographerHeader extends PhotographerBase {
    constructor(data) {
        super(data); // Call the parent constructor with the data parameter
    }
    fillPhotographerNode() {
        super.createElements();

        const photographerHeaderInfo = document.querySelector(".photographer-info");
        photographerHeaderInfo.appendChild(this.nameElement);
        photographerHeaderInfo.appendChild(this.divInfo);

        const photographerHeaderPortrait = document.querySelector(".photographer-portrait-container");
        photographerHeaderPortrait.appendChild(this.imagePortrait);

        const price = document.querySelector(".daily-price");
        price.textContent = this.data.price;
    }
}
