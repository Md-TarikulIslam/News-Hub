const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}
const setMenu = async () => {
    const data = await loadCategories();
    // console.log(data.data.news_category)
    const lists = data.data.news_category
    const menus = document.getElementById('menus')
    for (const list of lists) {
        console.log(list.category_name)
        const li = document.createElement('li')
        li.innerHTML = `
        <a>${list.category_name}</a>
        `
        menus.appendChild(li)
    }
}

setMenu()
// loadCategories()

