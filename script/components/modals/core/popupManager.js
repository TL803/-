// popupManager.js
import { ModalBackdrop } from '../templates/base/ModalBackdrop.js';
import { PopupFactory } from './popupFactory.js';
import { Dom } from '../../../utils/Dom.js';

export class PopupManager {
  constructor() {
    this.currentModal = null;
    this.cleanupEscape = null;
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-modal]');
      if (trigger) {
        e.preventDefault();
        const modalName = trigger.getAttribute('data-open-modal');
        const params = this.parseModalParams(trigger);
        this.open(modalName, params);
      }
    });
  }

  parseModalParams(trigger) {
    const params = {};
    for (const attr of trigger.attributes) {
      if (attr.name.startsWith('data-')) {
        const key = attr.name.replace('data-', '');
        params[key] = attr.value;
      }
    }
    return params;
  }

  open(name, params = {}) {
    this.close();

    const modalContent = PopupFactory.createModal(name, params);
    const backdrop = new ModalBackdrop();

    // Создаём обёртку модального окна вручную
    const modalElement = document.createElement('div');
    modalElement.className = 'modal-window'; // или любые классы из modalContent.background
    modalElement.innerHTML = modalContent.template;

    // Добавляем кнопку закрытия (если не включена в шаблон)
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    modalElement.prepend(closeBtn);

    backdrop.element.appendChild(modalElement);
    document.body.appendChild(backdrop.element);

    // Инициализация (если есть)
    if (typeof modalContent.onInit === 'function') {
      modalContent.onInit(modalElement);
    }

    // Сохраняем ссылки для закрытия
    this.currentModal = {
      backdrop,
      element: modalElement,
      closeBtn
    };

    // Обработчики закрытия
    closeBtn.addEventListener('click', () => this.close());
    backdrop.element.addEventListener('click', (e) => {
      if (e.target === backdrop.element) {
        this.close();
      }
    });

    this.cleanupEscape = Dom.onEscape?.(() => this.close()) || null;
  }

  close() {
    if (this.currentModal) {
      if (this.currentModal.element.parentNode) {
        this.currentModal.element.parentNode.removeChild(this.currentModal.element);
      }
      this.currentModal.backdrop.hide();
      this.currentModal = null;
    }

    if (this.cleanupEscape) {
      this.cleanupEscape();
      this.cleanupEscape = null;
    }
  }
}