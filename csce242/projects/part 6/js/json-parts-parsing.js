const getParts = async() => {
    const url = 'https://github.com/Cwingo242/parts.json';

    try {

        const response = await fetch(url);
       return  response.json();

    } catch (error) {
        console.log("sorry");
    }

};

const showParts = async() => {
    const parts = await getParts();
    const shoePartListDiv = document.getElementById('part-list');


    shoes.forEach((part) => {  
        console.log(part.name);
    });

    showParts();
}