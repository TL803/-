function createToggleController(checkboxSelector, blockId) {
    const checkbox = document.querySelector(checkboxSelector);
    const toggleBlock = document.getElementById(blockId);

    if (!checkbox || !toggleBlock) {
        console.warn('Elements not found');
        return null;
    }

    const updateVisibility = () => {
        toggleBlock.classList.toggle('hidden', !checkbox.checked);
    };

    checkbox.addEventListener('change', updateVisibility);
    updateVisibility();

    return { updateVisibility };
}

document.addEventListener('DOMContentLoaded', () => {
    createToggleController('[data-toggle-count="finance"]', 'first-toggle-block');
});