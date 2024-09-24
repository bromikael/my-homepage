import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projects = [
    { name: 'Bachelor\'s Project', text: 'Improving 3D printing of dental prostheses using WPF framework and ICommand.', link: 'https://github.com/yourusername/project1' },
    { name: 'Project 2', text: 'API development in a legacy codebase with a focus on performance and scalability.', link: 'https://github.com/yourusername/project2' },
    { name: 'Project 2', text: 'Built REST API endpoints and database queries using PostgreSQL, with pagination and error handling.', link: 'https://github.com/yourusername/project2' },
  ];

  return (
    <section>
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div className="project-card" key={project.name}>
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
