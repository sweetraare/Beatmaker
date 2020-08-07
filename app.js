class Drumkit {
  constructor() {
    this.playButton = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
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

    setInterval(() => {
      this.repeat();
    }, interval);
  }

  activatePad() {
    this.classList.toggle("active");
  }
}

const drumkit = new Drumkit();

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
});
