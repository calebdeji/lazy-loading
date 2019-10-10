window.addEventListener("DOMContentLoaded", () => {

    if ("IntersectionObserver" in window) {
        let lazyImages = document.querySelectorAll(".image")
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("image");
                    imageObserver.unobserve(image);
                }
            })
        });
        lazyImages.forEach((image) => {
            imageObserver.observe(image);
            console.log("hello");
        });
    } else {
        let lazyImageLoadingTimeout;
        let lazyImages = document.querySelectorAll(".image");
        const lazyLoad = () => {
            if (lazyImageLoadingTimeout) {
                clearTimeout(lazyImageLoadingTimeout);
            }
            lazyImageLoadingTimeout = setTimeout(() => {
                let windowsOffsetDimension = window.pageYOffset;
                lazyImages.forEach((image) => {
                    if (image.offsetTop < windowsOffsetDimension + window.innerHeight) {
                        image.src = image.dataset.src;
                        image.classList.remove("image");
                        console.log("hello")
                    }
                });
                if (lazyImages.length == 0) {
                    document.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("orientationchange", lazyLoad);
                }
            }, 20);
        }
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
})