/**
 * Utility module providing helper functions for creating HTML elements with options.
 */

/**
 * Creates an HTML element with specified tag, optional class(es), and text content.
 * @param {string} tag - The HTML tag to create.
 * @param {string} [className] - The primary class name to add to the element (optional).
 * @param {string} [textContent=''] - The text content of the element.
 * @param {string[]} [additionalClasses=[]] - Additional class names to add to the element.
 * @returns {HTMLElement} The created HTML element.
 */
export default function createElementWithOptions(tag, className = '', textContent = '', additionalClasses = []) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    additionalClasses.forEach(cls => element.classList.add(cls));
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}
