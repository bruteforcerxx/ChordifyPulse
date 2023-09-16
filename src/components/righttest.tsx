import { useState, useEffect } from "react";
import { Queue } from "../musicDb";

const playbar = {
  artist: "Omah Lay",
  song: "Reason",
  album: "Single",
  time: "2:27",
  cover: "/cover/1.jpg",
  file: "/music/omhlayreason.mp3",
};

//@ts-ignore
function RightSection(props) {
  var importedQueue;

  if (localStorage.getItem("queue")) {
    importedQueue = JSON.parse(localStorage.getItem("queue") || "[]");
  } else {
    localStorage.setItem("queue", JSON.stringify(importedQueue));
    importedQueue = JSON.parse(localStorage.getItem("queue") || "[]");
  }

  //const [stateQueue, props.setStateQueue] = useState(Queue)
  //const [songList, setSongList] = useState([])
  const [key, setKey] = useState(0);

  //@ts-ignore
  const getDuration = (e, index) => {
    var arr = props.stateQueue;
    arr[index].time = e.target.duration;
    props.setStateQueue(arr);
  };

  const getSongList = () => {
    importedQueue = JSON.parse(localStorage.getItem('queue') || '[]')
    const songFiles = importedQueue.map((track: any) => track.file);
    console.log("compiled song files: ", songFiles);
    props.setSongList(songFiles);
    props.setCurrentSong([songFiles[props.queueTracker]]);
    props.setPlayingSongDuration(props.stateQueue[props.queueTracker].time);
    props.setPlayBarInfo(props.stateQueue[props.queueTracker])
    console.log("howler song files: ", props.currentSong);
    return songFiles[props.queueTracker]
  };

  function moveItemUp(arr: any, index: any) {
    if (index > 0 && index < arr.length) {
      const temp = arr[index - 1];
      arr[index - 1] = arr[index];
      arr[index] = temp;
      arr[index].key = index;
    }
    props.setStateQueue(arr);
    localStorage.setItem("queue", JSON.stringify(props.stateQueue));
    getSongList();
    setKey((prev) => prev + 1);
  }

  function moveItemDown(arr: any, index: any) {
    if (index >= 0 && index < arr.length - 1) {
      const temp = arr[index + 1];
      arr[index + 1] = arr[index];
      arr[index] = temp;
      arr[index].key = index;
    }
    props.setStateQueue(arr);
    localStorage.setItem("queue", JSON.stringify(props.stateQueue));
    getSongList();
    setKey((prev) => prev + 1);
  }

  function removeSong(arr: any, index: any) {
    const newArr = arr.filter((_: any, i: any) => i !== index);
    props.setStateQueue(newArr);
    localStorage.setItem("queue", JSON.stringify(newArr));
    props.setKey((prev) => prev + 1);
    if(props.stateQueue.length - 1 < 1 && props.setPlayingQueue(true)){
        props.setPlaySong(false)
        props.setCurrentSong([])
        props.setPlayingQueue(false)
        console.log('stopping player ...')
    }
    localStorage.setItem("queue", JSON.stringify(props.stateQueue));
  }

  useEffect(() => {
    console.log("rerendering..");
  }, [key]);

  useEffect(() =>{
    console.log("rerendering statequeue..");
  }, [props.stateQueue])

  return (
    <>
      <section className="right-section">
        <div className="right-top-bar">
          <span className="right-name">Generes</span>
          <span className="see-all">See all</span>
        </div>

         
          <div className="second-bar">
            <span className="gen-pill">Hip Hop</span>
            <span className="gen-pill">Drill</span>
            <span className="gen-pill">Trap</span>
            <span className="gen-pill">Heavy Metal</span>
            <span className="gen-pill">Electronic</span>
          </div>
    

        <div className="third-bar">
          <div className="right-top-bar">
            <span className="right-name">Favourite Artists</span>
            <span className="see-all">See all</span>
          </div>

          <div className="item-sec">
            <div className="artist-item">
              <img src={playbar.cover} className="cover-img" />
              <span>Name</span>
            </div>
            <div className="artist-item">
              <img src={playbar.cover} className="cover-img" />
              <span>Name</span>
            </div>
          </div>
        </div>

        <div className="song-queue">
          <div className="right-top-bar qu">
            <span className="right-name">Songs Queue</span>
            <img
              src="/icons/play.png"
              className="play"
              onClick={() => {

                if(props.currentSong.length > 0){
                    var song = getSongList();
                    console.log(props.currentSong);
                    props.setChangeSong(true);
                   
                    props.setPlaySong(true);
                    props.setPlayingQueue(true);
                    
                    props.setChangeSong(false);
                    
                    props.setQueueTracker(0)
                    console.log('playing...', [song], 'with index', props.queueTracker,
                    'from', props.stateQueue)
                }else{
                    console.log('No item in Queue..')
                }

              }}
            />
          </div>

          <div className="qu-list">
            {props.stateQueue.length == 0 && <div className="qu-msg-div">
            <span className="qu-msg">NO ITEM IN QUEUE</span>
            </div>}
          
            {props.stateQueue.map((queue: any, index: any) => (
              <>
              <audio
                    src={queue.file}
                    onLoadedMetadata={(e) => {
                      getDuration(e, index);
                    }}
                    style={{ display: "none" }}
                  />
                <div className="queue-item animate-up" >
                  <div className="left">
                    <div className="img-sec">
                      <img src={queue.cover} className="cover-img" />
                    </div>

                    <div className="name">
                      <div className="hider">
                        <span
                          className={
                            queue.artist.length > 20
                              ? "artist move-name"
                              : "artist"
                          }
                        >
                          {" "}
                          {queue.artist}
                        </span>
                      </div>

                      <div className="hider">
                        <span
                          className={
                            queue.song.length > 14 ? "song move-name" : "song"
                          }
                          style={{
                            width: `${
                               queue.song.length * 2
                            }vw`,
                          }}
                        >
                          {queue.song}
                          <span className="space"></span>
                          {queue.song.length > 14 && queue.song}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="queue-control">
                    {index != 0 && (
                      <img
                        src="/icons/upw.png"
                        onClick={() => {
                          moveItemUp(props.stateQueue, index);
                        }}
                      />
                    )}
                    {index != props.stateQueue.length - 1 && (
                      <img
                        src="/icons/downw.png"
                        onClick={() => {
                          moveItemDown(props.stateQueue, index);
                        }}
                      />
                    )}
                  </div>

                  <span
                    className="remove-queue"
                    onClick={() => {
                      removeSong(props.stateQueue, index);
                    }}
                  >
                    <img src="/icons/close.png" />
                  </span>
                </div>
              </>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
}

export default RightSection;




const song_list = [
    {
      artist: "Omah Lay",
      song: "Reason",
      album: "Single",
      time: "2:27",
      cover: "/cover/1.jpg",
      progress: "1.30",
    },
  ];
  
  //@ts-ignore
  function PlayBar(props) {
    const playBar = song_list[0];
  
    function secondsToTime(seconds: any) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
  
      const formattedHours = String(hours).padStart(2, "0");
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
  
        const last = props.stateQueue[0];console.log("last played", last);
  
        const newArr = props.stateQueue.filter((_: any, i: any) => i !== 0);console.log("removed last played", newArr);
  
        newArr.push(last);console.log("readd lastplayed", newArr);
  
  
  
        props.setQueueTracker((prev) => prev + 1);
        props.setKey((prev) => prev + 1);
      }
    }
  
    function prevSong() {
      console.log("NEXT");
  
      if (props.playingQueue) {
        if (props.queueTracker > 0) {
          props.setQueueTracker((prevCounter) => prevCounter - 1);
          console.log(
            "playing...",
            [props.stateQueue[props.queueTracker].file],
            "with index",
            props.queueTracker,
            "from",
            props.stateQueue
          );
        } else {
          props.setQueueTracker(props.stateQueue.length - 1);
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
  