import { Routes } from '@angular/router';
import {PageNotFoundPageComponent} from "./components/page-not-found-page/page-not-found-page.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
    {
        path: '',
        title: 'DavidClimbing\'s Portfolio',
        component: HomeComponent,
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
