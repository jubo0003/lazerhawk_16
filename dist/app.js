const $ = (s) => document.querySelector(s);
const dialog = $('#detail');
const info = {
 tickets: ['Billetter til UHØRT 2027', '08–09 august 2027 i København. Billetlinket er endnu ikke tilføjet til denne forside. Kontakt <a href="mailto:uhoert@uhoert.dk">uhoert@uhoert.dk</a> for billetinformation.'],
 practical: ['Praktisk information', 'UHØRT Festival finder sted i København den 08–09 august 2027. Kontakt: Enghavevej 80-82, 2450 København SV. Har du spørgsmål, så skriv til <a href="mailto:uhoert@uhoert.dk">uhoert@uhoert.dk</a>.'],
 playlist: ['Lyt til UHØRT', 'Designet viser UHØRT Festival 2026-playlisten. Det direkte Spotify-link skal tilføjes, før afspilleren kan afspille musik.'],
 press: ['Presse og logopakke', 'Kontakt <a href="mailto:presse@uhoert.dk?subject=Logopakke">presse@uhoert.dk</a> for logopakke og akkreditering.']
};
function show(title, body) { $('#detail-body').replaceChildren(); const h=document.createElement('h2'); h.textContent=title; const p=document.createElement('p'); p.innerHTML=body; $('#detail-body').append(h,p); dialog.showModal(); }
document.querySelectorAll('[data-info]').forEach(b=>b.addEventListener('click',()=>show(...info[b.dataset.info])));
$('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
$('#menu-toggle').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',open);});
document.querySelectorAll('nav a,nav button').forEach(el=>el.addEventListener('click',()=>{$('#navigation').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}));
const backgroundVideos = [...document.querySelectorAll('.gradient-video, .concert-video')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function setVideoPaused(paused) {
  backgroundVideos.forEach(video => { if (paused) video.pause(); else video.play().catch(() => {}); });
  $('#motion img').src = paused ? 'assets/play-control.svg' : 'assets/pause-control.svg';
  $('#motion').setAttribute('aria-pressed', String(paused));
  $('#motion').setAttribute('aria-label', paused ? 'Afspil videoer' : 'Sæt videoer på pause');
}
backgroundVideos.forEach(video => { video.muted = true; });
setVideoPaused(reduceMotion.matches);
reduceMotion.addEventListener('change', e => setVideoPaused(e.matches));
$('#motion').addEventListener('click', () => setVideoPaused($('#motion').getAttribute('aria-pressed') !== 'true'));

function fitArt(){document.querySelectorAll('.art-holder').forEach(el=>{const scale=el.clientWidth/Number(el.dataset.width);el.style.height=Number(el.dataset.height)*scale+'px';el.firstElementChild.style.transform=`scale(${scale})`;});if(innerWidth<=760){const box=$('.about-art');const scale=Math.min(box.clientWidth/565.806,.81);$('.about-canvas').style.transform=`scale(${scale})`;box.style.height=614*scale+'px';}else{$('.about-canvas').style.transform='';$('.about-art').style.height='';}}
new ResizeObserver(fitArt).observe(document.body);fitArt();
document.querySelectorAll('[data-mask]').forEach(el=>el.style.maskImage=`url('${el.dataset.mask}')`);
document.querySelectorAll('[data-container]').forEach(el=>el.style.containerType='size');
const artists={ALICE:['Alice AI','Pop'],ALBERT:['Alber Rosen','Pop'],ANTHON:['Anthon Cornelius','Pop'],ALPACA:['Alpaca Red','Rock'],FLAMMEN:['Flammen','Hip-hop'],GG:['Gg frej','Hip-hop']};
document.querySelectorAll('.lineup-canvas button[data-name]').forEach(b=>{const a=artists[b.dataset.name];if(a){b.setAttribute('aria-label',a[0]);b.dataset.genre=a[1];b.addEventListener('click',()=>show(a[0],`${a[1]} · Lineup 2027<br><br>Den fulde artistbeskrivelse og spilletid er endnu ikke tilføjet.`));}});
const muuk=document.querySelector('[data-node-id="I192:3731;192:3386"]');muuk.setAttribute('aria-label','Muuk');muuk.dataset.genre='Elektronisk';muuk.addEventListener('click',()=>show('Muuk','Trance · Lineup 2027<br><br>Torsdag kl. 19:30, som angivet i designet.'));
$('#genre').addEventListener('click',()=>{const menu=$('#genre-menu');menu.hidden=!menu.hidden;$('#genre').setAttribute('aria-expanded',!menu.hidden);});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',x===b));const filter=b.dataset.filter;document.querySelectorAll('.lineup-canvas [data-genre]').forEach(x=>{const match=filter==='all'||x.dataset.genre===filter;x.querySelectorAll('img,p').forEach(y=>y.style.opacity=match?'1':'.18');});$('#filter-status').textContent=filter==='all'?'Alle genrer vises':`${filter} fremhævet`;}));
document.querySelectorAll('[data-year]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-year]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#selected-year').textContent=b.dataset.year;const track=$('.year-track');track.firstElementChild.style.top=((Number(b.dataset.year)-2022)*.195+.03)*track.clientHeight+'px';}));
document.querySelectorAll('.archive-artist').forEach(b=>b.addEventListener('click',()=>show(b.textContent,'Tidligere artist på UHØRT. Arkivets artistprofiler er endnu ikke tilføjet.')));
$('#share').addEventListener('click',async()=>{try{if(navigator.share)await navigator.share({title:document.title,url:location.href});else{await navigator.clipboard.writeText(location.href);const t=$('.toast');t.textContent='Link kopieret';t.hidden=false;setTimeout(()=>t.hidden=true,3000);}}catch(e){if(e.name!=='AbortError')show('Del UHØRT','Kopiér adressen fra browserens adresselinje for at dele siden.');}});
