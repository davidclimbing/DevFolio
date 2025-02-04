import { Routes } from '@angular/router';
import {PageNotFoundPageComponent} from "./components/page-not-found-page/page-not-found-page.component";
import {HomeComponent} from "./components/home/home.component";
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';
import {projectResolver} from './resolvers/project.resolver';
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  {
    path: '',
    title: 'DavidClimbing\'s Portfolio',
    component: HomeComponent,
  },
  {
    path: 'projects',
    title: 'Davidclimbing\'s Projects',
    component: ProjectsComponent
  },
  {
    path: 'projects/:project_id',
    component: ProjectDetailsComponent,
    resolve: {
      project: projectResolver
    }
  },
  {
    path: 'about',
    title: 'Davidclimbing\'s Story',
    component: AboutComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  },
  {
    path: 'page-not-found',
    component: PageNotFoundPageComponent
  }
];
