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

  const modalTrigger = document.querySelectorAll('[data-modal');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('[data-close]');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.add('show');
      modal.classList.remove('hide');
    });
  });
  //закрытие модального окна кликом на крестик(close) и кликом на клавишу esc
  // правильный участок кода! потому что повторяется код 2 раза => нужно создать функцию
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
});
