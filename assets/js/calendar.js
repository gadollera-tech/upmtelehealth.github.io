(() => {
  "use strict";
  const node = document.getElementById("events-data"); if (!node) return;
  let events=[]; try { events=JSON.parse(node.textContent); } catch(e){ console.error(e); return; }
  const today = new Date(); today.setHours(0,0,0,0);
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  const grid=document.querySelector("[data-calendar-grid]"), title=document.querySelector("[data-calendar-title]");
  const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
  const fmt=d=>new Intl.DateTimeFormat("en-PH",{month:"long",year:"numeric"}).format(d);
  const eventClass=e=>e.category.toLowerCase().includes("connectathon")?"connectathon":(e.category.toLowerCase().includes("training")||e.category.toLowerCase().includes("workshop"))?"training":"other";
  function render(){
    title.textContent=fmt(view); grid.innerHTML="";
    const y=view.getFullYear(),m=view.getMonth(),first=new Date(y,m,1),last=new Date(y,m+1,0);
    for(let i=0;i<first.getDay();i++){const c=document.createElement("div");c.className="calendar-day calendar-day--empty";grid.append(c);}
    for(let day=1;day<=last.getDate();day++){
      const date=new Date(y,m,day), iso=`${y}-${String(m+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const c=document.createElement("div");c.className="calendar-day";if(date.toDateString()===today.toDateString())c.classList.add("is-today");
      const n=document.createElement("span");n.className="calendar-day__number";n.textContent=day;c.append(n);
      events.filter(e=>e.start<=iso&&e.end>=iso).forEach(e=>{const a=document.createElement("a");a.className=`calendar-event calendar-event--${eventClass(e)}`;a.href=e.url;a.target="_blank";a.rel="noopener";a.textContent=e.title;a.title=`${e.title} — ${e.venue}`;c.append(a);});
      grid.append(c);
    }
  }
  document.querySelector("[data-calendar-prev]")?.addEventListener("click",()=>{view=new Date(view.getFullYear(),view.getMonth()-1,1);render();});
  document.querySelector("[data-calendar-next]")?.addEventListener("click",()=>{view=new Date(view.getFullYear(),view.getMonth()+1,1);render();});
  const upcoming=events.filter(e=>parse(e.end)>=today).sort((a,b)=>a.start.localeCompare(b.start));
  const target=document.querySelector("[data-upcoming-events]"), empty=document.querySelector("[data-upcoming-empty]");
  if(upcoming.length){empty.hidden=true;upcoming.slice(0,5).forEach(e=>{const article=document.createElement("article");article.className="upcoming-card";article.innerHTML=`<time>${new Intl.DateTimeFormat("en-PH",{month:"short",day:"numeric",year:"numeric"}).format(parse(e.start))}</time><h3>${e.title}</h3><p>${e.venue}</p><a class="text-link" href="${e.url}" target="_blank" rel="noopener">View details ↗</a>`;target.append(article);});}
  render();
})();