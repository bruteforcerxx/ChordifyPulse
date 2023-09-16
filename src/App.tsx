import { useState, useEffect, useRef } from "react";
import {
  allSongs,
  featured,
  Queue,
  playLists,
  featuredGenres,
} from "./musicDb";
import ReactHowler from "react-howler";
import axios from "axios";

import "./main.css";
import "./index.css";
import "./css/sidebar.css";
import "./css/icons.css";
import "./css/centersection.css";
import "./css/playbar.css";
import "./css/rightsection.css";
import "./css/recorder.css";
import "./css/wave.css";

import RightSection from "./components/rightsection";
import CenterSection from "./components/centersection";
import SideBar from "./components/sidebar";
import PlayBar from "./components/playbar";

const playbar = {
  artist: "Omah Lay",
  song: "Reason",
  album: "Single",
  time: "2:27",
  cover: "/cover/1.jpg",
  file: "/music/omhlayreason.mp3",
};

const CLIENT_ID = "cd60551b4ec04fcd81c5ee4e6180ba21";
const CLIENT_SECRET = "f4aeb8a2463f47b293c112b2219fbff7";
const TOKEN_REFRESH_INTERVAL = 3500000; // 3500000 milliseconds // 58mins

function Composer() {
  var importedQueue;

  if (localStorage.getItem("queue")) {
    importedQueue = JSON.parse(localStorage.getItem("queue") || "[]");
  } else {
    localStorage.setItem("queue", JSON.stringify(Queue));
    importedQueue = JSON.parse(localStorage.getItem("queue") || "[]");
  }
  const playPauseControler = featured.map(() => {});

  const [playBar, setPlayBar] = useState();
  const [progress, setProgress] = useState();
  const [currentSong, setCurrentSong] = useState(["none"]);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [featuredSongsList, setFeaturedSongsList] = useState(featured);
  const [previous, setPrevious] = useState(0);
  const [playSong, setPlaySong] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [changeSong, setChangeSong] = useState(true);
  const [playingSongDuration, setPlayingSongDuration] = useState(0.0);
  const [seek, setSeek] = useState<any | null>(null);
  const [seekN, setSeekN] = useState(0);
  const audioPlayer = useRef<any | null>(null);
  const [volume, SetVolume] = useState(50);

  const [stateQueue, setStateQueue] = useState(importedQueue);
  const [songList, setSongList] = useState([]);
  const [queueTracker, setQueueTracker] = useState(0);
  const [playingQueue, setPlayingQueue] = useState(false);

  const [playBarInfo, setPlayBarInfo] = useState();

  const [key, setKey] = useState(0);

  const [result, setResult] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [resultData, setResultData] = useState({
    result: { title: "", artist: "", song_link: "" },
  });
  const [spotifyImage, setSpotifyImage]: any = useState(null);

  useEffect(() => {
    console.log("getting spotify token...");

    // Check if the token is already stored in local storage
    const storedToken = localStorage.getItem("accessToken");
    //@ts-ignore
    const storedTokenTime = parseInt(
      localStorage.getItem("accessTokenTime"),
      10
    );

    const currentTime = Date.now();

    if (
      storedToken &&
      storedTokenTime &&
      currentTime - storedTokenTime < TOKEN_REFRESH_INTERVAL
    ) {
      setAccessToken(storedToken);
    } else {
      var spotifyAuthParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=client_credentials&client_id=" +
          CLIENT_ID +
          "&client_secret=" +
          CLIENT_SECRET,
      };

      fetch("https://accounts.spotify.com/api/token", spotifyAuthParameters)
        .then((response) => response.json())
        .then((data) => {
          console.log("access token is...", data.access_token);

          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("accessTokenTime", currentTime.toString());

          setAccessToken(data.access_token);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    console.log("");
    try {
      setPlayingSongDuration(audioPlayer.current.duration());
      const timerInterval = setInterval(() => {
        setSeek(audioPlayer.current.seek().toFixed(0));
        //console.log(  'Setter Nummber: ',seekN)
      }, 100);
      return () => clearInterval(timerInterval);
    } catch (error) {
      console.log("no audio object available", error);
    }
  }, []);

  useEffect(() => {
    if (stateQueue.length > 0){


      console.log("queueTracker in useeffect: ", queueTracker);
      setCurrentSong([stateQueue[queueTracker].file]);
      setPlayingSongDuration(stateQueue[queueTracker].time);
      setPlayBarInfo(stateQueue[queueTracker]);
      setChangeSong(false);
      console.log(
        "playing...",
        [stateQueue[queueTracker].file],
        "with index",
        queueTracker,
        "from",
        stateQueue
      );
    }

  }, [queueTracker]);

  useEffect(() => {}, [playSong]);

  useEffect(() => {
    setChangeSong(true);
  }, [changeSong]);

const nextSong = () => {
    if (playingQueue) {
      if (queueTracker + 1 < stateQueue.length) {
        setQueueTracker((prevCounter) => prevCounter + 1);
      } else {
        setQueueTracker(0);
      }
    }
  };

  useEffect(() => {
    console.log("rerendering with", key);
    localStorage.setItem("queue", JSON.stringify(stateQueue));
    console.log(stateQueue)
    console.log(JSON.parse(localStorage.getItem("queue") || "[]"))
  }, [key]);

  return (
    <>
    {changeSong && 
    <ReactHowler
        ref={audioPlayer}
        src={currentSong}
        playing={playSong}
        volume={volume/100}
        onEnd={nextSong}
    />}
    
  
    <section className='main'>

    <SideBar />
    <div className="vl"></div>

    <CenterSection 

     currentSong={currentSong} setCurrentSong={setCurrentSong}
     isSongPlaying={isSongPlaying}  setIsSongPlaying={setIsSongPlaying}
     featuredSongsList={featuredSongsList} setFeaturedSongsList={setFeaturedSongsList}
     playSong={playSong} setPlaySong={setPlaySong} accessToken={accessToken}
     changeSong={changeSong} setChangeSong={setChangeSong}
     setPlayingSongDuration={setPlayingSongDuration}
     result={result} setResult={setResult}
     noResult={noResult} setNoResult={setNoResult}
     resultData={resultData} setResultData={setResultData}
     spotifyImage={spotifyImage} setSpotifyImage={setSpotifyImage}
     stateQueue={stateQueue} setStateQueue={setStateQueue}
     playingQueue={playingQueue} setPlayingQueue={setPlayingQueue}
     queueTracker={queueTracker}
     playBarInfo={playBarInfo} setPlayBarInfo={setPlayBarInfo}
     key={key} setKey={setKey}
     />

    <RightSection  audioPlayer={audioPlayer} 
    currentSong={currentSong} setCurrentSong={setCurrentSong}
    playSong={playSong} setPlaySong={setPlaySong} 
    changeSong={changeSong} setChangeSong={setChangeSong}
    setPlayingSongDuration={setPlayingSongDuration}
    stateQueue={stateQueue} setStateQueue={setStateQueue}
    songList={songList} setSongList={setSongList}
    queueTracker={queueTracker} setQueueTracker={setQueueTracker}
    playingQueue={playingQueue} setPlayingQueue={setPlayingQueue}
    playBarInfo={playBarInfo} setPlayBarInfo={setPlayBarInfo}
    key={key} setKey={setKey}
    />

    <PlayBar playSong={playSong} setPlaySong={setPlaySong}
    playingSongDuration={playingSongDuration} setPlayingSongDuration={setPlayingSongDuration}
    seek={seek} setSeek={setSeek}
    audioPlayer={audioPlayer} 
    seekN={seekN} setSeekN={setSeekN}
    volume={volume} SetVolume={SetVolume}
    queueTracker={queueTracker} setQueueTracker={setQueueTracker}
    playingQueue={playingQueue} setPlayingQueue={setPlayingQueue}
    stateQueue={stateQueue} setStateQueue={setStateQueue}
    currentSong={currentSong} setCurrentSong={setCurrentSong}
    changeSong={changeSong} setChangeSong={setChangeSong}
    playBarInfo={playBarInfo} setPlayBarInfo={setPlayBarInfo}
    />

    </section>
    </>
  )
}

export default Composer;
