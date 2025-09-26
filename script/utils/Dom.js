export class Dom {
    static createElement(tag, classes = '', attributes = {}) {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        return element;
    }

    static appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }

    static disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    static enableScroll() {
        document.body.style.overflow = '';
    }

    static closeOnBackdrop(event, backdropElement, callback) {
        if (event.target === backdropElement) {
            callback();
        }
    }

    static onEscape(callback) {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }

    static focusFirstInput(element) {
        const focusableElements = element.querySelectorAll(
            'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus({ preventScroll: true });
        }
    }
}