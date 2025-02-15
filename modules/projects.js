const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        projects = []; 

        projectData.forEach(project => {
            let sector = sectorData.find(s => s.id === project.sector_id);
            project.sector = sector ? sector.sector_name : "Unknown"; 
            projects.push(project);
        });

        resolve();
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found.");
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        let project = projects.find(p => p.id === projectId);
        project ? resolve(project) : reject(`Project with ID ${projectId} not found.`);
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        let filteredProjects = projects.filter(p => 
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );

        filteredProjects.length > 0
            ? resolve(filteredProjects)
            : reject(`No projects found in sector: ${sector}`);
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
