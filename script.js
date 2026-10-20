let slides = [];
let currentSlide = 0;

let input = document.getElementById("markdownInput");
let preview = document.getElementById("slidePreview");

// Convert Markdown text into HTML
function convertText(text) {
  text = text.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  text = text.replace(/^- (.*)$/gm, "<li>$1</li>");
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  return text.replace(/\n/g, "<br>");
}

// Separate slides using ---
function createSlides() {
  slides = input.value.split("---");

  currentSlide = Math.min(
    currentSlide,
    slides.length - 1
  );

  showSlide();
}

// Display the current slide
function showSlide() {
  if (slides.length === 0) return;

  preview.innerHTML = convertText(slides[currentSlide]);

  document.getElementById("slideCount").innerText =
    (currentSlide + 1) + " / " + slides.length;

  document.getElementById("presentationSlide").innerHTML =
    convertText(slides[currentSlide]);

  document.getElementById("presentationCount").innerText =
    (currentSlide + 1) + " / " + slides.length;

  document.getElementById("prevBtn").disabled =
    currentSlide === 0;

  document.getElementById("presentPrevBtn").disabled =
    currentSlide === 0;

  document.getElementById("nextBtn").disabled =
    currentSlide === slides.length - 1;

  document.getElementById("presentNextBtn").disabled =
    currentSlide === slides.length - 1;
}

// Next slide
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide();
  }
}

// Previous slide
function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide();
  }
}

// Save slides in browser
function saveSlides() {
  localStorage.setItem("mySlides", input.value);
  alert("Slides Saved!");
}

// Start presentation
function presentSlides() {
  document.getElementById("editorPage").classList.add("hidden");
  document.getElementById("presentationPage").classList.remove("hidden");
}

// Exit presentation
function exitPresentation() {
  document.getElementById("presentationPage").classList.add("hidden");
  document.getElementById("editorPage").classList.remove("hidden");
}

// Full screen
function fullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Connect buttons
document.getElementById("saveBtn").onclick = saveSlides;
document.getElementById("presentBtn").onclick = presentSlides;

document.getElementById("prevBtn").onclick = previousSlide;
document.getElementById("nextBtn").onclick = nextSlide;

document.getElementById("presentPrevBtn").onclick = previousSlide;
document.getElementById("presentNextBtn").onclick = nextSlide;

document.getElementById("exitBtn").onclick = exitPresentation;
document.getElementById("fullBtn").onclick = fullScreen;

// Update preview while typing
input.oninput = createSlides;

// Keyboard shortcuts
document.onkeydown = function(event) {
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") previousSlide();

  if (event.ctrlKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    saveSlides();
  }

  if (event.key === "F11") {
    event.preventDefault();
    fullScreen();
  }
};

// Load saved slides
let saved = localStorage.getItem("mySlides");

if (saved) {
  input.value = saved;
}

// Start the application
createSlides();