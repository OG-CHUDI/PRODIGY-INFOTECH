document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('a');
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    navbar.appendChild(toggleButton);

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    toggleButton.addEventListener('click', () => {
        navbar.classList.toggle('collapsed');
    });

    
    function updateNavbar() {
        if (window.innerWidth <= 768) {
            navbar.classList.add('collapsed');
        } else {
            navbar.classList.remove('collapsed');
        }
    }

    window.addEventListener('resize', updateNavbar);
    updateNavbar();
});
