let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseButton = document.querySelector(".playpause-track");
let nextButton = document.querySelector(".next-track");
let prevButton = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let repeatTrack = document.querySelector(".repeat-track");
let currTrack = document.createElement("audio");

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let repeat = false;
let updateTimer;

const musicList = [
  {
    img: "assets/images/stay.png",
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    music: "assets/songs/stay.mp3",
  },
  {
    img: "assets/images/fallingdown.jpg",
    name: "Falling Down",
    artist: "Wid Cards",
    music: "assets/songs/fallingdown.mp3",
  },
  {
    img: "assets/images/faded.png",
    name: "Faded",
    artist: "Alan Walker",
    music: "assets/songs/Faded.mp3",
  },
  {
    img: "assets/images/ratherbe.jpg",
    name: "Rather Be",
    artist: "Clean Bandit",
    music: "assets/songs/Rather Be.mp3",
  },
];

load_track(trackIndex);

function load_track(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currTrack.src = musicList[trackIndex].music;

  trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
  trackName.textContent = musicList[trackIndex].name;
  trackArtist.textContent = musicList[trackIndex].artist;
  nowPlaying.textContent =
    "Playing music " + (trackIndex + 1) + " of " + musicList.length;

  updateTimer = setInterval(set_update, 1000);
  currTrack.addEventListener("ended", next_track);
  random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function fill_color(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }

  let color1 = fill_color("#");
  let color2 = fill_color("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + color1 + ", " + color2 + ")";
  document.body.style.background = gradient;
}

function reset() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

function random_track() {
  isRandom ? pause_random() : play_random();
}

function play_random() {
  isRandom = true;
  randomIcon.classList.add("random-active");
}

function pause_random() {
  isRandom = false;
  randomIcon.classList.remove("random-active");
}

function repeat_track() {
    repeat = !repeat;
    if(repeat){
        let currentIndex = trackIndex;
        load_track(currentIndex);
        play_track();
        repeatTrack.innerHTML = '<i class="fas fa-repeat-1 fa-2x"></i>';
    }
    else {
        repeatTrack.innerHTML = '<i class="fas fa-repeat fa-2x" title="repeat"></i>';
    }
}

function play_pause_track(){
    isPlaying ? play_track() : pause_track();
}

function play_track() {
  currTrack.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  wave.classList.add("loader");
  playPauseButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pause_track() {
  currTrack.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  wave.classList.remove("loader");
  playPauseButton.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function next_track() {
  if (trackIndex < musicList.length - 1) {
    if (isRandom === false) {
      trackIndex += 1;
    } else {
      // Selecting a random song from the list
      trackIndex = Number.parseInt(Math.random() * musicList.length);
    }
  } else {
    trackIndex = 0;
  }

  load_track(trackIndex);
  play_track();
}

function prev_track() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = musicList.length - 1;
  }
  load_track(trackIndex);
  play_track();
}

function seek_to() {
  let seekTo = currTrack.duration * (seekSlider.value / 100);
  currTrack.currentTime = seekTo;
}

function set_volume() {
  currTrack.volume = volumeSlider.value / 100;
}

function set_update() {
  let seekPos = 0;
  if (currTrack.duration !== NaN) {
    seekPos = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPos;

    let currentMinutes = Math.floor(currTrack.currTime / 60);
    let currentSeconds = Math.floor(
      currTrack.currTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(
      currTrack.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
