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

            containerElement.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
            });

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

document.addEventListener('DOMContentLoaded', () => {
    const colorContainers = document.querySelectorAll('[data-color-container]');
    
    colorContainers.forEach(container => {
        let image = null;
        
        const parentBlock = container.closest('div');
        if (parentBlock) {
            image = parentBlock.querySelector('[data-image]');
        }
        
        if (!image && container.parentElement) {
            image = container.parentElement.querySelector('[data-image]');
        }
        
        if (!image) {
            const carBlock = container.closest('[data-selected-car]');
            if (carBlock) {
                image = carBlock.querySelector('[data-image]');
            }
        }
        
        if (!image) {
            const allImages = document.querySelectorAll('[data-image]');
            if (allImages.length > 0) {
                image = allImages[0]; 
            }
        }

        if (image) {
            console.log('Найдено изображение для контейнера:', image);
            initColorPicker(container, image);
        } else {
            console.warn('Не найдена картинка, связанная с контейнером цветов:', container);
        }
    });
});