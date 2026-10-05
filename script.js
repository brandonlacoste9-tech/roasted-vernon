/* Roasted — age gate (19+), mobile nav, scroll reveals */
(function () {
  "use strict";

  /* ----- 19+ age gate ----- */
  var KEY = "roasted_age_ok";
  var gate = document.getElementById("age-gate");

  function lock() {
    if (gate) gate.classList.add("open");
    document.body.classList.add("locked");
  }
  function unlock() {
    if (gate) gate.classList.remove("open");
    document.body.classList.remove("locked");
  }
  function verified() {
    try {
      return window.localStorage.getItem(KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  if (gate) {
    if (verified()) {
      unlock();
    } else {
      lock();
    }
    var yes = document.getElementById("age-yes");
    var no = document.getElementById("age-no");
    if (yes) {
      yes.addEventListener("click", function () {
        try {
          window.localStorage.setItem(KEY, "1");
        } catch (e) {}
        unlock();
      });
    }
    if (no) {
      no.addEventListener("click", function () {
        var q = document.getElementById("age-question");
        var d = document.getElementById("age-denied");
        if (q) q.hidden = true;
        if (d) d.hidden = false;
      });
    }
  }

  /* ----- Mobile nav ----- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ----- Dave's not here audio ----- */
  var daveBtn = document.getElementById("dave-btn");
  var daveAudio = document.getElementById("dave-audio");
  if (daveBtn && daveAudio) {
    daveBtn.addEventListener("click", function () {
      if (daveAudio.paused) {
        daveAudio.play();
        daveBtn.textContent = "⏸️ Shhh… Dave's still not here";
      } else {
        daveAudio.pause();
        daveAudio.currentTime = 0;
        daveBtn.textContent = "🔊 Dave's not here, man";
      }
    });
    daveAudio.addEventListener("ended", function () {
      daveBtn.textContent = "🔊 Dave's not here, man";
    });
  }

  /* ----- Scroll reveals ----- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
