const input = document.getElementById('input');
let button = document.getElementById('btn');
const recipeResult = document.getElementById('recipe-result'); 

button.addEventListener('click', () => {
    let query = input.value.trim();  
    if (query) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`) 
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                if (data.meals) {
                    recipeResult.innerHTML = '';
                    data.meals.forEach(meal => {
                        const recipeHTML = `
                            <div class="meal-card">
                                <h2>${meal.strMeal}</h2>
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 200px; height: 200px;">
                                <p><a href="${meal.strSource}">view Recipe</a></p>
                            </div>
                        `;
                        recipeResult.innerHTML += recipeHTML; 
                    });
                } else {
                    recipeResult.innerHTML = '<p>No recipes found. Please try a different ingredient.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.log('Please enter an ingredient name');
    }
});
