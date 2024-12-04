const form = document.querySelector(".needs-validation");

let usersData;
async function loadUsersData() {
    usersData = await Utils.fetchUsers();
}

loadUsersData();

form.addEventListener("input", (e) => {
    if (!form.checkValidity()) {
        e.stopPropagation();
    }
    form.classList.add("was-validated");
});

form.addEventListener(
    "submit",
    async (e) => {
        e.preventDefault();

        const password = document.querySelector(".password").value;
        const email = document.querySelector(".email").value;

        for (user of usersData) {
            if (user.email === email && user.password === password) {
                localStorage.setItem("userId", user.id);
                window.location.href = "/html/cart.html"
            }
        }
    },
    false,
);
