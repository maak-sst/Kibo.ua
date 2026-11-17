// меню на телефоні
console.log("JavaScript успішно підключено!");
var toggle = document.querySelector('.nav-toggle');
var nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// фільтр у каталозі
var buttons = document.querySelectorAll('.filters button');
var cards = document.querySelectorAll('[data-cat]');
buttons.forEach(function (b) {
  b.addEventListener('click', function () {
    buttons.forEach(function (x) { x.classList.remove('on'); });
    b.classList.add('on');
    var f = b.dataset.filter;
    cards.forEach(function (c) {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

// 4. Робота з формами та валідацією
document.querySelectorAll('form[data-demo]').forEach(function (form) {

    // Зберігаємо попередню логіку форми конструктора
    if (!window.location.pathname.endsWith('contacts.html')) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const ok = form.querySelector('.form-ok');
            if (ok) ok.classList.add('show');

            form.reset();

            if (typeof recalc === 'function') recalc();
        });

        return;
    }

    // Отримання полів контактної форми
    const nameField = form.querySelector('input[name="name"], input[type="text"]');
    const phoneField = form.querySelector('input[type="tel"]');
    const messageField = form.querySelector('textarea');

    if (!nameField || !phoneField || !messageField) return;

    // Вимкнення стандартної HTML-валідації
    form.noValidate = true;

    // Блок повідомлення про успішне надсилання
    let successMessage = form.querySelector('.form-ok');

    if (!successMessage) {
        successMessage = document.createElement('p');
        successMessage.className = 'form-ok';
        form.append(successMessage);
    }

    successMessage.classList.add('js-form-success');
    successMessage.hidden = true;

    // Функція відображення помилки
    function showError(field, message) {
        field.classList.add('js-invalid');
        field.setAttribute('aria-invalid', 'true');

        const error = document.createElement('p');
        error.className = 'js-form-error';
        error.textContent = message;

        field.insertAdjacentElement('afterend', error);
    }

    // Функція очищення попередніх помилок
    function clearErrors() {
        form.querySelectorAll('.js-form-error').forEach(function (error) {
            error.remove();
        });

        form.querySelectorAll('.js-invalid').forEach(function (field) {
            field.classList.remove('js-invalid');
            field.removeAttribute('aria-invalid');
        });
    }

    // 4.1. Обробка події submit
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();
        successMessage.classList.remove('show');
        successMessage.hidden = true;

        const name = nameField.value.trim();
        const phone = phoneField.value.trim();
        const message = messageField.value.trim();

        let isValid = true;

        // 4.2. Перевірка імені
        if (name.length < 3) {
            showError(nameField, 'Ім’я повинно містити щонайменше 3 символи.');
            isValid = false;
        }

        // Перевірка номера телефону
        const phoneDigits = phone.replace(/\D/g, '');

        if (
            !/^\+?[\d\s()-]+$/.test(phone) ||
            phoneDigits.length < 10 ||
            phoneDigits.length > 12
        ) {
            showError(phoneField, 'Введіть коректний номер телефону (10–12 цифр).');
            isValid = false;
        }

        // Перевірка повідомлення
        if (message.length < 10) {
            showError(messageField, 'Повідомлення повинно містити щонайменше 10 символів.');
            isValid = false;
        }

        // Якщо є помилки, припиняємо обробку
        if (!isValid) return;

        // Зчитування всіх даних форми
        const formData = Object.fromEntries(new FormData(form));

        console.log('Дані контактної форми:', formData);

        // Очищення форми
        form.reset();

        // Повідомлення про успішне надсилання
        successMessage.textContent = 'Форма успішно надіслана!';
        successMessage.hidden = false;
        successMessage.classList.add('show');
    });
});
// 2.1. Зміна стилю елементів за класом
const eyebrowElements = document.querySelectorAll('.eyebrow');

eyebrowElements.forEach(function (element) {
    element.style.color = '#1d3557';
});
// Додавання нового елемента до main
const mainContent = document.querySelector('main');

if (mainContent) {
    const newParagraph = document.createElement('p');

    newParagraph.textContent =
        'Виготовляємо термосумки під індивідуальні потреби вашого бізнесу.';

    newParagraph.style.textAlign = 'center';
    newParagraph.style.padding = '20px';
    newParagraph.style.fontWeight = 'bold';
    newParagraph.style.color = '#1d3557';

    mainContent.append(newParagraph);
}
// 2.2. Відображення поточної дати у футері
const footerContent = document.querySelector('footer .copy')
    || document.querySelector('footer');

if (footerContent) {
    const currentDate = document.createElement('span');

    currentDate.textContent = 'Поточна дата: ' +
        new Date().toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

    currentDate.style.display = 'block';
    currentDate.style.marginTop = '10px';

    footerContent.append(currentDate);
}
// Створення акордеона на головній сторінці
const pageName = window.location.pathname.split('/').pop();

if (mainContent && (pageName === 'index.html' || pageName === '')) {
    const accordion = document.createElement('section');
    accordion.className = 'container';
    accordion.style.textAlign = 'center';
    accordion.style.marginBottom = '30px';

    const moreButton = document.createElement('button');
    moreButton.textContent = 'Показати більше';
    moreButton.className = 'btn';
    moreButton.type = 'button';
    moreButton.setAttribute('aria-expanded', 'false');
    moreButton.setAttribute('aria-controls', 'more-text');

    const moreText = document.createElement('p');
    moreText.id = 'more-text';
    moreText.textContent =
        'Виготовляємо професійні термосумки від 1 штуки. ' +
        'Ви можете обрати необхідні розміри, колір, матеріал ' +
        'та нанесення власного логотипу.';

    moreText.hidden = true;
    moreText.style.marginTop = '20px';

    moreButton.addEventListener('click', function () {
        moreText.hidden = !moreText.hidden;

        moreButton.textContent = moreText.hidden
            ? 'Показати більше'
            : 'Показати менше';

        moreButton.setAttribute('aria-expanded', String(!moreText.hidden));
    });

    accordion.append(moreButton, moreText);
    mainContent.append(accordion);
}
// 3.1. Перемикання кольорової теми сайту
const themeButton = document.createElement('button');

themeButton.textContent = 'Змінити тему';
themeButton.className = 'btn';
themeButton.type = 'button';

const themeContainer = document.createElement('div');
themeContainer.className = 'container';
themeContainer.style.padding = '15px 0';
themeContainer.style.textAlign = 'right';

themeContainer.append(themeButton);

if (mainContent) {
    mainContent.prepend(themeContainer);
}

// 5. Збереження кольорової теми в LocalStorage

const savedTheme = localStorage.getItem('kibo-theme');

if (savedTheme === 'alternate') {
    document.body.classList.add('alternate-theme');
}

themeButton.addEventListener('click', function () {
    document.body.classList.toggle('alternate-theme');

    if (document.body.classList.contains('alternate-theme')) {
        localStorage.setItem('kibo-theme', 'alternate');
    } else {
        localStorage.setItem('kibo-theme', 'standard');
    }
});
// 3.2. Підсвічування пунктів меню
const navigationLinks = document.querySelectorAll('header nav a');

navigationLinks.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
        link.classList.add('js-nav-highlight');
    });

    link.addEventListener('mouseleave', function () {
        link.classList.remove('js-nav-highlight');
    });
});
// Зміна розміру шрифту за допомогою клавіатури
let fontScale = 100;

const fontElements = document.querySelectorAll(
    'main h1, main h2, main h3, main h4, main p, main li, ' +
    'main a, main label, main button, main td, main th'
);

const originalFontSizes = Array.from(fontElements).map(function (element) {
    return parseFloat(getComputedStyle(element).fontSize);
});

document.addEventListener('keydown', function (event) {
    if (event.target.closest('input, textarea, select, [contenteditable]')) {
        return;
    }

    if (event.key === 'ArrowUp') {
        fontScale = Math.min(fontScale + 10, 150);
    } else if (event.key === 'ArrowDown') {
        fontScale = Math.max(fontScale - 10, 80);
    } else {
        return;
    }

    event.preventDefault();

    fontElements.forEach(function (element, index) {
        element.style.fontSize =
            originalFontSizes[index] * fontScale / 100 + 'px';
    });
});
