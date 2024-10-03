import React, { useState } from 'react';

function About({ aboutMe, createUpdateData, handleSave }) {
  const [isEditing, setIsEditing] = useState(false); // 
  const [editedAboutMe, setEditedAboutMe] = useState(aboutMe); 

  const toggleEdit = () => {
    setIsEditing(!isEditing);  // Toggle between edit and read mode
  };

  const saveChanges = () => {
    const updatedData = createUpdateData('aboutMe', editedAboutMe);
    handleSave(updatedData);
    setIsEditing(false);
  };

  
  return (
    <section id="about-me">
      <h2>About Me</h2>
      {isEditing ? (
        <textarea
          value={editedAboutMe}
          onChange={(e) => setEditedAboutMe(e.target.value)}
        />
      ) : (
        <p>{aboutMe}</p>
      )}
      <button onClick={isEditing ? saveChanges : toggleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </section>
  );
}

export default About;


