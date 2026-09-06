document.addEventListener("DOMContentLoaded", function () {
  const WHATSAPP_NUMBER = "5511945549000";

  function openWhatsApp(message) {
    const text = encodeURIComponent(message || "Olá Dani! Gostaria de informações sobre o Clube Através do Livro.");
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Delegated click handler for WhatsApp triggers
  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-whatsapp-msg]");
    if (trigger) {
      event.preventDefault();
      const message = trigger.getAttribute("data-whatsapp-msg");
      openWhatsApp(message);
      return;
    }

    const bookTrigger = event.target.closest("[data-book-join]");
    if (bookTrigger) {
      event.preventDefault();
      const bookTitle = bookTrigger.getAttribute("data-book-join") || "o próximo livro";
      openWhatsApp("Olá Dani! Quero participar da leitura conjunta de \"" + bookTitle + "\" no Clube Através do Livro.");
      return;
    }
  });

  // Mobile Navigation Menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuCloseBtn = document.getElementById("mobile-menu-close-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileBackdrop = document.getElementById("mobile-backdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove("translate-x-full");
      mobileBackdrop.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add("translate-x-full");
      mobileBackdrop.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileMenu);
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", closeMobileMenu);
  }
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  // Filter Book Cards
  const filterButtons = document.querySelectorAll(".filter-pill");
  const bookCards = document.querySelectorAll(".book-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-filter");

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active", "bg-indigo-vivid", "text-white");
        btn.classList.add("bg-white", "text-ink-muted");
      });

      this.classList.add("active", "bg-indigo-vivid", "text-white");
      this.classList.remove("bg-white", "text-ink-muted");

      bookCards.forEach(function (card) {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "";
          card.classList.remove("opacity-0", "scale-95");
          card.classList.add("opacity-100", "scale-100");
        } else {
          card.style.display = "none";
          card.classList.remove("opacity-100", "scale-100");
          card.classList.add("opacity-0", "scale-95");
        }
      });
    });
  });

  // FAQ Accordion
  const faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const parent = this.closest(".faq-item");
      const answer = parent ? parent.querySelector(".faq-answer") : null;
      const icon = this.querySelector(".faq-icon");

      const isOpen = answer && !answer.classList.contains("hidden");

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach(function (ans) {
        ans.classList.add("hidden");
      });
      document.querySelectorAll(".faq-icon").forEach(function (icn) {
        icn.classList.remove("rotate-180");
      });

      // If it was closed, open it
      if (!isOpen && answer) {
        answer.classList.remove("hidden");
        if (icon) {
          icon.classList.add("rotate-180");
        }
      }
    });
  });
});
