window.onload = function () {
  const spans = document.querySelectorAll(".display-text span");

  // check if the spans exist
  // if they do, loop through them and set the --index variable
  // if the index is 0 or the last index, set the --index variable to the index
  // if the index is between 1 and 4, set the --index variable to the index
  // if the index is between 5 and 9, set the --index variable to the index - 1
  if (spans.length > 0) {
    spans.forEach((span, index) => {
      if (index === 0 || index === spans.length - 1) {
        span.style.setProperty("--index", index);
      } else if (index >= 1 && index <= 4) {
        span.style.setProperty("--index", index);
      } else if (index >= 5 && index <= 9) {
        span.style.setProperty("--index", index - 1);
      }
    });
  }

  function updateClock() {
    // get the clock element
    const clockElement = document.querySelector(".clock > p");
    // get the current time
    const currentTime = new Date();
    // get the hours, minutes, and seconds
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    let period = "am";

    // if the hours is greater than or equal to 12
    // set the period to "pm"

    if (hours >= 12) {
      period = "pm";
      hours = hours % 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    // format the time
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    clockElement.textContent = formattedTime;
  }

  setInterval(updateClock, 1000);

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".off-canvas-menu");
  const links = document.querySelectorAll(".off-canvas-menu a");
  const linkSpans = document.querySelectorAll("span.inner");
  let transitioning = false;

  // Add an event listener to the "toggle" element when clicked
  toggle.addEventListener("click", () => {
    // Toggle the "menu-toggle--open" class on the "toggle" element
    toggle.classList.toggle("menu-toggle--open");
    // Toggle the "off-canvas-menu--open" class on the "menu" element
    menu.classList.toggle("off-canvas-menu--open");

    // If the "menu" element has the "off-canvas-menu--open" class
    if (menu.classList.contains("off-canvas-menu--open")) {
      // Set the "transitioning" flag to true
      transitioning = true;
      // Set the "aria-expanded" attribute of the "toggle" element to true
      toggle.setAttribute("aria-expanded", true);

      // Loop through each "link" element
      links.forEach((link) => {
        // Set the "tabindex" attribute of the "link" element to 0
        link.setAttribute("tabindex", 0);
        // Add the "in-view" class to the "link" element
        link.classList.add("in-view");
      });

      // Loop through each "span" element within "linkSpans"
      linkSpans.forEach((span, index) => {
        // If the "span" element has the "inner" class
        if (span.classList.contains("inner")) {
          // Set the "transitionDelay" style property of the "span" element
          // based on its index multiplied by 0.05 seconds
          span.style.transitionDelay = index * 0.05 + "s";
        }
      });

      // Set the "transitioning" flag to false
      transitioning = false;

      // Add a "transitionend" event listener to the "menu" element
      menu.addEventListener("transitionend", () => {
        // If not currently transitioning
        if (!transitioning) {
          // Loop through each "span" element within "linkSpans"
          linkSpans.forEach((span, index) => {
            // If the "span" element has the "inner" class
            if (span.classList.contains("inner")) {
              // Reset the "transitionDelay" style property of the "span" element to "0s"
              span.style.transitionDelay = "0s";
            }
          });
        }
      });
    } else {
      // Set the "aria-expanded" attribute of the "toggle" element to false
      toggle.setAttribute("aria-expanded", false);
      // Loop through each "link" element
      links.forEach((link) => {
        // Set the "tabindex" attribute of the "link" element to -1
        link.setAttribute("tabindex", -1);
        // Remove the "in-view" class from the "link" element
        link.classList.remove("in-view");
      });
    }
  });

  // adds an event listener to the document for the "keydown" event. When a key is pressed, the code checks if a specific menu element has a CSS class of "off-canvas-menu--open". If the menu is open:
  // It creates an array called focusableElements that contains the toggle element and all elements in the links array.
  // It assigns the first element of the focusableElements array to the variable firstElement.
  // It assigns the last element of the focusableElements array to the variable lastElement.

  document.addEventListener("keydown", (event) => {
    if (menu.classList.contains("off-canvas-menu--open")) {
      const focusableElements = [toggle, ...links];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === "Tab") {
        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
    }
  });
};
