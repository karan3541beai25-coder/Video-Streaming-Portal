/* =====================================================
                    GLOBAL VARIABLES
===================================================== */

let isLoggedIn = false;

let currentCaptcha = "";

let myList = [];


/* =====================================================
                    PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const savedLogin =
        localStorage.getItem("locoflixLoggedIn");

    const savedName =
        localStorage.getItem("locoflixName");


    if (savedLogin === "true") {

        isLoggedIn = true;

    }


    if (savedName) {

        const profileName =
            document.getElementById("profileName");

        if (profileName) {

            profileName.textContent = savedName;

        }

    }


    generateCaptcha();

});



/* =====================================================
                    LOGIN
===================================================== */

function openLogin() {

    closeSignup();

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.showModal();

    document.body.classList.add("modal-open");

    generateCaptcha();

}


function closeLogin() {

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.close();

    document.body.classList.remove("modal-open");

}


/* =====================================================
                SIGNUP
===================================================== */

function openSignup() {

    closeLogin();

    const modal =
        document.getElementById("signupModal");

    if (!modal) return;

    modal.showModal();

    document.body.classList.add("modal-open");

}


function closeSignup() {

    const modal =
        document.getElementById("signupModal");

    if (!modal) return;

    if (modal.open) {

        modal.close();

    }

}


function switchToSignup() {

    closeLogin();

    openSignup();

}


function switchToLogin() {

    closeSignup();

    openLogin();

}


/* =====================================================
                    CAPTCHA
===================================================== */

function generateCaptcha() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let captcha = "";


    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        captcha +=
            characters[randomIndex];

    }


    currentCaptcha = captcha;


    const captchaText =
        document.getElementById("captchaText");


    if (captchaText) {

        captchaText.textContent =
            captcha;

    }

}


/* =====================================================
                LOGIN VALIDATION
===================================================== */

function loginUser(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const captchaInput =
        document
            .getElementById("captchaInput")
            .value
            .trim()
            .toUpperCase();


    if (!email || !password || !captchaInput) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    if (captchaInput !== currentCaptcha) {

        alert(
            "Incorrect CAPTCHA. Please try again."
        );

        generateCaptcha();

        document
            .getElementById("captchaInput")
            .value = "";

        return;

    }


    isLoggedIn = true;


    localStorage.setItem(
        "locoflixLoggedIn",
        "true"
    );


    let savedName =
        localStorage.getItem("locoflixName");


    if (!savedName) {

        savedName = "LocoFlix User";

    }


    localStorage.setItem(
        "locoflixEmail",
        email
    );


    closeLogin();


    showStreamingPage();


    alert(
        "Login successful! Welcome to LocoFlix."
    );

    localStorage.setItem("loggedInUser", JSON.stringify({
    name: localStorage.getItem("locoflixName") || "LocoFlix User",
    email: email
}));

}

function updateProfile() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const nameElement = document.getElementById("profileName");
    const emailElement = document.getElementById("profileEmail");
    const statusElement = document.getElementById("profileStatus");

    if (user) {

        nameElement.textContent = user.name;
        emailElement.textContent = user.email;
        statusElement.textContent = "Premium Member";

    } else {

        nameElement.textContent = "LocoFlix User";
        emailElement.textContent = "Not logged in";
        statusElement.textContent = "Guest";

    }
}

/* =====================================================
                REGISTER
===================================================== */

function registerUser(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    if (!name || !email || !password) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    localStorage.setItem(
        "locoflixName",
        name
    );


    localStorage.setItem(
        "locoflixEmail",
        email
    );


    localStorage.setItem(
        "locoflixLoggedIn",
        "true"
    );


    isLoggedIn = true;


    const profileName =
        document.getElementById("profileName");


    if (profileName) {

        profileName.textContent = name;

    }


    closeSignup();


    showStreamingPage();


    alert(
        "Account created successfully! Welcome " +
        name + "."
    );

}


/* =====================================================
                FORGOT PASSWORD
===================================================== */

