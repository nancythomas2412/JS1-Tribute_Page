document.addEventListener("DOMContentLoaded", () => {

  // dark/light mode

  const toggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Apply saved theme on page load
  document.body.classList.add(`${currentTheme}-mode`);
  toggleButton.textContent = currentTheme === "dark" ? "Light" : "Dark";

  // Add event listener for toggle
  toggleButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Toggle the theme
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Update button text and save the new theme
    if (isDarkMode) {
      toggleButton.textContent = "Dark";
      localStorage.setItem("theme", "light");
    } else {
      toggleButton.textContent = "Light";
      localStorage.setItem("theme", "dark");
    }
  });

  ////////////////////

    // Remove fragment from URL to prevent scrolling to #pageTwo on reload
    if (window.location.hash) {
      history.replaceState(null, null, window.location.href.split('#')[0]);
    }

    // Smooth scroll on arrow click
    const scrollArrow = document.querySelector(".scroll-arrow");
    scrollArrow.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const target = document.querySelector(scrollArrow.dataset.scrollTarget);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  
  
  
  // Add Event Form functionality

  // Base height of the timeline line
  let baseHeight = 156; // in vw
  const heightIncrement = 9; // Height increment per new event in vw

  const form = document.getElementById("timeline-form");
  const timelineContainer = document.querySelector(".timeline-container");
  const yearInput = document.getElementById("event-year");
  const descInput = document.getElementById("event-desc");

  //Load events from localStorage on page load
  loadEvents();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const year = yearInput.value.trim();
    const description = descInput.value.trim();

    // Validate inputs
    if (!year || !description) {
      alert("Please fill out both fields!");
      return;
    }

   // Create a new timeline item and save it to localStorage
   const newEvent = { year, description };
   saveEvent(newEvent);

   // Clear the form fields
   yearInput.value = "";
   descInput.value = "";

   // Update the timeline height
   updateTimelineLineHeight();
 });

 function saveEvent(event) {
   const events = getEvents();
   events.push(event);
   localStorage.setItem("timelineEvents", JSON.stringify(events));
   addTimelineItem(event); // Add the event to the DOM
 }

 function getEvents() {
   return JSON.parse(localStorage.getItem("timelineEvents")) || [];
 }

 function addTimelineItem(event) {
   const { year, description } = event;

   const newTimelineItem = document.createElement("article");
   newTimelineItem.classList.add("timeline-item");

   newTimelineItem.innerHTML = `
     <div class="timeline-year">
       <p>${year}</p>
     </div>
     <div class="timeline-content">
       <p>${description}</p>
     </div>
   `;

   timelineContainer.appendChild(newTimelineItem);
 }

 function loadEvents() {
   const events = getEvents();

   events.forEach((event) => {
     addTimelineItem(event);
   });

   // Update the base height for the timeline
   baseHeight += events.length * heightIncrement;
   updateTimelineLineHeight(true);
 }

 function updateTimelineLineHeight(skipIncrement = false) {
   const timelineContainerStyle = document.querySelector(".timeline-container");
   if (!skipIncrement) baseHeight += heightIncrement; // Increment only if not skipped
   timelineContainerStyle.style.setProperty(
     "--timeline-line-height",
     `${baseHeight}vw`
   );
 }
});
  
