const loadMeals = () =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=c`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

const displayMeals = (data) =>{
    const mealSection = document.getElementById("mealSection");
    data = data.slice(0, 6);
    data.forEach(meal => {
        console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col-6');
        
        mealDiv.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <button class="btn btn-warning">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        mealSection.appendChild(mealDiv);
    })
}

loadMeals();