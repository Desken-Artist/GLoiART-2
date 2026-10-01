function whatsappUrl(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message||"Hello GLoiART, I would like to enquire about an artwork.")}`;}

function createArtworkCard(art,index){
  const m=`Hello GLoiART, I would like to enquire about "${art.title}".`;
  const c=document.createElement("article");
  c.className="art-card";
  c.innerHTML=`<div class="art-image-wrap"><img class="art-image" src="${art.image}" alt="${art.title}" loading="lazy"></div>
  <div class="art-info">
    <h3 class="art-title">${art.title}</h3>
    <div class="card-actions">
      <a class="small-button primary" href="artwork.html?id=${index}">${tr("viewArtwork")}</a>
      <a class="small-button whatsapp" href="${whatsappUrl(m)}" target="_blank" rel="noopener">${tr("buy")}</a>
    </div>
  </div>`;
  return c;
}

function createNatureAnimations(){
  const layer=document.getElementById("natureAnimationLayer");
  if(!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const leafColors=["leaf-green","leaf-yellow","leaf-orange"];
  const leafTypes=["leaf-oval","leaf-maple","leaf-slim"];
  const maxLeaves=3;

  const makeLeaf=()=>{
    if(!document.body.contains(layer)) return;
    if(layer.querySelectorAll(".falling-leaf").length >= maxLeaves) return;
    const leaf=document.createElement("span");
    leaf.className=`falling-leaf ${leafColors[Math.floor(Math.random()*leafColors.length)]} ${leafTypes[Math.floor(Math.random()*leafTypes.length)]}`;
    leaf.style.setProperty("--leaf-x",`${Math.random()*100}vw`);
    leaf.style.setProperty("--leaf-duration",`${9+Math.random()*5}s`);
    leaf.style.setProperty("--leaf-size",`${.72+Math.random()*.55}`);
    leaf.style.setProperty("--leaf-sway",`${5+Math.random()*8}vw`);
    layer.appendChild(leaf);
    leaf.addEventListener("animationend",()=>leaf.remove(),{once:true});
  };

  makeLeaf();
  setTimeout(makeLeaf,1600);
  setTimeout(makeLeaf,3200);
  setInterval(makeLeaf,5000+Math.random()*2500);
}

function init(){
  if(typeof applyLanguage === "function") applyLanguage();
  const g=document.getElementById("galleryGrid");
  if(g){
    g.replaceChildren();
    if(ARTWORKS.length){
      g.append(...ARTWORKS.slice(0,4).map(createArtworkCard));
    } else {
      const empty=document.createElement("div");
      empty.className="gallery-coming-soon";
      empty.innerHTML=`
        <h3>${tr("comingSoonTitle")}</h3>
        <p class="coming-soon-subtitle">${tr("comingSoonSubtitle")}</p>
        <p class="coming-soon-invite">${tr("comingSoonInvite")}</p>
        <a class="button button-gold community-button" id="whatsappCommunityLink" href="#" target="_blank" rel="noopener">${tr("joinCommunity")}</a>
      `;
      g.appendChild(empty);
      const communityLink=document.getElementById("whatsappCommunityLink");
      if(communityLink && typeof WHATSAPP_COMMUNITY_URL !== "undefined" &&
         WHATSAPP_COMMUNITY_URL && WHATSAPP_COMMUNITY_URL !== "PASTE_YOUR_WHATSAPP_GROUP_LINK_HERE"){
        communityLink.href=WHATSAPP_COMMUNITY_URL;
      } else if(communityLink){
        communityLink.href="#";
        communityLink.addEventListener("click", event => {
          event.preventDefault();
          alert("Add your WhatsApp group invite link in config.js first.");
        });
      }
    }
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
