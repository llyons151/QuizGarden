import React, { useEffect, useState } from 'react';
import '@/components/home/resource_box/resource_box.css';

function ResourceBox({ resource, setResourcesList }) {
  // local state for the date string
  const [dateString, setDateString] = useState(resource.date || '');

  // On mount (or when resource.date changes), set the date if missing
  useEffect(() => {
    if (!resource.date) {
      const now = new Date();
      const months = [
        'Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec'
      ];
      const formatted = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

      // 1) update local display state
      setDateString(formatted);

      // 2) push that date back up into the parent’s list
      setResourcesList(prev =>
        prev.map(r =>
          r.id === resource.id
            ? { ...r, date: formatted }
            : r
        )
      );
    } else {
      // if date *was* already there, just sync local state
      setDateString(resource.date);
    }
  }, [resource.date, resource.id, setResourcesList]);

  // shorten content and name
  const shortenedResourceContent =
    resource.content.length > 75
      ? resource.content.slice(0, 75) + '…'
      : resource.content;

  const shortenedResourceName =
    resource.name.length > 8
      ? resource.name.slice(0, 8) + '…'
      : resource.name;

  // remove handler stays the same
  const handleRemove = () => {
    setResourcesList(prev =>
      prev.filter(r => r.id !== resource.id)
    );
  };

  return (
    <div className="resource_box_container">
      <div className="text_container">
        <div className="resource_header_text">
          {shortenedResourceName || 'New Note'}
        </div>
        <div className="date">{dateString || '—'}</div>
        <div className="resource_sub_text">
          {shortenedResourceContent || 'No content'}
        </div>
      </div>
      <div className="text_container text_row">
        <div className="note_type">{resource.type}</div>
        <img
          src="/images/close.png"
          alt="x"
          className="x_button"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
}

export default ResourceBox;
