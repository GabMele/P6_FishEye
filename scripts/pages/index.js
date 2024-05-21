// import Api from '../api/api.js';
import { fetchData } from '../api/api.js';
// import photographerTemplate from '../templates/photographerTemplate.js';
import PhotographerFactory from "../factories/photographerFactory.js";


async function fetchPhotographers() {

    // const photographersFetchDatas = new Api('../../data/photographers.json');
    // const { photographers } = await photographersFetchDatas.fetchData();
    const { photographers } = await fetchData('../../data/photographers.json');
    return { photographers }
}



async function init() {
    // Récupère les datas des photographes
    const { photographers } = await fetchPhotographers();


    const section = document.querySelector(".photographers-section");
    // console.log("section ----------- ");
    // console.log(section);

    photographers.forEach((photographer) => {

        const photographerInstance = PhotographerFactory.generatePhotographerNode(photographer, section);
        // console.log("photographerInstance created : ======= ");
        // console.log(photographerInstance);

        // gab
        // const figure = photographerInstance.fillPhotographerCard();

        const figure = photographerInstance.fillPhotographerNode();
        section.appendChild(figure);

    });

}

init();
    
