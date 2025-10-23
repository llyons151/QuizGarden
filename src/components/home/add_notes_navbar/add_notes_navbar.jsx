import React, { useState, useEffect } from 'react';
import '@/components/home/add_notes_navbar/add_notes_navbar.css';

function AddNotesNavbar({ onNoteAdded, selectedNoteType }) {
    const [selectedSetting, setSelectedSetting] = useState(selectedNoteType);

    const noteTypes = [
        { type: "Text", icon: "📝", img: "text_file" },
        { type: "Web Link", icon: "🔗", img: "link" },
        { type: "PDF/DOCX", icon: "📂", img: "folder"},
        { type: "Audio", icon: "🖼️", img: "headphones"}
    ];

    const handleSelectSetting = (type) => {
        setSelectedSetting(type);
        if (onNoteAdded) {
            onNoteAdded(type);
        }
    };

    useEffect(() => {
        setSelectedSetting(selectedNoteType);
    }, [selectedNoteType]);

    return (
        <div className='quiz_config_navbar_container'>
            <div className='button_container'>
                {noteTypes.map((note, index) => (
                        <div
                            key={index}
                            className={`header_button ${selectedSetting === note.type ? 'active' : ''} `}
                            onClick={() => {
                                handleSelectSetting(note.type)
                            }
                            }
                        >
                            <img src={`/images/${note.img}.png`} alt="E" className='navbar_img'/>
                            {note.type}
                        </div >

                ))}
            </div>
        </div >
    );
}

export default AddNotesNavbar;
