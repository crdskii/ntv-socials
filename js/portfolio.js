/* NTV Socials — full portfolio page
   "All work" view: 3 category showcase panes, each auto-cycling through its videos.
   Category filter view: flat media grid; clicking opens the fullscreen viewer.
   Deep links: portfolio.html#bts | portfolio.html#<event-slug> still work. */
(function () {
  "use strict";

  var CATS = window.NTV_CATEGORIES || [];
  var EVENTS = (window.NTV_EVENTS || []).slice().sort(function (a, b) {
    return (b.date || "").localeCompare(a.date || "");
  });
  var catByKey = {};
  CATS.forEach(function (c) { catByKey[c.key] = c; });

  var filtersEl  = document.getElementById("filters");
  var gridEl     = document.getElementById("eventGrid");
  var introEl    = document.getElementById("catIntro");
  var countEl    = document.getElementById("resultCount");

  var detail      = document.getElementById("eventDetail");
  var detailBody  = document.getElementById("eventDetailBody");
  var viewer      = document.getElementById("viewer");
  var viewerStage = document.getElementById("viewerStage");
  var viewerCount = document.getElementById("viewerCount");

  var state = { filter: "all", event: null, index: 0, viewerMedia: [] };
  var lastFocus = null;

  /* ---------- Data helpers ---------- */
  function videosForCat(catKey) {
    var out = [];
    EVENTS.forEach(function (e) {
      if (e.category !== catKey) return;
      (e.media || []).forEach(function (m) { if (m.type === "video") out.push(m); });
    });
    return out;
  }
  function mediaForCat(catKey) {
    var out = [];
    EVENTS.forEach(function (e) {
      if (e.category !== catKey) return;
      (e.media || []).forEach(function (m) { out.push(m); });
    });
    return out;
  }

  /* ---------- Filters ---------- */
  function renderFilters() {
    var items = [{ key: "all", label: "All work" }].concat(CATS);
    filtersEl.innerHTML = items.map(function (c) {
      var n = c.key === "all" ? EVENTS.length : EVENTS.filter(function (e) { return e.category === c.key; }).length;
      return '<button type="button" class="chip-filter" role="tab" data-key="' + c.key + '" aria-selected="' + (state.filter === c.key) + '">' +
        esc(c.label) + ' <span class="n">' + n + '</span></button>';
    }).join("");
  }

  filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-key]");
    if (!b) return;
    setFilter(b.getAttribute("data-key"), true);
  });

  function setFilter(key, updateHash) {
    state.filter = catByKey[key] ? key : "all";
    renderFilters();
    renderIntro();
    renderGrid();
    if (updateHash) replaceHash(state.filter === "all" ? "" : state.filter);
  }

  function renderIntro() {
    var c = catByKey[state.filter];
    if (!c) { introEl.innerHTML = ""; introEl.hidden = true; return; }
    introEl.hidden = false;
    introEl.innerHTML =
      '<h2>' + esc(c.title) + '</h2>' +
      (c.kinds ? '<span class="kinds">' + esc(c.kinds) + '</span>' : '') +
      '<p>' + esc(c.desc) + '</p>';
  }

  /* ---------- Grid dispatcher ---------- */
  function renderGrid() {
    gridEl.innerHTML = ""; // tears down any previous showcase <video> elements
    if (state.filter === "all") {
      renderShowcase();
    } else {
      renderCatGrid();
    }
  }

  /* ---------- All-work: 3 showcase panes ---------- */
  function renderShowcase() {
    countEl.textContent = EVENTS.length + (EVENTS.length === 1 ? " event" : " events");

    gridEl.className = "ev-grid ev-showcase";
    gridEl.innerHTML = CATS.map(function (cat) {
      var vids = videosForCat(cat.key);
      return '<div class="showcase-pane" data-cat="' + esc(cat.key) + '">' +
        (vids.length
          ? '<video class="showcase-vid" muted playsinline' + (vids.length === 1 ? ' loop' : '') + '></video>'
          : '<div class="showcase-empty"><p>' + esc(cat.label) + '<br>coming soon</p></div>'
        ) +
        '<div class="showcase-overlay">' +
          '<span class="showcase-label">' + esc(cat.label) + '</span>' +
          '<span class="showcase-explore">Explore &#8594;</span>' +
        '</div>' +
        (vids.length ? '<button class="showcase-mute" aria-label="Unmute" aria-pressed="false">' + svgMuted() + '</button>' : '') +
      '</div>';
    }).join("");

    // Wire up each pane after inserting HTML
    gridEl.querySelectorAll(".showcase-pane").forEach(function (pane) {
      var cat    = pane.getAttribute("data-cat");
      var vids   = videosForCat(cat);
      var video  = pane.querySelector("video");
      var muteBtn = pane.querySelector(".showcase-mute");

      // Whole pane navigates to category filter
      pane.addEventListener("click", function (e) {
        if (e.target.closest(".showcase-mute")) return;
        setFilter(cat, true);
      });

      if (!video || !vids.length) return;

      // Cycle playlist: on 'ended' load the next clip
      var idx = 0;
      function playNext() {
        var m = vids[idx];
        video.src = m.src;
        if (m.poster) video.poster = m.poster;
        video.play().catch(function () {});
        idx = (idx + 1) % vids.length;
      }
      if (vids.length > 1) video.addEventListener("ended", playNext);
      playNext();

      // Mute toggle
      if (muteBtn) {
        muteBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          video.muted = !video.muted;
          var nowMuted = video.muted;
          muteBtn.setAttribute("aria-pressed", String(!nowMuted));
          muteBtn.setAttribute("aria-label", nowMuted ? "Unmute" : "Mute");
          muteBtn.innerHTML = nowMuted ? svgMuted() : svgUnmuted();
        });
      }
    });
  }

  function svgMuted() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  }
  function svgUnmuted() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  }

  /* ---------- Category filter: flat media grid ---------- */
  function renderCatGrid() {
    gridEl.className = "ev-grid ev-media";
    var items = mediaForCat(state.filter);
    countEl.textContent = items.length + (items.length === 1 ? " item" : " items");

    if (!items.length) {
      var c = catByKey[state.filter];
      gridEl.innerHTML =
        '<div class="empty">' +
          '<svg class="spark" aria-hidden="true"><use href="#spark"/></svg>' +
          '<h3>New ' + esc(c ? c.label.toLowerCase() : "") + ' work is on the way</h3>' +
          '<p>Follow <a href="https://www.instagram.com/ntv.socials" target="_blank" rel="noopener">@ntv.socials</a> on Instagram to see it first.</p>' +
        '</div>';
      return;
    }

    state.viewerMedia = items;

    gridEl.innerHTML = items.map(function (m, i) {
      var thumb = m.type === "video" ? (m.poster || "") : m.src;
      return '<button type="button" class="media-card' + (m.type === "video" ? " is-video" : "") + '" data-mi="' + i + '" aria-label="' + esc(m.alt || "Open item " + (i + 1)) + '">' +
        (thumb ? '<img src="' + esc(thumb) + '" alt="">' : '<span class="ed-noposter">Video</span>') +
        (m.type === "video" ? '<span class="play" aria-hidden="true">&#9654;</span>' : '') +
      '</button>';
    }).join("");
  }

  gridEl.addEventListener("click", function (e) {
    var mc = e.target.closest(".media-card");
    if (mc) openViewer(state.viewerMedia, +mc.getAttribute("data-mi"));
  });

  /* ---------- Event detail panel (opened via deep URL hash) ---------- */
  function openEvent(slug, updateHash) {
    var ev = EVENTS.filter(function (e) { return e.slug === slug; })[0];
    if (!ev) return;
    state.event = ev;
    lastFocus = document.activeElement;
    var c = catByKey[ev.category];

    var facts = [];
    if (ev.client)   facts.push(["Client",   ev.client]);
    if (ev.date)     facts.push(["Date",      fmtDate(ev.date, true)]);
    if (ev.location) facts.push(["Location",  ev.location]);
    if (c)           facts.push(["Category",  c.label]);

    detailBody.innerHTML =
      '<header class="ed-head">' +
        '<span class="eyebrow">' + esc(c ? c.title : "Portfolio") + '</span>' +
        '<h2 id="eventDetailTitle">' + esc(ev.title) + '</h2>' +
        (ev.summary ? '<p class="ed-summary">' + esc(ev.summary) + '</p>' : '') +
      '</header>' +
      '<dl class="ed-facts">' + facts.map(function (f) {
        return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
      }).join("") + '</dl>' +
      ((ev.deliverables || []).length ?
        '<ul class="ed-tags">' + ev.deliverables.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join("") + '</ul>' : '') +
      ((ev.links || []).length ?
        '<div class="ed-links">' + ev.links.map(function (l) {
          return '<a class="btn btn-ghost" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' &#8599;</a>';
        }).join("") + '</div>' : '') +
      '<div class="ed-gallery">' + (ev.media || []).map(function (m, i) {
        var thumb = m.type === "video" ? (m.poster || "") : m.src;
        return '<button type="button" class="ed-item' + (m.type === "video" ? " is-video" : "") + '" data-i="' + i + '" aria-label="Open ' + esc(m.alt || "item " + (i + 1)) + '">' +
          (thumb ? '<img src="' + esc(thumb) + '" alt="' + esc(m.alt || "") + '" loading="lazy">' : '<span class="ed-noposter">Video</span>') +
          (m.type === "video" ? '<span class="play" aria-hidden="true">&#9654;</span>' : '') +
        '</button>';
      }).join("") + '</div>';

    detail.hidden = false;
    document.body.classList.add("locked");
    detail.scrollTop = 0;
    detail.querySelector(".ed-close").focus();
    if (updateHash) replaceHash(ev.slug);
  }

  function closeEvent() {
    if (detail.hidden) return;
    closeViewer();
    detail.hidden = true;
    document.body.classList.remove("locked");
    state.event = null;
    replaceHash(state.filter === "all" ? "" : state.filter);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  detail.addEventListener("click", function (e) {
    if (e.target === detail || e.target.closest(".ed-close")) { closeEvent(); return; }
    var item = e.target.closest(".ed-item");
    if (item) openViewer(state.event.media, +item.getAttribute("data-i"));
  });

  /* ---------- Fullscreen viewer ---------- */
  function openViewer(mediaArr, i) {
    state.viewerMedia = mediaArr;
    state.index = i;
    viewer.hidden = false;
    drawViewer();
    viewer.querySelector(".vw-close").focus();
  }
  function closeViewer() {
    if (viewer.hidden) return;
    viewer.hidden = true;
    viewerStage.innerHTML = "";
  }
  function step(d) {
    var n = state.viewerMedia.length;
    state.index = (state.index + d + n) % n;
    drawViewer();
  }
  function drawViewer() {
    var m = state.viewerMedia[state.index];
    viewerStage.innerHTML = m.type === "video"
      ? '<video src="' + esc(m.src) + '"' + (m.poster ? ' poster="' + esc(m.poster) + '"' : '') + ' autoplay loop muted playsinline controls></video>'
      : '<img src="' + esc(m.src) + '" alt="' + esc(m.alt || "") + '">';
    viewerCount.textContent = (state.index + 1) + " / " + state.viewerMedia.length;
    var multi = state.viewerMedia.length > 1;
    viewer.querySelector(".vw-prev").hidden = !multi;
    viewer.querySelector(".vw-next").hidden = !multi;
  }
  viewer.addEventListener("click", function (e) {
    if (e.target.closest(".vw-close") || e.target === viewer) closeViewer();
    else if (e.target.closest(".vw-prev")) step(-1);
    else if (e.target.closest(".vw-next")) step(1);
  });

  var x0 = null;
  viewerStage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  viewerStage.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40 && state.viewerMedia.length > 1) step(dx < 0 ? 1 : -1);
    x0 = null;
  });

  document.addEventListener("keydown", function (e) {
    if (!viewer.hidden) {
      if (e.key === "Escape")      closeViewer();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft")  step(-1);
    } else if (!detail.hidden && e.key === "Escape") {
      closeEvent();
    }
  });

  /* ---------- Hash routing ---------- */
  function readHash() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (!h)           { closeEvent(); setFilter("all", false); return; }
    if (catByKey[h])  { closeEvent(); setFilter(h, false); return; }
    if (EVENTS.some(function (e) { return e.slug === h; })) {
      if (state.filter === "all" || !gridEl.children.length) setFilter("all", false);
      openEvent(h, false);
    }
  }
  function replaceHash(h) {
    try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); }
    catch (err) {}
  }
  window.addEventListener("hashchange", readHash);

  /* ---------- Helpers ---------- */
  function fmtDate(iso, long) {
    var p = iso.split("-");
    var d = new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1);
    return d.toLocaleDateString("en-US", long ? { month: "long", day: "numeric", year: "numeric" } : { month: "short", year: "numeric" });
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  renderFilters();
  renderIntro();
  renderGrid();
  readHash();
})();
