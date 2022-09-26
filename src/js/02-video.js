import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const URRENT_POSITION_PLAYBACK = 'videoplayer-current-time';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const player = new Player(iframe);
const throttleSaveCurrentTime = throttle(saveCurrentTime, 1000);

player.on('timeupdate', throttleSaveCurrentTime);

function saveCurrentTime(data) {
  const videoStopTime = data.seconds;
  save(URRENT_POSITION_PLAYBACK, videoStopTime);
}

player.setCurrentTime(load(URRENT_POSITION_PLAYBACK));
