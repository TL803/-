import { Dom } from "../../utils/Dom.js";

function initColorPicker(containerElement, imageElement) {
    const colors = [
        {
            id: 1,
            name: "Красный рубин",
            color: '#C41E3A',
            car: '../assets/auto/Фотка для проверки.png'
        },
        {
            id: 2,
            name: "Синий океан",
            color: '#1E5BC6',
            car: '../assets/auto/Rectangle 18.png'
        },
        {
            id: 3,
            name: "Изумрудный зелёный",
            color: '#2E8B57',
            car: '../assets/auto/Rectangle 218.png'
        },
        {
            id: 4,
            name: "Космический серый",
            color: '#3D3D3D',
            car: '../assets/auto/Фотка для проверки.png'
        },
        {
            id: 5,
            name: "Снежная жемчужина",
            color: '#F5F5F5',
            car: '../assets/auto/Rectangle 18.png'
        },
        {
            id: 6,
            name: "Обсидиановый чёрный",
            color: '#0A0A0A',
            car: '../assets/auto/Rectangle 218.png'
        },
        {
            id: 7,
            name: "Тёплый бежевый",
            color: '#D2B48C',
            car: '../assets/auto/Фотка для проверки.png'
        },
        {
            id: 8,
            name: "Титановый серебристый",
            color: '#C0C0C0',
            car: '../assets/auto/Rectangle 18.png'
        }
    ];

    if (!containerElement || !imageElement) {
        console.error("Элементы не найдены:", { containerElement, imageElement });
        return;
    }

    // Определяем, находимся ли мы на auto.html или taxiauto.html
    const isLargePage = ['/auto.html', '/taxiauto.html'].some(page => 
        window.location.pathname.endsWith(page)
    );

    const buttonClass = isLargePage 
        ? "w-8 h-6 md:w-10 md:h-8 lg:w-12 lg:h-9 xl:w-[76px] xl:h-[57px] rounded-lg transition-transform hover:scale-105 focus:outline-none" 
        : "w-8 h-8 bg-black rounded";

    containerElement.innerHTML = '';

    colors.forEach(colorObj => {
        const colorButton = Dom.createElement('button', buttonClass);
        colorButton.style.backgroundColor = colorObj.color;

        colorButton.addEventListener('click', () => {
            imageElement.src = colorObj.car;

            // Снимаем выделение со всех кнопок в этом контейнере
            containerElement.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
            });

            // Добавляем выделение на выбранную
            colorButton.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        });

        containerElement.appendChild(colorButton);
    });

    if (colors.length > 0) {
        imageElement.src = colors[0].car;
        const firstButton = containerElement.querySelector('button');
        if (firstButton) {
            firstButton.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        }
    }
}

// 👇 Инициализация: находим ВСЕ пары [контейнер + картинка] и применяем к каждой
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-color-container]').forEach(container => {
        const image = container.closest('[data-color-wrapper]')?.querySelector('[data-image]') 
                   || container.nextElementSibling?.matches('[data-image]') && container.nextElementSibling
                   || container.previousElementSibling?.matches('[data-image]') && container.previousElementSibling
                   || document.querySelector('[data-image]'); // fallback (не идеально)

        if (image) {
            initColorPicker(container, image);
        } else {
            console.warn('Не найдена картинка, связанная с контейнером цветов:', container);
        }
    });
});