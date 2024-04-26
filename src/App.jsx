import React, { useState } from "react";

import Sidebar from "./components/Sidebar/SidebarCmp";
import Fallback from "./components/mainWindow/Fallback";
import InputForm from "./components/mainWindow/InputForm";
import ProjectDetails from "./components/mainWindow/ProjectDetails";

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [formDisplay, setFormDisplay] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(false);

  const handleCreateProject = () => {
    setSelectedProjectId(false);
    setFormDisplay(true);
  };

  const handleCancel = () => {
    setFormDisplay(false);
  };
  
  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => {
      return [...prevProjects, newProject];
    });
  };
  
  function handleDeleteProject(id) {
    const filteredProjects = projects.filter((project) => project.id !== id);
    setProjects(filteredProjects);
    setSelectedProjectId(false);
  }

  function handleSelectProject(id) {
    setSelectedProjectId(id);
    setFormDisplay(false);
  }

  const handleAddTask = (task) => {
    setTasks((prevState) => {
      const taskId = Math.random();
      const newTask = {
        title: task,
        id: taskId,
        projectId: selectedProjectId,
      };

      return [...prevState, newTask];
    });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  let selectedProject;
  let projectTasks;

  if (selectedProjectId) {
    selectedProject = projects.find((project) => project.id === selectedProjectId);
    projectTasks = tasks.filter((task) => task.projectId === selectedProjectId);
  }

  let content;

  if (!formDisplay && !selectedProjectId) {
    content = <Fallback onCreateProject={handleCreateProject} />;
  } else if (formDisplay && !selectedProjectId) {
    content = <InputForm onCancel={handleCancel} onAddProject={handleAddProject} />;
  } else if (!formDisplay && selectedProjectId) {
    content = (
      <ProjectDetails
        project={selectedProject}
        tasks={projectTasks}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onDeleteProject={handleDeleteProject}
      />
    );
  }

  return (
    <main className="my-8 h-screen flex gap-8">
      <Sidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onCreateProject={handleCreateProject}
        onDisplayProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
