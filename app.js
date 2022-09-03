const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }

}
const setMenu = async () => {
    const data = await loadCategories();
    const objects = data.data.news_category
    const menus = document.getElementById('menus');
    for (const list of objects) {
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadId(${list.category_id})">${list.category_name}</a>
        `;
        menus.appendChild(li);
    }
}

const loadId = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.data);
}
const toggle = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}
const displayNews = async news => {
    const data = await loadCategories();
    news.sort((a, b) => b.total_view - a.total_view);
    console.log(news);
    const number = document.getElementById('number')
    number.innerHTML = `
    <p>${news.length} items found in this category.</p>
    `
    toggle(true)
    const details = document.getElementById('details');

    details.innerHTML = '';
    news.forEach(article => {
        console.log(article);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add(`card`);
        newsDiv.classList.add(`lg:card-side`);
        newsDiv.classList.add(`bg-base-100`);
        newsDiv.classList.add(`shadow-xl`);
        newsDiv.classList.add(`m-8`);
        newsDiv.classList.add(`p-8`);
        newsDiv.innerHTML = `
    <figure><img  src="${article.thumbnail_url}" alt="Album"></figure>
    <div class="card-body">
    <h2 class="card-title">${article.title}</h2>
    <p>${article.details.length > 300 ? article.details.slice(0, 300) + '...' : article.details}</p>
    <div class="flex">
   <img class="w-10 rounded-full" src="${article.author.img}">
    <p class="ml-4 mt-2"> ${article.author.name ? article.author.name : 'No Author Name Found'}</p>
    <p><i class="fa-regular fa-calendar"></i> ${article.author.published_date}</p>
    <p><i class="fa-regular fa-eye"></i> ${article.total_view ? article.total_view : 'No Views Found'}</p>
    </div>
    <div class="card-actions justify-end">
    <label for="my-modal-4" onclick="loadPop('${article._id}')" class="btn modal-button">Details</label>
    </div>
  </div>
        `;
        details.appendChild(newsDiv);
    })
    toggle(false)
}
loadId(08);
const loadPop = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => showdetailsModal(data.data[0]))
}

const showdetailsModal = (modal) => {
    console.log(modal)
    const modalBox = document.getElementById('modal-box');
    const { image_url, total_view, author, details } = modal
    modalBox.innerHTML = `
   <img src="${image_url}">
   <p>${details}</p>
   <p class="py-4"><i class="fa-solid fa-pen-nib"></i> ${author.name ? author.name : 'No data available'}</p>
   <p class="py-4"><i class="fa-regular fa-eye"></i> ${total_view ? total_view : 'No data available'}</p>
   `;
}

loadId();
setMenu();


