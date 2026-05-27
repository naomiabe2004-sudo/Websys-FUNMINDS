const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");


if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("su_username").value.trim();
        const pass = document.getElementById("su_password").value.trim();

        if (!user || !pass) {
            alert("Please fill in all fields.");
            return;
        }

        // Get existing accounts or start with empty object
        const accounts = JSON.parse(localStorage.getItem("accounts") || "{}");

        // Check if username already taken
        if (accounts[user]) {
            alert("Username already exists. Please choose another.");
            return;
        }

        // Save new account
        accounts[user] = pass;
        localStorage.setItem("accounts", JSON.stringify(accounts));

        // Set logged in user and signup flag for intro pages
        localStorage.setItem("loggedInUser", user);
        localStorage.setItem("fromSignup", "true");

        window.location.href = 'intro1.html';
    });
}


if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("li_username").value.trim();
        const pass = document.getElementById("li_password").value.trim();

        const accounts = JSON.parse(localStorage.getItem("accounts") || "{}");

        if (!accounts[user]) {
            alert("No account found. Please sign up first.");
            return;
        }

        if (accounts[user] === pass) {
            // Save who is currently logged in
            localStorage.setItem("loggedInUser", user);
            window.location.href = "dashboard.html";
        } else {
            alert("Wrong username or password.");
        }
    });
}