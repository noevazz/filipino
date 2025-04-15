toggleThemeNamespace = {
  loadSavedTheme: function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.getElementById('themeToggleIcon').classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  },
  toggleTheme: function toggleTheme() {
    const htmlElement = document.documentElement;
    const iconElement = document.getElementById('themeToggleIcon');

    if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
      htmlElement.removeAttribute('data-bs-theme');
      htmlElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
      iconElement.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
      document.body.style.backgroundColor = '#FFFFFF';
    } else {
      htmlElement.removeAttribute('data-bs-theme');
      htmlElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      iconElement.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
      document.body.style.backgroundColor = '#212529';
    }
  },
};

toggleThemeNamespace.loadSavedTheme();
