// ../script/components/modals/showPhotoModal.js

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".js-gallery-image"); // ← ВАЖНО!
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const closeModal = document.getElementById("closeModal");

    // Собираем все пути из data-src
    const imagePaths = Array.from(images).map(img => img.dataset.src);

    let currentIndex = 0;

    // Открытие модалки при клике
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            modalImage.src = imagePaths[index];
            modal.classList.add("show");
        });
    });

    // Закрытие модалки
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Навигация
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
        modalImage.src = imagePaths[currentIndex];
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % imagePaths.length;
        modalImage.src = imagePaths[currentIndex];
    });
});