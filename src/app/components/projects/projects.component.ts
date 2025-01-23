import { Component } from '@angular/core';
import {ProjectsService} from "../../services/project.service";
import {Link, Project} from "../../schemas/project";
import {ProjectCardComponent} from "./project-card/project-card.component";

// class ProjectLoader {
//   projects: Project[] = [];
//
//   constructor(page: number,
//               pageSize: number,
//               private projectService: ProjectsService) {
//     this.projectService.getProject(2, 2);
//   }
// }

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent
  ],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {
    this.projects = this.projectsService.getProjects();
    this.projectsService.getProject(2, 2);
  }

  isArray(link: Link | Link[] | undefined) {
    return Array.isArray(link);
  }
}