function forgotPassword() {

    const email =
        prompt(
            "Enter your registered email address:"
        );


    if (!email) {

        return;

    }


    alert(
        "If this email is registered, a password reset " +
        "link would be sent here.\n\n" +
        "This feature is for demonstration in the " +
        "first evaluation."
    );

}


/* =====================================================
                PROTECTED NAVIGATION
===================================================== */

function protectedNavigation(event) {

    if (event) {

        event.preventDefault();

    }


    if (!isLoggedIn) {

        openLogin();

        return;

    }


    showStreamingPage();

}


/* =====================================================
                SHOW STREAMING PAGE
===================================================== */

function showStreamingPage() {

    const homePage =
        document.getElementById("homePage");


    const streamingPage =
        document.getElementById("streamingPage");


    if (homePage) {

        homePage.classList.add("hidden");

    }


    if (streamingPage) {

        streamingPage.classList.remove("hidden");

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =====================================================
                    LOGOUT
===================================================== */

function logout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {

        return;

    }


    isLoggedIn = false;


    localStorage.removeItem(
        "locoflixLoggedIn"
    );


    localStorage.removeItem(
        "locoflixEmail"
    );


    localStorage.removeItem(
        "locoflixName"
    );


    const streamingPage =
        document.getElementById("streamingPage");


    const homePage =
        document.getElementById("homePage");


    if (streamingPage) {

        streamingPage.classList.add("hidden");

    }


    if (homePage) {

        homePage.classList.remove("hidden");

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    alert(
        "You are successfully logged out."
    );

}


/* =====================================================
                    MOBILE MENU
===================================================== */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");


    if (!menu) return;


    menu.classList.toggle("active");

}


/* =====================================================
                STREAM MENU
===================================================== */

function toggleStreamMenu() {

    const links =
        document.getElementById("streamLinks");


    if (!links) return;


    links.classList.toggle("active");

}


/* =====================================================
                SEARCH MOVIES
===================================================== */

function searchMovies() {
    const inputElement = document.getElementById("searchInput");
    const searchSection = document.getElementById("searchSection");
    const searchResults = document.getElementById("searchResults");

    if (!inputElement || !searchSection || !searchResults) return;

    const query = inputElement.value.trim().toLowerCase();

    if (!query) {
        searchSection.classList.add("hidden");
        searchResults.replaceChildren();
        return;
    }

    // Search the original movie cards only, never the cloned search results.
    const cards = Array.from(document.querySelectorAll(
        "#streamingPage .movie-card, #streamingPage .preview-card, .movie-card, .preview-card"
    )).filter(card => !card.closest("#searchResults"));

    searchResults.replaceChildren();
    const seen = new Set();

    cards.forEach(card => {
        const heading = card.querySelector("h3, h2, .movie-title");
        const image = card.querySelector("img");
        const title = (card.dataset.title || heading?.textContent || image?.alt || "")
            .replace(/\s+/g, " ").trim();
        const normalizedTitle = title.toLowerCase();

        if (!title || !normalizedTitle.includes(query) || seen.has(normalizedTitle)) return;
        seen.add(normalizedTitle);

        const clone = card.cloneNode(true);
        clone.dataset.title = title;
        clone.style.display = "";
        searchResults.appendChild(clone);
    });

    searchSection.classList.remove("hidden");

    if (seen.size === 0) {
        searchResults.innerHTML = `
            <div class="empty-list">
                <i class="fa-solid fa-film"></i>
                <h3>Nothing matches</h3>
                <p>We couldn't find a movie matching "${escapeSearchText(query)}".</p>
            </div>`;
    }
}

function escapeSearchText(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

/* =====================================================
                MOVIE SLIDERS
===================================================== */

function slideLeft(id) {

    const slider =
        document.getElementById(id);


    if (!slider) return;


    slider.scrollBy({
        left: -500,
        behavior: "smooth"
    });

}


function slideRight(id) {

    const slider =
        document.getElementById(id);


    if (!slider) return;


    slider.scrollBy({
        left: 500,
        behavior: "smooth"
    });

}


/* =====================================================
                    WATCH MOVIE
===================================================== */

function watchMovie(movieName) {

    if (!isLoggedIn) {

        openLogin();

        return;

    }


    alert(
        "▶ Now playing: " +
        movieName +
        "\n\n" +
        "A video player can be connected " +
        "to this button in the next project phase."
    );

}


/* =====================================================
                    MY LIST
===================================================== */

function addToMyList(movieName) {

    if (!isLoggedIn) {

        openLogin();

        return;

    }


    if (
        myList.includes(movieName)
    ) {

        alert(
            movieName +
            " is already in your My List."
        );

        return;

    }


    myList.push(movieName);


    renderMyList();


    alert(
        movieName +
        " has been added to My List."
    );

}


function renderMyList() {

    const container = document.getElementById("myListContainer");

    if (!container) return;

    if (myList.length === 0) {

        container.innerHTML = `
            <div class="empty-list">
                <i class="fa-solid fa-bookmark"></i>
                <h3>Your list is empty</h3>
                <p>Add movies using the + button.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    myList.forEach(function (movie) {

        const card = document.createElement("article");

        card.className = "movie-card";

        card.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                text-align:center;
                padding:20px;
                background:linear-gradient(135deg,#300808,#111);
            ">

                <div>

                    <i class="fa-solid fa-film" style="
                        color:#e50914;
                        font-size:35px;
                        margin-bottom:15px;
                    "></i>

                    <h3>${movie}</h3>

                    <button
                        class="wishlist-watch-button"
                        style="
                            margin-top:15px;
                            padding:8px 14px;
                            border:0;
                            border-radius:4px;
                            cursor:pointer;
                        "
                    >
                        <i class="fa-solid fa-play"></i>
                        Watch
                    </button>

                    <button
                        class="wishlist-remove-button"
                        style="
                            margin-top:10px;
                            padding:8px 14px;
                            border:0;
                            border-radius:4px;
                            background:#e50914;
                            color:white;
                            cursor:pointer;
                        "
                    >
                        <i class="fa-solid fa-trash"></i>
                        Remove
                    </button>

                </div>

            </div>
        `;

        // Watch button
        card.querySelector(".wishlist-watch-button")
            .addEventListener("click", function () {
                watchMovie(movie);
            });

        // Remove button
        card.querySelector(".wishlist-remove-button")
            .addEventListener("click", function () {
                removeFromMyList(movie);
            });

        container.appendChild(card);

    });

}

function removeFromMyList(movieName) {

    const confirmation = confirm(
        "Are you sure you want to remove " +
        movieName +
        " from My List?"
    );

    if (!confirmation) {
        return;
    }

    myList = myList.filter(function (movie) {
        return movie !== movieName;
    });

    renderMyList();

    alert(movieName + " has been removed from My List.");

}


/* =====================================================
                NOTIFICATIONS
===================================================== */

function toggleNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const profile =
        document.getElementById(
            "profilePanel"
        );


    if (profile) {

        profile.classList.remove(
            "active"
        );

    }


    if (panel) {

        panel.classList.toggle(
            "active"
        );

    }

}


