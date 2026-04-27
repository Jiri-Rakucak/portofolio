import { ProjectWindow } from "./ProjectWindow";

export interface Project{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        id: "project-one",
        name: "Project One",
        description: "Description for Project One",
        technologies: ["React", "TypeScript"],
        imageUrl: "https://example.com/project-one.png",
        liveUrl: "https://example.com/project-one",
        repoUrl: "https://github.com/user/project-one"
    },
    {
        id: "project-two",
        name: "Project Two",
        description: "Description for Project Two",
        technologies: ["JavaScript", "Node.js"],
        imageUrl: "https://example.com/project-two.png",
        liveUrl: "https://example.com/project-two",
        repoUrl: "https://github.com/user/project-two"
    }
];

export const fileSystem = {
    'Plocha': [],
    'Stažené soubory': [],
    'Dokumenty': [],
    'Projekty': projects.map(project => ({
        name: `${project.name}.project`,
        type: 'file',
        id: project.id
    }))
};

export const webProjects: Project[] = [
 {
    id: "web-project-one",
    name: "Web Project One",
    description: "Description for Web Project One",
    technologies: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://example.com/web-project-one.png",
    liveUrl: "https://example.com/web-project-one",
    repoUrl: "https://github.com/user/web-project-one"
 },
 {
    id: "web-project-two",
    name: "Web Project Two",
    description: "Description for Web Project Two",
    technologies: ["Vue.js", "TypeScript"],
    imageUrl: "https://example.com/web-project-two.png",
    liveUrl: "https://example.com/web-project-two",
    repoUrl: "https://github.com/user/web-project-two"
 }
]