const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
const reveal = new IntersectionObserver(entries => entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.feature-card,.step,.metrics div,.section-intro').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(18px)';el.style.transition='opacity .7s ease, transform .7s ease';reveal.observe(el)});
const style=document.createElement('style');style.textContent='.visible{opacity:1!important;transform:translateY(0)!important}';document.head.append(style);
