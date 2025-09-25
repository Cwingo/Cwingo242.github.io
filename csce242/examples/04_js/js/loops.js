document.getElementById("btn-display").onclick = () => {
    const displaySection = document.getElementById("loop-result");
    const ul = document.createElement("ul");
    displaySection.append(ul);

    // Loop and write the numbers one through 10
    for (let i = 0; i < 10; i++) {
        const li = document.createElement("li");
        li.innerHTML = `${i} banana(s)`;
        ul.append(li);
    }
};

document.getElementById("btn-count").onclick = () => {
    const error = document.getElementById("error-number");
    error.innerHTML = "";

    const startNum = parseInt(document.getElementById("txt-start").value);
    const endNum = parseInt(document.getElementById("txt-end").value);

    const resultDiv = document.getElementById("d-count");
    resultDiv.innerHTML = "";

    if (startNum > endNum) {
        error.innerHTML = "* The second number must be bigger than the first";
        return;
    }

    // Loop for every number from start to end to display the number in paragraphs
    for (let i = startNum; i <= endNum; i++) {
        const p = document.createElement("p");
        p.innerHTML = i;
        resultDiv.append(p);
        p.onclick = () => {
            console.log(`You clicked Number ${i}`);
        };
    }
};

document.getElementById("btn-show-toys").onclick = () => {
    const toylist = document.getElementById("toy-list");
    toylist.innerHTML = "";

    const toys = ["ball", "doll", "car", "puzzle", "teddy bear"];

    // Loop through the toys array and display each toy
    for (let i = 0; i < toys.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = toys[i];
        toylist.append(li);
    }
};

document.getElementById("btn-show-toy-prices").onclick = () => {
    const toys = [];
    toys["ball"] = 10; 
    toys["doll"] = 15;
    toys["car"] = 7;
    toys["puzzle"] = 12;
    const toyDiv = document.getElementById("toy-prices");
    toyDiv.innerHTML = "";

    for(let toy in toys){
        const p = document.createElement("p");
        p.innerHTML = toy;
        toyDiv.append(p);
    }
};
