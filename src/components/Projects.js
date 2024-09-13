import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projects = [
    { name: 'Project 1', link: 'https://github.com/yourusername/project1' },
    { name: 'Project 2', link: 'https://github.com/yourusername/project2' }
  ];

  return (
    <section>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div className="project-card" key={project.name}>
            <h3>{project.name}</h3>
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
