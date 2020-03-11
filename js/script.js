var modal_contact_us = document.querySelector(".modal--contact-us");
var modal_map = document.querySelector(".modal--our-location");
var modal_cart_confirm = document.querySelector(".modal--add-to-cart");
var services = document.querySelector(".services");

//Write us
if (modal_contact_us) {
  contact_us_init(modal_contact_us);
}

//Map
if (modal_map) {
  map_modal_init(modal_map);
}

//Add to cart
if (modal_cart_confirm) {
  cart_confirm_init(modal_cart_confirm);
}

//Services tabs
if (services) {
  services_init(services);
}

window.addEventListener("keydown", function (evt) {

  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal_contact_us && modal_contact_us.classList.contains("modal--show")) {
      modal_close(modal_contact_us);
    }
    if (modal_map && modal_map.classList.contains("modal--show")) {
      modal_close(modal_map);
    }
    if (modal_cart_confirm && modal_cart_confirm.classList.contains("modal--show")) {
      modal_close(modal_cart_confirm);
    }
  }
});

function contact_us_init(contact_us_block) {
  var callback_button = document.querySelector(".main-contacts__callback-button");
  var contact_us_form = contact_us_block.querySelector(".contact-us-form");
  var contact_us_close_button = contact_us_block.querySelector(".modal--contact-us .modal__button--close");
  var username = contact_us_block.querySelector(".contact-us-form__username");
  var email = contact_us_block.querySelector(".contact-us-form__email");
  var comment = contact_us_block.querySelector(".contact-us-form__comment");
  var contact_us_submit = contact_us_block.querySelector(".contact-us-form__button--submit");

  if (callback_button) {
    var isLocalStorageSupport = true;
    var name = null;
    var mail = null;

    try {
      name = localStorage.getItem("name");
      mail = localStorage.getItem("email");
    } catch (error) {
      isLocalStorageSupport = false;
    }

    callback_button.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal_contact_us.classList.add("modal--show");

      if (isLocalStorageSupport && name != null && mail != null) {
        username.value = name;
        email.value = mail;
        comment.focus();
      } else {
        username.focus();
      }
    });
  }

  if (contact_us_close_button) {
    contact_us_close_button.addEventListener("click", function (evt) {
      evt.preventDefault();
      contact_us_close(modal_contact_us);
    });
  }

  if (contact_us_form) {
    username.removeAttribute("required");
    email.removeAttribute("required");
    comment.removeAttribute("required");

    contact_us_form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      if (isLocalStorageSupport && username.value && email.value && comment.value) {
        localStorage.setItem("name", username.value);
        localStorage.setItem("email", email.value);

        contact_us_close(modal_contact_us);
      }
      else {
        if (!username.value) {
          username.classList.remove("modal--error");
          modal_contact_us.offsetWidth = modal_contact_us.offsetWidth;
          username.classList.add("modal--error");
          username.focus();
        }

        if (!email.value) {
          email.classList.remove("modal--error");
          modal_contact_us.offsetWidth = modal_contact_us.offsetWidth;
          email.classList.add("modal--error");
        }

        if (!comment.value) {
          comment.classList.remove("modal--error");
          modal_contact_us.offsetWidth = modal_contact_us.offsetWidth;
          comment.classList.add("modal--error");
        }
      }
    });
  }

}

function contact_us_close(contact_us_block) {
  var username = contact_us_block.querySelector(".contact-us-form__username");
  var email = contact_us_block.querySelector(".contact-us-form__email");
  var comment = contact_us_block.querySelector(".contact-us-form__comment");

  modal_close(contact_us_block);

  if (username.classList.contains("modal--error")) {
    username.classList.remove("modal--error");
  }

  if (email.classList.contains("modal--error")) {
    email.classList.remove("modal--error");
  }

  if (comment.classList.contains("modal--error")) {
    comment.classList.remove("modal--error");
  }
}

function map_modal_init(map_block) {

  var map_link = document.querySelector(".main-contacts__map-link");
  var map_close = map_block.querySelector(".modal--our-location .modal__button--close");

  if (map_link) {
    map_link.addEventListener("click", function (evt) {
      evt.preventDefault();
      map_block.classList.add("modal--show");
    });
  }

  if (map_close) {
    map_close.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal_close(map_block);
    });
  }
}

