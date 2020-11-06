const carrousel = document.querySelector('.carrousel');
const carrouselStripe = document.querySelector('.carrousel__stripe');

let carrouselWidth = carrousel.clientWidth;

let current = 0;

function handleNextSlide () {
  let carrouselWidth = carrousel.clientWidth;

  if(carrouselWidth <= 414 ){

    if(current < carrouselStripe.children.length){
      const width = carrouselStripe.children.item(current).clientWidth+184;
      console.log(carrouselWidth);
      carrouselStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
      current++;
    }else{
      current = 0;
    }

  }else{

    if(current < carrouselStripe.children.length-1){
      const width = carrouselStripe.children.item(current).clientWidth-100;
      console.log(carrouselWidth);
      carrouselStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
      current++;
    }else{
      current = 0;
    }
  }
}

setInterval(handleNextSlide, 1000);

const listInput = document.querySelectorAll('.logos__button input');
const listCards =document.querySelectorAll('.promo__content');

function logosInputHandle (event) {

  listInput.forEach(element => {
    element.classList.remove('logos__button--focus');
  });

  event.target.classList.add('logos__button--focus');

  let inputIndex = event.target.getAttribute("data-index");

  listCards.forEach(function (elem, index){
    if(index == inputIndex){
      console.log(inputIndex);
      elem.classList.remove('promo__content--hidden');
    }else{
      elem.classList.add('promo__content--hidden');
    }

  });
  console.log(listInput);
}

listInput.forEach(function (elem, index) {
  elem.addEventListener('click', logosInputHandle);
});



