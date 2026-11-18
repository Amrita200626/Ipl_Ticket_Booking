
// Activity 5: Toast Notification
var toastTimer;

function showToast(message) {
    var toast = document.getElementById("toast");

    if (toast) {
        toast.innerText = message;
        toast.style.display = "block";

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function() {
            toast.style.display = "none";
        }, 3000);
    }
}


// Activity 5: Smooth Scrolling
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


// Activity 7: DOM Selectors
var matchSelect = document.getElementById("match");
var standSelect = document.getElementById("stand");
var ticketInput = document.querySelector("#tickets");


// Sample Ticket Prices
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


// Activity 7: Update Booking Summary
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


// Activity 7: Event Listeners
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

    // Book Another Ticket
    document.getElementById("bookAgain")
        .addEventListener("click", function() {
            bookingForm.reset();
            bookingForm.style.display = "block";

            document.getElementById("summary").style.display = "block";
            document.getElementById("confirmation").style.display = "none";

            updateSummary();
        });

    // Reset Summary
    bookingForm.addEventListener("reset", function() {
        setTimeout(updateSummary, 0);
    });
}
