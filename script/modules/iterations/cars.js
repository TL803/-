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
            monthpayment: "6 807",
            link: "./auto.html"
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
    carElement.className = 'bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col';

    carElement.innerHTML = `
      <a href="${car.link}" class="relative w-full h-[260px] sm:h-[280px] md:h-[300px]">
        <img src="${car.bg}" alt="Фон" class="w-full h-full object-cover" />
        <img src="${car.car}" alt="${car.name}" class="absolute top-6 sm:top-8 left-0 w-full h-auto object-contain z-10 px-2 sm:px-4" />
      </a>
      <a class="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <h3 class="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 mb-1 sm:mb-2">${car.name}</h3>
        <p class="text-lg sm:text-xl md:text-[28px] font-semibold text-[#01101B] mb-1 sm:mb-2">от ${car.price} ₽</p>
        <p class="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">В кредит от ${car.monthpayment} ₽/мес.</p>
        <button class="w-full bg-gradient-to-r from-blue-800 to-blue-400 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg transition-shadow duration-300 mt-auto whitespace-nowrap">
          Купить в кредит
        </button>
      </a>
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