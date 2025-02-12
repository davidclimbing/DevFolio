import { Component } from '@angular/core';
import {AboutComponent} from "../about/about.component";
import {ProjectsComponent} from "../projects/projects.component";
import {CareerComponent} from "../career/career.component";
import {SkillsComponent} from "../skills/skills.component";
import {ActivitiesComponent} from "../activities/activities.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {NgClass} from '@angular/common';
import {ContentsService} from "../../services/contents.service";
import {Project} from "../../schemas/contents";

@Component({
  selector: 'app-home',
  imports: [
    AboutComponent,
    ProjectsComponent,
    CareerComponent,
    SkillsComponent,
    ActivitiesComponent,
    NgClass
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentDevice: string | null = null;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xs'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);

  projects: Project[] = [];

  constructor(private breakpointObserver: BreakpointObserver,
              private contentsService: ContentsService,) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentDevice = this.displayNameMap.get(query);
          }
        }
      });

    this.contentsService.getContents().subscribe(contents => {
      this.projects = contents?.projects;
    })
  }
}
