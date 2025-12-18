// import Event from './event.model';
// import Booking from './booking.model';

// export { Event, Booking };

document.addEventListener("DOMContentLoaded", function () {
    const minAmount = 3000;
    const noticeWrapper = document.querySelector(".free-shipping-notice-wrapper");
    if (!noticeWrapper) return;

    const messageEl = noticeWrapper.querySelector(".fsn-message");
    const closeBtn = noticeWrapper.querySelector(".fsn-close-btn");
    if (!messageEl || !closeBtn) return;

    function parsePrice(priceString) {
        let numStr = priceString.replace(/[^0-9.,]/g, "").replace(/,/g, "");
        return parseFloat(numStr) || 0;
    }

    function updateNotice(priceSpan) {
        const currentPrice = parsePrice(priceSpan.textContent);
        console.log("Current price parsed:", currentPrice);

        if (currentPrice >= minAmount) {
            messageEl.innerHTML =
                '<strong class="fsn-congrats">Congratulations! Shipping is free!</strong>';
        } else {
            const remaining = (minAmount - currentPrice).toFixed(2);
            messageEl.innerHTML =
                'Get free shipping if you order <strong class="fsn-remaining">₹' +
                remaining +
                "</strong> more!";
        }
    }

    function waitForPriceSpan() {
        const priceSpan = document.querySelector(
            ".wc-block-components-totals-footer-item-tax-value"
        );
        console.log(priceSpan);
        if (priceSpan) {
            updateNotice(priceSpan);

            // Setup MutationObserver to track updates if dynamic
            const observer = new MutationObserver(function () {
                updateNotice(priceSpan);
            });
            observer.observe(priceSpan, {
                childList: true,  // detect added/removed child nodes
                subtree: true,    // detect inside descendants (text nodes)
                characterData: true, // detect changes to text nodes
            });
            // Close button
            closeBtn.addEventListener("click", function () {
                noticeWrapper.style.display = "none";
            });
        } else {
            // Not found yet, try again shortly
            setTimeout(waitForPriceSpan, 200);
        }
    }

    waitForPriceSpan();
});