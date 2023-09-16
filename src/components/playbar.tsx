 

//@ts-ignore
function PlayBar(props) {
 

  function secondsToTime(seconds: any) {
    //const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

 
    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const wave = () => {
    var Arr = [];
    for (var i = 0; i < 30; i++) {
      Arr.push({ key: i });
    }
    return Arr;
  };

  const handleSeek = (e: any) => {
    props.audioPlayer.current.mute(true);
    const newPosition = e.target.value;
    props.setSeekN(newPosition);
    props.audioPlayer.current.seek(newPosition);
  };

  const handleChange = () => {
    props.audioPlayer.current.seek(props.seekN);
    props.audioPlayer.current.mute(false);
  };

  const changeVolume = (e: any) => {
    const newVolume = e.target.value;
    props.audioPlayer.current.volume(newVolume / 100);
    props.SetVolume(newVolume);
  };

function nextSong() {
    console.log("NEXT");

    if (props.playingQueue) {
      if (props.queueTracker + 1 < props.stateQueue.length) {
        //@ts-ignore
        props.setQueueTracker((prevCounter) => prevCounter + 1);
        
      } else {
        props.setQueueTracker(0);
      }
    }
  }

function prevSong() {
    console.log("NEXT");

    if (props.playingQueue) {
      if (props.queueTracker + 1 < props.stateQueue.length) {
        //@ts-ignore
        props.setQueueTracker((prevCounter) => prevCounter + 1);
        console.log(
          "playing...",
          [props.stateQueue[props.queueTracker].file],
          "with index",
          props.queueTracker,
          "from",
          props.stateQueue
        );
      } else {
        props.setQueueTracker(0);
      }
    }
  }

  return (
    <>
      <div className="play-bar-container">
        {props.playSong && (
          <div className="css_animation-play-bar ">
            <div className="wrapper-play-bar">
              {wave().map(() => (
                <div></div>
              ))}
            </div>
          </div>
        )}

        <div className="play-bar">
          <div className="play-bar-sec">
            <div className="song-cover">
              {typeof props.playBarInfo != "undefined" ? (
                <img src={props.playBarInfo.cover} className="cover-img" />
              ) : (
                <img src="/icons/loading.png" className="cover-img" />
              )}
            </div>

            <div className="play-bar-name">
              {typeof props.playBarInfo != "undefined" ? (
                <>
                  <span className="artist">
                    {props.playBarInfo.artist}
                  </span>

                  <div className="hide-play-bar">
                    <span
                      className={
                        props.playBarInfo.song.length > 14
                          ? "songb move-name"
                          : "songb"
                      }
                      style={{
                        width: `${
                          props.playBarInfo.song.length * 2
                        }vw`,
                      }}
                    >
                      {props.playBarInfo.song}
                      <span className="space"></span>
                      {props.playBarInfo.song.length > 14 &&
                        props.playBarInfo.song}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="artist">none</span>
                  <span className="song">none</span>
                </>
              )}
            </div>
          </div>
          <div className="play-bar-sec">
            <span className="previous">
              <a
                onClick={() => {
                  prevSong();
                  props.setChangeSong(false);
                  props.setPlaySong(true);
                  console.log("skipping...");
                }}
              >
                <img src="/icons/prev.png" />
              </a>
            </span>

            <span
              className="pause"
              onClick={() => {
                if (
                  props.currentSong.length > 0 &&
                  props.currentSong[0] != "none"
                ) {
                  if (props.playSong == false) {
                    props.setPlaySong(true);
                  } else {
                    props.setPlaySong(false);
                  }
                }
                console.log(props.currentSong);
              }}
            >
              {props.playSong && <img src="/icons/pause.png" />}
              {props.playSong == false && <img src="/icons/play.png" />}
            </span>
            <span className="next">
              <a
                onClick={() => {
                  nextSong();
                  props.setChangeSong(false);
                  props.setPlaySong(true);
                  console.log("skipping...");
                }}
              >
                <img src="/icons/next.png" />
              </a>
            </span>
          </div>

          <div className="play-bar-sec">
            <span className="progress">
              {secondsToTime(props.playingSongDuration.toFixed(0))}
            </span>
            <input
              className="slider"
              type="range"
              min="0"
              max={props.playingSongDuration}
              value={props.seek}
              onChange={handleSeek}
              onMouseUp={handleChange}
            />

            <span className="duration">{secondsToTime(props.seek)}</span>
          </div>

          <div className="play-bar-sec">
            <div className="vol-cont">
              <img className="vol-img" src="/icons/vol.png" />
              <input
                className="vol-slider"
                type="range"
                min="0"
                max="100"
                value={props.volume}
                onChange={changeVolume}
              />
              <span className="duration">{props.volume}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;
