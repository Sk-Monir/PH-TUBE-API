// fetch and load categories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories))
}

// Categories menu section
const showCategories = (show) => {
    // get the container
    const categoriesContainer = document.getElementById('category-container');
    for (let btn of show) {
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `
         <button class="btn btn-small hover:bg-[#FF1F3D] hover:text-white">${btn.category}</button>
         `;
        categoriesContainer.append(catDiv);
    }
}


// fetch and load video
function loadVideo() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => showVideo(data.videos))
}
// show video section
function showVideo(show) {
    const videoContainer = document.getElementById('video-container');
    show.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img class="h-[200px] w-full" src="${video.thumbnail}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${video.title}</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        `
        videoContainer.append(videoCard);
    });
}
loadCategories();
loadVideo();