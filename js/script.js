window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  //реальзация табов
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach((element) => {
      element.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((element, index) => {
        if (target == element) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  //Timer
  //реализация таймера

  const deadline = '2022-5-23';

  //функция определяет разницу между deadline и нашим рекущим временем
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  // modal window
  //модальное окно
  // для кнопок, которые выполняют одинаковые действия можно задать дата атрибуты

  //// + доп. задание: когда пользователь долистал до определенного момента на
  ////  страице должно появится модальное окно или через какой-то промежуток
  ////  времени должно появится модальное окно

  const modalTrigger = document.querySelectorAll('[data-modal');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    clearInterval(modalTimeId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });
  //закрытие модального окна кликом на крестик(close) и кликом на клавишу esc

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
  }
  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimeId = setTimeout(openModal, 5000);
  // если это (window.pageYOffset + document.documentElement.clientHeight) больше или равно этому (documentElement.scrollHeight), то это значит, что пользователь долистал до конца страницы
  // -1 это -1px, нужен потому, что в некоторых браузерах может будь лаг и прокрутка не будет подсчитана, а значит не появится модальное окно

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

  // menu
  //classes
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.slt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAN();
    }
    changeToUAN() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  // const div = new MenuCard(src, alt, title, descr, price, parentSelector);
  // div.render();

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.
    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и
    высоким качеством!`,
    9,
    '.menu .container'
  ).render();

  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное
    исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в
    ресторан!`,
    20,
    '.menu .container'
  ).render();

  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов
    животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
    количество белков за счет тофу и импортных вегетарианских стейков.`,
    13,
    '.menu .container'
  ).render();
});
