(function() {
    'use strict';

    window.addEventListener('load', () => {
        var forms = document.getElementsByClassName('require-validation');
        var validation = Array.prototype.filter.call(forms, (form) => {
            form.addEventListener('submit', (e) => {
                if (form.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
