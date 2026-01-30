// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNavbar");
  const floatingLogo = document.querySelector(".floatinglogo");
  const backToUpBtn = document.getElementById("back-to-up");

  let lastScrollTop = 0;
  let idleTimeout;
  let hasInteracted = false;

  const showNavbarAndLogo = () => {
    if (hasInteracted) {
      navbar?.classList.add("navbar-visible");
    }
    floatingLogo?.classList.add("show-logo");
  };

  const hideNavbarAndLogo = () => {
    navbar?.classList.remove("navbar-visible");

    if (window.scrollY > 50) {
      floatingLogo?.classList.remove("show-logo");
    }
  };

  const resetIdleTimer = () => {
    hasInteracted = true;
    showNavbarAndLogo();
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      hideNavbarAndLogo();
    }, 1000);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const isScrolled = scrollTop > 50;

    backToUpBtn?.classList.toggle("d-none", scrollTop <= 50);

    navbar?.classList.toggle("navbar-scrolled", isScrolled);
    floatingLogo?.classList.toggle("scrolled", isScrolled);

    resetIdleTimer();

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // iOS safe
  };

  // Handle mouse movement
  const handleMouseMove = () => {
    resetIdleTimer();
  };

  floatingLogo?.classList.add("show-logo");
  navbar?.classList.remove("navbar-visible");

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);

  // WhatsApp form binding
  const waForm = whatsappFormContainer?.querySelector("form");
  if (waForm) {
    waForm.addEventListener("submit", sendWhatsAppMessage);
  }

  // Escape key closes WhatsApp form
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      whatsappFormContainer.style.display = "none";
    }
  });
});

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle WhatsApp form visibility
function toggleForm() {
  const formContainer = document.getElementById("whatsappForm");
  if (!formContainer) return;

  const isHidden = window.getComputedStyle(formContainer).display === "none";
  formContainer.style.display = isHidden ? "block" : "none";
}

// Handle WhatsApp message
function sendWhatsAppMessage(event) {
  event.preventDefault();

  const name = document.getElementById("wa_name")?.value.trim();
  const phone = document.getElementById("wa_phone")?.value.trim();
  const email = document.getElementById("wa_email")?.value.trim();
  const message = document.getElementById("wa_message")?.value.trim();
  const fullMessage = `Hello, Myself ${name}
  Email: ${email}
  Phone: ${phone}
  Message: ${message}`;

  const whatsappNumber = "41447978894";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    fullMessage
  )}`;

  window.open(whatsappURL, "_blank");

  event.target.reset?.();
  toggleForm();
}

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

var submitted = false;

function showLoader() {
  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading-btn");
  btn.disabled = true;
}

function hideLoader() {
  const btn = document.getElementById("submitBtn");
  btn.classList.remove("loading-btn");
  btn.disabled = false;
}

function formSubmitted() {
  hideLoader();
  showToast("✅ Submitted Successfully!");
  document.getElementById("contactForm").reset();
}

// Show Bootstrap toast
function showToast(message) {
  const toastEl = document.getElementById("formToast");
  const toastBody = toastEl.querySelector(".toast-body");
  toastBody.textContent = message;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// Block numbers in fields like Full Name, Country
document.querySelectorAll(".preventnum").forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[0-9]/g, ""); // remove digits
  });
});

// Allow digits + + ( ) but max 15 characters for Phone Number
document.querySelectorAll(".preventchar").forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value
      .replace(/[^0-9+()]/g, "") // keep only numbers, +, (, )
      .slice(0, 15); // enforce max length = 15
  });
});
