var mode = 0;
function grayscale() {
  document.getElementById("leasroom").style.filter = "grayscale(100%)";

  if (mode === 0) {
    mode = 1;
  } else {
    document.getElementById("leasroom").style.filter = "none";
    mode = 0;
  }
}

function toggleSlide(el) {
  var elem = document.getElementById(el);

  // Check if the element is currently visible
  var isVisible = elem.clientHeight !== 0;

  // Toggle between sliding up and sliding down
  if (isVisible) {
    // If visible, slide up
    elem.style.height = "0px";
  } else {
    // If hidden, slide down
    elem.style.height = "75px"; // Adjust the height as needed
  }
}
