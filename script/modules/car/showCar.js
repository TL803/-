class CarSetupManager {
    constructor(formSelector, mockSelector, selectedCarSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) {
            console.error(`Форма по селектору "${formSelector}" не найдена`);
            return;
        }

        const container = this.form.parentElement;
        
        this.mockElements = container.querySelectorAll(mockSelector);
        this.selectedCarElements = container.querySelectorAll(selectedCarSelector);
        this.carTitleElements = container.querySelectorAll('[data-car-title]');

        if (this.mockElements.length === 0 || this.selectedCarElements.length === 0) {
            console.error('Не найдены элементы [data-mock] или [data-selected-car] в контейнере формы', container);
            return;
        }

        this.brandSelect = this.form.querySelector('select[name="car_brand"]');
        this.modelSelect = this.form.querySelector('select[name="model"]');
        this.complectationSelect = this.form.querySelector('select[name="complectation"]');

        if (!this.brandSelect || !this.modelSelect || !this.complectationSelect) {
            console.error('Не все селекты найдены в форме');
            return;
        }

        this.init();
    }

    init() {
        this.modelSelect.disabled = true;
        this.complectationSelect.disabled = true;

        this.brandSelect.addEventListener('change', () => this.updateSelectsState());
        this.modelSelect.addEventListener('change', () => this.updateSelectsState());
        this.complectationSelect.addEventListener('change', () => this.updateSelectsState());

        this.updateSelectsState();
        console.log('Инициализация CarSetupManager завершена');
    }

    updateSelectsState() {
        this.modelSelect.disabled = !this.brandSelect.value;
        if (!this.brandSelect.value) {
            this.modelSelect.value = '';
        }

        this.complectationSelect.disabled = !this.modelSelect.value;
        if (!this.modelSelect.value) {
            this.complectationSelect.value = '';
        }

        this.updateCarTitle();

        const isAllSelected = this.brandSelect.value && this.modelSelect.value && this.complectationSelect.value;

        if (isAllSelected) {
            this.showCar();
        } else {
            this.hideCar();
        }
    }

    updateCarTitle() {
        if (this.carTitleElements.length === 0) return;

        const brand = this.brandSelect.value || '';
        const model = this.modelSelect.value || '';
        const complectation = this.complectationSelect.value || '';

        let title = 'Выберите автомобиль';

        if (brand && model && complectation) {
            title = `${brand} ${model} (${complectation})`;
        } else if (brand && model) {
            title = `${brand} ${model}`;
        } else if (brand) {
            title = brand;
        }

        this.carTitleElements.forEach(element => {
            element.textContent = title;
        });
    }

    showCar() {
        this.mockElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        this.selectedCarElements.forEach(element => {
            element.classList.remove('hidden');
        });
    }

    hideCar() {
        this.mockElements.forEach(element => {
            element.classList.remove('hidden');
        });
        
        this.selectedCarElements.forEach(element => {
            element.classList.add('hidden');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-car-form]');
    forms.forEach(form => {
        const tempId = 'form-' + Math.random().toString(36).substr(2, 9);
        form.setAttribute('data-temp-id', tempId);
        new CarSetupManager(`[data-temp-id="${tempId}"]`, '[data-mock]', '[data-selected-car]');
        form.removeAttribute('data-temp-id');
    });
});