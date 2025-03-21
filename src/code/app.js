const headerImages = document.querySelectorAll(".stellution-header .header-images img");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        target.classList.toggle('show', isIntersecting || !target.classList.contains('removable'));

        if ([...headerImages].includes(target) && !headerImagesSeen) {
            headerImagesSeen = true;

            setTimeout(() => { headerImagesAnimationComplete = true; }, getTransitionTimeMS(target));
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

let headerImagesSeen = false;
let headerImagesAnimationComplete = false;

document.addEventListener("DOMContentLoaded", load)

function load(event) {
    console.log("load");
}

window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    animateHeaderImages(scrollPosition);

});

function animateHeaderImages(scrollPosition) {
    if (!headerImagesAnimationComplete) return;

    headerImages.forEach((image, index) => {
        const computedStyle = window.getComputedStyle(image);
        let moveFactor = index === 0 ? -Math.min(20, scrollPosition * 0.25) : Math.min(20, scrollPosition * 0.25);
        let transitionDuration = 1;
        image.style.transition = `${transitionDuration}s transform ease-in-out 0s`;
        image.style.transform = `translateX(${moveFactor * 2}px) translateY(${-moveFactor * 0.25}px)`;
    });
}

function getTransitionTimeMS(element) {
    const computedStyle = window.getComputedStyle(element);

    let delay = computedStyle.transitionDelay;
    let duration = computedStyle.transitionDuration;

    function parseTime(timeString) {
        if (timeString.includes("ms")) {
            return parseFloat(timeString);
        } else if (timeString.includes("s")) {
            return parseFloat(timeString) * 1000;
        }
        return 0;
    }

    let totalTime = parseTime(delay) + parseTime(duration);
    return totalTime;
}

function getTranslation(computedStyle, axis = 'x') {
    let transformMatrix = computedStyle.transform;

    if (transformMatrix && transformMatrix !== "none") {
        let values = transformMatrix.match(/matrix\(([^)]+)\)/);

        if (values) {
            let matrixValues = values[1].split(',').map(Number);

            if (axis === 'x')
                return matrixValues[4];
            else if (axis === 'y')
                return matrixValues[5];
        }
    }

    return 0;
}