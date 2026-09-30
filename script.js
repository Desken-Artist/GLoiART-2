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

  const makeLeaf=()=>{
    if(!document.body.contains(layer)) return;
    const leaf=document.createElement("span");
    leaf.className="falling-leaf";
    leaf.style.setProperty("--leaf-x",`${Math.random()*100}vw`);
    leaf.style.setProperty("--leaf-duration",`${8+Math.random()*6}s`);
    layer.appendChild(leaf);
    leaf.addEventListener("animationend",()=>leaf.remove(),{once:true});
  };
  const makeFlock=()=>{
    const count=3+Math.floor(Math.random()*3);
    for(let i=0;i<count;i++){
      const bird=document.createElement("div");
      bird.className="flock-bird";
      bird.style.setProperty("--bird-y",`${12+Math.random()*38}vh`);
      bird.style.setProperty("--bird-drift",`${-4+Math.random()*8}vh`);
      bird.style.setProperty("--bird-scale",`${.72+Math.random()*.35}`);
      bird.style.setProperty("--bird-duration",`${8+Math.random()*4}s`);
      bird.style.animationDelay=`${i*.18}s`;
      bird.innerHTML='<svg viewBox="0 0 48 28"><path d="M2 15c7-7 12-7 21 0 8-8 14-8 23-1-8-1-14 2-20 8-6-6-13-8-24-7z"/></svg>';
      layer.appendChild(bird);
      bird.addEventListener("animationend",()=>bird.remove(),{once:true});
    }
  };

  for(let i=0;i<3;i++) setTimeout(makeLeaf,i*1200);
  setInterval(makeLeaf,5000+Math.random()*2500);
  setTimeout(makeFlock,3500);
  setInterval(makeFlock,17000+Math.random()*8000);

  const special=document.createElement("div");
  special.className="special-bird";
  special.innerHTML='<svg viewBox="0 0 54 36"><g class="bird-head"><ellipse class="bird-body" cx="26" cy="19" rx="13" ry="9"/><circle class="bird-body" cx="39" cy="13" r="7"/><path class="bird-beak" d="M45 13l8 3-8 3z"/><circle class="bird-eye" cx="41" cy="11" r="1.2"/></g><path class="bird-wing" d="M15 19c5-9 13-9 18 0-6-2-10 1-13 6z"/></svg>';
  document.body.appendChild(special);
  const grain=document.createElement("div");
  grain.className="grain-specks";
  grain.innerHTML="<span></span><span></span><span></span><span></span>";
  document.body.appendChild(grain);

  let busy=false;
  const runButtonBird=()=>{
    if(busy || !document.body.contains(target) || target.offsetParent===null) return;
    busy=true;
    const r=target.getBoundingClientRect();
    const startX=-70, startY=Math.max(70,window.innerHeight*.18+Math.random()*window.innerHeight*.25);
    const landX=r.left+r.width/2-27;
    const landY=Math.max(8,r.top-31);
    special.style.transition="none";
    special.style.opacity="0";
    special.style.transform=`translate(${startX}px,${startY}px) rotate(-4deg)`;
    requestAnimationFrame(()=>{
      special.style.transition="transform 3.2s cubic-bezier(.35,.05,.2,1), opacity .25s ease";
      special.style.opacity="1";
      special.style.transform=`translate(${landX}px,${landY}px) rotate(0deg)`;
    });
    setTimeout(()=>{
      special.style.transition="transform .45s ease";
      special.style.transform=`translate(${landX}px,${Math.max(0,landY-8)}px) rotate(0deg)`;
      setTimeout(()=>{
        special.classList.add("pecking");
        const rr=target.getBoundingClientRect();
        grain.style.left=`${rr.left+rr.width*.58}px`;
        grain.style.top=`${rr.top+8}px`;
        grain.classList.add("visible");
      },220);
    },3300);
    setTimeout(()=>{
      special.classList.remove("pecking");
      grain.classList.remove("visible");
      const rr=target.getBoundingClientRect();
      const flyX=window.innerWidth+70;
      const flyY=Math.max(20,rr.top-130-Math.random()*80);
      special.style.transition="transform 2.7s cubic-bezier(.2,.5,.5,1), opacity .45s ease";
      special.style.transform=`translate(${flyX}px,${flyY}px) rotate(-8deg)`;
      special.style.opacity="0";
      setTimeout(()=>{busy=false; scheduleButtonBird();},3000);
    },6500);
  };
  const scheduleButtonBird=()=>setTimeout(runButtonBird,18000+Math.random()*16000);
  scheduleButtonBird();
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
