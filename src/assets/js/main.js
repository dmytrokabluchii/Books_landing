window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector("header"),
    anchors = document.querySelectorAll(".logo__link, .nav-menu__link, .link-footer"),
    burgerButton = document.querySelector(".hamburger__menu"),
    mobileMenu = document.querySelector(".mobile"),
    burgerLinks = document.querySelectorAll(".sidemenu ul li a, .logo__link"),
    modalWindow = document.querySelector('.modal__callback'),
    modalField = document.querySelector('.callback__field'),
    overlay = document.querySelector('.overlay'),
    btnModalCallbackOpen = document.querySelectorAll('[data-modal]');

  // Preloader page
  function startPreload() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded_hiding');
      window.setTimeout( () => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 500);
    }); 
  }
  startPreload();

  // fix header
  function fixHeader(el) {
    window.onscroll = function() {
      functionFixHeader();
    };
    function functionFixHeader() {
      if (window.pageYOffset > 0) {
        el.classList.add("fixed_header");
      } else {
        el.classList.remove("fixed_header");
      }
    } 
  }
  fixHeader(header);

  // Smooth Scroll
  function smoothScroll() {
    for (let i of anchors) {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = i.getAttribute('href');
        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }
  smoothScroll();

  // Hamburger-menu
  function burgerMenu(btn, menu, links) {
    btn.addEventListener('click', function(){
      btn.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('open');
      // добав-м стиль не позвол-й прокручивать стр-цу
      document.body.classList.toggle('overflow');
    });
    // Закрыти бургер-меню при нажатии на ссылку
    links.forEach(closeBtn => {
      closeBtn.addEventListener("click", () => {
        btn.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('open');
        document.body.classList.remove('overflow');
      });
    });
  }
  burgerMenu(burgerButton, mobileMenu, burgerLinks);

  // Modal-window-callback
  function openModal(window, background) {
    window.classList.toggle('active');
    background.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  // переберем наши кнопки btnModalOpen чтобы мы могли с любой кнопки откр-ть модал.окно
  btnModalCallbackOpen.forEach(btn => {
    btn.addEventListener('click', () => { 
      openModal(modalWindow, overlay);
    });
  });
  function closeModal(window, background) {
    window.classList.toggle('active');
    background.classList.remove('active');
    document.body.style.overflow = '';
  }
  // реал.функ-л закрытия модал. окна по клику вне мод. окна и на "крестик"
  modalField.addEventListener('click', (e) => {
    if(e.target === modalField || e.target.getAttribute('data-close') == '') {
      closeModal(modalWindow, overlay);
    }
  });
  // закрытия модал. окна по ESС. Cобытие keydown срабатывает, когда клавиша была нажата
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('active')) {
      closeModal(modalWindow, overlay);
    }
  });

  // Send form to my Telegram, Email, Validate input
  const phoneInput = document.querySelector('.callback__telephone'),
        nameInputRecall = document.querySelector('.callback__names'),
        phoneInputRecall = document.querySelector('.callback__telephone'),
        formRecall =  document.querySelector('#my_callback-form'),
        formSubscribe =  document.querySelector('#my_subscribe-form'),
        emailSubscribe = document.querySelector('#email_subscribe'),
        btnSubscribe = document.querySelector('[data-modal_subscribe]'),
        BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8',
        CHAT_ID = '-1001758890997';

  // To color name-input
  function validationFormColor(elem) {
    elem.addEventListener('input', () => {
      if (elem.value !== '') {
        elem.style.borderColor = 'green';
      } else {
        elem.style.borderColor = 'red';
      }
    });
  }
  validationFormColor(nameInputRecall);
  // Mask phone-number
  function maskPhone() {
    [].forEach.call(document.querySelectorAll('#callback_phone'), function(input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+38(___)___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = newValue;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        } 
      }
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    });
  }
  maskPhone();

  // Validate EMAIL
  function validateEmail(email) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    function onInputEmail() {
      if (isEmailValid(email.value)) {
        email.style.borderColor = 'green';
      } else {
        email.style.borderColor = 'red';
      }
      return;
    }
    email.addEventListener('input', onInputEmail); 
    function isEmailValid(value) {
      return EMAIL_REGEXP.test(value);
    }
  }
  validateEmail(emailSubscribe);

  // Send data to my email(using smtpjs.com)
  function sendEmail(email, form) {
    btnSubscribe.addEventListener('click', (e) => {
      e.preventDefault();
      if (email.value !== '') {
        Email.send({
          Host : "smtp.elasticemail.com",
          Username : "dim8484@ukr.net",
          Password : "7BD93CC22771A12713C1D25E67A55F475060",
          To : 'dim8484@ukr.net',
          From : email.value,
          Subject : "Subscriber's email from The Author’s Book website",
          Body : `Email subscriber: ${email.value}`
        }).then(
          message => showInfoSendMail(message)
        )
        .finally( () => {
          form.reset();
        });
      } else {
        showInfoValidate();
      }
    });
  }
  sendEmail(emailSubscribe, formSubscribe);

  // Add border-color for phone-inputs
  phoneInput.addEventListener('input', () => {
    onInputPhone(phoneInput);
  });
  function onInputPhone(phone) {
    if (phone.value.length < 17) {
      phone.style.borderColor = 'red';
    } else {
      phone.style.borderColor = 'green';
    }
  }

  // Send form to telegram
  function postDataRecall(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let text = encodeURI(`Books Website\nRecall\n\nName: ${nameInputRecall.value};\nPhone: ${phoneInputRecall.value};`);
      if (nameInputRecall.value !== '' && phoneInputRecall.value !== '' && phoneInputRecall.value.length > 16) { 
        axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
        .then( () => {
          showSuccessForm();
          closeModal(modalWindow, overlay);
        })
        .catch( () => { 
          showErrorForm(); 
          closeModal(modalWindow, overlay);
        })
        .finally( () => {
          form.reset();
          closeModal(modalWindow, overlay);
        }); 
      } else {
        showInfoValidate();
        modalWindow.classList.add('active');
      }
    });
  }
  postDataRecall(formRecall);

  // Gallery for image
  let galleryJS = document.querySelectorAll('.gallery-js');
  galleryJS.forEach(item => {
    lightGallery(item, {
      selector: '.gallery-link',
      thumbnail: true,
      mode: 'lg-fade'
    });
  });

  // init Swiper-Slider
  const swiper = new Swiper('.swiper', {
    rewind: true,
    grabCursor: true,
    spaceBetween: 30,
    slidesPerView: 3,
    slidesPerGroup: 3,
    breakpoints: {
      280: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      599: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerGroup: 2,
      },
      999: {
      slidesPerView: 3
      },
    },  
    navigation: {
      prevEl: '.swiper-navigation__prev',
      nextEl: '.swiper-navigation__next',
    },
  });

  // Create card by axios
  axios.get('assets/common/cards.json')
  .then( (data) => { 
    createCard(data);
  })
  .catch( () => { 
    showCardsError(); 
  });
  function createCard(data) {
    data.data.forEach(({image, title, subtitle, btn, date}) => {
      // append HTML-JSON data to slider
      swiper.appendSlide(`
        <li class="cards-item swiper-slide">
          <a class="cards-link" href="#!">
              <div class="cards-link__image">
                  <img class="cards-pic" src="assets/images/cards/${image}" alt="cards-image">
              </div>
              <div class="cards-link__info">
                <div class="info-title item-title">${title}</div>
                <div class="info-subtitle item-subtitle">${subtitle}</div>
                <div class="info-footer">
                    <button class="info-footer__btn btn-read" data-modal_readmore>${btn}</button>
                    <div class="info-footer__date">${date}</div>
                </div>
              </div>
          </a>
        </li>
      `);
    });
  } 
  // toggle Btn Readmore
  // const cardsContainer = document.querySelector('.cards-link__info');
  // const toggleBtnReadmore = document.querySelectorAll('[data-modal_readmore]');
  // function toggleCards(btn) {
  //   btn.forEach(toggleBtn => {
  //     toggleBtn.addEventListener('click', () => {
  //       console.log('clickBTN');
  //       cardsContainer.classList.toggle('active');
  //     });
  //   });
  // }
  // toggleCards(toggleBtnReadmore);

  // Alert-function from sweetAlert
  function showSuccessForm() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your message send, wait for call from our operator',
      showConfirmButton: false,
      timer: 5000,
    });
  }
  function showInfoValidate() {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Fill all fields',
      showConfirmButton: false,
      timer: 3000
    });
  }
  function showErrorForm() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error server, the message don`t send',
      showConfirmButton: false,
      timer: 4000
    });
  }
  function showInfoSendMail(text) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: text,
      showConfirmButton: false,
      timer: 6000,
    });
  }
  
  function showCardsError() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error server, the information of block "Articles & Resources" can`t downloading',
      showConfirmButton: false,
      timer: 5000
    });
  }

});