function cart_confirm_init(cart_confirm_block) {
  var cart_confirm_close = cart_confirm_block.querySelector(".modal--add-to-cart .modal__button--close");
  var buy_buttons = document.querySelectorAll(".products-list__button--buy");
  var continue_button = cart_confirm_block.querySelector(".modal__button--continue");

  if (buy_buttons) {
    for (var i = 0; i < buy_buttons.length; i++) {
      buy_buttons[i].addEventListener("click", function (evt) {
        evt.preventDefault();
        modal_cart_confirm.classList.add("modal--show");
      });
    }
  }

  if (cart_confirm_close) {
    cart_confirm_close.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal_close(modal_cart_confirm);
    });
  }

  if (continue_button) {
    continue_button.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal_close(modal_cart_confirm);
    });
  }
}

function services_init(services_block) {
  var services_buttons = services_block.querySelectorAll(".services-list__button");
  var description_items = services_block.querySelectorAll(".services-description__item");

  for (var i = 0; i < services_buttons.length; i++) {
    services_buttons[i].addEventListener("click", function (evt) {

      var active_button = services_block.querySelector(".services-list__button--active");
      if (active_button) {
        active_button.classList.remove("services-list__button--active");
      }

      evt.target.classList.add("services-list__button--active");

      var active_description = services_block.querySelector(".services-description__item--show");
      if (active_description) {
        active_description.classList.remove("services-description__item--show");
      }

      for (m = 0; m < services_buttons.length; m++) {
        if (services_buttons[m].classList.contains("services-list__button--active")) {
          description_items[m].classList.add("services-description__item--show");
        }
      }
    });
  }
}

function modal_close(modal_block) {

  modal_block.classList.add("modal--close");

  setTimeout(function () {
    if (modal_block.classList.contains("modal--show")) {
      modal_block.classList.remove("modal--show");
    }
    if (modal_block.classList.contains("modal--close")) {
      modal_block.classList.remove("modal--close");
    }
  }, 490);
}

try {
  //yandex.maps API
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [59.938635, 30.323118],
      zoom: 18,
      controls: ['zoomControl', 'routeButtonControl']
    }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #9e1708; background-color: #ffffff; border-radius: 5px;' +
        'padding:5px; font-weight: bold; width: 130px; text-align: left; opacity: 90%">$[properties.iconContent]</div>'
      ),

      myPlacemarkWithContent = new ymaps.Placemark([59.938635, 30.323118], {
        iconContent: 'Большая Конюшенная ул., 19',
        hintContent: 'Большая Конюшенная ул., 19',
      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'img/map-marker.png',
        iconImageSize: [22, 44],
        iconImageOffset: [-11, -44],
        iconContentOffset: [28, 22],
        iconContentLayout: MyIconContentLayout
      });

    myMap.geoObjects
      .add(myPlacemarkWithContent);
  });
}
catch {
  console.log("Yandex maps is not defined at this page");
}

// Slider

var slider = document.querySelector(".slider");
var slides;
var marker_items;
var marker_buttons;
var previous_button;
var next_button;
var slider_interval;

var current_slide_index = 1;
const SLIDE_SPEED = 5000;

if (slider) {
  slider_init();
}

function slider_init () {
  slides = slider.querySelectorAll(".slider-list__item");
  marker_items = slider.querySelectorAll(".slider__markers-item");
  marker_buttons = slider.querySelectorAll(".slider__marker-button");
  previous_button = slider.querySelector(".slider__button--previous");
  next_button = slider.querySelector(".slider__button--next");

  slider_interval = setInterval(next_slide, SLIDE_SPEED);

  next_button.addEventListener("click", function (evt) {
    evt.preventDefault();
    clearInterval(slider_interval);
    next_slide();
    slider_interval = setInterval(next_slide, SLIDE_SPEED);
  });

  previous_button.addEventListener("click", function (evt) {
    evt.preventDefault();
    clearInterval(slider_interval);
    previous_slide();
    slider_interval = setInterval(next_slide, SLIDE_SPEED);
  });

  for (var index = 0; index < marker_buttons.length; index++) {
    marker_buttons[index].addEventListener("click", clickHandler.bind(null, index));
  }
}

function clickHandler(index, evt) {
  evt.preventDefault();
  var is_active = evt.target.classList.contains("slider__marker-button--active");
  if (is_active) {
    clearInterval(slider_interval);
    slider_interval = setInterval(next_slide, SLIDE_SPEED);
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