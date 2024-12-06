const getNavbar = async () => {
    const userId = localStorage.getItem("userId");
    const userCart = Utils.getUserCart(userId);
    const user = await Utils.fetchUser(userId);

    const userName = userId ? user.username : "Login";

    return `
    <nav class="navbar navbar-expand-md mb-5 shadow-sm navbar-light bg-1">
        <div class="container-fluid">
            <a class="navbar-brand" href="/index.html">Online e-comerce</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-toggler"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-toggler">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-2">
                    <li class="nav-item">
                        <a class="btn btn-outline-success d-flex align-items-center gap-2" href="/html/cart.html">
                            <i class="bi bi-cart"></i>
                            <span class="badge bg-danger">${userCart.products.length}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-success" href="/html/login.html">${userName}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`;
};

async function loadNavbar() {
    document.querySelector(".navbar-container").innerHTML = await getNavbar();

    console.log("loading navbar...");

    const navbar = document.querySelector(".navbar");
    const placeholder = document.querySelector(".navbar-placeholder");
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener("scroll", () => {
        if (window.scrollY > navbarHeight) {
            navbar.classList.add("fixed-top");
            placeholder.style.height = `${navbarHeight}px`;
        } else {
            navbar.classList.remove("fixed-top");
            placeholder.style.height = "0px";
        }
    });
}

loadNavbar();
