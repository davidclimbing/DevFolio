import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {ProjectsService} from '../services/project.service';
import {Project} from '../schemas/project';

export const projectResolver: ResolveFn<{project: Project, title: string}> = (route, _) => {
  const projectId = route.paramMap.get('project_id');
  const project = inject(ProjectsService).getProject(projectId);

  return {
    project: project,
    title: projectId
  };
};
