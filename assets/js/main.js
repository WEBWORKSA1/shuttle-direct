/* Shuttle.Direct — site behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";
  var C = window.SD_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- contact routing (never rendered) ---------- */
  function route() { return (C._r || []).map(function (n) { return String.fromCharCode(n - 11); }).reverse().join(""); }
  function endpoint() { return "https://formsubmit.co/ajax/" + (C.formAlias || route()); }

  /* ---------- toast ---------- */
  function toast(msg) {
    var t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 3500);
  }

  /* ---------- theme ---------- */
  var saved = store("sd-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", cur); store("sd-theme", cur);
      b.textContent = cur === "dark" ? "☀" : "☾";
    });
    b.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀" : "☾";
  });

  /* ---------- mobile menu ---------- */
  var mb = $(".menu-btn"), nl = $(".nav-links");
  if (mb && nl) mb.addEventListener("click", function () {
    var o = nl.classList.toggle("open"); mb.setAttribute("aria-expanded", o); mb.textContent = o ? "✕" : "☰";
  });

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });

  /* ---------- mailto links (address assembled on click only) ---------- */
  $$("[data-mail]").forEach(function (a) {
    a.setAttribute("href", "#contact");
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var subj = a.getAttribute("data-mail") || "Shuttle.Direct inquiry";
      window.location.href = "mai" + "lto:" + route() + "?subject=" + encodeURIComponent(subj);
    });
  });

  /* ---------- AdSense ---------- */
  if (C.adsenseClient) {
    var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + C.adsenseClient;
    document.head.appendChild(s);
    $$(".ad-slot").forEach(function (slot) {
      var type = slot.getAttribute("data-ad") || "inContent";
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle"; ins.style.display = "block";
      ins.setAttribute("data-ad-client", C.adsenseClient);
      if (C.adSlots && C.adSlots[type]) ins.setAttribute("data-ad-slot", C.adSlots[type]);
      ins.setAttribute("data-ad-format", "auto"); ins.setAttribute("data-full-width-responsive", "true");
      slot.textContent = ""; slot.classList.add("has-ad"); slot.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  /* ---------- counters (+/-) ---------- */
  $$(".counter").forEach(function (c) {
    var inp = $("input", c), min = +(inp.min || 0), max = +(inp.max || 99);
    $$("button", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var v = (+inp.value || 0) + (+b.getAttribute("data-step"));
        inp.value = Math.max(min, Math.min(max, v)); inp.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });
  });

  /* ---------- return trip toggles ---------- */
  $$("[data-toggle-target]").forEach(function (t) {
    var tgt = $(t.getAttribute("data-toggle-target"));
    function sync() { if (tgt) tgt.classList.toggle("hide", !t.checked); }
    t.addEventListener("change", sync); sync();
  });

  /* ---------- prefill from URL ---------- */
  var qs = new URLSearchParams(location.search);
  qs.forEach(function (v, k) {
    var f = document.querySelector('[data-prefill] [name="' + k + '"]');
    if (!f) return;
    if (f.type === "checkbox") { f.checked = v === "on" || v === "1"; f.dispatchEvent(new Event("change")); }
    else f.value = v;
  });

  /* ---------- fare estimator ---------- */
  var RATES = { shared: [0.9, 12], sedan: [2.1, 35], suv: [2.8, 50], van: [3.2, 60], minibus: [4.5, 110], coach: [7, 250], luxury: [4, 85] };
  function estimate(form) {
    var out = $("[data-estimate-out]"); if (!out) return;
    var km = +(form.querySelector('[name="distance_km"]') || {}).value || 30;
    var v = (form.querySelector('[name="vehicle"]:checked') || form.querySelector('[name="vehicle"]') || {}).value || "sedan";
    var pax = (+(form.querySelector('[name="adults"]') || {}).value || 1) + (+(form.querySelector('[name="children"]') || {}).value || 0);
    var r = RATES[v] || RATES.sedan;
    var base = r[1] + r[0] * km; if (v === "shared") base = base * Math.max(1, pax);
    var ret = form.querySelector('[name="return_trip"]'); if (ret && ret.checked) base *= 1.9;
    var lo = Math.round(base * 0.85), hi = Math.round(base * 1.2);
    out.textContent = "$" + lo + " – $" + hi;
  }
  $$("[data-estimator]").forEach(function (f) { f.addEventListener("input", function () { estimate(f); }); f.addEventListener("change", function () { estimate(f); }); estimate(f); });

  /* ---------- validation ---------- */
  function validate(scope) {
    var ok = true;
    $$("input,select,textarea", scope).forEach(function (el) {
      if (el.closest(".hide")) return;
      var bad = !el.checkValidity();
      el.classList.toggle("invalid", bad);
      if (bad && ok) { el.focus(); ok = false; }
    });
    return ok;
  }

  /* ---------- multi-step forms ---------- */
  $$("[data-steps]").forEach(function (form) {
    var steps = $$(".fstep", form), i = 0, bar = $(".progress span", form), labels = $$(".step-labels span", form);
    function show(n) {
      i = n; steps.forEach(function (s, k) { s.classList.toggle("active", k === i); });
      if (bar) bar.style.width = ((i + 1) / steps.length * 100) + "%";
      labels.forEach(function (l, k) { l.classList.toggle("on", k <= i); });
      var p = $("[data-prev]", form), nx = $("[data-next]", form), sb = $("[type=submit]", form);
      if (p) p.style.visibility = i === 0 ? "hidden" : "visible";
      if (nx) nx.classList.toggle("hide", i === steps.length - 1);
      if (sb) sb.classList.toggle("hide", i !== steps.length - 1);
    }
    var nx = $("[data-next]", form), pv = $("[data-prev]", form);
    if (nx) nx.addEventListener("click", function () { if (validate(steps[i])) { show(i + 1); form.scrollIntoView({ behavior: "smooth", block: "start" }); } });
    if (pv) pv.addEventListener("click", function () { show(Math.max(0, i - 1)); });
    show(0);
  });

  /* ---------- draft saving ---------- */
  $$("form[data-draft]").forEach(function (f) {
    var key = "sd-draft-" + f.getAttribute("data-draft");
    try { var d = JSON.parse(store(key) || "{}"); Object.keys(d).forEach(function (k) { var el = f.elements[k]; if (el && !qs.has(k) && el.type !== "radio" && el.type !== "checkbox" && el.type !== "file") el.value = d[k]; }); } catch (e) {}
    f.addEventListener("input", function () { var o = {}; new FormData(f).forEach(function (v, k) { if (typeof v === "string") o[k] = v; }); store(key, JSON.stringify(o)); });
  });

  /* ---------- submission ---------- */
  function collect(f) {
    var o = {};
    new FormData(f).forEach(function (v, k) { if (typeof v !== "string") return; if (o[k]) o[k] += ", " + v; else o[k] = v; });
    return o;
  }
  $$("form[data-form]").forEach(function (f) {
    f.setAttribute("novalidate", "");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (f.querySelector('[name="_honey"]') && f.querySelector('[name="_honey"]').value) return;
      if (!validate(f)) { toast("Please complete the highlighted fields."); return; }
      var type = f.getAttribute("data-form");
      var data = collect(f); delete data._honey;
      data._subject = "Shuttle.Direct — " + type + (data.name ? " from " + data.name : "");
      data._template = "table"; data._captcha = "false";
      data.form_type = type; data.page = location.pathname; data.submitted = new Date().toISOString();
      var btn = f.querySelector("[type=submit]"); if (btn) { btn.disabled = true; btn._t = btn.textContent; btn.textContent = "Sending…"; }
      fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === "false") throw new Error("fail"); }); })
        .then(function () { done(f); })
        .catch(function () {
          // fallback: open mail client with the details pre-filled
          var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
          window.location.href = "mai" + "lto:" + route() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
          done(f);
        })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn._t; } });
    });
  });
  function done(f) {
    var k = f.getAttribute("data-draft"); if (k) try { localStorage.removeItem("sd-draft-" + k); } catch (e) {}
    var s = f.getAttribute("data-success") ? $(f.getAttribute("data-success")) : null;
    if (s) { f.classList.add("hide"); s.classList.add("show"); s.scrollIntoView({ behavior: "smooth", block: "center" }); }
    else { f.reset(); toast("Thanks! We received your message."); }
  }

  /* ---------- airport directory search ---------- */
  var grid = $("[data-airport-grid]");
  if (grid && window.SD_AIRPORTS) {
    var q = $("#airport-q"), reg = $("#airport-region"), cnt = $("#airport-count");
    function render() {
      var term = (q.value || "").toLowerCase(), r = reg.value;
      var list = window.SD_AIRPORTS.filter(function (a) {
        return (!r || a.region === r) && (!term || (a.code + " " + a.name + " " + a.city + " " + a.country).toLowerCase().indexOf(term) > -1);
      });
      grid.innerHTML = list.map(function (a) {
        return '<a class="card hover airport-card" href="airports/' + a.code.toLowerCase() + '.html"><span class="code">' + a.code + '</span><b>' + a.name + '</b><span class="meta">' + a.city + ', ' + a.country + ' · ' + a.km + ' km to centre</span><span class="tag">From ~$' + a.shared + ' shared</span></a>';
      }).join("") || '<p class="muted">No airports match. <a href="get-quote.html">Request a quote anyway →</a></p>';
      if (cnt) cnt.textContent = list.length;
    }
    q.addEventListener("input", render); reg.addEventListener("change", render); render();
  }

  /* ---------- airport datalist for quote forms ---------- */
  var dl = $("#airport-list");
  if (dl && window.SD_AIRPORTS) dl.innerHTML = window.SD_AIRPORTS.map(function (a) { return '<option value="' + a.name + ' (' + a.code + '), ' + a.city + '">'; }).join("");

  /* ---------- partners ---------- */
  var pg = $("[data-partners]");
  if (pg && C.partners) pg.innerHTML = C.partners.map(function (p) {
    return '<div class="card partner"><span class="tag amber">' + p.network + '</span><span class="pname">' + p.name + '</span><p>' + p.blurb + '</p><a class="btn btn-dark btn-sm" rel="sponsored noopener" target="_blank" href="' + p.url + '">Check prices →</a></div>';
  }).join("");

  /* ---------- YouTube lite facades ---------- */
  var vg = $("[data-videos]");
  if (vg && C.videos) {
    var lim = +(vg.getAttribute("data-limit") || 99), topic = vg.getAttribute("data-topic");
    var vids = C.videos.filter(function (v) { return !topic || v.topic === topic || v.topic === "Guides"; }).slice(0, lim);
    vg.innerHTML = vids.map(function (v) {
      var inner = v.id
        ? '<div class="video" data-yt="' + v.id + '" style="background-image:url(https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg)" role="button" tabindex="0" aria-label="Play ' + v.title + '"><span class="play">▶</span></div>'
        : '<a class="video placeholder" href="' + C.youtubeChannel + '" target="_blank" rel="noopener"><span><span class="play" style="margin:0 auto 10px">▶</span>Coming soon on our channel</span></a>';
      return '<div><div>' + inner + '</div><div class="video-title">' + v.title + '</div><span class="tag">' + v.topic + '</span></div>';
    }).join("");
    $$("[data-yt]", vg).forEach(function (el) {
      function play() { el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + el.getAttribute("data-yt") + '?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="YouTube video"></iframe>'; }
      el.addEventListener("click", play); el.addEventListener("keydown", function (e) { if (e.key === "Enter") play(); });
    });
  }
  $$("[data-yt-channel]").forEach(function (a) { a.href = C.youtubeChannel; });

  /* ---------- donations ---------- */
  var dm = $("[data-donate-meter]");
  if (dm && C.donate) {
    var pct = Math.min(100, Math.round((C.donate.raised / C.donate.goal) * 100));
    dm.style.width = Math.max(pct, 3) + "%";
    var dt = $("[data-donate-text]"); if (dt) dt.textContent = "$" + C.donate.raised.toLocaleString() + " raised of $" + C.donate.goal.toLocaleString() + " monthly goal";
  }
  $$("[data-pay]").forEach(function (b) {
    var k = b.getAttribute("data-pay"), url = C.donate && C.donate[k];
    if (url) { b.href = url; b.target = "_blank"; b.rel = "noopener"; }
    else b.addEventListener("click", function (e) { e.preventDefault(); var f = $("#pledge"); if (f) { f.scrollIntoView({ behavior: "smooth" }); toast("Online payments are launching soon — send a pledge and we'll reply with a secure link."); } });
  });
  $$('[name="tier"]').forEach(function (r) { r.addEventListener("change", function () { var a = $('[name="amount"]'); if (a && r.value !== "custom") a.value = r.value; }); });

  /* ---------- countdown ---------- */
  var cd = $("[data-countdown]");
  if (cd) {
    var end = new Date(C.contestEnds || cd.getAttribute("data-countdown")).getTime();
    (function tick() {
      var d = Math.max(0, end - Date.now()), u = [86400000, 3600000, 60000, 1000], vals = u.map(function (x) { var v = Math.floor(d / x); d -= v * x; return v; });
      $$("b", cd).forEach(function (b, k) { b.textContent = String(vals[k]).padStart(2, "0"); });
      setTimeout(tick, 1000);
    })();
  }

  /* ---------- year ---------- */
  $$("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
