import Player from '@vimeo/player';
const _ = require('lodash');
const iFrame = document.querySelector('iframe');
const player = new Player(iFrame);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', _.throttle(onPlay, 1000));
player.on('loaded', updateTime);

function onPlay() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
  });
}

function updateTime() {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  player
    .setCurrentTime(savedTime)
    .then(function (seconds) {
      console.log(seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
      }
    });
}


