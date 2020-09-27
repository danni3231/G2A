const carrousel = document.querySelector('.carrousel');
const carrouselStripe = document.querySelector('.carrousel__stripe');
let current = 0;


function handleNextSlide () {
    console.log(current)
    if(current < carrouselStripe.children.length){
        const width = carrouselStripe.children.item(current).clientWidth;
        carrouselStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
        current++;
    }

    if(current >= carrouselStripe.children.length) {
        current = 0;
      }
}

const listInput = document.querySelectorAll('.logos--button input');

function logosInputHandle (event) {
  listInput.forEach(element => {
    element.classList.remove('logos--button-focus');
  });
  event.target.classList.add('logos--button-focus');
  console.log(event);
}

listInput.forEach(function (elem, index) {
  elem.addEventListener('click', logosInputHandle);
});

setInterval(handleNextSlide, 1000);

