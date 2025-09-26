import { FormValidator } from "../../utils/validator.js";

export const FeedBack = {
  template: (params = {}) => FeedBack.dialog(params),

  onInit: (containerElement, options = {}) => {
    const form = containerElement.querySelector('#callback-form');
    if (!form) return;

    // Функция закрытия модалки
    const closeModal = () => {
      document.removeEventListener('keydown', handleEsc);
      if (containerElement.parentNode) {
        containerElement.parentNode.removeChild(containerElement);
      }
    };

    // Закрытие по клику на оверлей
    const handleOverlayClick = (e) => {
      if (e.target === containerElement) {
        closeModal();
      }
    };
    containerElement.addEventListener('click', handleOverlayClick);

    // Закрытие по Esc
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);

    // Обработка успешной отправки
    const onSuccess = () => {
      containerElement.innerHTML = FeedBack.successModal();

      // Назначаем закрытие по кнопке
      const closeBtn = containerElement.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }

      // Перенавешиваем обработчик оверлея после замены innerHTML
      containerElement.removeEventListener('click', handleOverlayClick);
      containerElement.addEventListener('click', handleOverlayClick);
    };

    new FormValidator(form, onSuccess);
  },

  /*html*/
  dialog: (params = {}) => `
   <div class="w-full max-w-full lg:w-[748px] flex items-center justify-center lg:h-[664px] bg-white rounded-2xl shadow-lg overflow-hidden mx-auto">
  <div class="p-8 md:p-16 flex flex-col justify-between space-y-6 min-h-full">
    <div>
      <h2 class="text-3xl md:text-[36px] font-medium text-[#01101B] mb-6">
        Остались вопросы?
      </h2>
      <p class="text-lg md:text-[22px] text-[#01101B] mb-10">
        Оставьте ваш номер и мы перезвоним в ближайшее время!
      </p>
    </div>

    <form id="callback-form" class="space-y-10 mx-auto w-full">
  <div>
    <input
      type="text"
      id="calc-name"
      name="fullname" 
      placeholder="ФИО"
      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 text-lg md:text-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent"
    />
  </div>

  <div>
    <input
      type="tel"
      id="calc-phone"
      name="phone"
      placeholder="Ваш номер телефона"
      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 text-lg md:text-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C2FF] focus:border-transparent"
    />
  </div>

<div class="flex items-start space-x-3 sm:space-x-5 mt-4">
  <label class="custom-checkbox w-7 h-7 relative flex items-center justify-center">
    <input 
      type="checkbox" 
      id="myCheckbox" 
      name="privacy-consent"
      class="sr-only"
    />
    <span class="checkmark w-7 h-7 border-2 border-gray-300 rounded flex items-center justify-center text-xs text-transparent">
      ✓
    </span>
  </label>
  <span class="text-sm sm:text-[18px] text-gray-700 leading-relaxed min-w-0 break-words hyphens-auto">
    Я согласен с 
    <a href="./privacypolicy.html" class="text-[#0B3F96] underline hover:text-gray-900">
      политикой обработки персональных данных
    </a>
  </span>
</div>

  <button
    type="submit"
    class="w-full py-5 bg-gradient-to-r from-[#003D9E] to-[#00C2FF] text-white text-xl font-medium rounded-2xl shadow hover:shadow-md transition-all duration-300 hover:from-[#002A7A] hover:to-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C2FF]"
  >
    Отправить заявку на звонок
  </button>
</form>
  </div>
</div>
  `,

successModal: () => `
  <div class="w-full max-w-md rounded-2xl bg-white shadow-lg p-6 text-center">
    <h2 class="text-xl font-bold text-gray-800 mb-3">Отличные новости — ваша заявка у нас!</h2>
    <p class="text-sm text-gray-700 mb-6">
      В скором времени наш специалист позвонит Вам, чтобы ответить на все Ваши вопросы!
    </p>
    <button class="close-btn w-full py-3 rounded-xl bg-gradient-to-r from-blue-800 to-cyan-400 text-white font-medium hover:opacity-95 transition-opacity text-sm">
      Отлично
    </button>
  </div>
`,
};