const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json();
    displayNews(data.data.news_category)
}

const displayNews = news => {
    const ulParent = document.getElementById('new-nav');
    news.forEach(newsAll => {
        const liCreate = document.createElement('li');
        liCreate.classList.add('nav-item');
        liCreate.innerHTML = `
        <a class="nav-link mx-3" aria-current="page" href="${newsAll.category_name}">${newsAll.category_name}</a>
        `;
        ulParent.appendChild(liCreate);
    })

}

const loadNewsContent = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);
    const data = await res.json();
    newContentNews(data.data);
}

const newContentNews = contentNew => {
    const card = document.getElementById('card');
    // console.log(contentNew);
    contentNew.forEach(newContent => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card">
            <img src="${newContent.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${newContent.title.slice(0,50)}...</h5>
            <p class="card-text">${newContent.details.slice(0, 200)}...</p>
            <div class="card-footer">
                <small class="text-muted d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${newContent.author.img}" class="rounded-circle" style="width: 50px; height: 50px">
                        <h5 class="ms-4">${newContent.author.name}</h5>
                    </div>
                <p>Views: ${newContent.total_view}</p>
                <a href="#" class="btn btn-primary">More Details</a>
                </small>
            </div>
        </div>
        </div>
        `;
        card.appendChild(cardDiv)
    });
}




loadNewsContent()
loadNews()