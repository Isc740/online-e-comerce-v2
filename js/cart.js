async function mainCart() {
    const sessionId = localStorage.getItem("userId");
    const products = await Utils.fetchProducts();
    const userCart = Utils.getUserCart(sessionId);
    console.log(userCart);
    renderCartProducts(products, userCart);
    listenRemoveCartItem(products, userCart, sessionId);
}

mainCart();

const renderCartProducts = (products, userCart) => {
    const cartProducts = products.filter((product) =>
        userCart.products.includes(product.id.toString()),
    );

    const tableBody = document.querySelector(".cart-table-body");
    tableBody.innerHTML = "";

    cartProducts.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row"><img src="${product.image}" class="cart-product-img" alt="product image" width="50"></th>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td class=""><button class="btn btn-danger btn-remove-cart" data-product-id="${product.id}">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });
};
const listenRemoveCartItem = (productData, cartItems, sessionId) => {
    document
        .querySelector(".cart-table-body")
        .addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-remove-cart")) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "The product will be removed from the cart!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, remove it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        const productId = e.target.dataset.productId;

                        cartItems.products = cartItems.products.filter(
                            (id) => id !== productId,
                        );

                        const usersCarts =
                            JSON.parse(localStorage.getItem("usersCarts")) ||
                            [];
                        usersCarts[sessionId] = cartItems;

                        console.log(usersCarts);

                        localStorage.setItem(
                            "usersCarts",
                            JSON.stringify(usersCarts),
                        );

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been removed.",
                            icon: "success",
                        }).then(async () => {
                            await loadNavbar();
                            renderCartProducts(productData, cartItems);
                        });
                    }
                });
            }
        });
};
