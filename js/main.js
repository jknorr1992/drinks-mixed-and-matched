let recipeInput = document.getElementById("cocktailName");
let searchButton = document.getElementById("cocktailSearch");
let resultsSection = document.getElementById("resultsSection");
let recipeResults;

searchButton.addEventListener("click",async ()=> { await getCocktailByName(recipeInput.value);updateSearchResults()})

async function getCocktailByName(name)
{
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    recipeResults = await data;
}

function updateSearchResults()
{
    resultsSection.innerHTML = "";
    recipeResults.drinks.forEach(element => {
        const newDiv = resultsSection.appendChild(document.createElement("div"))
        const text = newDiv.appendChild(document.createElement("p"));
        text.innerText = element.strDrink;
    });
}