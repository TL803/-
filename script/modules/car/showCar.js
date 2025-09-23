class CarSetupManager {
    constructor(formId, mockId, selectedCarId) {
        this.form = document.getElementById(formId);
        this.mockElement = document.getElementById(mockId);
        this.selectedCarElement = document.getElementById(selectedCarId);
        this.carTitleElement = document.getElementById('car-title'); // 👈 новое

        if (!this.form) {
            console.error(`Форма с id "${formId}" не найдена`);
            return;
        }

        this.brandSelect = this.form.querySelector('select[name="car_brand"]');
        this.modelSelect = this.form.querySelector('select[name="model"]');
        this.complectationSelect = this.form.querySelector('select[name="complectation"]');

        if (!this.brandSelect || !this.modelSelect || !this.complectationSelect) {
            console.error('Не все селекты найдены');
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

        console.log('Инициализация селектов завершена');
    }

    updateSelectsState() {
        // Обновляем состояние зависимостей
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
        if (!this.carTitleElement) return;

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

        this.carTitleElement.textContent = title;
    }

    showCar() {
        this.mockElement.classList.add('hidden');
        this.selectedCarElement.classList.remove('hidden');
    }

    hideCar() {
        this.mockElement.classList.remove('hidden');
        this.selectedCarElement.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CarSetupManager('car-selection', 'mock', 'selected-car');
});