// tittleni o'zratirish funksiyasi
function animationTittle() {
  let titles = ["Salom", "Xush kelibsiz!", "Web sahifa yangilanmoqda...", "Boshqa yangiliklar..."];
  let i = 0;
  function changeTitle() {
    document.title = titles[i];
    i = (i + 1) % titles.length; // loop back to the start of the array
  }
  setInterval(changeTitle, 2000); // Change the title every 2 seconds
}
// tittleni o'zratirish funksiyasini ishga tushurish
// animationTittle();

const form = document.querySelector('.form');
const imgButton = document.querySelector('.img-button');
const body = document.querySelector('body');

document.getElementById("loadingDiv").style.display = "block";

// show-button-function (show button)
const showButtons = document.querySelectorAll('.show-button');
showButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    form.style.display = 'block';
    body.style.overflow = 'hidden'; // scrollni o'chirish
  });
});

// hide-button-function (close button)
const hideButton = document.querySelector('.f-button').addEventListener('click', () => {
  body.style.overflow = "auto"; // Enable scrolling
  form.style.display = 'none';
});

// img-button-function (image button)
imgButton.addEventListener('click', () => {
  form.style.display = 'block';
});

//phone number validation (telefon raqamni tekshirish)
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qabul qiladi

  if (value.length > 2 && value.length <= 5) {
    value = `${value.slice(0, 2)}-${value.slice(2)}`;
  } else if (value.length > 5 && value.length <= 7) {
    value = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5)}`;
  } else if (value.length > 7) {
    value = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7)}`;
  }

  e.target.value = value;
});

//(telefon raqami orasiga "-" qo'shish)
function updatePhoneInput() {
  const countrySelect = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const flagImg = document.getElementById('flag');

  function updateInputFields() {
    let selectedCountry = countrySelect.value;
    let placeholder = '';
    let pattern = '';
    let flag = '';
    let maxLength = '';
    let width = '';

    switch (selectedCountry) {
      case 'UZ':
        flag = 'https://flagcdn.com/w40/uz.png';
        placeholder = '99-999-99-99';
        pattern = '\\d{2}-\\d{3}-\\d{2}-\\d{2}';
        maxLength = '12';
        width = '70px';
        break;
      case 'KRZ':
      case 'TJK':
        flag = selectedCountry === 'KRZ'
          ? 'https://flagcdn.com/w40/kg.png'
          : 'https://flagcdn.com/w40/tj.png';
        placeholder = '999-999-999';
        pattern = '\\d{3}-\\d{3}-\\d{3}';
        maxLength = '11';
        width = '70px';
        break;
      case 'TK':
        flag = 'https://flagcdn.com/w40/tm.png';
        placeholder = '99-999-999';
        pattern = '\\d{2}-\\d{3}-\\d{3}';
        maxLength = '10';
        width = '70px';
        break;
      case 'KZ':
      case 'RU':
      case 'US':
        flag = selectedCountry === 'KZ'
          ? 'https://flagcdn.com/w40/kz.png'
          : selectedCountry === 'RU'
            ? 'https://flagcdn.com/w40/ru.png'
            : 'https://flagcdn.com/w40/us.png';
        placeholder = '999-999-9999';
        pattern = '\\d{3}-\\d{3}-\\d{4}';
        maxLength = '12';
        width = '50px';
        break;
      case 'GER':
        flag = 'https://flagcdn.com/w40/de.png';
        placeholder = '999-99999999';
        pattern = '\\d{3}-\\d{8}';
        maxLength = '12';
        width = '60px';
        break;
      case 'TUR':
        flag = 'https://flagcdn.com/w40/tr.png';
        placeholder = '999-999-9999';
        pattern = '\\d{3}-\\d{3}-\\d{4}';
        maxLength = '12';
        width = '60px';
        break;
      case 'BEL':
      case 'UKI':
        flag = selectedCountry === 'BEL'
          ? 'https://flagcdn.com/w40/by.png'
          : 'https://flagcdn.com/w40/ua.png';
        placeholder = '99-999-9999';
        pattern = '\\d{2}-\\d{3}-\\d{4}';
        maxLength = '11';
        width = '70px';
        break;
      default:
        flag = '';
        placeholder = '';
        pattern = '';
        maxLength = '';
        width = '50px';
    }

    phoneInput.placeholder = placeholder;
    phoneInput.pattern = pattern;
    phoneInput.maxLength = maxLength;
    phoneInput.value = '';
    flagImg.src = flag;
    countrySelect.style.width = width; // Width qo'shildi
  }

  function formatPhoneNumber(event) {
    let rawValue = phoneInput.value.replace(/\D/g, '');
    let selectedCountry = countrySelect.value;
    let formattedValue = '';
    let cursorPosition = phoneInput.selectionStart;

    switch (selectedCountry) {
      case 'UZ':
        formattedValue = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
          [a, b, c, d].filter(Boolean).join('-'));
        break;
      case 'KRZ':
      case 'TJK':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'TK':
        formattedValue = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'KZ':
      case 'RU':
      case 'US':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'GER':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,8})/, (_, a, b) =>
          [a, b].filter(Boolean).join('-'));
        break;
      case 'TUR':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'BEL':
      case 'UKI':
        formattedValue = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
    }

    phoneInput.value = formattedValue;

    // Kursorni formatlashdan keyin to'g'ri joyga qaytarish
    let diff = formattedValue.length - rawValue.length;
    phoneInput.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
  }

  countrySelect.addEventListener('change', updateInputFields);
  phoneInput.addEventListener('input', formatPhoneNumber);
  updateInputFields();
}
updatePhoneInput();

