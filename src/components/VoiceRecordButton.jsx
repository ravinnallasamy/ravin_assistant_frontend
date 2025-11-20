import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

const VoiceRecordButton = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' }); // or audio/mp4
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64Audio = reader.result.split(',')[1]; // Remove data:audio/webm;base64, prefix
                    onRecordingComplete(base64Audio);
                };
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert("Unable to access microphone. Please ensure you have granted permission.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.stop) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    return (
        <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
                } text-white shadow-lg`}
            title={isRecording ? "Stop Recording" : "Ask by Voice"}
        >
            {isRecording ? <Square size={24} /> : <Mic size={24} />}
        </button>
    );
};

export default VoiceRecordButton;
