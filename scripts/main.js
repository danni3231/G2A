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

  
/*
  if(current >= carrouselStripe.children.length) {
    current = 0;
  }
 */
}

//setInterval(handleNextSlide, 1000);
