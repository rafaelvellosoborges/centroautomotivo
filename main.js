document.addEventListener('DOMContentLoaded', async () => {

    let content;
    try {
        const response = await fetch('content.json');
        content = await response.json();
    } catch (e) {
        console.error("Failed to load content", e);
        return;
    }


    const servicosContainer = document.getElementById('servicos-container');
    content.services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card bg-zinc-900 border border-zinc-800 p-10 group relative overflow-hidden animate-on-scroll';
        card.innerHTML = `
            <div class="absolute top-0 left-0 w-full h-1 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div class="w-14 h-14 bg-red-600/5 flex items-center justify-center mb-8 group-hover:bg-red-600 transition-all duration-500 transform group-hover:rotate-[360deg]">
                <i data-lucide="${service.icon}" class="text-red-500 group-hover:text-white transition-colors duration-500 w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold mb-4 uppercase tracking-tighter transition-colors group-hover:text-red-500">${service.title}</h3>
            <p class="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">${service.description}</p>
            <div class="mt-8 flex items-center gap-2 text-zinc-600 group-hover:text-red-500 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                Saiba Mais <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </div>
        `;
        servicosContainer.appendChild(card);
    });

    const diferenciaisList = document.getElementById('diferenciais-list');
    content.diferenciais.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-4 text-zinc-300 group cursor-default';
        li.innerHTML = `
            <div class="w-6 h-6 rounded-full border border-red-600/30 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                <i data-lucide="check" class="text-red-600 group-hover:text-white w-3 h-3"></i>
            </div>
            <span class="font-bold tracking-tight uppercase text-sm">${item.text}</span>
        `;
        diferenciaisList.appendChild(li);
    });

    const reviewsContainer = document.getElementById('reviews-container');
    content.reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between h-full hover:border-zinc-700 transition-all hover:shadow-2xl animate-on-scroll';
        div.innerHTML = `
            <div>
                <div class="flex items-center gap-1 mb-4">
                    ${Array(5).fill('<i data-lucide="star" class="fill-current text-[#FBBC05] w-3 h-3"></i>').join('')}
                    <span class="text-[10px] text-zinc-500 ml-2">Há 2 meses</span>
                </div>
                <p class="text-zinc-300 text-base leading-relaxed mb-8">"${review.text}"</p>
            </div>
            <div class="flex items-center justify-between border-t border-zinc-900 pt-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-700">
                        ${review.author.charAt(0)}
                    </div>
                    <div>
                        <span class="block text-sm font-bold text-white uppercase tracking-tight">${review.author}</span>
                        <span class="block text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Guia Local • 12 fotos</span>
                    </div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" class="w-4 h-4 opacity-30">
            </div>
        `;
        reviewsContainer.appendChild(div);
    });


    lucide.createIcons();


    gsap.registerPlugin(ScrollTrigger);


    const heroTl = gsap.timeline();
    heroTl.from(".reveal-stagger > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
    });

    gsap.to("#hero-img", {
        scale: 1,
        duration: 10,
        ease: "none"
    });


    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    animateOnScrollElements.forEach((el, index) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            delay: (index % 3) * 0.1,
            ease: "power3.out"
        });
    });


    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    });


    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });


    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
