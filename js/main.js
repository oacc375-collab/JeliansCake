// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90; // Altura del header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación al hacer scroll (reveal elements)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar animaciones iniciales
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Ejecutar animaciones al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Aquí iría el código para enviar el formulario a un servidor
            // Por ahora, solo mostramos un mensaje de éxito
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            
            // Limpiar el formulario
            contactForm.reset();
            
            // Redirigir a WhatsApp si el usuario lo desea
            const whatsappNumber = '593997476390';
            const whatsappMessage = `Hola, mi nombre es ${name}. ${message} ${phone ? '\\n\nMi número de teléfono es: ' + phone : ''}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Cambiar el header al hacer scroll
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scroll hacia abajo
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scroll hacia arriba
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
            
            // Añadir sombra al header cuando se hace scroll
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // Contador de estadísticas (ejemplo)
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const stats = document.querySelectorAll('.stat-number');
        let animationStarted = false;
        
        const startCounting = () => {
            if (animationStarted) return;
            
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const step = (target / duration) * 10;
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCount();
            });
            
            animationStarted = true;
        };
        
        // Iniciar animación cuando la sección sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Galería de imágenes con lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Crear el lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="close-lightbox">&times;</button>
                <img src="" alt="">
                <div class="lightbox-nav">
                    <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                    <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);

        const closeBtn = lightbox.querySelector('.close-lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => ({
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt
        }));

        // Función para abrir el lightbox
        function openLightbox(index) {
            currentIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Función para cerrar el lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Función para actualizar la imagen en el lightbox
        function updateLightboxImage() {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
        }

        // Función para mostrar la imagen anterior
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        }

        // Función para mostrar la siguiente imagen
        function showNextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        }

        // Event listeners para los botones de navegación
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });

        // Cerrar con el botón de cerrar
        closeBtn.addEventListener('click', closeLightbox);

        // Agregar event listeners a cada elemento de la galería
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });
    }
    
    // Actualizar el año en el footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} Jelian's Cake. Todos los derechos reservados.`;
    }
});

// Función para manejar el preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
