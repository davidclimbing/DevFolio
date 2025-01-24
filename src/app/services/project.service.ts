import { Injectable } from '@angular/core';
import projectData from '../../project-data/data.json'
import {Project} from "../schemas/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = projectData.projects;

  getProjects(): Project[] {
    return this.projects;
  }

  // getProject(page: number, pageSize: number) {
  //   return this.projects.filter((project, index) => console.log(project, index, page, pageSize));
  // }
}
