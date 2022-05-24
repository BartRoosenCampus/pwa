"use strict";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function () {
            console.log('SW registered');
        });
}


const menuButton = document.getElementById('menu-button');
const menuCard = document.getElementById('menu-card');
let menuVisible = false;


menuButton.addEventListener('click', function () {
    if (menuVisible) {
        move(0, -500, 'down');
    } else {
        move(-500, 0, 'up');
    }
    menuVisible = !menuVisible;
});

function move(from, to, direction) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame, 1);
    function frame() {
        if (from === to) {
            clearInterval(id);
        } else {
            if ('up' === direction) {
                from += 10;
            } else {
                from -= 10;
            }

            menuCard.style.left = from + "px";
        }
    }
}