async function loadProducts() {
    const productContainer = document.querySelector(".product-container");
    const mainProducts = await Utils.fetchProducts(1, 20);
    mainProducts.map(
        (product) =>
            productContainer.innerHTML += Utils.getProductCard(product),
    );
    Utils.listenCardClick(document.querySelectorAll(".single-product-trigger"));
}

loadProducts();
