import React, { useState, useEffect } from 'react';
import '@/components/home/resource_container/resource_container.css';

export default function RenderAudio({ setSelectedNoteType, setNoteName, handleSave, noteName, setInputValue }) {

    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isProcessingFile, setIsProcessingFile] = useState(false);

    async function processFile(file) {
        try {
            setIsProcessingFile(true)
            const res = await fetch("api/process_audio", {
                method: "POST",
                body: file,
            })
            setIsProcessingFile(true)
            const data = await res.json()
            setIsProcessingFile(false)
            if (data.transcript == undefined) return;
            setInputValue(data.transcript)
            setIsFileSelected(true)
        } catch {
            setIsProcessingFile(false)
            console.log(data)
        }
    }

    return (
        <>
            <div className="resource_input_container">
                <div className="first-row">
                    <input
                        type="text"
                        className="resource_name_input"
                        placeholder="Enter note name"
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                    />

                    <label className="file_input_label">
                        {isFileSelected && <>
                            <img src='images/upload_success.png' className='upload_success' />
                            <div className='confirmation_text'>File Upload Successful</div>
                        </>}
                        {(!isFileSelected && !isProcessingFile) && <>
                            <img src="images/headphones_large.png" alt="Upload" className='upload_icon' />
                            <div className='confirmation_text'>Upload Audio File</div>
                            <div className='confirmation_sub_text'>Supported formats: MP3, WAV</div>
                            <input
                                type="file"
                                id="audioUpload"
                                className="file_input"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        const file = e.target.files[0];
                                        processFile(file)
                                    }
                                }}
                            />
                        </>
                        }
                        {isProcessingFile && <div className='loading_container'>
                            <img src="images/gifs/loading.gif" alt="" className='loading_gif' />
                            <div className='confirmation_text'>Processing Audio File</div>
                        </div>}
                    </label>
                </div>
                <div className="second-row">

                    <button
                        className="back_button"
                        onClick={() => setSelectedNoteType("")}
                    > Back</button>

                    <button
                        className="save_button"
                        onClick={handleSave}
                    > Save Resource</button>

                </div>
            </div>
        </>
    )
}