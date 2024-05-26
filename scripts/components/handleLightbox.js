// handleLightbox.js

/**
 * Handles the functionality of a lightbox component, allowing users to view images or videos in a modal overlay.
 * Implements keyboard navigation and focus management to ensure accessibility.
 */

export default function handleLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeLightboxButton = document.getElementById('close-lightbox');
    const prevLightboxButton = document.getElementById('prev-lightbox');
    const nextLightboxButton = document.getElementById('next-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    let focusedItem = null;

    /**
     * Opens the lightbox with the specified image or video.
     * @param {number} index The index of the gallery item to display.
     */
    function openLightbox(index) {
        const item = galleryItems[index];
        const imageElement = item.querySelector('img');
        const videoElement = item.querySelector('video');
        const imageTitle = item.closest('figure').querySelector('.media-title').textContent;

        lightboxMediaContainer.innerHTML = '';
        if (imageElement) {
            const imageSrc = imageElement.getAttribute('src');
            const lightboxImage = document.createElement('img');
            lightboxImage.src = imageSrc;
            lightboxMediaContainer.appendChild(lightboxImage);
        } else if (videoElement) {
            const videoSrc = videoElement.querySelector('source').getAttribute('src');
            const lightboxVideo = document.createElement('video');
            lightboxVideo.controls = true;
            lightboxVideo.src = videoSrc;
            lightboxVideo.type = 'video/mp4';
            lightboxMediaContainer.appendChild(lightboxVideo);
        }

        lightboxTitle.textContent = imageTitle;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        focusedItem = item;
        lightbox.focus();
        currentIndex = index;
    }

    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        if (focusedItem) {
            focusedItem.focus();
        }
        focusedItem = null;   
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', event => {
            event.preventDefault();
            openLightbox(index);
        });

        item.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    prevLightboxButton.addEventListener('click', showPreviousImage);
    nextLightboxButton.addEventListener('click', showNextImage);


     /**
     * Handles keydown events within the lightbox to navigate through images and close the lightbox.
     * @param {KeyboardEvent} event The keydown event.
     */
    function handleKeydown(event) {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Enter') {
                if (document.activeElement === closeLightboxButton) {
                    closeLightbox();
                } else {
                    showNextImage();
                }
            } else if (event.key === ' ') {
                if (document.activeElement === closeLightboxButton) {
                    closeLightbox();
                }
            }
        }
    }

    closeLightboxButton.addEventListener('click', closeLightbox);
    closeLightboxButton.addEventListener('keydown', handleKeydown);

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox || event.target === closeLightboxButton) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', handleKeydown);
}
