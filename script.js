document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader removal
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 500);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // 4. Populate Gallery
    const galleryContainer = document.querySelector('.gallery');
    
    const portfolioItems = [
        { title: "Baños de Popea", category: "video", type: "youtube", videoId: "IZRtGUq9B-E", img: "https://img.youtube.com/vi/IZRtGUq9B-E/maxresdefault.jpg" },
        { title: "IRONTRACK VI 2022", category: "video", type: "youtube", videoId: "D6cpQ8eHp-k", img: "https://img.youtube.com/vi/D6cpQ8eHp-k/maxresdefault.jpg" },
        { title: "Camping los Villares", category: "video", type: "youtube", videoId: "qhYA1HbOcKk", img: "https://img.youtube.com/vi/qhYA1HbOcKk/maxresdefault.jpg" },
        { title: "Guzman el Bueno 2026", category: "video", type: "youtube", videoId: "h8e8WYvN8P0", img: "https://img.youtube.com/vi/h8e8WYvN8P0/maxresdefault.jpg" },
        { title: "Trailer IA de Producto", category: "video", type: "youtube", videoId: "PMD5U2ZKlGk", img: "https://img.youtube.com/vi/PMD5U2ZKlGk/maxresdefault.jpg" },
        { title: "Nazaré", category: "photo", type: "image", img: "images/Nazare.jpg" },
        { title: "Short para RSS", category: "video", type: "youtube", videoId: "jJZ-gLwmE2M", img: "https://img.youtube.com/vi/jJZ-gLwmE2M/maxresdefault.jpg" },
        { title: "Filmaker", category: "video", type: "youtube", videoId: "YyfTrwDmZIA", img: "https://img.youtube.com/vi/YyfTrwDmZIA/maxresdefault.jpg" }
    ];

    function renderGallery(filter = 'all') {
        galleryContainer.innerHTML = '';
        
        const filterMap = {
            'all': 'all', 'video': 'video', 'photo': 'photo',
            'todos': 'all', 'vídeo': 'video', 'foto': 'photo'
        };

        const targetCategory = filterMap[filter.toLowerCase()] || 'all';

        const filteredItems = targetCategory === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === targetCategory);

        filteredItems.forEach((item, index) => {
            const delay = index * 0.1;
            const categoryDisplay = {
                'video': 'Vídeo',
                'photo': 'Fotografía'
            }[item.category];

            const itemHTML = `
                <div class="gallery-item fade-in" style="animation-delay: ${delay}s" data-type="${item.type}" ${item.videoId ? `data-id="${item.videoId}"` : ''}>
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${categoryDisplay}</p>
                        ${item.type === 'youtube' ? '<div class="play-icon">▶</div>' : ''}
                        ${item.type === 'image' ? '<div class="play-icon">🔍</div>' : ''}
                    </div>
                </div>
            `;
            galleryContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
        
        // Modal Event Listeners
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                if (item.getAttribute('data-type') === 'youtube') {
                    const videoId = item.getAttribute('data-id');
                    openVideoModal(videoId);
                } else if (item.getAttribute('data-type') === 'image') {
                    const imgSrc = item.querySelector('img').getAttribute('src');
                    openImageModal(imgSrc);
                }
            });
        });

        observeElements();
    }

    // 5. Video Modal
    const modal = document.getElementById('video-modal');
    const modalFrame = document.querySelector('.modal-frame');
    const closeBtn = document.querySelector('.close-modal');

    function openVideoModal(videoId) {
        modalFrame.innerHTML = `
            <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
            <div class="video-fallback">
                <p>¿El vídeo no carga? <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Ver directamente en YouTube</a></p>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }

    function openImageModal(imgSrc) {
        modalFrame.innerHTML = `
            <img src="${imgSrc}" style="max-width: 100%; max-height: 90vh; object-fit: contain; border-radius: 8px; display: block; margin: 0 auto;">
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalFrame.innerHTML = '';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Initial render
    renderGallery();

    // 6. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btns button');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            renderGallery(filterValue);
        });
    });

    // 7. Scroll Animations
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    observeElements();
});

// 8. Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Disable form during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'ENVIANDO...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        const formData = new FormData(contactForm);
        const actionUrl = contactForm.getAttribute('action');
        
        try {
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = '¡Mensaje enviado! Te contactaré pronto.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                const data = await response.json();
                formStatus.textContent = data.errors 
                    ? Object.values(data.errors).join(', ') 
                    : 'Error al enviar. Intenta de nuevo.';
                formStatus.classList.add('error');
            }
        } catch (error) {
            formStatus.textContent = 'Error de conexión. Verifica tu internet.';
            formStatus.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}
