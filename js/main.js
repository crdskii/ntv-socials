/* NTV Socials — shared site behavior (both pages) */
(function () {
  "use strict";

  /* ---------- Splash screen ---------- */
  var splash = document.getElementById("splash");
  if (splash) {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      splash.remove();
    } else {
      splash.addEventListener("animationend", function (e) {
        if (e.animationName === "splash-out") splash.remove();
      });
      setTimeout(function () { if (splash.parentNode) splash.remove(); }, 3500);
    }
  }

  /* ---------- Mobile menu ---------- */
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  var mq = window.matchMedia("(max-width:860px)");

  function syncMenu() {
    if (mq.matches) {
      nav.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    } else {
      nav.hidden = false;
    }
  }
  if (btn && nav) {
    syncMenu();
    if (mq.addEventListener) mq.addEventListener("change", syncMenu);
    else mq.addListener(syncMenu);

    btn.addEventListener("click", function () {
      var open = nav.hidden;
      nav.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && mq.matches) {
        nav.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Highlight the section in view (homepage anchors only) ---------- */
  if (nav && "IntersectionObserver" in window) {
    var links = [].slice.call(nav.querySelectorAll('a.link[href^="#"]'));
    if (links.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle("on", l.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      links.forEach(function (l) {
        var s = document.getElementById(l.getAttribute("href").slice(1));
        if (s) io.observe(s);
      });
    }
  }

  /* ---------- Services accordion ---------- */
  document.querySelectorAll(".svc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.closest("li");
      var isOpen = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Homepage: featured work from data/events.js ---------- */
  var featured = document.getElementById("featuredWork");
  if (featured && window.NTV_EVENTS) {
    var cats = {};
    (window.NTV_CATEGORIES || []).forEach(function (c) { cats[c.key] = c; });

    var list = window.NTV_EVENTS
      .filter(function (e) { return e.featured; })
      .sort(byDateDesc)
      .slice(0, 3);

    if (!list.length) {
      featured.closest(".featured").hidden = true;
    } else {
      featured.innerHTML = list.map(function (e) {
        var cat = cats[e.category] ? cats[e.category].label : "";
        return '<a class="feat-card" href="portfolio.html#' + esc(e.slug) + '">' +
          '<span class="feat-img"><img src="' + esc(e.cover) + '" alt="" loading="lazy"' + (e.coverPosition ? ' style="object-position:' + esc(e.coverPosition) + '"' : '') + '></span>' +
          '<span class="feat-body">' +
            '<span class="feat-cat">' + esc(cat) + '</span>' +
            '<span class="feat-title">' + esc(e.title) + '</span>' +
            (e.client ? '<span class="feat-client">' + esc(e.client) + '</span>' : '') +
          '</span>' +
          '<span class="feat-arrow" aria-hidden="true">→</span>' +
        '</a>';
      }).join("");
    }
  }

  function byDateDesc(a, b) { return (b.date || "").localeCompare(a.date || ""); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
