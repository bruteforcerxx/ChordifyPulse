import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import AudioRecorder from "./recorder";

//@ts-ignore
function CenterSection(props) {
  const [reRender, setReRender] = useState(0);
  const [shift, setShift] = useState(false);
  const [shiftClose, setShiftClose] = useState(false);
  const [shiftIndex, setShiftIndex] = useState(null);
  const path =
    "M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z";
  //@ts-ignore
  function Play(song) {
    const src = song_list.map((song) => {
      return song.file;
    });

    console.log(src);

    const src2 = ["/music/omhlayreason.mp3", "/music/omhlayreason.mp3"];

    new Howl({
      src: src2,
      html5: true,
    }).play();
    /*var music1 = music.play()
        var music2 = music.play()

        music.fade(1, 0, 1000, music1);
        music.rate(1.5, music2);


        var otherMusic = src.map(song => {
            return music.play()
        })
        //var music2 = music.play()

        console.log(otherMusic)

        music.fade(1, 0, 1000, music1);

        for(let i = 0; i < otherMusic.length; i++){
            music.rate(1.5, otherMusic[i]);
        }*/
  }

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
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
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
                          Get started
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
