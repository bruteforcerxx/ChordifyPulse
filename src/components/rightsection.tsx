import { useState, useEffect } from "react";
 

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
    console.log(e.target.duration)
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
    setKey((prev) => prev + 1);
    if(props.stateQueue.length - 1 < 1 && props.setPlayingQueue(true)){
        props.setPlaySong(false)
        props.setCurrentSong([])
        props.setPlayingQueue(false)
        console.log('stopping player ...')
    }
  }

  useEffect(() => {
    console.log("rerendering..");
  }, [key]);

  useEffect(() =>{
    console.log("rerendering..");
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
                <div className="queue-item">
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
                    <div className="white-space"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RightSection;
