async function loadProducts() {
    const productContainer = document.querySelector(".product-container");
    const mainProducts = await Utils.fetchProducts(1, 20);
    mainProducts.map(
        (product) =>
            (productContainer.innerHTML += Utils.getProductCard(product)),
    );
    Utils.listenCardClick(document.querySelectorAll(".single-product-trigger"));
}

if (!localStorage.getItem("usersCarts")) {
    let usersCarts = [];
    for (let i = 0; i < 20; i++) {
        usersCarts.push({ "userId": i, "products": [] })
    }
    localStorage.setItem("usersCarts", JSON.stringify(usersCarts));
}

loadProducts();
