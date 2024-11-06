import React from 'react';

function LanguageSelector({ languages, selectedLanguage, onChange }) {
  return (
    <select value={selectedLanguage} onChange={onChange}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;