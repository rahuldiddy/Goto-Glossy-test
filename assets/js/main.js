/* Goto Property Management — Launching Soon
   Lightweight vanilla JS: mobile nav, scroll reveal, form, year. */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close when a link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Reset menu state if resized to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // slight stagger for grouped items
            var el = entry.target;
            setTimeout(function () { el.classList.add("in"); }, (i % 4) * 80);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form (front-end only) ---------- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form-note";

      var name = form.elements["name"];
      var email = form.elements["email"];
      var valid = name.value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

      if (!valid) {
        note.textContent = "Please enter your name and a valid email address.";
        note.classList.add("error");
        return;
      }

      // No backend — simulate a successful capture
      note.textContent = "Thanks! We'll be in touch as we get closer to launch.";
      note.classList.add("success");
      form.reset();
    });
  }
})();
