import {Component, Input} from '@angular/core';
import {Project} from "../../../schemas/contents";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-project-card',
  imports: [
    NgClass
  ],
  standalone: true,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project?: Project | null = null;
  @Input() currentDevice: string | null = null;
  @Input() isExpanded: boolean = false;

  isOpened: boolean = false;

  get isMobile() {
    return this.currentDevice === 'xs';
  }
}
