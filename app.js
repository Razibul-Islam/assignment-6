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


const spinner = document.getElementById('loading');


// Load News based on Category
const loadNews = category => {
    // show Spinner
    spinner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, category));
}

const displayNews = (allNews, category) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    const newsCount = document.getElementById('news-count');
    let count = 0;

    allNews.forEach(news => {
        count++;
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
                <p>Views: ${news.total_view ? news.total_view : 'No views'}</p>
                <button onclick="loadDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Show More
                </button>
                </small>
            </div>
        </div>
        </div>
        `;
        newsContainer.appendChild(cardDiv);
    })


    // Update category Count
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => findCategoryName(data.data.news_category, category))
        .catch(error => console.log(error))

    const findCategoryName = (allCategories, categoryId) => {
        allCategories.forEach(e => {
            if (e.category_id === categoryId) {
                if (count === 0) {
                    newsCount.innerText = `No item found!`;
                } else {
                    newsCount.innerText = `${count} item found from ${e.category_name}`;
                }
            }
        })
    }
    // Hide Spinner
    spinner.classList.add('d-none');
}
    // Load News Details by id
    const loadDetails = newsId => {
        const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayDetails(data.data[0]))
            .catch(error => console.log(error))
    }
    const displayDetails = news => {
        const modalTitle = document.getElementById('staticBackdropLabel');
        modalTitle.innerText = news.title
        const modalContainer = document.getElementById('modal-body');
        modalContainer.innerHTML = ` 
        <img src="${news.image_url}" class="img-fluid">  
        <p>${news.details}</p>
        <p><b>View</b>: ${news.total_view ? news.total_view : 'No Views'}</p>
        <p><b>Author</b>: ${news.author.name ? news.author.name : 'No Author name found'}</p>
        <p><b>Publish date</b>: ${news.author.published_date}</p>
    `;
    }

    document.getElementById('new-nav').addEventListener('click', (e) => {
        const selectCategory = e.target.innerText;
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then(res => res.json())
            .then(data => callLoadNewsByCategory(selectCategory, data.data.news_category))
            .catch(error => console.log(error))
    });

    const callLoadNewsByCategory = (selectCategory, categories) => {
        categories.forEach(category => {
            if (category.category_name === selectCategory) {
                loadNews(`${category.category_id}`);
            }
        })
    }
loadNews('01')