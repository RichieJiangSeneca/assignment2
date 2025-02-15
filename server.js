/********************************************************************************
 *  WEB322 – Assignment 02
 *  
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *  
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *  
 *  Name: [Siyang Jiang] Student ID: [172747230] Date: [Feb 1st 2025]
 ********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 3000;

projectData.initialize()
    .then(() => {
        console.log("Projects initialized successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize projects:", err);
    });

app.get("/", (req, res) => {
    res.send("Assignment 2: [Siyang Jiang] - [172747230]");
});

app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(30) 
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("agriculture") 
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});
