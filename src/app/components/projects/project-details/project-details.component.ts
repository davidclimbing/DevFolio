import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../schemas/project';

@Component({
  selector: 'app-project-details',
  imports: [
    NgIf
  ],
  templateUrl: './project-details.component.html',
  standalone: true,
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent {
  project: Project | null = null;

  constructor(private route: ActivatedRoute,
              private htmlTitle: Title) {
    this.route.data.subscribe((resp) => {
      this.htmlTitle.setTitle('Davidclimbing\'s Project ' + resp['project']?.project?.title);
      this.project = resp['project']?.project;
    })
  }
}
