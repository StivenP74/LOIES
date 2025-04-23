// Create electricity grid in the footer
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.electricity-grid');
    
    // Create horizontal lines
    for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line';
        line.style.gridRow = i + 1;
        line.style.gridColumn = '1 / span 20';
        grid.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'vertical-line';
        line.style.gridColumn = i + 1;
        line.style.gridRow = '1 / span 10';
        grid.appendChild(line);
    }
    
    // Create random circle animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'circle-animation';
            circle.style.top = Math.random() * 100 + '%';
            circle.style.left = Math.random() * 100 + '%';
            circle.style.animationDuration = (1 + Math.random() * 2) + 's';
            circle.style.animationDelay = Math.random() * 1 + 's';
            section.appendChild(circle);
        }
    });
    
    // Image Gallery Modal/Lightbox functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    // Zoom functionality
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomLevelDisplay = document.getElementById('zoomLevel');
    
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    // Function to update zoom level
    function updateZoom(newScale) {
        // Limit zoom range
        scale = Math.min(Math.max(newScale, 0.5), 5);
        
        // Update display
        zoomLevelDisplay.textContent = Math.round(scale * 100) + '%';
        
        // Apply zoom and translation
        modalImg.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
        
        // Toggle zoomed class for cursor style
        if (scale > 1) {
            modalImg.classList.add('zoomed');
        } else {
            modalImg.classList.remove('zoomed');
            // Reset translation when at 100% or lower
            translateX = 0;
            translateY = 0;
            modalImg.style.transform = `scale(${scale})`;
        }
    }
    
    // Zoom in button click
    zoomInBtn.addEventListener('click', function() {
        updateZoom(scale + 0.25);
    });
    
    // Zoom out button click
    zoomOutBtn.addEventListener('click', function() {
        updateZoom(scale - 0.25);
    });
    
    // Mouse wheel zoom
    modalImg.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        updateZoom(scale + delta);
    });
    
    // Click to zoom toggle
    modalImg.addEventListener('click', function(e) {
        if (e.target === modalImg) {
            if (scale === 1) {
                updateZoom(2); // Zoom to 200%
            } else {
                updateZoom(1); // Reset to 100%
            }
        }
    });
    
    // Drag functionality for panning zoomed images
    modalImg.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            modalImg.classList.add('grabbing');
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            modalImg.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        modalImg.classList.remove('grabbing');
    });
    
    // Open modal when clicking on gallery image
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            
            // Reset zoom level when opening new image
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateZoom(scale);
            
            // Trigger a random lightning flash when opening the modal
            setTimeout(() => {
                const modalLightnings = document.querySelectorAll('.modal-lightning');
                const randomLightning = Math.floor(Math.random() * modalLightnings.length);
                modalLightnings[randomLightning].style.opacity = '1';
                setTimeout(() => {
                    modalLightnings[randomLightning].style.opacity = '0';
                }, 100);
            }, 300);
        });
    });
    
    // Close modal when clicking on X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image container
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal when pressing escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Create random lightning effects throughout the page
    function createRandomLightning() {
        // Create a lightning element
        const lightning = document.createElement('div');
        lightning.className = 'random-lightning';
        
        // Random position on the page
        const top = Math.random() * 90 + 5; // 5-95%
        const left = Math.random() * 90 + 5; // 5-95%
        const height = 50 + Math.random() * 150; // 50-200px
        const width = 2 + Math.random() * 3; // 2-5px
        const rotation = Math.random() * 40 - 20; // -20 to 20 degrees
        
        // Set styles
        lightning.style.position = 'fixed';
        lightning.style.top = top + '%';
        lightning.style.left = left + '%';
        lightning.style.height = height + 'px';
        lightning.style.width = width + 'px';
        lightning.style.backgroundColor = 'var(--lightning-color)';
        lightning.style.boxShadow = '0 0 10px var(--lightning-glow), 0 0 20px var(--lightning-glow)';
        lightning.style.transform = `rotate(${rotation}deg)`;
        lightning.style.opacity = '0';
        lightning.style.zIndex = '1000';
        lightning.style.filter = 'blur(0.5px)';
        lightning.style.clipPath = 'polygon(50% 0, 55% 20%, 70% 35%, 60% 50%, 75% 70%, 65% 85%, 50% 100%, 35% 85%, 25% 70%, 40% 50%, 30% 35%, 45% 20%)';
        
        // Add to document
        document.body.appendChild(lightning);
        
        // Animate
        setTimeout(() => {
            lightning.style.opacity = '0.8';
            setTimeout(() => {
                lightning.style.opacity = '0.4';
                setTimeout(() => {
                    lightning.style.opacity = '0.6';
                    setTimeout(() => {
                        lightning.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(lightning);
                        }, 100);
                    }, 50);
                }, 50);
            }, 50);
        }, 0);
        
        // Schedule next lightning (random interval between 0.5-3 seconds)
        const nextInterval = 500 + Math.random() * 2500;
        setTimeout(createRandomLightning, nextInterval);
    }
    
    // Start the random lightning after a short delay
    setTimeout(createRandomLightning, 500);
});