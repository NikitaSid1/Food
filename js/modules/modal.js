function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // modal window
  //модальное окно
  // для кнопок, которые выполняют одинаковые действия можно задать дата атрибуты

  //// + доп. задание: когда пользователь долистал до определенного момента на
  ////  страице должно появится модальное окно или через какой-то промежуток
  ////  времени должно появится модальное окно

  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  // const modalCloseBtn = document.querySelector('[data-close]');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  //закрытие модального окна кликом на крестик(close) и кликом на клавишу esc

  // modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  // если это (window.pageYOffset + document.documentElement.clientHeight)
  //больше или равно этому (documentElement.scrollHeight), то это значит, что
  //пользователь долистал до конца страницы
  // -1 это -1px, нужен потому, что в некоторых браузерах может будь лаг и прокрутка не будет
  //подсчитана, а значит не появится модальное окно

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
