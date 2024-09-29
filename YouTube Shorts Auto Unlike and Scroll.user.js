// ==UserScript==
// @name         YouTube Shorts Auto Unlike and Scroll
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Automatically unlikes YouTube Shorts videos and scrolls to the next one.
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// @author       Abayus/Dazirar
// @updateURL    https://github.com/Dazirar/YouTube-Shorts-Auto-Unlike-and-Scroll/raw/refs/heads/main/YouTube%20Shorts%20Auto%20Unlike%20and%20Scroll.user.js
// @downloadURL  https://github.com/Dazirar/YouTube-Shorts-Auto-Unlike-and-Scroll/raw/refs/heads/main/YouTube%20Shorts%20Auto%20Unlike%20and%20Scroll.user.js
// ==/UserScript==

// To use the script navigate to liked videos from https://www.youtube.com/playlist?list=LL , click one short and then the script will do the rest

(function() {
    'use strict';

    // Function to unlike the current Shorts video
    function unlikeVideo() {
        // Selector for the like button in Shorts player
        const likeButton = document.querySelector('ytd-reel-player-overlay-renderer #like-button button[aria-pressed="true"]');
        if (likeButton) {
            console.log('Unliking video...');
            likeButton.click();
        } else {
            console.log('Video is not liked or like button not found.');
        }
    }

    // Function to get element by XPath
    function getElementByXPath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Function to scroll to the next Shorts video by clicking the scroll button
    function scrollToNextShortsVideo() {
        console.log('Scrolling to next Shorts video...');
        // Using the selector you provided
        const scrollButton = document.querySelector('#navigation-button-down div.yt-spec-touch-feedback-shape__fill');
        if (scrollButton) {
            scrollButton.click();
        } else {
            // Fallback to the XPath selector you provided
            const alternativeScrollButton = getElementByXPath('//*[@id="navigation-button-down"]/ytd-button-renderer/yt-button-shape/button/yt-touch-feedback-shape/div/div[2]');
            if (alternativeScrollButton) {
                alternativeScrollButton.click();
            } else {
                console.log('Scroll button not found.');
            }
        }
    }

    // Function to process the current Shorts video
    function processShortsVideo() {
        unlikeVideo();
        setTimeout(scrollToNextShortsVideo, 2000); // Wait 2 seconds before scrolling
    }

    // Function to observe navigation events
    function observeNavigation() {
        // Use YouTube's 'yt-page-data-updated' event to detect navigation within the SPA
        window.addEventListener('yt-page-data-updated', () => {
            console.log('Navigation event detected');
            main();
        });
    }

    // Main function
    function main() {
        const url = window.location.href;

        if (url.includes('/shorts/')) {
            console.log('Processing Shorts video...');
            setTimeout(processShortsVideo, 1000); // Wait 1 second to allow the video to load
        }
    }

    // Start observing navigation
    observeNavigation();

    // Initial call
    main();

})();
