import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../schemas/contents';
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-project-details',
  imports: [
    MatDialogClose,
    NgClass
  ],
  templateUrl: './project-details.component.html',
  standalone: true,
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  project: Project | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Project,
              private route: ActivatedRoute) {
    this.route.data.subscribe((_) => {
      this.project = this.data
    })
  }
}
