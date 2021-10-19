// Check that the id parameter exists
function idVerification() {
	var url = new URL(window.location.href);
	var search_params = new URLSearchParams(url.search);

	if (search_params.has("id")) {
		var id = search_params.get("id");
		return id;
	} else {
		console.log("Error, they'r is no id match.");
	}
}

// Only get the information for the specified product
async function getInfoById() {
	let id = idVerification();
	try {
		let response = await fetch(`http://localhost:3000/api/products/${id}`);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}

// Handle the render on the HTML
async function renderItem() {
	let item = await getInfoById();
	document.querySelector(".item__img").innerHTML += `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
	document.getElementById("title").innerHTML += item.name;
	document.getElementById("price").innerHTML += item.price;
	document.getElementById("description").innerHTML += item.description;
	// Choice of item colors
	item.colors.forEach((color) => {
		let htmlContent = `<option value="${color}">${color}</option>`;
		document.getElementById("colors").innerHTML += htmlContent;
	});
}
// Calling the function
renderItem();

// Add to cart & localStorage
const addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", () => {
	// Push in the localStorage

	let itemId = idVerification();
	let itemColor = document.getElementById("colors").value;
	let itemQuantity = document.getElementById("quantity").value;
	let itemInCart = [itemId, itemColor];

	localStorage.setItem(itemInCart, itemQuantity);
});
