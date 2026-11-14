
// Function to show toast notification
function showToast(message) {
    var toast = document.getElementById("toast");

    if (toast) {
        toast.innerText = message;
        toast.style.display = "block";

        setTimeout(function() {
            toast.style.display = "none";
        }, 10000);
    }
}

// Function for smooth scrolling
function scrollToBooking() {
    var booking = document.getElementById("booking");

    if (booking) {
        booking.scrollIntoView({
            behavior: "smooth"
        });

        showToast("Opening booking section!");
    }
}

// When booking page opens
window.onload = function() {
    if (window.location.hash === "#booking") {
        setTimeout(scrollToBooking, 300);
    }
};

// Booking form submission
var bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        bookingForm.style.display = "none";

        document.getElementById("confirmation").style.display = "block";

        showToast("Booking form submitted successfully!");
    });

    // Book another ticket
    document.getElementById("bookAgain")
        .addEventListener("click", function() {
            bookingForm.reset();
            bookingForm.style.display = "block";

            document.getElementById("confirmation").style.display = "none";
        });
}
