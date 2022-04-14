const recipeInput = document.getElementById("cocktailName");
const searchButton = document.getElementById("cocktailSearch");
const resultsSection = document.getElementById("resultsSection");
const selectedRecipe = document.getElementById("selectedRecipe");
let recipeResults;

searchButton.addEventListener("click",async ()=> { await getCocktailByName(recipeInput.value);updateSearchResults()})

async function getCocktailByName(name)
{
    selectedRecipe.innerHTML = "";
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    recipeResults = data;
}

function updateSearchResults()
{
    resultsSection.innerHTML = "";
    recipeResults.drinks.forEach(element => {
        const newDiv = resultsSection.appendChild(document.createElement("div"))
        newDiv.className = "drink container";
        const textDiv = newDiv.appendChild(document.createElement("div"));
        textDiv.className = "drinkText container";
        const text = textDiv.appendChild(document.createElement("p"));
        const thumbDiv = newDiv.appendChild(document.createElement("div"));
        thumbDiv.className = "drinkThumb container";
        const thumbnail = thumbDiv.appendChild(document.createElement("img"));
        thumbnail.src = element.strDrinkThumb;
        thumbnail.className = "thumbnail";
        text.innerText = element.strDrink;
        newDiv.addEventListener("click", () => {selectDrink(element)});
    });
}

function selectDrink(drink)
{
    selectedRecipe.innerHTML = "";
    const ingredientList = selectedRecipe.appendChild(document.createElement("ul"))
    for(let i = 1; i <= 15; i++)
    {
        let ingredient = drink["strIngredient"+i];
        if(ingredient == null)
        {
            continue;
        }
        const measure = drink["strMeasure"+i];
        if(measure != null)
        {
            ingredient = measure + " " + ingredient;
        }
        const li = ingredientList.appendChild(document.createElement("li"));
        const ingredientText = li.appendChild(document.createElement("p"));
        ingredientText.innerText = ingredient;
    }
    const instructionsDiv = selectedRecipe.appendChild(document.createElement("div"));
    const instructions = instructionsDiv.appendChild(document.createElement("p"));
    instructions.innerText = drink.strInstructions;
    selectedRecipe.scrollIntoView({behavior: "smooth"});
}