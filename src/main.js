//VARIABLES
const cross = document.querySelector("#cross");
const burger = document.querySelector("#burger");
const menu = document.querySelector(".burger-menu");
const menuLinks = document.querySelectorAll("a");

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
