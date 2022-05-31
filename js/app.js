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
const sections = document.getElementsByClassName('section');
const locationButton = document.getElementById('location');

let menuVisible = false;
document.getElementById('info').style.display = 'block';

locationButton.addEventListener('click', () => {
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                document.querySelector('#myLocation').textContent = data.city;
            })
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFydHJvb3NlbiIsImEiOiJjbDNzcnQzc3YwMzdvM2Zxc2ZhMnJhMzRpIn0.ylhl966SCVVv6Qq9lj6GFQ';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [longitude, latitude], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        const marker1 = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map);
        // document.getElementById('map').style.display = 'block';
    }

    const error = () => {
        document.querySelector('#myLocation').textContent = 'Geolocation blocked';
    }

    navigator.geolocation.getCurrentPosition(success, error);
});

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
        console.log(item.dataset.link);
        for (const section of sections) {
            section.style.display = 'none';
        }
        document.getElementById(item.dataset.link).style.display = 'block';
        move(0, -500, 'down');
        menuVisible = !menuVisible;
        document.getElementById('title').innerHTML = item.dataset.link;
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