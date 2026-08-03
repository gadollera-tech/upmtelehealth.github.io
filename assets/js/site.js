(() => {
  "use strict";
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => { const open = nav.classList.toggle("is-open"); navToggle.setAttribute("aria-expanded", String(open)); });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("is-open"); navToggle.setAttribute("aria-expanded", "false"); }));
  }
  const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();

  function updateClock() {
    const now = new Date();
    document.querySelectorAll("[data-live-time]").forEach(el => el.textContent = new Intl.DateTimeFormat("en-PH", {timeZone:"Asia/Manila", hour:"numeric", minute:"2-digit", second:"2-digit", hour12:true}).format(now));
    document.querySelectorAll("[data-live-date]").forEach(el => el.textContent = new Intl.DateTimeFormat("en-PH", {timeZone:"Asia/Manila", weekday:"long", year:"numeric", month:"long", day:"numeric"}).format(now));
  }
  updateClock(); window.setInterval(updateClock, 1000);

  document.querySelectorAll("[data-project-filter]").forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;
    document.querySelectorAll("[data-project-filter]").forEach(b => b.classList.toggle("is-active", b === button));
    document.querySelectorAll("[data-project-card]").forEach(card => {
      const hay = `${card.dataset.status} ${card.dataset.category}`.toLowerCase();
      card.hidden = filter !== "all" && !hay.includes(filter.toLowerCase());
    });
  }));

  const newsSearch = document.querySelector("[data-news-search]");
  let activeNewsFilter = "all";
  function filterNews() {
    const query = (newsSearch?.value || "").trim().toLowerCase(); let shown = 0;
    document.querySelectorAll("[data-news-card]").forEach(card => {
      const matchesFilter = activeNewsFilter === "all" || card.dataset.category === activeNewsFilter;
      const matchesQuery = !query || card.dataset.search.includes(query);
      card.hidden = !(matchesFilter && matchesQuery); if (!card.hidden) shown++;
    });
    const empty = document.querySelector("[data-news-empty]"); if (empty) empty.hidden = shown !== 0;
  }
  newsSearch?.addEventListener("input", filterNews);
  document.querySelectorAll("[data-news-filter]").forEach(button => button.addEventListener("click", () => { activeNewsFilter = button.dataset.newsFilter; document.querySelectorAll("[data-news-filter]").forEach(b => b.classList.toggle("is-active", b === button)); filterNews(); }));

  const config = window.NTHC_FORM_CONFIG || {};
  const endpoint = String(config.googleAppsScriptUrl || "").trim();
  const endpointReady = /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(endpoint);
  const fallbackEmail = String(config.fallbackEmail || "nih-nthc.upmanila@up.edu.ph").trim();
  function status(form, message, type="info") { const el=form.querySelector(".form-status"); if(el){el.textContent=message;el.className=`form-status form-status--${type}`;} }
  function params(form) { const p=new URLSearchParams(); new FormData(form).forEach((v,k)=>p.append(k,String(v).trim())); p.set("submitted_at",new Date().toISOString());p.set("source_page",location.href);return p; }
  function mailFallback(p) { const sender=p.get("full_name")||p.get("first_name")||"Website visitor"; const type=p.get("form_type")==="updates"?"Contact-list signup":"Website inquiry"; const lines=[]; p.forEach((v,k)=>{if(v&&!["website"].includes(k))lines.push(`${k.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase())}: ${v}`)}); location.href=`mailto:${encodeURIComponent(fallbackEmail)}?subject=${encodeURIComponent(`[NTHC Website] ${type} — ${sender}`)}&body=${encodeURIComponent(lines.join("\n"))}`; }
  document.querySelectorAll("form[data-nthc-form]").forEach(form => form.addEventListener("submit", async e => {
    e.preventDefault(); status(form,""); if(!form.checkValidity()){form.reportValidity();status(form,"Please complete all required fields.","error");return;}
    if(form.querySelector('input[name="website"]')?.value){form.reset();status(form,"Thank you.","success");return;}
    const p=params(form); if(!endpointReady){mailFallback(p);status(form,"The Google Sheets endpoint is not configured yet, so your email application has been opened.","warning");return;}
    const button=form.querySelector('button[type="submit"]'); const label=button?.textContent; if(button){button.disabled=true;button.textContent="Sending…";} status(form,"Sending…","info");
    try { await fetch(endpoint,{method:"POST",mode:"no-cors",body:p,referrerPolicy:"strict-origin-when-cross-origin"}); form.reset();status(form,"Thank you. Your submission was sent.","success"); }
    catch(err){console.error(err);status(form,"The form could not be sent. Please use the official email address.","error");}
    finally{if(button){button.disabled=false;button.textContent=label;}}
  }));
})();

(() => {
  "use strict";

  document.querySelectorAll("[data-photo-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!track || slides.length < 2) return;

    let current = 0;
    let timer = null;

    function show(index, focusDot = false) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.setAttribute("aria-hidden", String(slideIndex !== current));
      });

      dots.forEach((dot, dotIndex) => {
        const selected = dotIndex === current;
        dot.setAttribute("aria-current", String(selected));
        if (focusDot && selected) dot.focus();
      });
    }

    function stopAutoPlay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function startAutoPlay() {
      if (reduceMotion || document.hidden) return;
      stopAutoPlay();
      timer = window.setInterval(() => show(current + 1), 6500);
    }

    previous?.addEventListener("click", () => {
      show(current - 1);
      startAutoPlay();
    });

    next?.addEventListener("click", () => {
      show(current + 1);
      startAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        show(index);
        startAutoPlay();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("focusin", stopAutoPlay);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) startAutoPlay();
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(current - 1, true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(current + 1, true);
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    });

    show(0);
    startAutoPlay();
  });
})();
