// Get information for Id in localStorage
async function getInfoWithId(i) {
	let idAndColorStr = localStorage.key(i);
	let idAndColorArray = idAndColorStr.split(",");
	let itemId = idAndColorArray[0];
	// let itemColor = idAndColorArray[1];
	try {
		let response = await fetch(`http://localhost:3000/api/products/${itemId}`);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}

// Push dynamically on the HTML for one element
async function rendererere(i) {
	let item = await getInfoWithId(i);
	let htmlContent = `
    <article class="cart__item" data-id="${item.id}">
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
	document.getElementById("cart__items").innerHTML += htmlContent;
}

// Loop to display all items stored
for (let i = 0; i < localStorage.length; i++) {
	rendererere(i);
}
