import { useState, useEffect, useRef } from "react";
import "../css/recorder.css";

const auddApiToken = "4f835c9c3bda3e5081e76af5956a74f9"
//const auddApiToken  = "1f049d3a1472779c0b95c5f8a968d829"


//@ts-ignore
function AudioRecorder(props) {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [key, setKey] = useState(0);  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const recordingTimeoutRef = useRef<number | null>(null);


//@ts-ignore
async function search(title){
    console.log('searching', title)
    console.log('accessToken', localStorage.getItem('accessToken'))
    
    var trackParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }
    var TrackID = await fetch('https://api.spotify.com/v1/search?q='
     + title + '&type=track', trackParameters)
     .then(response => response.json())
     .then(data => {console.log(data.tracks.items[0].album);
                   props.setSpotifyImage(data.tracks.items[0].album.images[1].url)}
          )
}

const initializeRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      audioStreamRef.current = stream;
  
      // Check for all browsers and set the appropriate mimeType
    const checkMimeType = () => {
        if (MediaRecorder.isTypeSupported('audio/mpeg')){
          return 'audio/mpeg'
        }else if(MediaRecorder.isTypeSupported('audio/wav')){
          return 'audio/wav'
        }
        else if(MediaRecorder.isTypeSupported('audio/mp4')){
          return 'audio/mp4'
        }
        else if(MediaRecorder.isTypeSupported('audio/aac')){
          return 'audio/aac'
        }
        else if(MediaRecorder.isTypeSupported('audio/ogg')){
          return 'audio/ogg'
        }
        else if(MediaRecorder.isTypeSupported('audio/x-m4a')){
          return 'audio/x-m4a'
        }
        else if(MediaRecorder.isTypeSupported('audio/webm')){
          return 'audio/webm'
        }
        else if(MediaRecorder.isTypeSupported('audio/flac')){
          return 'audio/flac'
        }
    }

    const mimeType = checkMimeType()
    
  
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
    });
    mediaRecorderRef.current = mediaRecorder;
  
    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
    };
  
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        setAudioURL(URL.createObjectURL(audioBlob));
        makeApiCall(audioBlob, auddApiToken);
        cleanupRecorder();
    };

    } catch (error) {
      console.error("Error initializing MediaRecorder:", error);
    }
};

useEffect(() => {
    // Reset all states when audioURL changes (result received)
    if (audioURL) {
      setRecording(false);
      setAudioChunks([]);
      setAudioURL(null); // Reset the audioURL
      setKey((prevKey) => prevKey + 1); // Increment the key to force remount
    }
 }, [audioURL]);

const cleanupRecorder = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      try {
        mediaRecorderRef.current.stop();
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaRecorderRef.current = null;
        audioStreamRef.current = null;
      } catch (error) {
        console.error("Error stopping MediaRecorder:", error);
      }
    }
};
 
async function startRecording(){
    props.setPlaySong(false)
    props.setResult(false);
    props.setNoResult(false);
    props.setSpotifyImage(null);

    if (!mediaRecorderRef.current) {
      await initializeRecorder();
    }

    if (mediaRecorderRef.current && audioStreamRef.current) {
      setAudioChunks([]);
      try {
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error("Error starting MediaRecorder:", error);
      }

      // Automatically stop recording after 5 seconds
      recordingTimeoutRef.current = window.setTimeout(() => {
        stopRecording();
      }, 5000); // 5000 milliseconds (5 seconds)
    }
};

const stopRecording = () => {
  //props.setPlaySong(true)
    if (mediaRecorderRef.current && audioStreamRef.current) {
      try {
        mediaRecorderRef.current.stop();
        setRecording(false);
      
        

        // Clear the recording timeout
        if (recordingTimeoutRef.current) {
          clearTimeout(recordingTimeoutRef.current);
          recordingTimeoutRef.current = null; // Clear the reference
        }
      } catch (error) {
        console.error("Error stopping MediaRecorder:", error);
      }
    }
  };

const makeApiCall = async (audioBlob: Blob, apiToken: string) => {
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("api_token", apiToken); // Include the API token parameter
  
    try {
      const response = await fetch("https://api.audd.io/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
  
      if (result.result == null) {
        props.setNoResult(true);
      } else {
        search(result.result.title);
        props.setResultData(result);
        props.setResult(true);
      }
  
      // Reset all states when the result is received
      setRecording(false);
      setAudioChunks([]);
      setAudioURL(null); // Reset the audioURL
      setKey((prevKey) => prevKey + 1); // Increment the key to force remount
    } catch (error) {
      console.error("API error:", error);
    }
};
  
//@ts-ignore
return (
    <>
      <div className="recorder-container">
        {recording ? (
          <>
            <div className="pulse-box pulsing pl-1"></div>
            <div className="pulse-box pulsing pl-2"></div>
            <div className="pulse-box pulsing pl-3"></div>
          </>
        ) : (
          <div></div>
        )}

        <button
          className="learn-more "
          onClick={recording ? stopRecording : startRecording}
        >
          <span
            className={recording ? "circle active" : "circle"}
            aria-hidden="true"
          >
            <span className="icon arrow">
              <img src="/icons/mic.png" />
            </span>
          </span>
          <span className={recording ? "button-text white" : "button-text"}>
            {recording ? "Stop Listening" : "Recognize music"}
          </span>
        </button>

        {audioURL && (
          <audio controls>
            <source src={audioURL} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </>
  );
}

export default AudioRecorder;
