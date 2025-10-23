"use client"
import React, { useState, useEffect } from 'react';
import '@/components/home/resource_container/resource_container.css';
import ResourceBox from '@/components/home/resource_box/resource_box.jsx';

import RenderAudio from '@/components/home/resource_container/render_recources/render_audio.jsx'

function ResourceContainer({ selectedNoteType, setSelectedNoteType, resourcesList, setResourcesList }) {
  const [inputValue, setInputValue] = useState("");
  const [noteName, setNoteName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);

  const defaultDifficulty = { questionDifficulty: "Medium", answerDifficulty: "Medium" };
  const defaultQuestionType = { questionType: "Multiple Choice", answerCount: "Four" };
  const defaultQuestionCount = 15;
  const defaultQuizHints = { hints: "Few" };
  const defaultTimeOn = false;
  const defaultQuizTime = null;

  // 2) initialize state with defaults only
  const [difficultySettings, setDifficultySettings] = useState(defaultDifficulty);
  const [questionTypeSettings, setQuestionTypeSettings] = useState(defaultQuestionType);
  const [questionCountSettings, setQuestionCountSettings] = useState(defaultQuestionCount);
  const [quizHintsSettings, setQuizHintsSettings] = useState(defaultQuizHints);
  const [timeOn, setTimeOn] = useState(defaultTimeOn);
  const [quizTimeSettings, setQuizTimeSettings] = useState(defaultQuizTime);

  // pushes settings to local sorage
  useEffect(() => {
    try {
      const ds = window.localStorage.getItem("difficultySettings");
      if (ds) setDifficultySettings(JSON.parse(ds));

      const qts = window.localStorage.getItem("questionTypeSettings");
      if (qts) setQuestionTypeSettings(JSON.parse(qts));

      const qcs = window.localStorage.getItem("questionCountSettings");
      if (qcs) setQuestionCountSettings(Number(qcs));

      const qhs = window.localStorage.getItem("quizHintsSettings");
      if (qhs) setQuizHintsSettings(JSON.parse(qhs));

      const to = window.localStorage.getItem("timeOn");
      if (to) setTimeOn(JSON.parse(to));

      const qtsTime = window.localStorage.getItem("quizTimeSettings");
      if (qtsTime) setQuizTimeSettings(Number(qtsTime));
    } catch (e) {
      console.error("Error loading settings from localStorage", e);
    }
  }, []);
  
  useEffect(() => {
    setInputValue("");
    setSelectedFile(null);
    setIsFileSelected(false);
    setNoteName("")
  }, [selectedNoteType]);

  
  function hasContent(input) {
    return input && input.trim() !== "";
  }

  function addResource(name, type, content) {
    if (resourcesList.length > 9) return;
    setNoteName("");
    const newResource = {
      id: Date.now(),
      name,
      type,
      content,
      fileType: selectedFileType
    };
    setResourcesList(prevResources => [...prevResources, newResource]);
    setSelectedNoteType("");
  }

  function handleSave() {
    if (!hasContent(inputValue) && !selectedFile) return;
    if (selectedFileType !== "pdf" && selectedFileType !== "docx" && selectedFileType !== "" && selectedNoteType !== "Audio") return;
    addResource(noteName, selectedNoteType, selectedFile ? selectedFile : inputValue, selectedFile ? selectedFileType : "");
    setSelectedFileType("");
    setIsFileSelected(false);
  }

  function processFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      setSelectedFileType(file.name.split('.').pop())
      const fileType = file.name.split('.').pop()
      if (fileType == "pdf" || fileType == "docx") {
        setIsFileSelected(true);
      }
      // Define the onload event to resolve the promise with file data
      reader.onload = () => {
        resolve({
          name: file.name,
          content: reader.result, // This will be a base64 encoded data URL
        });
      };

      // Define the onerror event to reject the promise in case of an error
      reader.onerror = (error) => {
        reject(error);
      };
      // Start reading the file as a data URL (base64 encoding)
      reader.readAsDataURL(file);
    });
  }

  // BackButton component included in each input section
  const BackButton = ({ onClick }) => (
    <img
      src="images/back_button.png"
      alt="back button"
      className="back_button"
      onClick={onClick}
    />
  );

  // Link Resource Input rendered as two rows (first row: BackButton + URL input, second row: note name + save)
  const renderLinkResourceInput = () => (
    <div className="resource_input_container">
      <div className="first-row">
        <input
          type="text"
          className="resource_name_input"
          placeholder="Link Title"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
        />
        <input
          type="url"
          placeholder="https://"
          className="url_input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <textarea
          type="url "
          placeholder="Url Desciption (optional)"
          className="text_input"
        />

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
  );

  // Text Resource Input (as before)
  const renderTextResourceInput = () => (
    <div className="resource_input_container">

      <div className="first-row">
        <input
          type="text"
          className="resource_name_input"
          placeholder="Enter note name"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
        />

        <textarea
          placeholder="Add text or paste (Ctrl+V) to set your prompt/resource"
          className="text_input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
  );

  // File Resource Input as two rows (first row: BackButton + file input, second row: note name + save)
  const renderFileResourceInput = () => (
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
          {!isFileSelected && <>
            <img src="images/submit.png" alt="Upload" className='upload_icon' />
            <div className='confirmation_text'>Click anywhere here to upload</div>
            <div className='confirmation_text'>(Text Documents Only)</div>

            <input
              type="file"
              id="fileUpload"
              className="file_input"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  const file = e.target.files[0];
                  processFile(file).then((processedFile) => {
                    setSelectedFile(processedFile.content);
                  }).catch((error) => {
                    console.error("Error processing file:", error);
                  });
                }
              }}
            />
          </>
          }
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
  );


  // Resource List Display remains unchanged
  const renderResourceListDisplay = () => (
    resourcesList.length === 0 ? (
      <div className="nothing_selected_container">
        <img className="book_image" src="images/sticky-note.png" alt="Loading..." onClick={() => {
          setSelectedNoteType("Text")
        }} />
        <h3>{selectedNoteType || "Your Notes"}</h3>
        <h2>Add a new resource to get started</h2>
      </div>
    ) : (
      <div className="resource_input_container">
        <div className="resource_box_wrapper">
          {resourcesList.map((resource) => (
            <ResourceBox key={resource.id} resource={resource} setResourcesList={setResourcesList} />
          ))}
        </div>
      </div>
    )
  );

  // Main render: mount all sections but control visibility via inline styles.
  return (
    <div className="resource_container">
      <div style={{ display: (selectedNoteType === "Web Link" || selectedNoteType === "Video Link") ? 'block' : 'none' }}>
        {renderLinkResourceInput()}
      </div>
      <div style={{ display: (selectedNoteType === "Text") ? 'block' : 'none' }}>
        {renderTextResourceInput()}
      </div>
      <div style={{ display: (selectedNoteType === "PDF/DOCX") ? 'block' : 'none' }}>
        {renderFileResourceInput()}
      </div>
      <div style={{ display: (selectedNoteType === "Audio") ? 'block' : 'none' }}>

        {<RenderAudio
          setSelectedNoteType={setSelectedNoteType}
          setNoteName={setNoteName}
          handleSave={handleSave}
          noteName={noteName}
          setInputValue={setInputValue} />}

      </div>
      <div style={{ display: (!selectedNoteType) ? 'block' : 'none' }}>
        {renderResourceListDisplay()}
      </div>
    </div>
  );
}

export default ResourceContainer;
