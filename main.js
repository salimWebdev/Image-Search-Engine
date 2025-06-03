const accessKey = 'uV9-jiDI4DRVQGMrOX11NHQvPiAjLlYB-2dS5EKVjcM';

const form = document.querySelector('.form');
const prompt = document.getElementById('prompt');
const exhibition = document.getElementById('exhibition');
const show_more = document.getElementById('show_more');

let page = 1;
let image_searched = '';

async function search_function() {
    image_searched = prompt.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${image_searched}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
    const results = data.results;

    results.map((result) => {
        const image_card = document.createElement('div');
        image_card.classList.add('card');
        image_card.style.backgroundImage = `url("${result.urls.small}")`;
        image_card.style.transition = '0.1s';
        image_card.style.backgroundSize = "cover";
        image_card.style.backgroundRepeat = "no-repeat";
        image_card.style.backgroundPosition = "center";
        image_card.style.cursor = "pointer";

        image_card.onmouseover = () => {
            image_card.style.scale = '0.95';
        };

        image_card.onmouseout = () => {
            image_card.style.scale = '1';
        };

        // Optional: Track download with Unsplash API
        image_card.onclick = () => {
            window.location.href=`${result.links.download}`
        };

        exhibition.appendChild(image_card);
    });
}

form.addEventListener('submit', (event) => {
    exhibition.innerHTML = '';
    event.preventDefault();
    search_function();
});

show_more.onclick=()=>{
    page++
    search_function()
}