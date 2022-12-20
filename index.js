const video = document.querySelector('.player');
const playPauseIcon = document.querySelector('.paly-pause-button>i');
const playPauseButton = document.querySelector('.paly-pause-button');
const volumeProgressContainer = document.querySelector('.volume-progress-container');
const volumeProgressBar = document.querySelector('.volume-progress-bar');
const volumeIcon = document.querySelector('.volume-icon > i');
const currentTimeElement = document.querySelector('.current-time');
const durationTimeElement = document.querySelector('.duration-time');
const timeProgressBar = document.querySelector('.time-progress-bar');
const selectBox = document.querySelector('.video-speed');
const fullScreenButton = document.querySelector('.full-screen-button');
const pictureInPictureButton = document.querySelector('.picture-in-picture-button');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const progressDurationContainer = document.querySelector('.time-progress-container');
const progressDurationBar = document.querySelector('.time-progress-bar');

let isPlaying = false;


playPauseButton.addEventListener('click', () => isPlaying ? pauseVideo() : playVideo());
volumeProgressContainer.addEventListener('click', changeVolume);
video.addEventListener('timeupdate', changeVideoProgress);
video.addEventListener('ended', pauseVideo);
selectBox.addEventListener('change', changevideoSpeed);
fullScreenButton.addEventListener('click', toggleFullscreen);
pictureInPictureButton.addEventListener('click', togglePictureInPicture);
nextButton.addEventListener('dblclick', seekTo10SecondLater);
prevButton.addEventListener('dblclick',seekTo10SecondPrev);
progressDurationContainer.addEventListener('click', jumpIntoPosition);

function changevideoSpeed() {
    event.stopPropagation();
    video.playbackRate = selectBox.value;
}

function changeVolume(event) {
    event.stopPropagation();
    const width = this.clientWidth;
    const clickX = event.offsetX;
    video.volume = clickX / width;
    volumeProgressBar.style.width = clickX / width * 100 + '%';
    changeVolumeIcon();
}

function changeVolumeIcon() {

    if (video.volume === 0) {
        volumeIcon.className = "fa-solid fa-volume-off";
    }
    else if (video.volume > 0 && video.volume < .5) {
        volumeIcon.className = "fa-solid fa-volume-low";
    }
    else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}

function playVideo() {
    event.stopPropagation();
    isPlaying = true;
    playPauseIcon.classList.replace('fa-play', 'fa-pause');
    video.play();
}

function pauseVideo() {
    event.stopPropagation();
    isPlaying = false;
    playPauseIcon.classList.replace('fa-pause', 'fa-play');
    video.pause();
}

function changeVideoProgress() {
    event.stopPropagation();
    const { currentTime, duration } = video;
    const percentageProgress = currentTime / duration * 100;
    const time = formatTime(currentTime);
    const durationTime = formatTime(duration);
    currentTimeElement.textContent = time;
    durationTimeElement.textContent = durationTime;
    timeProgressBar.style.width = `${percentageProgress}%`;
}


function formatTime(number) {
    const minute = Math.floor(number / 60);
    let second = Math.floor(number % 60);
    if (second < 10) {
        second = `0${second}`;
    }
    return `${minute}:${second}`;
}


function toggleFullscreen() {
    event.stopPropagation();
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function togglePictureInPicture() {
    event.stopPropagation();
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture();
    }
}


function seekTo10SecondLater() {
    event.stopPropagation();
    this.disabled = true;
    const { currentTime, duration } = video;
    this.classList.add('clicked');
    if ((currentTime + 5.00) > duration) {
        return;
    }
    video.currentTime = currentTime + 5.00;
    setTimeout(() => {
        this.classList.remove('clicked');
        this.disabled = false;
    }, 2000)
}

function seekTo10SecondPrev() {
    event.stopPropagation();
    this.disabled = true;
    const { currentTime } = video;
    this.classList.add('clicked');
    if ((currentTime - 5.00) < 0) {
        return;
    }
    video.currentTime = currentTime - 5.00;
    setTimeout(() => {
        this.classList.remove('clicked');
        this.disabled = false;
    }, 2000)
}

function jumpIntoPosition(event) {
    event.stopPropagation();
    const width = this.clientWidth;
    const clickX = event.offsetX;
    video.currentTime = clickX / width * video.duration;
}