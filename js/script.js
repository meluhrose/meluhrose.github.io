// Lightbox functionality
function openLightbox(src, alt) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    caption.textContent = alt;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}