// import Api from '../api/api.js';
import { fetchData } from '../api/api.js';
import { DATA_JSON_PATH } from '../constants.js';
// import photographerCardCommons from "../templates/photographerElements.js";
import MediaFactory from '../factories/mediaFactory.js';
import createMediaCard from '../templates/mediaTemplate.js';
// import displayPhotographerHeaderCLASS from '../templates/photographerNewTemplate.js';

import PhotographerFactory from '../factories/photographerFactory.js';

// import ModalWindow from '../models/modalClass.js';

//import testimport from '../templates/photographerNewTemplate.js';
// import PhotographerFactory from '../factories/photographerFactory.js';

// import { PORTRAIT_BASE_PATH } from '../constants.js';
// import Photographer from "../models/PhotographerClass.js";


async function fetchPhotographerData(photographerId) {

    const { photographers, media } = await fetchData(DATA_JSON_PATH);

    const photographer = photographers
        //.map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);

    const photographerMedias = media
        .map(m => new MediaFactory(m))
        .filter(media => media.photographerId == photographerId);

    // console.log('photographerMedias ========> ' + photographerMedias);
    // console.log(photographerMedias);

    return { photographer, photographerMedias };
}



function displayPhotographerHeader(photographer, section) {

    const photographerInstance = PhotographerFactory.generatePhotographerNode(photographer, section);
    photographerInstance.fillPhotographerNode();

    const modalPhotographerName = document.querySelector(".modal-photographer-name");
    modalPhotographerName.textContent = photographer.name;

}



function displayMediaGallery(medias, photographerFirstName) {
    const mediasSection = document.querySelector(".medias-gallery");
    mediasSection.innerHTML = '';

    if (!Array.isArray(medias)) {
        throw new Error('medias must be an array');
    }

    medias.forEach(media => {
        const mediaCardDOM = createMediaCard(media, photographerFirstName);
        mediasSection.appendChild(mediaCardDOM);
    });

    // console.log("before handleLikes(medias)");
    // console.log(mediasSection)

    handleLikes(medias);

    // console.log("AFTER handleLikes(medias)");
    // console.log(mediasSection)

    handleLightbox();

}



function handleLikes(medias) {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        const mediaId = button.dataset.id;
        const media = medias.find(media => media.id == mediaId);

        // Restore liked state from media object
        if (media.liked) {
            button.classList.add("liked", "fas");
            button.classList.remove("far");
            button.setAttribute('aria-pressed', 'true');
        }

        button.setAttribute('tabindex', '0'); // Make buttons focusable
        button.addEventListener('click', () => {
            const isLiked = button.classList.contains("liked");

            media.likes += isLiked ? -1 : 1;
            media.liked = !isLiked; // Update liked state in media object

            button.classList.toggle("liked");
            button.classList.toggle('fas');
            button.classList.toggle('far');
            button.setAttribute('aria-pressed', !isLiked); // Update the aria-pressed attribute

            const likesCounter = button.previousElementSibling;
            likesCounter.textContent = `${media.likes}`;

            updateTotalLikes(medias);
        });
    });
}


function updateTotalLikes(medias) {

    // console.log("medias ========= " + medias);
    // console.log(medias);

    const CumulativeLikesCounter = document.querySelector('.cumulative-likes-counter');
    
    // console.log("CumulativeLikesCounter ========= " + CumulativeLikesCounter);
    // console.log(CumulativeLikesCounter);
    
    const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);

    // console.log("totalLikes ========= " + totalLikes);

    CumulativeLikesCounter.textContent = `${totalLikes}`;

    // console.log(totalLikes);

}



