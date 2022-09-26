'use strict';
const throttle = require('lodash.throttle');
import Player from '@vimeo/player';

const URRENT_POSITION_PLAYBACK_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const saveInLocalStorage = function (data) {
  const savedValueInLocalStorage = JSON.stringify(data.seconds);
  localStorage.setItem(URRENT_POSITION_PLAYBACK_KEY, savedValueInLocalStorage);
};

let loadedValueWithLocalStorage = localStorage.getItem(
  URRENT_POSITION_PLAYBACK_KEY
);

player.on('timeupdate', throttle(saveInLocalStorage, 1000));

player
  .setCurrentTime(Number(loadedValueWithLocalStorage))
  .then()
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
