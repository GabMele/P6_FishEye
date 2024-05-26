// photographerTmplate.js

// Photographer templates methods are defined in
// the respective Classes :
// - PhotographerBase (the model) 
//      that contains the common elements
// - PhotographerCard (extends PhotographerBase)
//      that contains the card elements needed on the index page
// - PhotographerHeader (extends PhotographerBase)
//      that contains the header elements needed on the Photographer page
// 
// this solution lets me use the same method "fillPhotographerNode" that
// will be executed automatically depending on the the PhotographerClass resulting by the Factory.
// 
// If a viewpoint of the functionality is preferred, meaning putting in "template" folder
// all the methods that build the DOM elements, these organisation can be changed
// moving methods in this file (choosing different names for each fillPhotographerNode
// depending on context).

