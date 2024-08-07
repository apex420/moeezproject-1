document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.products-section, .about-section, .contact-section');
    const options = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Three.js background for hero section
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('hero-background').appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);
    camera.position.z = 30;

    const animate = () => {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();

    // Resize handler for Three.js scene
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        heroContent.style.transform = `translate(${x * 20}px, ${y * 20}px) perspective(1000px) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
    });

    // Glitch effect for titles
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                element.style.transform = 'translate(0, 0)';
            }, 50);
        }, 3000);
    });

    // Product card 3D effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Neon text effect
    const neonTexts = document.querySelectorAll('.neon-text');
    neonTexts.forEach(text => {
        text.innerHTML = text.textContent.split('').map(char => 
            `<span>${char}</span>`
        ).join('');

        Array.from(text.children).forEach((span, index) => {
            span.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Form submission animation
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('submitted');
        setTimeout(() => {
            form.classList.remove('submitted');
            form.reset();
        }, 3000);
    });
});