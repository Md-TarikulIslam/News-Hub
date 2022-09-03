const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}
const setMenu = async () => {
    const data = await loadCategories();
    // console.log(data.data.news_category)
    // console.log(data.data)
    const objects = data.data.news_category
    // objects.forEach(obj => console.log(obj))
    // const lists = data.data.news_category
    const menus = document.getElementById('menus');
    for (const list of objects) {
        // console.log(list.category_name)
        const li = document.createElement('li');
        // li.classList.add('menu')
        li.innerHTML = `
        <a onclick="loadId(${list.category_id})">${list.category_name}</a>
        
        `;
        menus.appendChild(li);

    }
}

const loadId = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
    // console.log(url)
    const response = await fetch(url);
    const data = await response.json();

    displayNews(data.data);


}

const displayNews = news => {
    // console.log(news);

    const details = document.getElementById('details');
    details.innerHTML = '';
    news.forEach(article => {
        console.log(article);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add(`card`);
        newsDiv.classList.add(`lg:card-side`);
        newsDiv.classList.add(`bg-base-100`);
        newsDiv.classList.add(`shadow-xl`);

        newsDiv.innerHTML = `
   
    <figure class:"w-40"><img  style="width: 500px ;" src="${article.image_url}" alt="Album"></figure>
    <div class="card-body">${article.title}</div>
      <h2 class="card-title">${article.category_id}</h2>
      <p>${article.rating.number}</p>
      <div class="card-actions justify-end">
        <label for="my-modal-4" onclick="loadPop('${article._id}')" class="btn modal-button">Listen</label>
        
        `;
        details.appendChild(newsDiv);
    })

}


const loadPop = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => showdetailsModal(data.data[0]))
}

const showdetailsModal = (modal) => {
    console.log(modal)
    const modalBox = document.getElementById('modal-box');
    const { image_url, total_view } = modal
    modalBox.innerHTML = `
   <img src="${image_url}">
   <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
   
   `

}



//     const modal = document.getElementById('modal_id');
//     const label = document.createElement('label')
//     label.innerHTML = `
//         <label class="modal-box relative" for="">
//     <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
//     <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
//   </label>

//         `;
//     modal.appendChild(label)


// }

// loadPop()





loadId()


// displayV()

setMenu()
// loadCategories()

