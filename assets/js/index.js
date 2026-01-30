// Testimonial Script
const swiper = new Swiper(".testimonial-swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
});

const videoModal = document.getElementById("propertyVideoModal");
const videoFrame = document.getElementById("propertyVideo");

// On button click → open modal with correct video
document.querySelectorAll(".explore-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const videoUrl = this.getAttribute("data-video") + "?autoplay=1";
    videoFrame.src = videoUrl;
    const modal = new bootstrap.Modal(videoModal);
    modal.show();
  });
});

// Stop video when modal closes
videoModal.addEventListener("hidden.bs.modal", () => {
  videoFrame.src = "";
});
