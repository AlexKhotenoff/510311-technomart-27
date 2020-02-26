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
  map_init(modal_map);
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
      contact_us_close(modal_contact_us);
    }
    if (modal_map && modal_map.classList.contains("modal--show")) {
      modal_map.classList.remove("modal--show");
    }
    if (modal_cart_confirm && modal_cart_confirm.classList.contains("modal--show")) {
      modal_cart_confirm.classList.remove("modal--show");
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

  var isLocalStorageSupport = true;
  var name = "";

  try {
    name = localStorage.getItem("name");
  } catch (error) {
    isLocalStorageSupport = false;
  }

  if (callback_button) {
    callback_button.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal_contact_us.classList.add("modal--show");

      if (isLocalStorageSupport && name != "") {
        username.value = name;
        email.focus();
      } else {
        username.focus();
      }
    });
  }

  if (contact_us_close_button) {
    contact_us_close_button.addEventListener("click", function (evt) {
      evt.preventDefault();
      if (modal_contact_us.classList.contains("modal--show")) {
        modal_contact_us.classList.remove("modal--show");

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
        modal_contact_us.classList.remove("modal--show");

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
      else {
        if (!username.value) {
          username.classList.remove("modal--error");
          modal_contact_us.offsetWidth = modal_contact_us.offsetWidth;
          username.classList.add("modal--error");
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
  
  contact_us_block.classList.remove("modal--show");
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

function map_init(map_block) {

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
      if (map_block.classList.contains("modal--show")) {
        map_block.classList.remove("modal--show");
      }
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
      if (modal_cart_confirm.classList.contains("modal--show")) {
        modal_cart_confirm.classList.remove("modal--show");
      }
    });
  }

  if (continue_button) {
    continue_button.addEventListener("click", function (evt) {
      evt.preventDefault();
      if (modal_cart_confirm.classList.contains("modal--show")) {
        modal_cart_confirm.classList.remove("modal--show");
      }
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

