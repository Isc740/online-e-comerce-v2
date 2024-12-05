async function loadProducts() {
    const productContainer = document.querySelector(".product-container");
    const mainProducts = await Utils.fetchProducts(1, 20);
    mainProducts.map(
        (product) =>
            (productContainer.innerHTML += Utils.getProductCard(product)),
    );
    Utils.listenCardClick(document.querySelectorAll(".single-product-trigger"));
    searchProduct(mainProducts);
}

function searchProduct(products) {
    const searchInput = document.querySelector(".search-input");
    const productContainer = document.querySelector(".product-container");
    searchInput.addEventListener("input", (e) => {
        if (searchInput.value === "") {
            loadProducts();
            return;
        }

        productContainer.innerHTML = "";
        for (const product of products) {
            console.log(product);
            console.log(searchInput.value);
            if (product.title.toLowerCase().includes(searchInput.value)) {
                productContainer.innerHTML += Utils.getProductCard(product);
            }
        }
    });
}

if (!localStorage.getItem("usersCarts")) {
    let usersCarts = [];
    for (let i = 0; i < 20; i++) {
        usersCarts.push({ userId: i, products: [] });
    }
    localStorage.setItem("usersCarts", JSON.stringify(usersCarts));
}

loadProducts();
