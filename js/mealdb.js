const loadMeals = (searchText, dataLimit) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals, dataLimit));
}

const displayMeals = (data, dataLimit) =>{
    const mealSection = document.getElementById("mealSection");
    mealSection.textContent = '';
    const showAll = document.getElementById("show-all");
    // display only 6 card
    if(dataLimit && data.length > 6){
        data = data.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // no food found message
    const noFound = document.getElementById("no-found-message");
    if(data.length === 0){
        noFound.classList.remove('d-none');
    }
    else{
        noFound.classList.add('d-none');
    }

    data.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
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
    });
    // stop loader or toggleSpinner
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeals(searchText, dataLimit);
}

// handle search button
document.getElementById("btn-search").addEventListener('click', function(){
    // start loader
    processSearch(6);
})

// search field
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(6);
    };
});

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

loadMeals('fish', 6);