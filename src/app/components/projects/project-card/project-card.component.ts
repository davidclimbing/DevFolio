import {Component, Input} from '@angular/core';
import {Project} from "../../../schemas/project";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [
    NgIf
  ],
  standalone: true,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project?: Project | null = null;

  isOpened: boolean = false;

  get transitionStyle() {
    return {
      navigation: "auto"
    }
  }

  openDetails() {
    this.isOpened = !this.isOpened;
  }
}
