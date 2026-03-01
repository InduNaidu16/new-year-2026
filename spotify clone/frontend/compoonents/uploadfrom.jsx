import React, { useState } from 'react';
import axios from 'axios';
export default function UploadForm({ token, onUploaded }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);


    
    await axios.post('/api/tracks/upload', fd, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });
    onUploaded?.();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input required onChange={e=>setFile(e.target.files[0])} type="file" accept="audio/*" />
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
      <button>Upload</button>
    </form>
  );
}
