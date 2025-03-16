// Loader function
function showLoader() {
    document.getElementById('loader').classList.remove("hidden")
    document.getElementById('video-container').classList.add("hidden");
}
function removeLoader() {
    document.getElementById('video-container').classList.remove("hidden");
    document.getElementById('loader').classList.add("hidden")
}

// convert time to string
function getTime(time) {
    const hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hours}h  ${minute}m ${remainingSecond}s ago`;
}

//function for remove active class 
function removeActiveClass() {
    const activeBtn = document.getElementsByClassName('active');
    for (let btn of activeBtn) {
        btn.classList.remove('active')
    }
}


// fetch and load categories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories))
}


//fetch ,load and Show Video By Categories 
const loadVideoByCategories = (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            //remove active class function
            removeActiveClass()
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add('active');
            showVideo(data.category);
        })
}

// fetch and load video
function loadVideo(searchText = "") {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            //remove active class function
            removeActiveClass()

            const clickedBtn = document.getElementById('activeAllBtn');
            clickedBtn.classList.add('active');
            showVideo(data.videos)
        })
}

// fetch and load video Details
const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showVideoDetails(data.video))
}

// show video Details 
const showVideoDetails = (details) => {
    console.log(details)
    document.getElementById('videoDetails').showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
                        <div class="card bg-base-100 image-full shadow-sm">
                            <figure>
                                <img src="${details.thumbnail}" />
                            </figure>
                            <div class="card-body">
                            <div class="flex items-center gap-2">
                                <img class="rounded-full w-12" src="${details.authors[0].profile_picture}" alt="">
                                <p class="text-white text-xl">${details.authors[0].profile_name}</p>
                            </div>
                                <h2 class="card-title">${details.title}</h2>
                                <p>${details.description}</p>
                            </div>
                        </div>

                    `;

}


// Categories menu btn section
const showCategories = (showBtn) => {
    // get the container
    const categoriesContainer = document.getElementById('category-container');
    for (let btn of showBtn) {
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `
         <button id=btn-${btn.category_id} onclick="loadVideoByCategories(${btn.category_id})" class="btn btn-small hover:bg-[#FF1F3D] hover:text-white">${btn.category}</button>
         `;
        categoriesContainer.append(catDiv);
    }
}

// Show video Card Dynamically
function showVideo(Videos) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";
    if (Videos.length == 0) {
        videoContainer.innerHTML = `
            <div class="py-20 col-span-full flex flex-col justify-center items-center">
                <img class="w-[120px]" src="assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold mt-2">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        removeLoader()
    }
    Videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure class="relative">
                    <img class="h-[200px] w-full object-cover" src="${video.thumbnail}" />

                    ${video.others.posted_date?.length == 0
                ? ""
                : ` <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2">
                                ${getTime(video.others.posted_date)}
                            </span>`
            }
                    
                </figure >
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <h2 class="text-base font-bold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">
                            ${video.authors[0].profile_name}
                            ${video.authors[0].verified == true ? ` <img class="w-6" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""> ` : " "
            }
                        </p>
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                </div>
                <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
            </div>
        `
        videoContainer.append(videoCard);
        removeLoader()
    });
}
// search option 
document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideo(input);
})

loadCategories();
