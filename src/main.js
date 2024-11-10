//VARIABLES
const cross = document.querySelector("#cross");
const burger = document.querySelector("#burger");
const menu = document.querySelector(".burger-menu");
const menuLinks = document.querySelectorAll("a");
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);

// Touch variables
let touchStartX = 0;
let touchEndX = 0;

//FUNCTIONS

// CAROUSEL //

//Calculates the width of the slide dynamically
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = "translateX(-" + targetSlide.style.left + ")";
	currentSlide.classList.remove("active");
	targetSlide.classList.add("active");
};

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove("active");
	targetDot.classList.add("active");
};

const getNextSlide = (currentSlide, direction) => {
	const currentIndex = slides.findIndex((slide) => slide === currentSlide);
	if (direction === "next") {
		return slides[currentIndex + 1] || slides[0];
	} else {
		return slides[currentIndex - 1] || slides[slides.length - 1];
	}
};

//EVENT LISTENERS
//
// MENU
burger.addEventListener("click", () => {
	menu.classList.remove("hidden");
	document.body.classList.add("disable-scroll");
});

//MENU CLOSING
cross.addEventListener("click", () => {
	menu.classList.add("hidden");
	document.body.classList.remove("disable-scroll");
});

//Closes menu on link click, applies a scroll disable to make the menu static
menuLinks.forEach((a) => {
	a.addEventListener("click", () => {
		document.body.classList.remove("disable-scroll");
		menu.classList.add("hidden");
	});
});

//CAROUSEL NAVIGATION
//

dotsNav.addEventListener("click", (e) => {
	const targetDot = e.target.closest("span");

	if (!targetDot) return;

	const currentSlide = track.querySelector(".active");
	const currentDot = dotsNav.querySelector(".active");
	const targetIndex = dots.findIndex((dot) => dot === targetDot);
	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);
	updateDots(currentDot, targetDot);
});

// Touch Events
track.addEventListener("touchstart", (e) => {
	touchStartX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].clientX;
	handleSwipe();
});

function handleSwipe() {
	const currentSlide = track.querySelector(".active");
	const currentDot = dotsNav.querySelector(".active");
	let targetSlide;

	if (touchStartX - touchEndX > 50) {
		// Swipe left
		targetSlide = getNextSlide(currentSlide, "next");
	} else if (touchEndX - touchStartX > 50) {
		// Swipe right
		targetSlide = getNextSlide(currentSlide, "prev");
	} else {
		return; // Not a significant swipe
	}

	const targetDot = dots[slides.indexOf(targetSlide)];

	moveToSlide(track, currentSlide, targetSlide);
	updateDots(currentDot, targetDot);
}

//removes the scroll snap property at desktop sizes
const scroller = document.querySelector(".scroller");
var winWidth = window.innerWidth;

function updateSize() {
	if (winWidth > 1100) {
		scroller.classList.remove("scroller");
	}
}

updateSize();
