let recipeInput = document.getElementById("cocktailName");
let searchButton = document.getElementById("cocktailSearch");

searchButton.addEventListener("click", ()=>{getCocktailByName(recipeInput.value)})

function getCocktailByName(name)
{
    console.log(fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`));
}
