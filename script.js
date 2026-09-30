function whatsappUrl(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message||"Hello GLoiART, I would like to enquire about an artwork.")}`;}

function createArtworkCard(art,index){
  const m=`Hello GLoiART, I would like to enquire about "${art.title}".`;
  const c=document.createElement("article");
  c.className="art-card";
  c.innerHTML=`<div class="art-image-wrap"><img class="art-image" src="${art.image}" alt="${art.title}" loading="lazy"></div>
  <div class="art-info">
    <h3 class="art-title">${art.title}</h3>
    <div class="card-actions">
      <a class="small-button primary" href="artwork.html?id=${index}">View artwork</a>
      <a class="small-button whatsapp" href="${whatsappUrl(m)}" target="_blank" rel="noopener">BUY</a>
    </div>
  </div>`;
  return c;
}

function createNatureAnimations(){
  const layer=document.getElementById("natureAnimationLayer");
  const target=document.querySelector(".see-all-button");
  if(!layer || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const leafColors=["leaf-green","leaf-yellow","leaf-orange"];
  const leafTypes=["leaf-oval","leaf-maple","leaf-slim"];

  const makeLeaf=()=>{
    if(!document.body.contains(layer)) return;
    const leaf=document.createElement("span");
    leaf.className=`falling-leaf ${leafColors[Math.floor(Math.random()*leafColors.length)]} ${leafTypes[Math.floor(Math.random()*leafTypes.length)]}`;
    leaf.style.setProperty("--leaf-x",`${Math.random()*100}vw`);
    leaf.style.setProperty("--leaf-duration",`${8+Math.random()*6}s`);
    leaf.style.setProperty("--leaf-size",`${.72+Math.random()*.55}`);
    leaf.style.setProperty("--leaf-sway",`${5+Math.random()*8}vw`);
    layer.appendChild(leaf);
    leaf.addEventListener("animationend",()=>leaf.remove(),{once:true});
  };

  for(let i=0;i<5;i++) setTimeout(makeLeaf,i*900);
  setInterval(makeLeaf,2200+Math.random()*1800);

  const sun=document.createElement("div");
  sun.className="button-sun";
  sun.setAttribute("aria-hidden","true");
  sun.innerHTML='<span class="sun-core"></span><span class="sun-rays"></span>';
  layer.appendChild(sun);

  let sunBusy=false;
  const showSun=()=>{
    if(sunBusy || !document.body.contains(target) || target.offsetParent===null) return;
    sunBusy=true;
    const r=target.getBoundingClientRect();
    const x=r.left+r.width/2;
    const y=r.top+r.height/2;
    sun.style.left=`${x}px`;
    sun.style.top=`${y}px`;
    sun.classList.remove("sun-show");
    requestAnimationFrame(()=>sun.classList.add("sun-show"));
    setTimeout(()=>{
      sun.classList.remove("sun-show");
      setTimeout(()=>{sunBusy=false;scheduleSun();},9000+Math.random()*10000);
    },3000);
  };
  const scheduleSun=()=>setTimeout(showSun,11000+Math.random()*12000);
  scheduleSun();
}

function init(){
  const g=document.getElementById("galleryGrid");
  if(g){
    g.replaceChildren(...ARTWORKS.slice(0,4).map(createArtworkCard));
    const seeAllWrap=document.getElementById("seeAllWrap");
    if(seeAllWrap) seeAllWrap.hidden=ARTWORKS.length<=4;
  }

  const m="Hello GLoiART, I would like to know more about your artworks.";
  const email=document.getElementById("ctaEmail");
  if(email) email.href=`mailto:${CONTACT_EMAIL}`;
  const social={socialTikTok:TIKTOK_URL,socialFacebook:FACEBOOK_URL,socialYouTube:YOUTUBE_URL,socialInstagram:INSTAGRAM_URL,socialWhatsApp:whatsappUrl("Hello GLoiART, I would like to contact you.")};
  Object.entries(social).forEach(([id,url])=>{const el=document.getElementById(id);if(el&&url)el.href=url;});

  const toggle=document.getElementById("menuToggle");
  const nav=document.getElementById("mainNav");
  if(toggle&&nav){
    toggle.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      toggle.classList.toggle("open",open);
      toggle.setAttribute("aria-expanded",String(open));
      toggle.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");
    });
    nav.querySelectorAll("a[href^='#']").forEach(a=>a.addEventListener("click",()=>{
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
      toggle.setAttribute("aria-label","Open navigation menu");
    }));
  }

  createNatureAnimations();

  const y=document.getElementById("year");
  if(y)y.textContent=new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded",init);
