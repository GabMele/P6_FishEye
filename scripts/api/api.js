// // export default class Api {
// //     constructor(url){
// //         this.url = url;
// //     }
// export async function fetchData(url){
//         try{
//             const response = await fetch(this.url);
//             const data = await response.json();
//             return data;
//         } catch(err){
//             throw new Error(err);
//         }
//     }

// //};


export async function fetchData(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(err){
        throw new Error(err);
    }
}
