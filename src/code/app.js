const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add('show');
        else
            entry.target.classList.add('show');
    })
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", load)

function load(event) {
    console.log("load");
}