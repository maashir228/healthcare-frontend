import React from 'react';

function TranscriptDisplay({ original, translated }) {
  return (
    <div>
      <h2>Original Transcript</h2>
      <p>{original}</p>
      <h2>Translated Transcript</h2>
      <p>{translated}</p>
    </div>
  );
}

export default TranscriptDisplay;