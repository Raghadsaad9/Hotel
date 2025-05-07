const html = document.querySelector('html');
const langToggle = document.getElementById('lang-toggle');

function setLanguage(lang) {
  const isArabic = lang === 'ar';
  html.setAttribute('lang', lang);
  html.setAttribute('dir', isArabic ? 'rtl' : 'ltr');

  // تغيير عنوان الموقع
  const siteTitle = document.getElementById('site-title');
  if (siteTitle) {
    siteTitle.innerText = isArabic ? 'فندق بتصميم رغد' : 'A Hotel Designed by Raghad';
  }

  // تغيير روابط التنقل
  const navLinks = document.querySelectorAll('#nav-links a');
  const navText = isArabic
    ? ['الرئيسية', 'الغرف', 'الخدمات', 'العروض', 'آراء العملاء', 'تواصل معنا']
    : ['Home', 'Rooms', 'Services', 'Offers', 'Reviews', 'Contact'];
  navLinks.forEach((link, index) => {
    if (navText[index]) link.innerText = navText[index];
  });

  // زر الحجز الآن
  const bookNow = document.getElementById('book-now');
  if (bookNow) {
    bookNow.innerText = isArabic ? bookNow.dataset.ar : bookNow.dataset.en;
  }

  // زر التبديل بين اللغات
  if (langToggle) {
    langToggle.innerText = isArabic ? 'English' : 'العربية';
  }

  // تغيير بقية النصوص القابلة للتبديل
  document.querySelectorAll('[data-en]').forEach((el) => {
    const text = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (el.placeholder !== undefined && el.placeholder !== null && el.tagName !== 'BUTTON') {
      el.placeholder = text;
    } else {
      el.innerText = text;
    }
  });
}

// تحميل اللغة من التخزين المحلي عند فتح الصفحة
const savedLang = localStorage.getItem('language') || 'ar';
setLanguage(savedLang);

// زر تغيير اللغة
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const currentLang = html.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', newLang);
    setLanguage(newLang);
  });
}
