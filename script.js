function whatsappUrl(message) {
  const text = encodeURIComponent(message || "Hello GLoiART, I would like to enquire about an artwork.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function createArtworkCard(art, index) {
  const sold = !art.original;
  const card = document.createElement("article");
  card.className = "art-card";

  const waMessage = `Hello GLoiART, I would like to enquire about "${art.title}".`;
  card.innerHTML = `
    <div class="art-image-wrap">
      <img class="art-image" src="${art.image}" alt="${art.title}" loading="lazy">
    </div>
    <div class="art-info">
      <h3 class="art-title">${art.title}</h3>
      <p class="art-description">${art.description}</p>
      <div class="meta-row">
        <span class="availability ${sold ? "sold" : ""}">${art.availability}</span>
      </div>
      <div class="card-actions">
        <a class="small-button whatsapp" href="${whatsappUrl(waMessage)}" target="_blank" rel="noopener">WhatsApp</a>
        <button class="small-button primary" type="button" aria-expanded="false">View artwork</button>
      </div>
      <details class="details">
        <summary>Artwork details</summary>
        <div class="details-content">
          <div class="detail-copy">
            <span class="video-label">About the artwork</span>
            <h3>${art.title}</h3>
            <p>${art.story}</p>
          </div>
          <div>
            <span class="video-label">Creation process</span>
            <video class="process-video" controls preload="metadata">
              <source src="${art.processVideo}" type="video/mp4">
              Your browser does not support HTML5 video.
            </video>
            <p class="video-missing-note" style="font-size:.75rem;color:#68736d;margin:6px 0 0;">Replace the sample video file with your own process video.</p>
          </div>
          <div class="print-box">
            <strong>Print availability</strong>
            <p>${art.print}</p>
          </div>
          <a class="small-button primary" href="${whatsappUrl(waMessage)}" target="_blank" rel="noopener">Enquire about this artwork</a>
        </div>
      </details>
    </div>
  `;

  const button = card.querySelector(".card-actions button");
  const details = card.querySelector("details");
  button.addEventListener("click", () => {
    details.open = !details.open;
    button.setAttribute("aria-expanded", details.open ? "true" : "false");
    button.textContent = details.open ? "Hide artwork" : "View artwork";
    if (details.open) details.scrollIntoView({behavior:"smooth", block:"nearest"});
  });

  return card;
}

function init() {
  document.getElementById("galleryGrid").replaceChildren(
    ...ARTWORKS.map(createArtworkCard)
  );

  const defaultMessage = "Hello GLoiART, I would like to know more about your artworks.";
  document.getElementById("navWhatsApp").href = whatsappUrl(defaultMessage);
  document.getElementById("ctaWhatsApp").href = whatsappUrl(defaultMessage);
  document.getElementById("year").textContent = new Date().getFullYear();

  // If the placeholder number is still present, show a clear developer reminder.
  if (WHATSAPP_NUMBER.includes("X")) {
    console.warn("GLoiART: Replace WHATSAPP_NUMBER in config.js with your real WhatsApp number.");
  }
}
document.addEventListener("DOMContentLoaded", init);
