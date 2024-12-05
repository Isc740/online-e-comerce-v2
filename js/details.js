async function mainDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const productData = await Utils.fetchProduct(productId);

    displaySingleProduct(productData);
    listenCartBtn(productId);
}

mainDetails();

const displaySingleProduct = (productData) => {
    document.querySelector(".details-container").innerHTML = `
		<div class="card mb-3 shadow" style="width: 40rem;">
			<div class="row g-0">
				<div class="col-md-5 p-2">
					<img src="${productData.image}" class="img-fluid card-img-top mx-auto my-4 rounded-start" alt="product image">
				</div>
				<div class="col-md-7 border">
					<div class="card-body">
						<h5 class="card-title">${productData.title}</h5>
						<p class="card-text">${productData.description}</p>
						<div class="justify-content-center d-flex">
							<a class="btn btn-success btn-add-cart">add to cart</a>
						</div>
					</div>
					<ul class="list-group list-group-flush text-center">
						<li class="list-group-item text-body-secondary">Rating: ${productData.rating.rate}</li>
						<li class="list-group-item text-body-secondary">Amount Bought: ${productData.rating.count}</li>
						<li class="list-group-item text-success">Price: <strong>${productData.price}</strong></li>
					</ul>
				</div>
			</div>
		</div>`;
};

const listenCartBtn = (productId) => {
    document
        .querySelector(".btn-add-cart")
        .addEventListener("click", async () => {
            const sessionId = localStorage.getItem("userId");
            if (!sessionId) {
                Swal.fire({
                    title: "Error!",
                    text: "you are not logged in!",
                    icon: "error",
                    confirmButtonText: "Return",
                });
                return;
            }

            const userCart = Utils.getUserCart(sessionId);

            if (userCart.products.includes(productId)) {
                Swal.fire({
                    title: "Error!",
                    text: "Product Already in the cart!",
                    icon: "error",
                    confirmButtonText: "Return",
                });
                return;
            }

            userCart.products.push(productId);

            const usersCarts = JSON.parse(localStorage.getItem("usersCarts"));
            usersCarts[sessionId] = userCart;

            localStorage.setItem("usersCarts", JSON.stringify(usersCarts));
            await Swal.fire({
                title: "Added Product!",
                text: "The product has been added to the cart!",
                icon: "success",
                confirmButtonText: "Return",
            });

            await loadNavbar();
        });
};
