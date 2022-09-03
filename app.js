// fetch categories form api
const loadCategoriesName = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategoriesName(data.data.news_category))
        .catch(error => console.log(error));
}

const displayCategoriesName = allCategories => {
    const ulParent = document.getElementById('new-nav');
    // categoriesContainer.innerHTML = ``;
    allCategories.forEach(newsAll => {
        const liCreate = document.createElement('li');
        liCreate.classList.add('nav-item');
        liCreate.innerHTML = ` <p class="nav-link mx-3 pointer" aria-current="page">${newsAll.category_name}</a>`
            ;
        ulParent.appendChild(liCreate);
    })
}
loadCategoriesName()