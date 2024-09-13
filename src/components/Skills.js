import React from 'react';

function Skills() {
  const skills = ['JavaScript', 'React', 'Angular', 'Node.js', 'CSS', 'HTML'];

  return (
    <section>
      <h2>Skills</h2>
      <ul>
        {skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
    </section>
  );
}

export default Skills;
