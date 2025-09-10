document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-component="car-container"]');

    if (containers.length === 0) {
        console.warn('Ни одного контейнера с data-component="car-container" не найдено');
        return;
    }

    const cars = [
        {
            bg: "../assets/autoCard/bg.png",
            car: "../assets/autoCard/синяя машина.png",
            name: "Kaiyi X7 Kunlun",
            price: "696 000",
            monthpayment: "6 807"
        },
        {
            bg: "../assets/autoCard/bg.png",
            car: "../assets/autoCard/синяя машина.png",
            name: "Kaiyi X7 Kunlun",
            price: "696 000",
            monthpayment: "6 807"
        },
        {
            bg: "../assets/autoCard/bg.png",
            car: "../assets/autoCard/синяя машина.png",
            name: "Kaiyi X7 Kunlun",
            price: "696 000",
            monthpayment: "6 807"
        },
        {
            bg: "../assets/autoCard/bg.png",
            car: "../assets/autoCard/синяя машина.png",
            name: "Kaiyi X7 Kunlun",
            price: "696 000",
            monthpayment: "6 807"
        },
        {
            bg: "../assets/autoCard/bg.png",
            car: "../assets/autoCard/синяя машина.png",
            name: "Kaiyi X7 Kunlun",
            price: "696 000",
            monthpayment: "6 807"
        },
        {
            bg: "../assets/autoCard/bg.png",
            car: "../assets/autoCard/синяя машина.png",
            name: "Kaiyi X7 Kunlun",
            price: "696 000",
            monthpayment: "6 807"
        },

    ];

    // Функция создания карточки
    function createCarElement(car) {
        const carElement = document.createElement('div');
        carElement.className = 'bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-sm';

        carElement.innerHTML = `
      <div class="relative w-full h-[300px]">
        <img src="${car.bg}" alt="Фон" class="w-full h-full object-cover" />
        <img src="${car.car}" alt="${car.name}" class="absolute top-10 left-0 w-full h-auto object-contain z-10" />
      </div>
      <div class="p-6">
        <h3 class="text-[28px] font-bold text-gray-900 mb-2">${car.name}</h3>
        <p class="text-[28px] font-semibold text-[#01101B] mb-2">от ${car.price} ₽</p>
        <p class="text-[14px] text-gray-600 mb-8">В кредит от ${car.monthpayment} ₽/мес.</p>
        <button class="w-full bg-gradient-to-r from-blue-800 to-blue-400 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          Купить в кредит
        </button>
      </div>
    `;

        return carElement;
    }

    containers.forEach(container => {
        cars.forEach(car => {
            const carElement = createCarElement(car);
            container.appendChild(carElement); 
        });
    });
});