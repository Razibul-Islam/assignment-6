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

// Load News based on Category
const loadNews = category => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, category));
}

const displayNews = (allNews, category) => {
    const newsContainer = document.getElementById('news-container')
    allNews.forEach(news => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card">
            <img src="${news.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${news.title.slice(0, 50)}...</h5>
            <p class="card-text">${news.details.slice(0, 200)}...</p>
            <div class="card-footer">
                <small class="text-muted d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${news.author.img}" class="rounded-circle" style="width: 50px; height: 50px">
                        <h5 class="ms-4">${news.author.name ? news.author.name : 'Author name not found'}</h5>
                    </div>
                <p>Views: ${news.total_view? news.total_view : 'No views'}</p>
                </small>
            </div>
        </div>
        </div>
        `;
        newsContainer.appendChild(cardDiv);
    })
}

loadNews('01')