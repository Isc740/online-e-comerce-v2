const Utils = {
    async loadPage(page) {
        const response = await fetch(page);
        const pageHtml = await response.text();
        document.querySelector(".template-container").innerHTML = pageHtml;
    },

    async fetchProducts(offset = 1, limit = 20) {
        const response = await fetch(
            `https://fakestoreapi.com/products?limit=${limit}&offset=${offset}`,
        );
        const data = await response.json();
        return data;
    },

    async fetchProduct(id) {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        return data;
    },

    getUserCart(id) {
        const localCarts = JSON.parse(localStorage.getItem("usersCarts"));
        for (cart of localCarts) {
            if (cart.userId === id) {
                return cart;
            }
        }
        return { userId: id, products: [] };
    },

    async fetchUsers() {
        try {
            const response = await fetch(`https://fakestoreapi.com/users`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async fetchUser(id) {
        try {
            const response = await fetch(`https://fakestoreapi.com/users/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    },

    listenCardClick(targets) {
        targets.forEach((target) => {
            target.addEventListener("click", () => {
                const productId =
                    target.parentNode.parentNode.getAttribute("data-id");
                window.location.href = `/html/details.html?id=${productId}`;
            });
        });
    },

    getProductCard: (item) => `
        <div class="card product-card d-flex flex-column shadow" style="width: 19rem;" data-id="${item.id}">
          <div class="fluid d-flex justify-content-center">
            <img src="${item.image}" class="single-product-trigger product-img fluid-img card-img-top mx-auto my-4" alt="product image">
          </div>
          <div class="container">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-body shadow-sm d-flex flex-column justify-content-end my-2">
            <p class="card-text mb-0">Rating: ${item.rating.rate}</p>
            <p class="card-text text-body-secondary m-0">Amount Bought: ${item.rating.count}</p>
            <p class="card-text text-success mt-0 mb-3">Price: <strong>${item.price}</strong></p>
            <button class="btn btn-primary product-btn w-100 single-product-trigger">View product</button>
          </div>
        </div>
    `,
};
