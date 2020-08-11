class Drumkit {
  constructor() {
    this.playButton = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.selects = document.querySelectorAll("select");
  }

  repeat() {
    let step = this.index % 10;
    this.index++;
    const activePads = document.querySelectorAll(`.b${step}`);

    activePads.forEach((activePad) => {
      activePad.style.animation = `play-track 0.3s alternate ease-in-out 2`;

      if (activePad.classList.contains("active")) {
        if (activePad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        } else if (activePad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        } else if (activePad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
  }

  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateButton() {
    if (this.isPlaying) {
      this.playButton.innerHTML = `Pause <i class="fas fa-pause-circle"></i>`;
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerHTML = `Play <i class="fas fa-play-circle"></i>`;
      this.playButton.classList.remove("active");
    }
  }

  activatePad() {
    this.classList.toggle("active");
  }

  changeSound(e) {
    const selectionName = e.target.dataset.audio;
    const selectionValue = e.target.value;

    this[selectionName].src = selectionValue;
  }
}

const drumkit = new Drumkit();

//event listeners

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activatePad);
});

drumkit.pads.forEach((pad) => {
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.playButton.addEventListener("click", function () {
  drumkit.start();
  drumkit.updateButton();
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});
