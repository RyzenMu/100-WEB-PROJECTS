let images = document.querySelectorAll('img.lazyload');
let observer = new IntersectionObserver((entries,observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            let img = entry.target;
            img.src = img.getAttribute('data-src');
            img.classList.remove('lazyload');
            observer.unobserve(img);
        }
    })
})

images.forEach(img => {
    observer.observe(img);
})