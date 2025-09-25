// ../script/components/modals/showPhotoModal.js

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".js-gallery-image");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const closeModal = document.getElementById("closeModal");

    const imagePaths = Array.from(images).map(img => img.dataset.src);
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            modalImage.src = imagePaths[index];
            modal.classList.add("show");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    document.addEventListener("keydown", handleKeydown);

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
        modalImage.src = imagePaths[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % imagePaths.length;
        modalImage.src = imagePaths[currentIndex];
    }

    function handleKeydown(e) {
        if (!modal.classList.contains("show")) return;

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            showPrevImage();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            showNextImage();
        } else if (e.key === "Escape") {
            e.preventDefault();
            modal.classList.remove("show");
        }
    }
});