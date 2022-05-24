"use strict";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function () {
            console.log('SW registered');
        });
}


const menuButton = document.getElementById('menu-button');
const menuCard = document.getElementById('menu-card');
const menuItems = document.getElementsByClassName('menu-item');
let menuVisible = false;


menuButton.addEventListener('click', function () {
    if (menuVisible) {
        move(0, -500, 'down');
    } else {
        move(-500, 0, 'up');
    }
    menuVisible = !menuVisible;
});

for (const item of menuItems) {
    item.addEventListener('click', function () {
        document.location.href = item.dataset.link;
    });
}

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