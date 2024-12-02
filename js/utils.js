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

    getProductCard(item) { return `
        <div class="card" style="width: 18rem;">
          <div class="fluid">
            <img src="${item.image}" class="product-img card-img-top mx-auto my-4" alt="product image">
          </div>
          <div class="card-body shadow-sm">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <div class="justify-content-center d-flex">
              <a class="btn btn-primary product-btn">View product</a>
            </div>
          </div>
          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item text-body-secondary">Rating: ${item.rating.rate}</li>
            <li class="list-group-item text-body-secondary">Amount Bought: ${item.rating.count}</li>
            <li class="list-group-item text-success">Price: <strong>${item.price}</strong></li>
          </ul>
        </div>
`}
};
