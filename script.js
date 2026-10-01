const menu=document.querySelector('.menu'),bar=document.querySelector('.topbar');menu?.addEventListener('click',()=>bar.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>bar.classList.remove('open')));const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));

/* V5 interactions */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.project[data-category]').forEach(card=>{
      card.classList.toggle('is-hidden', filter!=='all' && card.dataset.category!==filter);
    });
  });
});
document.querySelectorAll('.copy-email').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const email=btn.dataset.email;
    try{
      await navigator.clipboard.writeText(email);
      const old=btn.textContent; btn.textContent='Copied!';
      setTimeout(()=>btn.textContent=old,1300);
    }catch(e){}
  });
});
const navLinks=document.querySelectorAll('a[href^="#"]');
const sections=[...document.querySelectorAll('section[id]')];
const setActive=()=>{
  let current='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-180) current=s.id});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
};
window.addEventListener('scroll',setActive,{passive:true}); setActive();

/* Certificates viewer */
(()=>{
  const base='assets/certificates/';
  const CERTS={
    hackathon:{title:'Islington Hackathon 2026 — Team Zero-Day',org:'Islington WebDev Community · Certificate of Participation',date:'12–13 SEPTEMBER 2026',img:'islington-hackathon-2026.jpg'},
    siep:{title:'Managing Real Time Projects',org:'Islington College · Summer Industry Enrichment Programme (SIEP)',date:'SEPTEMBER 2026',img:'managing-real-time-projects-preview.jpg',pdf:'managing-real-time-projects.pdf'},
    intalent:{title:'Data Analyst — Summer Semester Assessment Program',org:'inTalent × Islington College · Certificate of Achievement',date:'SUMMER SEMESTER 2026',img:'intalent-data-analyst.jpg'},
    cloud:{title:'Cloud Architecture: Core Concepts',org:'LinkedIn Learning · Certificate of Completion',date:'SEPTEMBER 2026',img:'cloud-architecture-core-concepts-preview.jpg',pdf:'cloud-architecture-core-concepts.pdf'},
    vpn:{title:'Learning VPN',org:'LinkedIn Learning · Certificate of Completion',date:'SEPTEMBER 2026',img:'learning-vpn-preview.jpg',pdf:'learning-vpn.pdf'}
  };
  const modal=document.getElementById('certModal'); if(!modal) return;
  const $=id=>document.getElementById(id);
  const img=$('certImage'),imgLink=$('certImageLink'),openPdf=$('certOpenPdf'),openImg=$('certOpenImg'),dl=$('certDownload');
  const order=[...document.querySelectorAll('.cert-open')].map(b=>b.dataset.cert).filter(k=>CERTS[k]);
  let idx=0,lastFocus=null;
  const show=i=>{
    idx=(i+order.length)%order.length;
    const c=CERTS[order[idx]], src=base+c.img;
    img.src=src; img.alt=c.title+' certificate';
    imgLink.href=c.pdf?base+c.pdf:src;
    $('certModalTitle').textContent=c.title; $('certModalOrg').textContent=c.org; $('certModalDate').textContent=c.date;
    $('certCount').textContent=(idx+1)+' / '+order.length;
    openPdf.hidden=!c.pdf; if(c.pdf) openPdf.href=base+c.pdf;
    openImg.hidden=!!c.pdf; if(!c.pdf) openImg.href=src;
    dl.href=c.pdf?base+c.pdf:src;
  };
  const open=key=>{lastFocus=document.activeElement;show(order.indexOf(key));modal.hidden=false;document.body.classList.add('cert-lock');modal.querySelector('.cert-close').focus()};
  const close=()=>{modal.hidden=true;document.body.classList.remove('cert-lock');lastFocus&&lastFocus.focus()};
  document.querySelectorAll('.cert-open').forEach(b=>b.addEventListener('click',()=>open(b.dataset.cert)));
  modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',close));
  modal.querySelector('.prev').addEventListener('click',()=>show(idx-1));
  modal.querySelector('.next').addEventListener('click',()=>show(idx+1));
  document.addEventListener('keydown',e=>{
    if(modal.hidden) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowLeft') show(idx-1);
    else if(e.key==='ArrowRight') show(idx+1);
    else if(e.key==='Tab'){
      const f=[...modal.querySelectorAll('button,a[href]')].filter(x=>!x.hidden&&x.offsetParent!==null);
      const first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  let x0=null;
  modal.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  modal.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>60)show(idx+(dx<0?1:-1))});
})();
