const loadNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json();
    displayNews(data.data.news_category)
}

const displayNews = news => {
    const ulParent = document.getElementById('new-nav');
    news.forEach(newsAll => {
        const ulCreate = document.createElement('ul');
        ulCreate.classList.add('navbar-nav', "fs-4");
        ulCreate.innerHTML = `
        <li class="nav-item">
        <a class="nav-link" aria-current="page" href="${newsAll.category_name}">${newsAll.category_name}</a>
      </li>
        `;
        ulParent.appendChild(ulCreate);
    })

}



loadNews()