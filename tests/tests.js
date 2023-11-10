const {
  play_track,
//   playPauseButton,
  pauseTrack,
  playpauseTrack,
} = require("../script.js");

describe("Music Player Tests", () => {
  beforeEach(() => {
    // Initially music is not playing
    // isPlaying = false;
    // innerHTMLSetter.mockClear();
  });

  test("play_track should set isPlaying to true", () => {
    expect(play_track()).toBe(true);
  });

  test("play_track should update innerHTML of the playPauseButton", () => {
    const innerHTMLSetter = jest.fn();
    Object.defineProperty(playPauseButton, "innerHTML", {
      set: innerHTMLSetter,
    });

    // Assert that innerHTML was set with the expected value
    expect(innerHTMLSetter).toHaveBeenCalledWith(
      '<i class="fa fa-pause-circle fa-5x"></i>'
    );
  });
});
