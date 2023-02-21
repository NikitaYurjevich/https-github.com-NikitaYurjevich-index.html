//////// ОБЩЕЕ //////////
    const setDocumentHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--screen-height', `${window.innerHeight}px`);
    };
    setDocumentHeight();
    window.addEventListener('resize', setDocumentHeight);

    const formContainer = document.getElementById('formContainer');

    const shiftToRight = () => {
        const maxValue = 60;
        let currentValue = 0;

        const animationInterval = setInterval(() => {
            if (currentValue >= maxValue) clearInterval(animationInterval);
            formContainer.style.clipPath = `polygon(0 100%, 100% 100%, 100% ${maxValue - currentValue}%, 0 ${currentValue}%)`;
            currentValue++;
        }, 30);
    }

    const shiftToLeft = () => {
        const maxValue = 60;
        let currentValue = 0;

        const animationInterval = setInterval(() => {
            if (currentValue >= maxValue) clearInterval(animationInterval);
            formContainer.style.clipPath = `polygon(0 100%, 100% 100%, 100% ${currentValue}%, 0 ${maxValue - currentValue}%)`;
            currentValue++;
        }, 30);
    }
/////////////////////////

//////// ФОРМА 1 ////////
    const formPhoneNumber = document.getElementById('formPhoneNumber');
    const sendPhoneBtn = document.getElementById('sendPhoneBtn');
    const sendPhonePreloader = document.getElementById('sendPhonePreloader');

    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", function(e){
        const reg = /(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/;
        const x = e.target.value.replace(/\D/g, '').match(reg);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
    });

    formPhoneNumber.addEventListener('submit', (e) => {
        e.preventDefault();

        sendPhoneBtn.classList.add('block--hide');
        sendPhonePreloader.classList.remove('block--hide');

        const phoneNumber = phoneInput.value.replace(/\D/g, '');
        const countryCode = document.getElementById('countryCode').value;
        const payload = countryCode + phoneNumber;
        const url = '';

        ///// УДАЛИТЬ
        setTimeout(() => {
            showOTPForm();
            sendPhoneBtn.classList.remove('block--hide');
            sendPhonePreloader.classList.add('block--hide');
        }, 1500)
        /////

        ///// РАСКОММЕНТИТЬ
        // fetch(url, payload)
        //     .then(() => {
        //         showOTPForm();
        //     })
        //     .catch(() => {
        //
        //     })
        //     .finally(() => {
        //         sendPhoneBtn.classList.remove('block--hide');
        //         sendPhonePreloader.classList.add('block--hide');
        //     })
        /////
    });
    const showOTPForm = () => {
        formContainer.classList.add('form-container--next-form');
        formPhoneNumber.classList.add('hide');
        formOTP.classList.add('show');

        shiftToRight();
    };

/////////////////////////

//////// ФОРМА 2 ////////
    const formOTP = document.getElementById('formOTP');
    const menu = document.getElementById('menu');
    const otpPreloader = document.getElementById('otpPreloader');

    const showMenu = () => {
        formContainer.classList.remove('form-container--next-form');
        formOTP.classList.remove('show');
        menu.classList.remove('hide');
        setTimeout(() => {
            formContainer.classList.add('form-container--next-form');
            formOTP.classList.add('hide');
            menu.classList.add('show');
        }, 50);

        [...menu.querySelectorAll('.menu__btn')].forEach(menuBtn => {
            menuBtn.classList.add('menu__btn--appearance')
        });

        shiftToLeft();
    }

    const sendOTPHandler = (otpCode) => {
        otpPreloader.classList.remove('block--hide');

        ///// УДАЛИТЬ
        setTimeout(() => {
            showMenu();
            otpPreloader.classList.add('block--hide');
        }, 1500)
        /////

        ///// РАСКОММЕНТИТЬ
        // const url = '';
        // fetch(url, otpCode)
        //     .then(() => {
        //         showMenu();
        //     })
        //     .catch(() => {
        //
        //     })
        //     .finally(() => {
        //         otpPreloader.classList.add('block--hide');
        //     })
        /////
    }

    const addNumberToInputHandler = (inputNumber) => {
        const getInputId = inputNumber => `otpInput${inputNumber}`;

        if (inputNumber === 4) {
            document.getElementById(getInputId('4')).disabled = true;
            const otpCode = [...document.querySelectorAll('.input--otp')]
                .map(el=>el.value)
                .join('');
            sendOTPHandler(otpCode);
        } else {
            const nextInputId = getInputId(inputNumber + 1);
            document.getElementById(nextInputId).focus();
        }
    };
/////////////////////////
