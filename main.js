const scrollVideo = document.getElementById("scrollVideo");
const scrollPrompt = document.getElementById("scrollPrompt");
const secondVideoContainer = document.getElementById("secondVideoContainer");
const autoplayVideo = document.getElementById("autoplayVideo");

let isFirstVideoEnded = false;

// Pause the first video initially
scrollVideo.pause();

// Dynamically adjust the scrollable area based on the first video's duration
const adjustScrollableArea = () => {
  const videoDuration = scrollVideo.duration;

  if (!isNaN(videoDuration)) {
    document.body.style.height = `${videoDuration * 100}vh`; // Set appropriate scroll height
  }
};

// Sync the scroll position with the first video's playback
const handleScrollForFirstVideo = () => {
  if (!isFirstVideoEnded) {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;

    const videoDuration = scrollVideo.duration;
    if (!isNaN(videoDuration)) {
      scrollVideo.currentTime = videoDuration * scrollFraction;
    }
  }
};

// Transition from the first video to the second video
const transitionToSecondVideo = () => {
  isFirstVideoEnded = true; // Mark the first video as ended
  scrollPrompt.classList.add("hidden"); // Hide the scroll prompt

  // Hide the first video with a fade-out effect
  scrollVideo.classList.add("fade-out");

  // Show the second video container and start playing the second video
  secondVideoContainer.classList.remove("hidden");
  secondVideoContainer.classList.add("fade-in");

  // Start playing the second video
  autoplayVideo.play().catch((error) => {
    console.error("Autoplay failed for the second video:", error);
    secondVideoContainer.addEventListener("click", () => autoplayVideo.play());
  });

  // Ensure the first video is completely removed after the transition
  setTimeout(() => {
    scrollVideo.style.display = "none";
  }, 1000); // Match the CSS transition duration
};

// Handle the first video ending
scrollVideo.addEventListener("ended", transitionToSecondVideo);

// Adjust the scrollable area when the first video's metadata is loaded
scrollVideo.addEventListener("loadedmetadata", () => {
  adjustScrollableArea();
  scrollVideo.currentTime = 0; // Reset video to start
});

// Handle scroll syncing for the first video
window.addEventListener("scroll", handleScrollForFirstVideo);
