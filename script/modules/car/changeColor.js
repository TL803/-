import { Dom } from "../../utils/Dom.js";

function colorSetup(colorContainerId, imageId) {
    const colors = [
        {
            id: 1,
            color: '#FF0000',
            car: '../assets/auto/Фотка для проверки.png'
        },
        {
            id: 2,
            color: '#00FF00',
            car: '../assets/auto/Rectangle 18.png'
        },
        {
            id: 3,
            color: '#0000FF',
            car: '../assets/auto/Rectangle 218.png'
        }
    ];

    const colorContainer = document.getElementById(colorContainerId);
    const image = document.getElementById(imageId);

    if (!colorContainer || !image) {
        console.error("Элементы не найдены:", { colorContainerId, imageId });
        return;
    }

    colorContainer.innerHTML = '';

    colors.forEach(colorObj => {
        const colorButton = Dom.createElement('button', "w-8 h-6 md:w-10 md:h-8 lg:w-12 lg:h-9 xl:w-[76px] xl:h-[57px] rounded-lg transition-transform hover:scale-105 focus:outline-none");

        colorButton.style.backgroundColor = colorObj.color;

        colorButton.addEventListener('click', () => {
            image.src = colorObj.car;
            colorContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('ring-2', 'ring-offset-2', 'ring-black'));
            colorButton.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        });

        colorContainer.appendChild(colorButton);
    });

    if (colors.length > 0) {
        image.src = colors[0].car;
        const firstButton = colorContainer.querySelector('button');
        if (firstButton) {
            firstButton.classList.add('ring-2', 'ring-offset-2', 'ring-black');
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    colorSetup('color-container', 'image')
})