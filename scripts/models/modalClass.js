export default
class ModalWindow {
    constructor(config) {
      this.config = config;
      //this.element = document.createElement('div'); // Assuming a div as the modal container
      this.init();
    }
  
    init() {
      // Initialize the modal with the given config
      // This is where you would set up the modal's appearance and behavior
      // For simplicity, we're just logging the config here
      console.log(this.config);
    }
  
    show() {
      // Show the modal
      this.element.style.display = 'block';
    }
  
    hide() {
      // Hide the modal
      this.element.style.display = 'none';
    }
  }




  // class ContactFormClass extends ModalWindow {
  //   constructor() {
  //     super('contact-modal');
  //     this.setupForm();
  //   }
  
  //   setupForm() {
  //     const form = this.element.querySelector('form');
  //     // Assuming the form structure is already in place as per the provided HTML
  //     // You can add event listeners or further customize the form here
  //   }
  // }


  // class LightboxClass extends ModalWindow {

  //   constructor() {
  //     super('lightbox-modal');
  //     this.setupLightbox();
  //   }

  // }



