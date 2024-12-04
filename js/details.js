const form = document.querySelector(".needs-validation");

let usersData;
async function loadUsersData() {
    usersData = await Utils.fetchUsers();
}

loadUsersData();

form.addEventListener(
    "submit",
    async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
        }
        form.classList.add("was-validated");

        const password = document.querySelector(".password").value;
        const email = document.querySelector(".email").value;

        for (user of usersData) {
            if (user.email === email && user.password === password) {
                alert("logged in!");
                localStorage.setItem("userId", user.id);
            }
        }
    },
    false,
);
