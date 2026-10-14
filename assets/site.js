const menu=document.querySelector('.menu'),nav=document.querySelector('#navlinks');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});const form=document.querySelector('#contactform');if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nInterest: '+d.get('interest')+'\n\n'+d.get('message');location.href='mailto:office@jamesnowlinrealtor.com?subject='+encodeURIComponent('Real estate inquiry: '+d.get('interest'))+'&body='+encodeURIComponent(body);document.querySelector('#formstatus').textContent='Your email app should open with a draft. Review and send it there. If it does not open, email office@jamesnowlinrealtor.com or call (803) 949-0229.'});
(() => {
const search=document.querySelector('#resource-search'), category=document.querySelector('#resource-category');
if(!search||!category)return;
document.querySelector('.resource-controls').hidden=false;
const cards=[...document.querySelectorAll('.resource-card')];
function filter(){const q=search.value.trim().toLowerCase();let count=0;cards.forEach(card=>{const show=(category.value==='all'||card.dataset.category===category.value)&&card.textContent.toLowerCase().includes(q);card.hidden=!show;if(show)count++});document.querySelector('#resource-count').textContent=count+' of '+cards.length+' resources · Sources reviewed October 14, 2026';document.querySelector('#resource-empty').hidden=count!==0;}
search.addEventListener('input',filter);category.addEventListener('change',filter);
document.querySelector('#resource-reset').addEventListener('click',()=>{search.value='';category.value='all';filter();search.focus()});
document.querySelectorAll('[data-preset]').forEach(a=>a.addEventListener('click',()=>{category.value=a.dataset.preset;search.value='';filter()}));
const tasks=[...document.querySelectorAll('[data-task]')],key='james-nowlin-moving-checklist-v1';let storage=true;
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');tasks.forEach(t=>t.checked=Array.isArray(saved)&&saved.includes(t.dataset.task))}catch(e){storage=false;}
function status(){const n=tasks.filter(t=>t.checked).length;document.querySelector('#checklist-status').textContent=n+' of '+tasks.length+' completed. '+(storage?'Saved in this browser only.':'Progress is available for this visit; browser storage is unavailable.');}
function save(){try{localStorage.setItem(key,JSON.stringify(tasks.filter(t=>t.checked).map(t=>t.dataset.task)))}catch(e){storage=false;}status();}
tasks.forEach(t=>t.addEventListener('change',save));status();
const clear=document.querySelector('#clear-checklist');clear.hidden=false;clear.addEventListener('click',()=>{tasks.forEach(t=>t.checked=false);save()});
const print=document.querySelector('#print-checklist');print.hidden=false;print.addEventListener('click',()=>window.print());
})();
