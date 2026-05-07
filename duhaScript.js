
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  // Show button only after scrolling down 300px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


//hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.innerHTML = isOpen ? "✕" : "☰";
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.innerHTML = "☰";
      hamburger.setAttribute("aria-expanded", false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      hamburger.innerHTML = "☰";
      hamburger.setAttribute("aria-expanded", false);
    }
  });
}

// scroll reveal animations
const revealElements = document.querySelectorAll(
  ".hero, .menu-item, .about p, .contact ul, .contact p, .extras, .about h2, .contact h2, .menu h2"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});


// Stagger menu item animations
const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

// Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fields = {
    name:    { el: document.getElementById("name"),    msg: document.getElementById("nameError") },
    email:   { el: document.getElementById("email"),   msg: document.getElementById("emailError") },
    phone:   { el: document.getElementById("phone"),   msg: document.getElementById("phoneError") },
    message: { el: document.getElementById("message"), msg: document.getElementById("messageError") },
  };

  function showError(field, text) {
    field.el.classList.add("input-error");
    field.msg.textContent = text;
    field.msg.style.display = "block";
  }

  function clearError(field) {
    field.el.classList.remove("input-error");
    field.msg.style.display = "none";
  }

  // Live validation on blur
  Object.values(fields).forEach((field) => {
    field.el.addEventListener("blur", () => validateField(field));
    field.el.addEventListener("input", () => {
      if (field.el.classList.contains("input-error")) validateField(field);
    });
  });

  function validateField(field) {
    const val = field.el.value.trim();
    const id  = field.el.id;

    if (!val) {
      showError(field, "This field is required.");
      return false;
    }
    if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showError(field, "Please enter a valid email address.");
      return false;
    }
    if (id === "phone" && !/^[0-9+\s\-()]{7,15}$/.test(val)) {
      showError(field, "Please enter a valid phone number.");
      return false;
    }
    if (id === "message" && val.length < 10) {
      showError(field, "Message must be at least 10 characters.");
      return false;
    }
    clearError(field);
    return true;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const allValid = Object.values(fields).every(validateField);

    if (allValid) {
      // Show success message
      const successMsg = document.getElementById("formSuccess");
      contactForm.style.display = "none";
      successMsg.style.display  = "block";
    }
  });
}

// Header scroll effect
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
