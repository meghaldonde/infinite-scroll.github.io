let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let initialImagesCount = 9;
const imagesCount = 30;

//Unsplash API

//const apiKey = config.API_KEY;
const apiKey = 'ObSshfRHGffM7Hng-NcmfquEx2mk27II34XRJAIuO6o';

const query = 'food';
const orientation = 'squarish';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialImagesCount}&query=${query}&orientation=${orientation}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        updateAPIForImageCount();
    }
}

function updateAPIForImageCount() {

    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}&query=${query}&orientation=${orientation}`;

}

//Helper function to set Attributes 
function helperSetAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for Links, photos, Add to DOM
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        //Create <a> for photo
        const item = document.createElement('a');
        helperSetAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img> for photo
        const img = document.createElement('img');
        helperSetAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>
        item.appendChild(img);
        //Put <a> inside <div class=image-conatiner>
        imageContainer.appendChild(item);

    });

}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    } catch (error) {
        console.log('Error fetching data :' + error);
    }

}


// Check to see if scrolling near the bottom of the page, if so, load more
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();