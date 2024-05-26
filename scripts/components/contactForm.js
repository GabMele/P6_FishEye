// contactForm.js

/**
 * Handles the functionality of the contact form, including opening/closing the modal,
 * handling keydown events, submitting the form, and validating the form fields.
 *
 * Accessibility Choices:
 * - Ensures the modal is accessible via keyboard interactions, allowing users to open/close
 *   the modal using the Escape key and the Enter key on the close button.
 * - Focus management is implemented to ensure that the first input field is focused when the
 *   modal opens, improving usability for keyboard-only users.
 * - Provides alternative text attributes (`aria-hidden`, `aria-invalid`) to assistive technologies
 *   like screen readers, enhancing the experience for visually impaired users.
 */

export default function handleContactForm() {
    const contactModal = document.querySelector('.contact-modal-wrapper');
    const closeButton = document.querySelector('.close-button');
    const form = document.getElementById('contactForm');

    document.addEventListener('keydown', handleKeyDown);
    document.querySelector('.contact-button-open')
       .addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    closeButton.addEventListener('keydown', closeOnEnter);

    form.addEventListener('submit', submitContactForm);
    form.addEventListener('keypress', handleEnterKeyPress);

    /**
     * Handles the Escape key press to close the modal.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    function handleKeyDown(event) {
        if (contactModal.getAttribute('aria-hidden') === 'false' 
            && event.key === 'Escape') {
            closeModal();
        }
    }

    /**
     * Opens the contact modal and sets focus on the first input field.
     */
    function openModal() {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        contactModal.setAttribute('aria-hidden', 'false');
        const firstInput = document.querySelector('#contactForm input');
        firstInput.focus();
    }

    /**
     * Closes the contact modal and returns focus to the button that opened the modal.
     */
    function closeModal() {
        contactModal.style.display = 'none';
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        document.querySelector('.contact-button-open').focus();
    }

    /**
     * Closes the modal on Enter key press.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    function closeOnEnter(event) {
        if (event.key === 'Enter') {
            closeModal();
        }
    }

    /**
     * Submits the contact form after validation.
     * @param {Event} event - The form submission event.
     */
    function submitContactForm(event) {
        event.preventDefault();
        clearErrors();
        const isValid = validateForm();
        if (isValid) {
            logFormData();
            resetForm();
            hideModal();
        }
        return false;
    }

    /**
     * Prevents form submission on pressing Enter in non-textarea fields.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    function handleEnterKeyPress(event) {
        if (event.key === 'Enter' && event.target.type!== 'textarea') {
            event.preventDefault();
            submitContactForm(event);
        }
    }

    /**
     * Clears existing errors from the form.
     */
    function clearErrors() {
        const errorContainers = document.querySelectorAll('.error-container');
        errorContainers.forEach(container => {
            container.textContent = '';
        });

        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
        });
    }

    /**
     * Validates the form fields against predefined patterns.
     * @returns {boolean} True if all fields are valid, false otherwise.
     */
    function validateForm() {
        let isValid = true;
        const namePattern = /^[a-zA-ZÀ-ÿ '-]{2,}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            const value = input.value.trim();
            const errorContainer = input.nextElementSibling;
            const error = input.getAttribute('data-error');
            if (!value) {
                isValid = false;
                setError(input, error, errorContainer);
            } else {
                switch (input.id) {
                    case 'firstname':
                    case 'lastname':
                        if (!namePattern.test(value)) {
                            isValid = false;
                            setError(input, 'Le prénom ou le nom est invalide', errorContainer);
                        }
                        break;
                    case 'email':
                        if (!emailPattern.test(value)) {
                            isValid = false;
                            setError(input, 'Email invalide', errorContainer);
                        }
                        break;
                    case 'message':
                        if (value.length < 2) {
                            isValid = false;
                            setError(input, 'Le message doit contenir au moins 2 caractères', errorContainer);
                        }
                        break;
                    default:
                        break;
                }
            }
        });

        return isValid;
    }

    /**
     * Sets an error message next to the specified field.
     * @param {HTMLElement} field - The input field element.
     * @param {string} errorMessage - The error message to display.
     * @param {HTMLElement} errorContainer - The container where the error message will be displayed.
     */
    function setError(field, errorMessage, errorContainer) {
        errorContainer.textContent = errorMessage;
        field.setAttribute('aria-invalid', 'true');
    }

    /**
     * Logs the submitted form data to the console.
     */
    function logFormData() {
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        console.log('Formulaire soumis avec succès!');
        console.log('Prénom:', firstname);
        console.log('Nom:', lastname);
        console.log('Email:', email);
        console.log('Message:', message);
    }

    /**
     * Resets the contact form to its initial state.
     */
    function resetForm() {
        document.getElementById('contactForm').reset();
    }

    /**
     * Hides the contact modal.
     */
    function hideModal() {
        contactModal.style.display = 'none';
    }
}
