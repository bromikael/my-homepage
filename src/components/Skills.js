import React from 'react';
import '../styles/Skills.css';

function Skills() {
  const skills = ['JavaScript', 'React', 'Angular', 'Node.js', 'CSS', 'HTML', 'SQL', 'PostgreSQL', 'C#', 'C++', 'Test Driven Development'];

  return (
    <section>
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map(skill => (
          <div className="skill-card" key={skill}>
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
