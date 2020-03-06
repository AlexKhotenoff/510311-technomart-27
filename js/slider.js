var slider = document.querySelector(".slider");
var slides = slider.querySelectorAll(".slider-list__item");
var marker_items = slider.querySelectorAll(".slider__markers-item");
var marker_buttons = slider.querySelectorAll(".slider__marker-button");
var previous_button = slider.querySelector(".slider__button--previous");
var next_button = slider.querySelector(".slider__button--next");
var current_slide_index = 1;
const SLIDE_SPEED = 5000;

var slider_interval = setInterval(next_slide, SLIDE_SPEED);

next_button.addEventListener("click", function (evt) {
  evt.preventDefault();
  // clearInterval(slider_interval);
  next_slide();
  // slider_interval = setInterval(next_slide, SLIDE_SPEED);
});

previous_button.addEventListener("click", function (evt) {
  evt.preventDefault();
  // clearInterval(slider_interval);
  previous_slide();
  // slider_interval = setInterval(next_slide, SLIDE_SPEED);
});

// for (let i = 0; i < marker_buttons.length; i++) {
//     marker_buttons[i].addEventListener("click", function (evt) {
//       evt.preventDefault();
//       var active_marker = slider.querySelector(".slider__marker-button--active");
//       if (active_marker != null) {
//         active_marker.classList.remove("slider__marker-button--active");
//         evt.target.classList.add("slider__marker-button--active");

//         // clearInterval(slider_interval);
//         get_slide(i);
//         // slider_interval = setInterval(next_slide, SLIDE_SPEED);
//       }
//     });
// }

for (var index = 0; index < marker_buttons.length; index++) {
  marker_buttons[index].addEventListener('click', clickHandler.bind(null, index));
}

function clickHandler(index, evt) {
  evt.preventDefault();
  var is_active = evt.target.classList.contains("slider__marker-button--active");
  if (is_active) {
    clearInterval(slider_interval);
    //slider_interval = setInterval(next_slide, SLIDE_SPEED);
    return false;
  }

  var active_marker = slider.querySelector(".slider__marker-button--active");
  active_marker.classList.remove("slider__marker-button--active");
  evt.target.classList.add("slider__marker-button--active");
  clearInterval(slider_interval);
  get_slide(index);
  slider_interval = setInterval(next_slide, SLIDE_SPEED);
}


function get_slide(slide_index) {
  try {
    slider.querySelector(".slider-list__item--show").classList.remove("slider-list__item--show");
    slides[slide_index].classList.add("slider-list__item--show");

    slider.querySelector(".slider__marker-button--active").classList.remove("slider__marker-button--active");
    marker_buttons[slide_index].classList.add("slider__marker-button--active");
    current_slide_index = slide_index;
  }
  catch (e) {
    console.log(e);
  }
}

function next_slide() {
  if (current_slide_index < slides.length - 1) {
    current_slide_index++;
  }
  else {
    current_slide_index = 0;
  }

  get_slide(current_slide_index);
}

function previous_slide() {
  if (current_slide_index > 0) {
    current_slide_index--;
  }
  else {
    current_slide_index = slides.length - 1;
  }

  get_slide(current_slide_index);
}
