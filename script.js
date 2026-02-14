document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    //    const spacer = document.querySelector('.header-spacer');

    // Scroll Animation Logic
    let ticking = false;
    function updateScroll() {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight - 80; // Stop shrinking when header is 80px
        let progress = Math.min(scrollY / maxScroll, 1);
        progress = Math.max(progress, 0);

        document.body.style.setProperty('--scroll', progress);

        if (progress >= 0.99) {
            header.classList.add('shrunk-state');
        } else {
            header.classList.remove('shrunk-state');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
    updateScroll();


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Down Button Link
    const scrollBtn = document.getElementById('scrollBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight - 80,
                behavior: 'smooth'
            });
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('.icon');

        // Check System Preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Default CSS is dark. If system is light, add class.
        if (!systemPrefersDark) {
            document.body.classList.add('light-mode');
            themeIcon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
        }

        // Listener for system change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.body.classList.remove('light-mode');
                themeIcon.textContent = '🌙';
                themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
            } else {
                document.body.classList.add('light-mode');
                themeIcon.textContent = '☀️';
                themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
            }
        });

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                themeIcon.textContent = '☀️';
                themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
            } else {
                themeIcon.textContent = '🌙';
                themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
            }
        });
    }
});
