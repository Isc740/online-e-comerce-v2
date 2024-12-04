const Utils = {
    async loadPage(page) {
        const response = await fetch(page);
        const pageHtml = await response.text();
        document.querySelector(".template-container").innerHTML = pageHtml;
    },

    async fetchProducts(offset = 1, limit = 1) {
        const response = await fetch(
            `https://fakestoreapi.com/products?limit=${limit}&offset=${offset}`,
        );
        const data = await response.json();
        return offset === 1 && limit === 1 ? data[0] : data;
    },

    listenCardClick(targets) {
        targets.forEach((target) => {
            target.addEventListener("click", () => {
                const productId = target.parentNode.parentNode.getAttribute("data-id");
                window.location.href = `/html/details.html?id=${productId}`;
            });
        });
    },

    getProductCard: (item) => `
        <div class="card product-card" style="width: 18rem;" data-id="${item.id}">
          <div class="fluid d-flex justify-content-center">
            <img src="${item.image}" class="single-product-trigger product-img fluid-img card-img-top mx-auto my-4" alt="product image">
          </div>
          <div class="card-body shadow-sm">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <button class="btn btn-primary product-btn w-100 single-product-trigger">View product</button>
          </div>
          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item text-body-secondary">Rating: ${item.rating.rate}</li>
            <li class="list-group-item text-body-secondary">Amount Bought: ${item.rating.count}</li>
            <li class="list-group-item text-success">Price: <strong>${item.price}</strong></li>
          </ul>
        </div>
    `,
};
