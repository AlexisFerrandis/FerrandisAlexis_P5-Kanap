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

// Push dynamically on the HTML for one element
async function renderEachItem() {
	let htmlRender = "";
	for (let i = 0; i < localStorage.length; i++) {
		let item = await getInfoWithId(i);
		let htmlContent = `
    <article class="cart__item" data-id="${item._id}" data-color="${localStorage.key(i).split(",")[1]}">
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
	let itemContainer = document.getElementById("cart__items");
	itemContainer.innerHTML += htmlRender;
	// Enable deleting item function
	deleteItem();
}
renderEachItem();

/*** 
DATA MANIPULATION
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
		});
	}
}
