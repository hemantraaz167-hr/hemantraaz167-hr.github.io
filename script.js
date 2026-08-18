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
