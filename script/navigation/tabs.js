        function getEntities() {
            const toggleComplectationsBtn = document.getElementById('toggle-complectations');
            const toggleSpecsBtn = document.getElementById('toggle-specs');
            const contentComplectations = document.getElementById('content-complectations');
            const contentSpecs = document.getElementById('content-specs');

            return {
                toggleComplectationsBtn,
                toggleSpecsBtn,
                contentComplectations,
                contentSpecs
            };
        }

        function showTab(tabName) {
            const { toggleComplectationsBtn, toggleSpecsBtn, contentComplectations, contentSpecs } = getEntities();

            contentComplectations.classList.add('hidden');
            contentSpecs.classList.add('hidden');

            toggleComplectationsBtn.classList.remove('bg-[#FAFAFA]');
            toggleSpecsBtn.classList.remove('bg-[#FAFAFA]');
            toggleComplectationsBtn.classList.add('text-gray-500');
            toggleSpecsBtn.classList.add('text-gray-500');

            if (tabName === 'complectations') {
                contentComplectations.classList.remove('hidden');
                // Активная: фон [#FAFAFA], текст темнее
                toggleComplectationsBtn.classList.add('bg-[#FAFAFA]', 'text-gray-800');
            } else if (tabName === 'specs') {
                contentSpecs.classList.remove('hidden');
                // Активная: фон [#FAFAFA], текст темнее
                toggleSpecsBtn.classList.add('bg-[#FAFAFA]', 'text-gray-800');
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            const { toggleComplectationsBtn, toggleSpecsBtn } = getEntities();

            showTab('complectations');

            toggleComplectationsBtn.addEventListener('click', function () {
                showTab('complectations');
            });

            toggleSpecsBtn.addEventListener('click', function () {
                showTab('specs');
            });
        });