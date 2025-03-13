document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById("signUpButton");
    const signInButton = document.getElementById("signInButton");
    const signInForm = document.getElementById("signIn");
    const signUpForm = document.getElementById("signup");

    if (!signUpButton || !signInButton || !signInForm || !signUpForm) {
        console.error("One or more form elements not found!");
        return;
    }

    signUpButton.addEventListener("click", function () {
        toggleForms("signup");
    });

    signInButton.addEventListener("click", function () {
        toggleForms("signIn");
    });

    function toggleForms(formType) {
        if (formType === "signup") {
            signInForm.style.display = "none";
            signUpForm.style.display = "block";
        } else {
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
        }
    }
});