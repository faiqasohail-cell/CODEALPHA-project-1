// Tabs Filter + Auto Scroll

const tabs = document.querySelectorAll(".tab-btn");
const items = document.querySelectorAll(".gallery-item");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.dataset.category;

    if(category === "all") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(category);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Lightbox + Swipe + Next/Prev Buttons

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;

// Function to show lightbox image
function showLightboxImage(index) {
  if(index < 0) index = 0;
  if(index >= items.length) index = items.length - 1;
  currentIndex = index;
  lightboxImg.src = items[currentIndex].src;
}

// Open lightbox
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    lightbox.style.display = "flex";
    showLightboxImage(currentIndex);
  });
});

// Close lightbox
closeBtn.addEventListener("click", () => lightbox.style.display = "none");
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.style.display = "none";
});


// Next / Previous Buttons

const nextBtn = document.createElement("button");
nextBtn.textContent = "›";
nextBtn.className = "lightbox-next";
const prevBtn = document.createElement("button");
prevBtn.textContent = "‹";
prevBtn.className = "lightbox-prev";

lightbox.appendChild(prevBtn);
lightbox.appendChild(nextBtn);

nextBtn.addEventListener("click", () => {
  if(currentIndex < items.length - 1) currentIndex++;
  showLightboxImage(currentIndex);
});

prevBtn.addEventListener("click", () => {
  if(currentIndex > 0) currentIndex--;
  showLightboxImage(currentIndex);
});


// Swipe / Drag functionality
let startX = 0;
let isDragging = false;

// Mobile swipe
lightboxImg.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

lightboxImg.addEventListener('touchend', e => {
  if(!isDragging) return;
  let diff = startX - e.changedTouches[0].clientX;
  if(diff > 50 && currentIndex < items.length - 1) currentIndex++;
  else if(diff < -50 && currentIndex > 0) currentIndex--;
  showLightboxImage(currentIndex);
  isDragging = false;
});

// Desktop drag
lightboxImg.addEventListener('mousedown', e => {
  startX = e.clientX;
  isDragging = true;
});

lightboxImg.addEventListener('mouseup', e => {
  if(!isDragging) return;
  let diff = startX - e.clientX;
  if(diff > 50 && currentIndex < items.length - 1) currentIndex++;
  else if(diff < -50 && currentIndex > 0) currentIndex--;
  showLightboxImage(currentIndex);
  isDragging = false;
});