/* =====================================================
                    PROFILE
===================================================== */
function toggleProfile() {

    updateProfile();

    const panel = document.getElementById("profilePanel");

    panel.classList.toggle("show");
}


/* =====================================================
                    PREMIUM
===================================================== */

let selectedPremiumPlan = null;
let paymentProcessing = false;
let checkoutDialog = null;
let successDialog = null;

const premiumPlanDetails = {
    Monthly: { price: 149, billing: "per month" },
    Yearly: { price: 999, billing: "per year" },
    Lifetime: { price: 2999, billing: "One time" }
};

function getPremiumStorageKey() {
    return "locoflixPremium_" + (localStorage.getItem("locoflixEmail") || "guest").toLowerCase();
}
function getActivePremium() {
    try { return JSON.parse(localStorage.getItem(getPremiumStorageKey()) || "null"); }
    catch (error) { return null; }
}
function openPremium() {
    const modal = document.getElementById("premiumModal");
    if (!modal) return;
    if (!modal.open) modal.showModal();
    document.body.classList.add("modal-open");
    refreshPremiumStatus();
}
function closePremium() {
    const modal = document.getElementById("premiumModal");
    if (modal && modal.open) modal.close();
    if (!(checkoutDialog && checkoutDialog.open) && !(successDialog && successDialog.open)) document.body.classList.remove("modal-open");
}
function choosePlan(plan) {
    const details = premiumPlanDetails[plan];
    if (!details) return;
    const active = getActivePremium();
    if (active && active.active && active.plan === plan) {
        showInlinePremiumMessage("This plan is already active.");
        return;
    }
    selectedPremiumPlan = { name: plan, price: details.price, billing: details.billing };
    ensureCheckoutDialog();
    renderCheckout();
    closePremium();
    checkoutDialog.showModal();
    document.body.classList.add("modal-open");
}
function showInlinePremiumMessage(message) {
    const box = document.querySelector(".premium-modal-box");
    if (!box) return;
    let notice = document.getElementById("premiumInlineNotice");
    if (!notice) {
        notice = document.createElement("p");
        notice.id = "premiumInlineNotice";
        notice.className = "premium-inline-notice";
        box.appendChild(notice);
    }
    notice.textContent = message;
}
function ensureCheckoutDialog() {
    if (checkoutDialog) return;
    checkoutDialog = document.createElement("dialog");
    checkoutDialog.id = "checkoutDialog";
    checkoutDialog.className = "modal-dialog checkout-dialog";
    checkoutDialog.innerHTML = `
      <section class="checkout-box">
        <button type="button" class="close-modal" aria-label="Close checkout" data-close-checkout><i class="fa-solid fa-xmark"></i></button>
        <p class="section-label">LOCOFLIX PREMIUM</p><h2>Complete Your Purchase</h2>
        
        <div class="checkout-summary" id="checkoutSummary"></div>
        <form id="checkoutForm" novalidate>
          <fieldset class="payment-methods"><legend>Choose payment method</legend>
            <label><input type="radio" name="paymentMethod" value="UPI" checked> UPI</label>
            <label><input type="radio" name="paymentMethod" value="Card"> Debit/Credit Card</label>
            <label><input type="radio" name="paymentMethod" value="Net Banking"> Net Banking</label>
          </fieldset>
          <div id="paymentFields"></div><p id="paymentError" class="payment-error" role="alert"></p>
          <div class="checkout-actions"><button type="button" class="secondary-button" id="checkoutBack">Back</button><button type="submit" class="primary-button" id="proceedPayment">Proceed to Payment</button></div>
        </form>
      </section>`;
    document.body.appendChild(checkoutDialog);

    successDialog = document.createElement("dialog");
    successDialog.id = "paymentSuccessDialog";
    successDialog.className = "modal-dialog checkout-dialog";
    successDialog.innerHTML = `
      <section class="checkout-box success-box">
        <button type="button" class="close-modal" aria-label="Close success screen" data-close-success><i class="fa-solid fa-xmark"></i></button>
        <div class="success-check"><i class="fa-solid fa-check"></i></div><h2>Payment Successful!</h2>
        <p>Your LocoFlix Premium plan is now active.</p><div id="successSummary" class="checkout-summary"></div>
        <div class="checkout-actions"><button type="button" class="secondary-button" id="viewMyPremium">View My Premium</button><button type="button" class="primary-button" id="startWatching">Start Watching</button></div>
      </section>`;
    document.body.appendChild(successDialog);

    checkoutDialog.addEventListener("click", e => { if (e.target === checkoutDialog) closeCheckout(); });
    checkoutDialog.addEventListener("cancel", e => { e.preventDefault(); if (!paymentProcessing) closeCheckout(); });
    successDialog.addEventListener("click", e => { if (e.target === successDialog) closeSuccess(); });
    successDialog.addEventListener("cancel", e => { e.preventDefault(); closeSuccess(); });
    checkoutDialog.querySelector("[data-close-checkout]").addEventListener("click", closeCheckout);
    successDialog.querySelector("[data-close-success]").addEventListener("click", closeSuccess);
    checkoutDialog.querySelector("#checkoutBack").addEventListener("click", () => { checkoutDialog.close(); openPremium(); });
    checkoutDialog.querySelectorAll('input[name="paymentMethod"]').forEach(input => input.addEventListener("change", renderPaymentFields));
    checkoutDialog.querySelector("#checkoutForm").addEventListener("submit", processDemoPayment);
    successDialog.querySelector("#startWatching").addEventListener("click", () => { closeSuccess(); closePremium(); closeCheckout(); });
    successDialog.querySelector("#viewMyPremium").addEventListener("click", () => { closeSuccess(); openPremium(); showActivePremiumDetails(); });
}
function renderCheckout() {
    if (!checkoutDialog || !selectedPremiumPlan) return;
    checkoutDialog.querySelector("#checkoutSummary").innerHTML = `
      <div><span>Selected plan</span><strong>${selectedPremiumPlan.name} Premium</strong></div>
      <div><span>Billing</span><strong>${selectedPremiumPlan.billing}</strong></div>
      <div class="checkout-total"><span>Total</span><strong>₹${selectedPremiumPlan.price}</strong></div>`;
    const active = getActivePremium();
    const proceed = checkoutDialog.querySelector("#proceedPayment");
    proceed.disabled = !!(active && active.active && active.plan === selectedPremiumPlan.name);
    proceed.textContent = proceed.disabled ? "Plan Already Active" : "Proceed to Payment";
    checkoutDialog.querySelector("#paymentError").textContent = "";
    renderPaymentFields();
}
function renderPaymentFields() {
    if (!checkoutDialog) return;
    const method = checkoutDialog.querySelector('input[name="paymentMethod"]:checked')?.value || "UPI";
    const fields = checkoutDialog.querySelector("#paymentFields");
    checkoutDialog.querySelector("#paymentError").textContent = "";
    if (method === "UPI") {
        fields.innerHTML = `<label for="demoUpi">UPI ID</label><input id="demoUpi" autocomplete="off" placeholder="demo@upi"><small>Use a demonstration ID such as demo@upi.</small>`;
    } else if (method === "Card") {
        fields.innerHTML = `<label for="demoCardName">Cardholder name</label><input id="demoCardName" autocomplete="off" placeholder="Demo User">
          <label for="demoCardNumber">Card number</label><input id="demoCardNumber" inputmode="numeric" autocomplete="off" placeholder="1234 5678 9012 3456" maxlength="23">
          <div class="payment-field-row"><div><label for="demoExpiry">Expiry date</label><input id="demoExpiry" autocomplete="off" placeholder="MM/YY" maxlength="5"></div><div><label for="demoCvv">CVV</label><input id="demoCvv" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4"></div></div>
          <small>Demo only: use fictional details. Payment fields are not saved.</small>`;
    } else {
        fields.innerHTML = `<label for="demoBank">Select bank</label><select id="demoBank"><option value="">Choose a demonstration bank</option><option>Demo Bank A</option><option>Demo Bank B</option><option>Demo Bank C</option></select>`;
    }
}
function processDemoPayment(event) {
    event.preventDefault();
    if (paymentProcessing || !selectedPremiumPlan) return;
    const method = checkoutDialog.querySelector('input[name="paymentMethod"]:checked')?.value;
    let valid = false;
    if (method === "UPI") {
        valid = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(checkoutDialog.querySelector("#demoUpi")?.value.trim() || "");
    } else if (method === "Card") {
        const name = checkoutDialog.querySelector("#demoCardName")?.value.trim() || "";
        const number = (checkoutDialog.querySelector("#demoCardNumber")?.value || "").replace(/\s/g, "");
        const expiry = checkoutDialog.querySelector("#demoExpiry")?.value.trim() || "";
        const cvv = checkoutDialog.querySelector("#demoCvv")?.value.trim() || "";
        valid =
    name.length >= 2 &&
    /^\d{13,19}$/.test(number) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvv);
    } else if (method === "Net Banking") {
        valid = !!checkoutDialog.querySelector("#demoBank")?.value;
    }
    const error = checkoutDialog.querySelector("#paymentError");
    if (!valid) {
        error.textContent = method === "UPI" ? "Enter a valid demonstration UPI ID, for example demo@upi." :
            method === "Card" ? "Enter fictional demo details with a valid format for each field." : "Please select a demonstration bank.";
        return;
    }
    // Immediately discard payment fields; never store or transmit them.
    checkoutDialog.querySelector("#paymentFields").innerHTML = "";
    paymentProcessing = true;
    const checkoutBox = checkoutDialog.querySelector(".checkout-box");
    checkoutBox.querySelectorAll(":scope > *").forEach(node => node.hidden = true);
    const processingView = document.createElement("div");
    processingView.className = "processing-view";
    processingView.innerHTML = `<div class="payment-spinner"></div><h2>Processing Demo Payment...</h2><p>Please wait while we simulate your transaction.</p><p class="demo-notice">No real payment is being processed.</p>`;
    checkoutBox.appendChild(processingView);
    setTimeout(() => {
        processingView.remove();
        checkoutBox.querySelectorAll(":scope > *").forEach(node => node.hidden = false);
        paymentProcessing = false;
        const activePlan = { ...selectedPremiumPlan, active: true,
            transactionId: "LFX-DEMO-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
            purchaseDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) };
        localStorage.setItem(getPremiumStorageKey(), JSON.stringify(activePlan));
        checkoutDialog.close();
        document.body.classList.remove("modal-open");
        showPaymentSuccess(activePlan);
        refreshPremiumStatus();
    }, 2000);
}
function showPaymentSuccess(activePlan) {
    ensureCheckoutDialog();
    successDialog.querySelector("#successSummary").innerHTML = `
      <div><span>Plan</span><strong>${activePlan.name} Premium</strong></div>
      <div><span>Price</span><strong>₹${activePlan.price}</strong></div>
      <div><span>Billing</span><strong>${activePlan.billing}</strong></div>
      <div><span>Demo transaction ID</span><strong>${activePlan.transactionId}</strong></div>
      <div><span>Purchase date</span><strong>${activePlan.purchaseDate}</strong></div>`;
    successDialog.showModal();
    document.body.classList.add("modal-open");
}
function closeCheckout() {
    if (checkoutDialog?.open) checkoutDialog.close();
    paymentProcessing = false;
    document.body.classList.remove("modal-open");
}
function closeSuccess() {
    if (successDialog?.open) successDialog.close();
    document.body.classList.remove("modal-open");
}
function refreshPremiumStatus() {
    const active = getActivePremium();
    const status = document.getElementById("profileStatus");
    if (status) status.textContent = active?.active ? "Active Premium Member" : "Guest";
    document.querySelectorAll("#premiumModal .plan").forEach(card => {
        const title = card.querySelector("h3")?.textContent.trim();
        const button = card.querySelector("button");
        if (!button || !title) return;
        const isActive = !!(active?.active && active.plan === title);
        button.textContent = isActive ? "Plan Active" : "Choose Plan";
        button.disabled = isActive;
    });
}
function showActivePremiumDetails() {
    const active = getActivePremium();
    if (active) showInlinePremiumMessage(`Active Premium Member • ${active.plan} • ${active.billing} • ₹${active.price}`);
}

