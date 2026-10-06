const nav=document.querySelector('#nav');
const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
const modal=document.querySelector('#video-modal');
const modalVideo=document.querySelector('#modal-video');
const modalTitle=document.querySelector('#modal-title');
const closeButtons=document.querySelectorAll('[data-close-modal]');

document.addEventListener('pointermove',event=>{const glow=document.querySelector('.cursor-glow');if(glow&&matchMedia('(pointer:fine)').matches){glow.style.left=`${event.clientX}px`;glow.style.top=`${event.clientY}px`}});
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>16),{passive:true});
menuButton?.addEventListener('click',()=>{const open=menuButton.classList.toggle('open');mobileMenu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));mobileMenu.setAttribute('aria-hidden',String(!open))});
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.classList.remove('open');mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');mobileMenu.setAttribute('aria-hidden','true')}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

function openModal(source,title){modalTitle.textContent=title||'Project';modalVideo.src=source;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modalVideo.play().catch(()=>{});modal.querySelector('.modal-close').focus()}
function closeModal(){modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
document.querySelectorAll('.project-open').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.video,button.dataset.title)));
closeButtons.forEach(button=>button.addEventListener('click',closeModal));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('is-open'))closeModal()});
