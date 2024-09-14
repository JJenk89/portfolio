//VARIABLES
const cross = document.querySelector("#cross");
const burger = document.querySelector("#burger");
const menu = document.querySelector(".burger-menu");
const menuLinks = document.querySelectorAll("a");
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);

//EVENT LISTENERS
burger.addEventListener("click", () => {
	menu.classList.remove("hidden");
	document.body.classList.add("disable-scroll");
});

cross.addEventListener("click", () => {
	menu.classList.add("hidden");
	document.body.classList.remove("disable-scroll");
});

menuLinks.forEach((a) => {
	a.addEventListener("click", () => {
		document.body.classList.remove("disable-scroll");
		menu.classList.add("hidden");
	});
});

// CAROUSEL //

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

dotsNav.addEventListener("click", (e) => {
	const targetDot = e.target.closest("span");

	if (!targetDot) return;

	const currentSlide = track.querySelector(".active");
	const currentDot = dotsNav.querySelector(".active");
	const targetIndex = dots.findIndex((dot) => dot === targetDot);
	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);
	currentDot.classList.remove("active");
	targetDot.classList.add("active");
});
