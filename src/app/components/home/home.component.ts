import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {AboutComponent} from "../about/about.component";
import {ProjectsComponent} from "../projects/projects.component";
import {CareerComponent} from "../career/career.component";
import {SkillsComponent} from "../skills/skills.component";
import {ActivitiesComponent} from "../activities/activities.component";

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ProjectsComponent,
    CareerComponent,
    SkillsComponent,
    ActivitiesComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
