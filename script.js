const slider = document.querySelector('.slider');
const select = document.querySelector('#breeds');
const img = slider.querySelector('.slideshow');
const button = slider.querySelector('.description')
const modalPopup = document.querySelector('.modalPopup')
const close = document.querySelector('.fa-times');
const closeButton = document.querySelector('.closeButton');

window.onload = function(){
    setTimeout(function(){
        // modalPopup.style.display = "block"
        modalPopup.classList.add('open');
    },1000)
}

function closeModal(e){
    // modalPopup.style.display="none";
    modalPopup.classList.add('close');
    modalPopup.classList.remove('open');

}

close.addEventListener('click', closeModal)
closeButton.addEventListener('click',closeModal);


const option = `<option class="options" id="placeholder" > Choose a breed</option>`;


function fetchData(url){
    if (img.src != "images/blue.png"){
    return fetch(url).then(response => response.json())
}
}

fetchData('https://dog.ceo/api/breeds/list')
.then(data => generateOptions(data.message))


fetchData('https://dog.ceo/api/breeds/image/random')
.then(data => generateImage(data.message))



function generateOptions(data){
 const breeds = data.map(item =>
       ` <option class="options" value='${item}'>${item}</option>
    `).join('');
    select.innerHTML = option + breeds;
}

function generateImage(data){
    if(select.value !="Choose a breed"){
     img.src = data;
     img.style.display = "inline"; 
    button.textContent = `This is a ${select.value}`   
    }     
}

function breedImage(){
    const dogBreeds = select.value; 
     if(select.value != "Choose a breed"){
    fetch(`https://dog.ceo/api/breed/${dogBreeds}/images/random`)
    .then(response => response.json())
    .then(data => {
       img.src = data.message;
        img.style.display = "inline";
        img.alt = dogBreeds;
        button.style.display = "block"
        button.textContent = `Click to view more ${dogBreeds}` 
})
} else {
    img.src = "images/blue.png"
    img.style.display = "none";
    button.style.display = "none"
}
}


select.addEventListener('change', breedImage);
slider.addEventListener('click', breedImage);
