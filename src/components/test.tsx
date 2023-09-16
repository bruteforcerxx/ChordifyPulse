import React, { useState, useEffect, useRef } from 'react';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioStreamRef.current = stream;
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          const chunks: Blob[] = [];
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: 'audio/wav' });
            setAudioURL(URL.createObjectURL(audioBlob));
          };
        })
        .catch((error) => console.error('Error accessing microphone:', error));
    }

    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      setAudioChunks([]);
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}







function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const recordingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioStreamRef.current = stream;
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          const chunks: Blob[] = [];
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: 'audio/wav' });
            setAudioURL(URL.createObjectURL(audioBlob));

            // Add your API call here after recording has stopped
            makeApiCall(audioBlob);
          };
        })
        .catch((error) => console.error('Error accessing microphone:', error));
    }

    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      setAudioChunks([]);
      mediaRecorderRef.current.start();
      setRecording(true);

      // Automatically stop recording after 5 seconds
      recordingTimeoutRef.current = window.setTimeout(() => {
        stopRecording();
      }, 7000); // 5000 milliseconds (5 seconds)
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
  
      // Clear the recording timeout
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null; // Clear the reference
      }
    }
  };

  const makeApiCall = (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('1f049d3a1472779c0b95c5f8a968d829', 'your api token');
    formData.append('file', audioBlob);

    fetch('https://api.audd.io/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error('API error:', error));
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default AudioRecorder;








import React, { useState, useEffect, useRef } from 'react';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const recordingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const initializeRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          setAudioURL(URL.createObjectURL(audioBlob));

          // Add your API call here after recording has stopped
          makeApiCall(audioBlob);
        };
      } catch (error) {
        console.error('Error initializing MediaRecorder:', error);
      }
    };

    initializeRecorder();

    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      setAudioChunks([]);
      try {
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error('Error starting MediaRecorder:', error);
      }

      // Automatically stop recording after 5 seconds
      recordingTimeoutRef.current = window.setTimeout(() => {
        stopRecording();
      }, 5000); // 5000 milliseconds (5 seconds)
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      try {
        mediaRecorderRef.current.stop();
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        setRecording(false);

        // Clear the recording timeout
        if (recordingTimeoutRef.current) {
          clearTimeout(recordingTimeoutRef.current);
          recordingTimeoutRef.current = null; // Clear the reference
        }
      } catch (error) {
        console.error('Error stopping MediaRecorder:', error);
      }
    }
  };

  const makeApiCall = (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('1f049d3a1472779c0b95c5f8a968d829', 'your_actual_api_token_here');
    formData.append('file', audioBlob);

    fetch('https://api.audd.io/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error('API error:', error));
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default AudioRecorder;