// form country select (bayroqlar)
function updateFlag() {
  const select = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const flagImg = document.getElementById('flag');
  const selectedOption = select.options[select.selectedIndex];
  const maxLength = selectedOption.getAttribute('data-maxlength');
  const countryCode = selectedOption.value.toLowerCase();

  // Bayroq rasmini yangilash
  flagImg.src = `https://flagcdn.com/w40/${countryCode}.png`;
  // Telefon raqami uzunligini yangilash
  phoneInput.setAttribute('maxlength', maxLength);
}
updateFlag();


// Formani yuborish uchun Google Sheets linki
const scriptURL = "https://script.google.com/macros/s/AKfycbwB40n-KSXKKD3PjmPcJNrOgruMP-4OU11NSJO_JBeaETmRMLsPgDJpylrWguq6H7oN/exec"; // google sheets link
const submitForm = document.forms['contact-form'];
const showForm = document.querySelector('.show-form-div');
const hideForm = document.querySelector('.hide-form-div');
const buttonS = document.querySelector('.submit-button');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const nameError = document.createElement('p');
const warningP = document.querySelector('.warning-p');

// Xatolik xabarini yaratish
nameError.style.color = 'red';
nameError.style.fontSize = '14px';
nameError.style.marginTop = '5px';
inputName.parentNode.insertBefore(nameError, inputName.nextSibling);

// Formni boshlang‘ich holatda ko‘rsatish
hideForm.style.display = "block";
showForm.style.display = "none";

// Ismni tekshirish
function validateName() {
  const nameValue = inputName.value.trim();
  const nameRegex = /^[A-Za-zÀ-ÿ'-]{2,}$/; // Kamida 2 ta harf va faqat harflar bo‘lishi kerak

  if (!nameRegex.test(nameValue)) {
    nameError.textContent = "❌ Ism faqat harflardan iborat bo‘lishi va kamida 2 ta harf bo‘lishi kerak!";
    inputName.style.borderColor = "red";
    return false;
  } else {
    nameError.textContent = "";
    inputName.style.borderColor = "";
    return true;
  }
}

// telefon raqamni tekshirish
function validatePhone() {
  const phoneValue = inputPhone.value.trim();

  if (phoneValue.length !== parseInt(inputPhone.maxLength)) { // Check for invalid phone input
    warningP.style.display = "block";
    return false;
  } else {
    warningP.style.display = "none";
    inputPhone.style.borderColor = "";
    return true;
  }
}

// tugmani bosganda formni tekshirib ochish
buttonS.addEventListener('click', () => {
  inputName.addEventListener("input", validateName);
  inputPhone.addEventListener("input", validatePhone);
  if (validateName() && validatePhone()) {
    hideForm.style.display = "none";
    showForm.style.display = "block";
  }
});

// submit funksiyasi
submitForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateName() || !validatePhone()) {
    return;
  }

  let name = inputName.value.trim();
  let phone = inputPhone.value.trim();

  try {
    await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
      mode: 'no-cors'
    });

    // Thank-you sahifasidan qaytganda sahifani yangilash uchun
    sessionStorage.setItem('reloadAfterThankYou', 'true');

    // Thank-you sahifasiga o'tish
    window.location.href = "./thank-you/index.html";

  } catch (error) {
    alert("❌ Ma'lumotlarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.\nXatolik: " + error.message);
  }
});

// sahifa yuklanganda qaytdimi yoki yo‘qmi tekshiramiz
window.addEventListener('load', () => {
  if (sessionStorage.getItem('reloadAfterThankYou') === 'true') {
    sessionStorage.removeItem('reloadAfterThankYou');
    window.location.reload();
  }
});
