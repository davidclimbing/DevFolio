import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {AboutComponent} from "../about/about.component";
import {ProjectsComponent} from "../projects/projects.component";
import {CareerComponent} from "../career/career.component";
import {SkillsComponent} from "../skills/skills.component";

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ProjectsComponent,
    CareerComponent,
    SkillsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