/* =====================================================
                CONTACT FORM
===================================================== */

function submitContact(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("contactName")
            .value;


    alert(
        "Thank you, " +
        name +
        "!\n\n" +
        "Your message has been submitted successfully."
    );


    event.target.reset();

}


/* =====================================================
                SCROLL TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const button =
            document.getElementById(
                "scrollTop"
            );


        if (!button) return;


        if (
            window.scrollY > 500
        ) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }
);


function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
            CLOSE PANELS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const notification =
            document.getElementById(
                "notificationPanel"
            );


        const profile =
            document.getElementById(
                "profilePanel"
            );


        const notificationButton =
            event.target.closest(
                ".icon-button"
            );


        const profileButton =
            event.target.closest(
                ".profile-button"
            );


        if (
            notification &&
            !notification.contains(event.target) &&
            !notificationButton
        ) {

            notification.classList.remove(
                "active"
            );

        }


        if (
            profile &&
            !profile.contains(event.target) &&
            !profileButton
        ) {

            profile.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
                ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeLogin();

            closeSignup();

            closePremium();
            if (checkoutDialog && checkoutDialog.open && !paymentProcessing) closeCheckout();
            if (successDialog && successDialog.open) closeSuccess();

        }

    }
);

// DARK / LIGHT THEME
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themeToggle");

    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {
        button.textContent = "☀️ Light Mode";
        localStorage.setItem("locoflixTheme", "light");
    } else {
        button.textContent = "🌙 Dark Mode";
        localStorage.setItem("locoflixTheme", "dark");
    }
}

// Load the saved theme
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("themeToggle");

    if (!button) return;

    const savedTheme = localStorage.getItem("locoflixTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        button.textContent = "☀️ Light Mode";
    }

    button.addEventListener("click", toggleTheme);
});

/* Close the native premium dialog only when the backdrop itself is clicked. */
document.addEventListener("DOMContentLoaded", function () {
    const premiumDialog = document.getElementById("premiumModal");
    if (premiumDialog) {
        premiumDialog.addEventListener("click", function (event) {
            if (event.target === premiumDialog) closePremium();
        });
        premiumDialog.addEventListener("cancel", function (event) {
            event.preventDefault();
            closePremium();
        });
    }
    refreshPremiumStatus();
});
// Fix movie posters in the Latest Hindi section
document.addEventListener("DOMContentLoaded", function () {

    const hindiMovies = {
        "Jawan": "Jawan_(film)",
        "Pathaan": "Pathaan_(film)",
        "Animal": "Animal_(2023_Indian_film)",
        "Dangal": "Dangal_(2016_film)"
    };

    const hindiSlider = document.getElementById("hindiSlider");

    if (!hindiSlider) return;

    const movieCards = hindiSlider.querySelectorAll(".movie-card");

    movieCards.forEach(async function (card) {

        const movieName = card.dataset.title;
        const moviePage = hindiMovies[movieName];

        if (!moviePage) return;

        const image = card.querySelector("img");

        if (!image) return;

        try {
            const response = await fetch(
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + moviePage
);

            if (!response.ok) {
                throw new Error("Movie image could not be loaded");
            }

            const data = await response.json();

            if (data.thumbnail && data.thumbnail.source) {
                image.src = data.thumbnail.source;
            }

        } catch (error) {
            console.error(
                "Unable to load poster for " + movieName,
                error
            );
        }
    });
});
// Fix images in Latest Bollywood section
document.addEventListener("DOMContentLoaded", function () {

    const bollywoodSlider = document.getElementById("bollywoodSlider");

    if (!bollywoodSlider) return;

    const movieCards = bollywoodSlider.querySelectorAll(".movie-card");

    movieCards.forEach(async function (card) {

        const image = card.querySelector("img");
        const movieName = card.dataset.title || image?.alt;

        if (!image || !movieName) return;

        try {
            // Search Wikipedia for the movie
            const searchUrl =
    "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" +
    encodeURIComponent(movieName + " Indian film") +
    "&limit=5";

            const searchResponse = await fetch(searchUrl);

            if (!searchResponse.ok) {
                throw new Error("Wikipedia search failed");
            }

            const searchData = await searchResponse.json();

            if (!searchData.pages || searchData.pages.length === 0) {
                console.warn("No image found for:", movieName);
                return;
            }

            // Prefer a result whose title matches the movie name
            const movieTitle = movieName.toLowerCase();

            const matchingPage =
                searchData.pages.find(page =>
                    page.title.toLowerCase().includes(movieTitle)
                ) || searchData.pages[0];

            // Get the movie thumbnail
            const summaryResponse = await fetch(
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(matchingPage.title.replace(/ /g, "_"))
);

            if (!summaryResponse.ok) {
                throw new Error("Movie thumbnail unavailable");
            }

            const summaryData = await summaryResponse.json();

            if (summaryData.thumbnail?.source) {
                image.src = summaryData.thumbnail.source;
            }

        } catch (error) {
            console.error(
                "Could not load Bollywood image for " + movieName,
                error
            );
        }
    });

});