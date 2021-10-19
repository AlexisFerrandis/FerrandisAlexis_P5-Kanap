/*** 
LOCAL STORAGE & DISPLAY ON CART PAGE
***/

// Get information for Id in localStorage
async function getInfoWithId(i) {
	let idAndColorStr = localStorage.key(i);
	let idAndColorArray = idAndColorStr.split(",");
	let itemId = idAndColorArray[0];
	try {
		let response = await fetch(`http://localhost:3000/api/products/${itemId}`);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}

// Push dynamically on the HTML each element, then enable associate function
async function renderEachItem() {
	let htmlRender = "";
	let itemContainer = document.getElementById("cart__items");
	// Check if they'r is no article
	checkIfCartEmpty();
	for (let i = 0; i < localStorage.length; i++) {
		// Else begin the loop
		let item = await getInfoWithId(i);
		let htmlContent = `
    <article class="cart__item" data-id="${item._id}" data-color="${localStorage.key(i).split(",")[1]}" data-price="${item.price}">
        <div class="cart__item__img">
            <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${item.name}</h2>
                <p>${item.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage.getItem(localStorage.key(i))}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
		htmlRender += htmlContent;
	}

	itemContainer.innerHTML += htmlRender;

	// Enable deleting item function
	deleteItem();
	// Enable quantity modification
	articleQuantityActualisation();
	// Initialise the amount total of article
	totalArticleActualisation();
	//Initialise the total price of the cart
	totalPriceActualisation();
}
renderEachItem();

// Empty cart verification
function checkIfCartEmpty() {
	if (localStorage.length == 0) {
		document.getElementById("cart__items").innerHTML = "<p >Il n'y a pas encore de Kanap ici, visitez <a href='./index.html' style=' color:white; font-weight:700'>notre séléction 🛋️</a>.</p>";
	}
}

/*** 
ARTICLES DATA MANIPULATION
***/

/* Get all the delete btn, link them to they'r DOM and localStorage, add a listener 
to remove them. */
function deleteItem() {
	let deleteItemBtns = document.querySelectorAll(".deleteItem");

	for (let i = 0; i < deleteItemBtns.length; i++) {
		deleteItemBtns[i].addEventListener("click", (e) => {
			e.preventDefault();

			let articleDOM = deleteItemBtns[i].closest("article");
			let articleId = articleDOM.dataset.id;
			let articleColor = articleDOM.dataset.color;
			let articleQuantity = localStorage.getItem(localStorage.key(i));

			let localStorageKey = [articleId, articleColor];

			localStorage.removeItem(localStorageKey, articleQuantity);
			articleDOM.remove();

			// Actualising the total amount of article
			totalArticleActualisation();
		});
	}
}

/* Get all the quantity input , link them to they'r DOM and localStorage, add a listener 
to change them. */
function articleQuantityActualisation() {
	let quantitySelector = document.querySelectorAll(".itemQuantity");
	for (let i = 0; i < quantitySelector.length; i++) {
		quantitySelector[i].addEventListener("change", (e) => {
			e.preventDefault();

			// For each article
			let articleDOM = quantitySelector[i].closest("article");
			let articleId = articleDOM.dataset.id;
			let articleColor = articleDOM.dataset.color;

			let localStorageKey = [articleId, articleColor];

			let itemQuantity = e.target.value;
			if (itemQuantity == 0) {
				alert("Il faut au moins ajouter un Kanap 🛋️");
			}
			localStorage.setItem(localStorageKey, itemQuantity);

			// Actualising the total amount of article
			totalArticleActualisation();
		});
	}
}

// Actualise the total amount of article in the cart
function totalArticleActualisation() {
	let quantitySelector = document.querySelectorAll(".itemQuantity");
	let articleAmount = 0;

	for (let i = 0; i < quantitySelector.length; i++) {
		articleAmount += parseInt(quantitySelector[i].value);
	}
	let totalQuantityDisplay = document.getElementById("totalQuantity");
	totalQuantityDisplay.innerHTML = articleAmount;

	totalPriceActualisation();
}

// Actualise the total price for the cart
function totalPriceActualisation() {
	let quantitySelector = document.querySelectorAll(".itemQuantity");
	let totalCartPrice = 0;

	for (let i = 0; i < quantitySelector.length; i++) {
		let articleDOM = quantitySelector[i].closest("article");
		let individualPrice = articleDOM.dataset.price;

		totalCartPrice += parseInt(quantitySelector[i].value) * individualPrice;
	}

	let totalPriceDisplay = document.getElementById("totalPrice");
	totalPriceDisplay.innerHTML = totalCartPrice;

	// Check if they'r is no article
	checkIfCartEmpty();
}

/*** 
USER DATA MANIPULATION
***/

let userBasket = [];

class Form {
	constructor(input) {
		this.firstName = document.getElementById("firstName").value;
		this.lastName = document.getElementById("lastName").value;
		this.adress = document.getElementById("address").value;
		this.city = document.getElementById("city").value;
		this.mail = document.getElementById("email").value;
	}
}

let userForm = new Form();
let userFirstName = userForm.firstName;
console.log(userFirstName);

let userFormContainer = document.getElementsByTagName("form");
let userFormSubmit = document.getElementById("order");
userFormSubmit.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("fire");
});