function sortMediaGallery(medias, sortType, photographerFirstName) {
    
    const sortedMedias = [...medias];

    //onst sortedMedias = JSON.parse(JSON.stringify(medias));

    //const sortedMedias = [...photographerMedias];

    // Sort the copied array based on the sortType
    // console.log("sorttype : " + sortType);


    console.log("photographerFirstName : " + photographerFirstName);
    console.log("BEFORE SORTING medias : ----------- ");
    console.log(medias);
    // console.log("sortedMedias : -------- ");
    // console.log(sortedMedias);



    sortedMedias.sort((a, b) => {
        switch (sortType) {
            case 'Date':
                // Convert date strings to Date objects for accurate comparison
                return new Date(b.date) - new Date(a.date);
            case 'Popularity':
                // Directly compare the likes property for popularity sorting
                return b.likes - a.likes;
            case 'Title':
                // Use localeCompare for alphabetical sorting of titles
                return a.title.localeCompare(b.title);
            default:
                console.error(`Invalid sort type: ${sortType}`);
                // Fallback to sorting by date if sortType is not recognized
                return new Date(b.date) - new Date(a.date);
        }
    });


    // sortedMedias.forEach(media => {
    //     media.likes = medias.find(m => m.id === media.id).likes;
    // });

    console.log("AFTER SORTING medias : ----------- ");

    // Clear the current media gallery
    //const mediasSection = document.querySelector(".medias-gallery");
    //mediasSection.innerHTML = "";

    console.log("AFTER SORTING medias but before handlelikes : ----------- ");
    console.log(medias);




    console.log("AFTER SORTING after handlelikes medias : ----------- ");

    displayMediaGallery(sortedMedias, photographerFirstName);
    // handleLikes(sortedMedias);

}




function handleContactForm() {

    const contactModal = document.querySelector('.contact-modal-wrapper');

    document.addEventListener('keydown', event => {
        if (contactModal.getAttribute('aria-hidden') === 'false') {
            switch (event.key) {
                case 'Escape':
                    closeModal();
                    break;
            }
        }
    });

    document.querySelector('.contact-button-open').setAttribute('tabindex', '0');
    document.querySelector('.contact-button-open').addEventListener('click', function() {
        //console.log("contact button clicked");
        contactModal.style.display = 'block';

        document.body.style.overflow = 'hidden';

        contactModal.setAttribute('aria-hidden', 'false');
        //contactModal.querySelector('header').focus();
        contactModal.focus();
    });

    // document.querySelector('.close-button').addEventListener('click', function() {
    //     contactModal.style.display = 'none';
    //     contactModal.setAttribute('aria-hidden', 'true');
    // });
    // document.querySelector('.close-button').addEventListener('keydown', function(event) {
    //     if (event.key === 'Enter') {
    //         contactModal.style.display = 'none';
    //         contactModal.setAttribute('aria-hidden', 'true');
    //     }
    // });


    const closeButton = document.querySelector('.close-button');
    function closeModal() {
        contactModal.style.display = 'none';
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
    
    closeButton.addEventListener('click', closeModal);
    closeButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            closeModal();
        }
    });


    // gab check
    //document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');  
    form.addEventListener('submit', submitContactForm);
     // });



    form.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && event.target.type !== 'textarea') {
            event.preventDefault();
            submitContactForm(event);
        }
    });



      
    function submitContactForm(event) {
        event.preventDefault();
    
        // Clear previous errors
        clearErrors();
    
        // Validate form fields
        const isValid = validateForm();
    
        // If all fields are valid, log the input data and reset the form
        if (isValid) {
            logFormData();
            resetForm();
            hideModal();
        }
    
        return false; // Prevent the default form submission
    }
    
    function clearErrors() {
        const errorContainers = document.querySelectorAll('.error-container');
        errorContainers.forEach(container => {
            container.textContent = ''; // Clear error messages
        });
    
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false'); // Reset aria-invalid attribute
        });
    }
    
    function validateForm() {
        let isValid = true;
    
        // Regex patterns
        const namePattern = /^[a-zA-ZÀ-ÿ '-]{2,}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Validate each form field
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            const value = input.value.trim();
            const error = input.getAttribute('data-error');
            if (!value) {
                isValid = false;
                setError(input, error);
            } else if (input.id === 'firstname' || input.id === 'lastname') {
                // Validate firstname and lastname against namePattern
                if (!namePattern.test(value)) {
                    isValid = false;
                    setError(input, 'Le prénom ou le nom est invalide');
                }
            } else if (input.id === 'email' && !emailPattern.test(value)) {
                // Validate email against emailPattern
                isValid = false;
                setError(input, 'Email invalide');
            } else if (input.id === 'message' && value.length < 2) {
                // Validate message length
                isValid = false;
                setError(input, 'Le message doit contenir au moins 2 caractères');
            }
        });
    
        return isValid;
    }
    
    function setError(field, errorMessage) {
        const errorContainer = field.nextElementSibling; // Get the next sibling (error container)
        errorContainer.textContent = errorMessage; // Set error message text
        field.setAttribute('aria-invalid', 'true'); // Add aria-invalid attribute to indicate error
    }
    
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
    
    function resetForm() {
        document.getElementById('contactForm').reset();
    }
    
    function hideModal() {
        contactModal.style.display = 'none';
    }


}




function handleLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeLightboxButton = document.getElementById('close-lightbox');
    const prevLightboxButton = document.getElementById('prev-lightbox');
    const nextLightboxButton = document.getElementById('next-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;


    const openLightbox = (index) => {
        const item = galleryItems[index];
        const imageElement = item.querySelector('img');
        const videoElement = item.querySelector('video');
        const imageTitle = item.closest('figure').querySelector('.media-title').textContent;

        lightboxMediaContainer.innerHTML = ''; // Clear previous media

        if (imageElement) {
            const imageSrc = imageElement.getAttribute('src');
            const lightboxImage = document.createElement('img');
            lightboxImage.src = imageSrc;
            lightboxMediaContainer.appendChild(lightboxImage);
        } else if (videoElement) {
            const videoSrc = videoElement.querySelector('source').getAttribute('src');
            const lightboxVideo = document.createElement('video');
            lightboxVideo.controls = true;
            lightboxVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
            lightboxMediaContainer.appendChild(lightboxVideo);
        }

        lightboxTitle.textContent = imageTitle;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightbox.focus();



        // // Apply transform for slide animation
        // console.log("current index : " + currentIndex);
        // console.log("index : " + index);

        // const isNext = currentIndex < index;
        // const transformValue = isNext? 'translateX(110%)' : 'translateX(-110%)';
        // lightboxMediaContainer.style.transform = transformValue;

        // // Reset transform after animation completes
        // setTimeout(() => {
        //     lightboxMediaContainer.style.transform = '';
        // }, 500); // Match the transition duration

        currentIndex = index;
    };











    const closeLightbox = () => {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    };

    const showPreviousImage = () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);

    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    };



    galleryItems.forEach((item, index) => {
        item.addEventListener('click', event => {
            event.preventDefault();
    
            console.log("click : " + index);
            console.log(item);
    
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

    // Event listener for closeLightboxButton click
    closeLightboxButton.addEventListener('click', closeLightbox);

    // Event listener for keydown events on closeLightboxButton
    closeLightboxButton.addEventListener('keydown', handleKeydown);

    // Event listener for clicks on the lightbox
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox || event.target === closeLightboxButton) {
            closeLightbox();
        }
    });

    // Global keydown event listener
    document.addEventListener('keydown', handleKeydown);


}





async function init() {

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id'); // This will return the value of the 'id' parameter, which is "123" in this case

    const { photographer, photographerMedias } = await fetchPhotographerData(photographerId);
    
    //testimport();
   
    //displayPhotographerHeader(photographer);
    const section = document.querySelector(".photographer-header");
    
    // displayPhotographerHeaderCLASS(photographer, section);

    displayPhotographerHeader(photographer, section);

    //const photographerFirstName = photographer.name.split(' ')[0].replace(/-/g, ' ');
    const photographerFirstName = photographer.name.split(' ')[0]

    displayMediaGallery(photographerMedias, photographerFirstName);

    updateTotalLikes(photographerMedias);
    
    //handleLikes(photographerMedias);

    handleContactForm();

    handleLightbox();
    

    const sortOption = document.getElementById('sortOption');
    sortOption.addEventListener('change', function (event) {
        //event.preventDefault(); // Prevent the form from submitting normally
        const sortValue = event.target.value;
        sortMediaGallery(photographerMedias, sortValue, photographerFirstName);
        //sortMediaGallery();
        
    });

}


// init();

document.addEventListener('DOMContentLoaded', () => {
    init();
});