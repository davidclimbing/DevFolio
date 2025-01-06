import { Routes } from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {PageNotFoundPageComponent} from "./components/page-not-found-page/page-not-found-page.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'projects',
        component: ProjectsComponent,
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
