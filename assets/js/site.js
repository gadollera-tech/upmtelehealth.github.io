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