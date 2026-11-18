
// Toast Notification
var toastTimer;

function showToast(message) {
    var toast = document.getElementById("toast");

    if (toast) {
        toast.innerText = message;
        toast.style.display = "block";

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function() {
            toast.style.display = "none";
        }, 8000);
    }
}


// Smooth Scrolling
function scrollToBooking() {
    var booking = document.getElementById("booking");

    if (booking) {
        booking.scrollIntoView({
            behavior: "smooth"
        });

        showToast("Opening booking section!");
    }
}

window.onload = function() {
    if (window.location.hash === "#booking") {
        setTimeout(scrollToBooking, 300);
    }
};


// Activity 8: Hamburger Menu
var menuToggle = document.getElementById("menuToggle");
var navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("open");

        var isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.innerText = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerText = "☰";
        });
    });
}


// Activity 8: Team Filter
var teamFilter = document.getElementById("team");
var matchCards = document.querySelectorAll(".match-card");
var noMatches = document.getElementById("noMatches");

if (teamFilter) {
    teamFilter.addEventListener("change", function() {
        var selectedTeam = teamFilter.value;
        var visibleCount = 0;

        matchCards.forEach(function(card) {
            var teams = card.dataset.teams.split(" ");

            if (
                selectedTeam === "all" ||
                teams.includes(selectedTeam)
            ) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noMatches) {
            noMatches.hidden = visibleCount !== 0;
        }
    });
}


// Activity 8: Grid and List View
var gridButton = document.getElementById("gridView");
var listButton = document.getElementById("listView");
var matchContainer = document.getElementById("matchContainer");

if (gridButton && listButton && matchContainer) {

    gridButton.addEventListener("click", function() {
        matchContainer.classList.remove("list-view");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");

        showToast("Grid View Enabled!");
    });

    listButton.addEventListener("click", function() {
        matchContainer.classList.add("list-view");

        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");

        showToast("List View Enabled!");
    });
}


// Activity 7: Booking Summary
var matchSelect = document.getElementById("match");
var standSelect = document.getElementById("stand");
var ticketInput = document.querySelector("#tickets");

var prices = {
    "CSK vs MI": {
        General: 800,
        Premium: 1500,
        VIP: 3000
    },

    "RCB vs KKR": {
        General: 900,
        Premium: 1800,
        VIP: 3500
    },

    "MI vs RR": {
        General: 700,
        Premium: 1400,
        VIP: 2800
    }
};

function updateSummary() {
    var match = matchSelect.value;
    var stand = standSelect.value;
    var quantity = Number(ticketInput.value);

    var price = 0;

    if (match && stand && prices[match]) {
        price = prices[match][stand] || 0;
    }

    var validQuantity =
        ticketInput.value !== "" &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 10;

    var total = validQuantity ? price * quantity : 0;

    document.getElementById("summaryMatch").innerText =
        match || "Not Selected";

    document.getElementById("summaryStand").innerText =
        stand || "Not Selected";

    document.getElementById("summaryPrice").innerText = price;

    document.getElementById("summaryQuantity").innerText =
        validQuantity ? quantity : 0;

    document.getElementById("summaryTotal").innerText = total;

    if (match && stand && validQuantity) {
        showToast("Booking Summary Updated!");
    }
}

if (matchSelect && standSelect && ticketInput) {
    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    ticketInput.addEventListener("change", updateSummary);

    updateSummary();
}


// Activity 5: Booking Form Submission
var bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        bookingForm.style.display = "none";
        document.getElementById("summary").style.display = "none";
        document.getElementById("confirmation").style.display = "block";

        showToast("Booking form submitted successfully!");
    });

    document.getElementById("bookAgain")
        .addEventListener("click", function() {
            bookingForm.reset();
            bookingForm.style.display = "block";
            document.getElementById("summary").style.display = "block";
            document.getElementById("confirmation").style.display = "none";

            updateSummary();
        });

    bookingForm.addEventListener("reset", function() {
        setTimeout(updateSummary, 0);
    });
}
