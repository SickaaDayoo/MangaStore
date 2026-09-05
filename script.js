// ===============================
// LOAD NAVBAR
// ===============================

fetch("Navbar.html")
    .then(response => response.text())
    .then(data => {

        const navbar = document.getElementById("navbar");

        if (navbar) {

            navbar.innerHTML = data;

            // ===============================
            // MOBILE MENU
            // ===============================

            const menuBtn = document.getElementById("menuBtn");
            const mobileMenu = document.getElementById("mobileMenu");
            const menuIcon = document.getElementById("menuIcon");


            if (menuBtn && mobileMenu) {

                menuBtn.addEventListener("click", () => {

                    const isHidden =
                        mobileMenu.classList.contains("hidden");


                    // Show / hide menu
                    mobileMenu.classList.toggle("hidden");


                    // Update accessibility
                    menuBtn.setAttribute(
                        "aria-expanded",
                        String(isHidden)
                    );


                    // Change icon
                    if (isHidden) {

                        // X icon
                        menuIcon.innerHTML = `
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        `;

                        menuBtn.setAttribute(
                            "aria-label",
                            "Close navigation menu"
                        );

                    } else {

                        // Hamburger icon
                        menuIcon.innerHTML = `
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        `;

                        menuBtn.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                    }

                });

            }

        }

    })
    .catch(error => {

        console.error(
            "Error loading navbar:",
            error
        );

    });


// ===============================
// CAROUSEL
// ===============================

const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carousel = document.getElementById("carousel");

let currentSlide = 0;
let autoSlide;


if (carousel && slides.length > 0) {

    function showSlide(index) {

        slides.forEach((slide) => {

            slide.classList.remove("opacity-100");
            slide.classList.add("opacity-0");

        });


        indicators.forEach((indicator) => {

            indicator.classList.remove(
                "w-8",
                "bg-white"
            );

            indicator.classList.add(
                "w-2",
                "bg-white/50"
            );

        });


        slides[index].classList.remove(
            "opacity-0"
        );

        slides[index].classList.add(
            "opacity-100"
        );


        if (indicators[index]) {

            indicators[index].classList.remove(
                "w-2",
                "bg-white/50"
            );

            indicators[index].classList.add(
                "w-8",
                "bg-white"
            );

        }


        currentSlide = index;

    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }


    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();
                restartAutoSlide();

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                previousSlide();
                restartAutoSlide();

            }
        );

    }


    indicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                () => {

                    showSlide(index);
                    restartAutoSlide();

                }
            );

        }
    );


    function startAutoSlide() {

        autoSlide = setInterval(
            () => {

                nextSlide();

            },
            5000
        );

    }


    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    carousel.addEventListener(
        "mouseenter",
        () => {

            clearInterval(autoSlide);

        }
    );


    carousel.addEventListener(
        "mouseleave",
        () => {

            startAutoSlide();

        }
    );


    startAutoSlide();

}


// ===============================
// ADD TO CART
// ===============================

const cartButtons =
    document.querySelectorAll(".add-to-cart");


console.log(
    "Add to Cart buttons found:",
    cartButtons.length
);


cartButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            let cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];


            const existingItem =
                cart.find(
                    item => item.name === name
                );


            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                cart.push({

                    name: name,
                    price: price,
                    quantity: 1

                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            button.textContent =
                "Added to Cart ✓";


            setTimeout(() => {

                button.textContent =
                    "Add to Cart";

            }, 1500);

        }
    );

});