document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".navbar-container").innerHTML = getNavbar();

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
});

const getNavbar = () => `
	<nav
		class="navbar navbar-expand-md bg-body-tertiary mb-5 shadow-sm navbar-light"
		>
		<div class="container-fluid">
			<a class="navbar-brand" href="/index.html">Online e-comerce</a>
			<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbar-toggler"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbar-toggler">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="btn btn-success" href="/html/login.html">Login</a>
                    </li>
				</ul>
			</div>
		</div>
		</nav>
	`;
