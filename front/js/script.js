const itemsList = document.getElementById("items");

function getItemsList() {
	fetch("http://localhost:3000/api/products", {
		method: "GET",
	})
		.then(function (res) {
			if (res.ok) {
				return res.json();
			}
		})
		.then(function (value) {
			console.log(value);
		});
}

getItemsList();
