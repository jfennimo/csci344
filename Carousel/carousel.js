const data = [
  {
    image_url: "https://picsum.photos/450/300?n=1",
    caption: "Photo 1",
  },
  {
    image_url: "https://picsum.photos/450/300?n=2",
    caption: "Photo 2",
  },
  {
    image_url: "https://picsum.photos/450/300?n=3",
    caption: "Photo 3",
  },
  {
    image_url: "https://picsum.photos/450/300?n=4",
    caption: "Photo 4",
  },
  {
    image_url: "https://picsum.photos/450/300?n=5",
    caption: "Photo 5",
  },
  {
    image_url: "https://picsum.photos/450/300?n=6",
    caption: "Photo 6",
  },
  {
    image_url: "https://picsum.photos/450/300?n=7",
    caption: "Photo 7",
  },
  {
    image_url: "https://picsum.photos/450/300?n=8",
    caption: "Photo 8",
  },
  {
    image_url: "https://picsum.photos/450/300?n=9",
    caption: "Photo 9",
  },
  {
    image_url: "https://picsum.photos/450/300?n=10",
    caption: "Photo 10",
  }
];

function loadSlides(photoList) {
  photoList.forEach((item, index) => {
    const elem = document.querySelector('.carousel-inner');
    elem.insertAdjacentHTML("beforeend", `<section id="slide_${index}" class="slide" role="group" onclick="next()" aria-label="Slide ${index+1} of 10">
    <img src=${item.image_url} alt="${item.caption}"/>
      <p>${item.caption}</p>
    </section>`);
  });
}

loadSlides(data);

// const slides = document.querySelectorAll('.carousel-inner .slide');
const slides = document.querySelector('.carousel-inner');
const slide = document.querySelector('.slide');
let currentSlide = 0;
let lastSlide = 9;

const next = () => {
  document.querySelector(`#slide_${currentSlide}`).setAttribute('aria-hidden', true);
  if(currentSlide == lastSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  console.log('Show next slide');
  slides.style.left = currentSlide * -55 + 'vw';
  console.log(currentSlide);
  document.querySelector(`#slide_${currentSlide}`).setAttribute('aria-hidden', false);
};

const previous = () => {
  document.querySelector(`#slide_${currentSlide}`).setAttribute('aria-hidden', true);
  if(currentSlide == 0) {
    currentSlide = lastSlide;
  } else {
    currentSlide--;
  }
  console.log('Show previous slide');
  slides.style.left = currentSlide * -55 + 'vw';
  console.log(currentSlide);
  document.querySelector(`#slide_${currentSlide}`).setAttribute('aria-hidden', false);
};