/**
 * Pack Mundialista 2026 - Landing Page Interactive Logic
 * Fully optimized for performance and rapid mobile interaction.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize components
    initCountdownTimer();
    initFAQAccordion();
    initWhatsAppAnalytics();
});

/* ==========================================================================
   1. DIGITAL COUNTDOWN TIMER (Urgency Mechanism)
   ========================================================================== */
function initCountdownTimer() {
    const timerElement = document.getElementById("countdown-timer");
    if (!timerElement) return;

    // Set countdown duration (15 minutes in seconds)
    const countdownDuration = 15 * 60;
    
    // Check if there's a saved target timestamp in sessionStorage to keep timer consistent on refresh
    let targetTime = sessionStorage.getItem("countdown_target_time");
    
    if (!targetTime) {
        targetTime = Date.now() + countdownDuration * 1000;
        sessionStorage.setItem("countdown_target_time", targetTime);
    } else {
        targetTime = parseInt(targetTime, 10);
        // If the saved target time has already passed, reset it for a new session
        if (Date.now() >= targetTime) {
            targetTime = Date.now() + countdownDuration * 1000;
            sessionStorage.setItem("countdown_target_time", targetTime);
        }
    }

    function updateTimer() {
        const remainingTimeMs = targetTime - Date.now();
        
        if (remainingTimeMs <= 0) {
            // When timer reaches 0, auto-reset it to maintain urgency for next user loop
            const newTarget = Date.now() + countdownDuration * 1000;
            sessionStorage.setItem("countdown_target_time", newTarget);
            targetTime = newTarget;
            timerElement.textContent = "15:00";
            return;
        }

        const totalSeconds = Math.floor(remainingTimeMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Format MM:SS with leading zeroes
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }

    // Run immediately and then poll every second
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. FAQ ACCORDION INTERACTION
   ========================================================================== */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const answer = item.querySelector(".faq-answer");
            const isActive = item.classList.contains("active");

            // Close all other FAQ items for a cleaner accordion feel
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            // Toggle active state for clicked item
            if (isActive) {
                item.classList.remove("active");
                answer.style.maxHeight = null;
            } else {
                item.classList.add("active");
                // Set max-height dynamically based on scrollHeight for a smooth transition
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

/* ==========================================================================
   3. LIGHTBOX GALLERY (Fullscreen Zoom View)
   ========================================================================== */
function openLightbox(imageSrc, captionText) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightbox.style.display = "block";
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = captionText;

    // Prevent body scrolling while lightbox is active
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    lightbox.style.display = "none";
    
    // Restore body scrolling
    document.body.style.overflow = "auto";
}

// Close lightbox on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

/* ==========================================================================
   4. WHATSAPP CLICK TRACKING / CUSTOM ANALYTICS (Optional hook)
   ========================================================================== */
function initWhatsAppAnalytics() {
    const trackingIds = ["hero-cta", "final-cta", "whatsapp-sticky"];
    
    trackingIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener("click", (e) => {
                // Log clicks to console for testing or integration with Meta pixel custom event
                console.log(`[CRO Event] Clicked WhatsApp Button: ${id}`);
                
                // You can add your Meta Pixel tracking code here, e.g.:
                // if (typeof fbq !== 'undefined') {
                //     fbq('trackCustom', 'WhatsAppClick', { position: id });
                // }
            });
        }
    });
}
