const navbar = document.querySelector("[data-navbar]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalImage = document.querySelector("[data-modal-image-preview]");
const modalClose = document.querySelector("[data-modal-close]");
const modalButtons = document.querySelectorAll("[data-modal-image]");
const revealItems = document.querySelectorAll(".reveal");
const heroWord = document.querySelector("[data-hero-word]");
const currentYear = document.querySelector("[data-current-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formFeedback = document.querySelector("[data-form-feedback]");
const interactiveCards = document.querySelectorAll("[data-interactive-card]");
const heroPills = document.querySelectorAll("[data-hero-pill]");

const heroWords = [
  "execução",
  "estrutura",
];
let heroIndex = 0;

const handleScroll = () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 50);
};

const toggleMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  const isOpen = !mobileMenu.hasAttribute("hidden");

  if (isOpen) {
    mobileMenu.setAttribute("hidden", "");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    return;
  }

  mobileMenu.removeAttribute("hidden");
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.setAttribute("hidden", "");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

const openModal = (title, imageSrc) => {
  if (!modal || !modalTitle || !modalImage) return;
  modalTitle.textContent = `${title} - Demonstracao`;
  modalImage.src = imageSrc;
  modalImage.alt = title;
  modal.removeAttribute("hidden");
  document.body.classList.add("modal-open");
};

const closeModalHandler = () => {
  if (!modal || !modalImage) return;
  modal.setAttribute("hidden", "");
  modalImage.src = "";
  modalImage.alt = "";
  document.body.classList.remove("modal-open");
};

const observeReveal = () => {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const animateHeroWord = () => {
  if (!heroWord) return;

  const nextWord = heroWords[heroIndex];
  heroWord.textContent = "";

  let charIndex = 0;
  const intervalId = window.setInterval(() => {
    heroWord.textContent += nextWord[charIndex];
    charIndex += 1;

    if (charIndex < nextWord.length) return;

    window.clearInterval(intervalId);
    window.setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroWords.length;
      animateHeroWord();
    }, 1400);
  }, 120);
};

const setupForm = () => {
  if (!contactForm || !formFeedback) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = (data.get("name") || "").toString().trim();
    const subject = (data.get("subject") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const whatsappMessage = encodeURIComponent(
      `Olá! Vim pelo site da Marquee Dev.%0A%0A` +
      `Nome: ${name}%0A` +
      `Assunto: ${subject}%0A%0A` +
      `Projeto:%0A${message}`
    );

    formFeedback.textContent = "Abrindo o WhatsApp para concluir o envio.";
    window.open(`https://wa.me/5551993091025?text=${whatsappMessage}`, "_blank");
  });
};

const setupInteractiveCards = () => {
  if (!interactiveCards.length) return;

  const clearActiveCards = () => {
    interactiveCards.forEach((card) => card.classList.remove("is-active"));
  };

  interactiveCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;

      const isActive = card.classList.contains("is-active");
      clearActiveCards();

      if (!isActive) {
        card.classList.add("is-active");
      }
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      const isActive = card.classList.contains("is-active");
      clearActiveCards();

      if (!isActive) {
        card.classList.add("is-active");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-interactive-card]")) return;
    clearActiveCards();
  });
};

const setupHeroPills = () => {
  if (!heroPills.length) return;

  const clearActivePills = () => {
    heroPills.forEach((pill) => pill.classList.remove("is-active"));
  };

  heroPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const isActive = pill.classList.contains("is-active");
      clearActivePills();

      if (!isActive) {
        pill.classList.add("is-active");
      }
    });

    pill.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      const isActive = pill.classList.contains("is-active");
      clearActivePills();

      if (!isActive) {
        pill.classList.add("is-active");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-hero-pill]")) return;
    clearActivePills();
  });
};

window.addEventListener("scroll", handleScroll);
handleScroll();
observeReveal();
animateHeroWord();
setupForm();
setupInteractiveCards();
setupHeroPills();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear().toString();
}

menuToggle?.addEventListener("click", toggleMenu);

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modalTitle || "Demo", button.dataset.modalImage || "");
  });
});

modalClose?.addEventListener("click", closeModalHandler);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalHandler();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModalHandler();
  }
});
