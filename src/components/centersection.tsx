import { useState, useEffect } from "react";
 
import AudioRecorder from "./recorder";

//@ts-ignore
function CenterSection(props) {
  const [reRender, setReRender] = useState(0);
  const [shift, setShift] = useState(false);
  const [shiftClose, setShiftClose] = useState(false);
  const [shiftIndex, setShiftIndex] = useState(null);



  const wave = () => {
    var Arr = [];
    for (var i = 0; i < 30; i++) {
      Arr.push({ key: i });
    }
    return Arr;
  };

  //@ts-ignore
const getDuration = (e, index) => {
    var arr = props.featuredSongsList;
    arr[index].time = e.target.duration;
    props.setFeaturedSongsList(arr);
};

function secondsToTime(seconds: any) {
    //const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    //const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}


function addToQueue(index:number){
  var queue = props.stateQueue
  console.log(queue)
  queue.push(props.featuredSongsList[index])
  console.log(queue)
  props.setStateQueue(queue)
  console.log('props.stateQueue',props.stateQueue)

  //@ts-ignore
  props.setKey(prev => prev  + 1)

}

  useEffect(() => {}, [reRender]);

  return (
    <>
      <section className="center-section">
        <div className="top-bar">
          <h2 className="header top-h">Trending Playlists</h2>

          <AudioRecorder
            accessToken={props.accessToken}
            result={props.result}
            setResult={props.setResult}
            noResult={props.noResult}
            setNoResult={props.setNoResult}
            resultData={props.resultData}
            setResultData={props.setResultData}
            spotifyImage={props.spotifyImage}
            setSpotifyImage={props.setSpotifyImage}
            setPlaySong={props.setPlaySong}
          />
        </div>

        <div className="card-section">
          {props.result && (
            <div className="result-box">
              <div className="title-bar">
                <div className="title-mic">
                  <img src="/icons/mic.png" />
                  <h2>Music Found</h2>
                </div>

                <span
                  className="close"
                  onClick={() => {
                    props.setResult(false);
                    props.setSpotifyImage(null);
                  }}
                >
                  <img src="/icons/close.png" />
                </span>
              </div>

              <div className="info-bar">
                <div>
                  {props.spotifyImage ? (
                    <img
                      className="cover-img rec-img"
                      src={props.spotifyImage}
                    />
                  ) : (
                    <img
                      className="cover-img rec-img"
                      src="/icons/loading.png"
                    />
                  )}
                </div>
                <div className="song-info">
                  <span className="art">{props.resultData.result.artist}</span>
                  <div className="song-name-hide">
                    <span
                      className={
                        props.resultData.result.title.length > 20
                          ? "name move-name"
                          : "name"
                      }
                      style={{
                        width: `${props.resultData.result.title.length * 2}vw`,
                      }}
                    >
                      {props.resultData.result.title}
                      {props.resultData.result.title.length > 20 ? (
                        <>
                          <span className="space"></span>
                          {props.resultData.result.title}
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                </div>

                <div className="play-btn-v">
                  <a href={props.resultData.result.song_link}>
                    <span className="pause">
                      <img src="/icons/play.png" />
                    </span>
                  </a>
                </div>
              </div>

              <div className="soundwave">
                <div className="css_animation">
                  <div className="wrapper">
                    {wave().map(() => (
                      <div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {props.noResult && (
            <div className="result-box">
              <div className="title-bar">
                <div className="title-mic">
                  <img src="/icons/mic.png" />
                  <h2>Music was not recognized</h2>
                </div>

                <span
                  className="close"
                  onClick={() => {
                    props.setNoResult(false);
                    props.setSpotifyImage(null);
                  }}
                >
                  <img src="/icons/close.png" />
                </span>
              </div>

              <div className="info-bar">
                <div>
                  <img className="notfound" src="/icons/notfound.png" />
                </div>
                <div className="song-info">
                  <span className="art">------</span>
                  <div className="song-name-hide">
                    <span className="name">Please try again.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card card-1 over">
            <div className="card-text-sec">
              <h2 className="card-text">Good Vibes</h2>
            </div>
            <div className="card-img-sec card-img-right">
              <img src="/image/yellow2.png" className="image" />
            </div>
          </div>
          <div className="card card-2">
            <div className="card-text-sec">
              <h2 className="card-text">Stream Music</h2>
            </div>
            <div className="card-img-sec">
              <img src="/image/blue.png" className="image-2" />
            </div>
          </div>
          <div className="card card-3">
            <div className="card-text-sec">
              <h2 className="card-text">Good Vibes</h2>
            </div>
            <div className="card-img-sec">
              <img src="/image/red2.png" className="image-3" />
            </div>
          </div>
        </div>

        <div className="music-list-section">
          <div className="music-list-name">

            <h2 className="header">Featured Music</h2>
          </div>

          <div className="music-list-container">
            <div className="music-list">
              {props.featuredSongsList.map((song: any, index: any) => (
                <>
                  <audio
                    src={song.file}
                    onLoadedMetadata={(e) => {
                      getDuration(e, index);
                      setReRender(1);
                    }}
                    style={{ display: "none" }}
                  />
                  <div
                    className={
                      shift && index == shiftIndex
                        ? shiftClose ? "music-item close-menu" :  "music-item open-menu"
                        : "music-item"
                    }
                    style={{
                      marginRight: `${shiftClose && index == shiftIndex && '20%'}`
                    }}
                  >
                    <div className="info-sec">
                      <div className="song-cover">
                        <img src={song.cover} className="cover-img"></img>
                      </div>
                    </div>
                    <div className="info-sec">
                      <span className="artist-name">{song.artist}</span>
                      <span className="name">{song.song}</span>
                    </div>

                    <div className="info-sec">
                      <span className="label">ALBUM</span>
                      <span className="name">{song.album}</span>
                    </div>

                    <div className="info-sec">
                      <span className="label">DURATION</span>
                      <span className="name">
                        {secondsToTime(song.time.toFixed(0))}
                      </span>
                    </div>

                    <div className="info-sec">
                      <a onClick={() => {}}>
                        <div
                          className="play-btn"
                          onClick={() => {
                            props.setCurrentSong([song.file]);
                            props.setChangeSong(false);
                            props.setPlaySong(true);
                            props.setPlayingSongDuration(song.time);
                            console.log(props.featuredSongsList[index]);
                            props.setPlayingQueue(false);
                            props.setPlayBarInfo(
                              props.featuredSongsList[index]
                            );
                          }}
                        >
                          <img src="/icons/play.png" className="play" />
                        </div>
                      </a>
                    </div>
                    <div
                      className="info-sec mini-menu"
                      onClick={() => {
                        if(shift){
                          if(shiftIndex == index){                            
                            setShift(false);                          
                            setShiftClose(true)
                            setShiftIndex(null);
                          }else{
                            setShift(true);
                            setShiftIndex(index);
                            setShiftClose(false)
                          }
                        }else{
                          setShift(true);
                          setShiftIndex(index);
                          setShiftClose(false)
                        }
                      }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    {shift && index == shiftIndex && (
                      <div className="mini-menu-list">
                        <button className="cssbuttons-io-button" onClick={()=>{
                              addToQueue(index)
                        }}>
                          {" "}
                          Add to queue
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path
                                fill="currentColor"
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              ></path>
                            </svg>
                          </div>
                        </button>
                        <button className="cssbuttons-io-button">
                          {" "}
                          View More
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path
                                fill="currentColor"
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <div className="white-space"></div>

              <div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CenterSection;
