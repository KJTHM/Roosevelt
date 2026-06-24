/* Bright Harbor Foundation — shared interactions (vanilla JS) */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close menu when a link is tapped (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Animate any progress bars into view */
  var bars = document.querySelectorAll(".progress__bar[data-fill]");
  if (bars.length) {
    var fill = function () {
      bars.forEach(function (bar) {
        bar.style.width = bar.getAttribute("data-fill") + "%";
      });
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { fill(); obs.disconnect(); }
        });
      }, { threshold: 0.4 });
      bars.forEach(function (b) { io.observe(b); });
    } else {
      fill();
    }
  }

  /* Donation amount picker (placeholder — no payment processor wired yet) */
  var picker = document.querySelector(".amount-picker");
  if (picker) {
    var output = document.getElementById("selected-amount");
    picker.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      picker.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      if (output) output.textContent = btn.getAttribute("data-amount");
    });
  }

  var donateBtn = document.getElementById("donate-action");
  if (donateBtn) {
    donateBtn.addEventListener("click", function () {
      var amt = document.getElementById("selected-amount");
      var val = amt ? amt.textContent : "your gift";
      alert(
        "Thank you for your generosity!\n\n" +
        "This is a placeholder. A secure payment processor (such as Stripe, " +
        "PayPal Giving, or your donation platform of choice) will be connected here.\n\n" +
        "Selected gift: $" + val
      );
    });
  }
})();
