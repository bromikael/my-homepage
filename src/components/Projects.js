import React from 'react';
import '../styles/Projects.css';

function Projects({ projects = [], handleSave }) {  // Default to empty array if projects is undefined
  if (!projects || !Array.isArray(projects)) {
    return <p>No projects available.</p>;
  }

  return (
    <section>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.name}</h3>
            <p>{project.text}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
