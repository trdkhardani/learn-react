import "./App.css";

function Projects() {
  const projects = [
    {
      id: 1,
      name: "Aircraft Approach Prediction System",
    },
    {
      id: 2,
      name: "Movie Booking System",
    },
    {
      id: 3,
      name: "Flight Reservation System",
    },
  ];
  return (
    <>
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Projects;
