/* Create a responsive slide show in a modal.  Criteria is it takes both
portrait and landscape orientations and does not overflow the screen
triggering the scroll bar. */
(function () {
  var modal = document.getElementById("slide-modal"),
  slides = document.getElementsByClassName("slide"),
  modalImage = document.getElementById("modal-content"),
  n = document.getElementById("next"),
  p = document.getElementById("previous"),
  f = document.getElementById("full"),
  x = document.getElementById("close"),
  slideNumber = 1,
  beginning, ending, i;

    /* Make a click on the gallery image open the modal and display the 
    image. */
    for (i = 0; i < slides.length; i++) {
      slides[i].addEventListener("click", openModal); 
    }

    function openModal(event) {
      modal.style.display = "block";
      modalImage.src = event.target.src;
      slideNumber = parseInt(event.target.id);
    }

    // Allow the modal to be closed easily.
    modal.addEventListener("click", clickClose);
    x.addEventListener("click", clickClose);
    function clickClose(event) {
      if (event.target === modal || event.target === x) {
        modal.style.display = "none";
        closeFullScreen();
      }
    }

    // Show and hide the next, previous, and close buttons.
    window.addEventListener("mouseover", showControls);
    window.addEventListener("mouseout", hideControls);
    function showControls() {
      n.style.opacity = 1;
      p.style.opacity = 1;
      f.style.opacity = 1;
      x.style.opacity = 1;
    }

    function hideControls() {
      n.style.opacity = 0;
      p.style.opacity = 0;
      f.style.opacity = 0;
      x.style.opacity = 0;
    }

    // Activate the next and previous buttons.
    window.addEventListener("click", dirMouse);
    function dirMouse(event) {
      if (event.target === n) {
        changeSlide(1);
      } else if (event.target === p) {
        changeSlide(-1);
      }
    }
	
    // Allow for a moblie friendly swipe instead of next & previous buttons.
    modalImage.addEventListener("touchstart", getLoc);
    function getLoc(event) {
      beginning = event.touches[0].clientX;
    }

    modalImage.addEventListener("touchmove", getMoveLoc);
    function getMoveLoc(event) {
      ending = event.touches[0].clientX;
    }
    
    modalImage.addEventListener("touchend", dirTouch);
    function dirTouch(event) {
      if (ending === null) {return;}

      if (ending < (beginning - 50)) {
        changeSlide(1);
      } else if (ending > (beginning + 50)) {
        changeSlide(-1);
      }

      ending = null;
    }

    // Make the full screen button work properly.
    window.addEventListener("click", fullScreen);
    f.addEventListener("click", fullScreen);
    function fullScreen(event) {
      if (event.target === f) {
        if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement || document.msFullscreenElement) {
          closeFullScreen();
        } else if (modal.requestFullscreen) {
          modal.requestFullscreen();
        } else if (modal.mozRequestFullScreen) {
          modal.mozRequestFullScreen();
        } else if (modal.webkitRequestFullscreen) {
          modal.webkitRequestFullscreen();
        } else if (modal.msRequestFullscreen) {
          modal.msRequestFullscreen();
        }
      }
    }

    function closeFullScreen() {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    // Have the image source changed to display a different image.
    function changeSlide(d) {
      if (slideNumber == 1 && d === -1) {
        slideNumber = slides.length;
      } else if (slideNumber == (slides.length) && d === 1) {
        slideNumber = 1;
      } else {
        slideNumber += d;
      }

      modalImage.src = slides[slideNumber - 1].src;
    }
}()); 
