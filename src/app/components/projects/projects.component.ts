import {AfterViewInit, Component, ElementRef, Input, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {ProjectsService} from "../../services/project.service";
import {Project} from "../../schemas/project";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {debounceTime, fromEvent} from "rxjs";
import {NgClass} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent,
    RouterLink,
    NgClass
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @Input() isExpanded = true;
  @ViewChild("slide") slide: ElementRef;

  projects: Project[] = [];
  sectionWidth: number = 0;
  pageSize: number = 2;
  currentPage: number = 1;

  loadingSignal: WritableSignal<boolean> = signal(false);

  currentDevice: string | null = null;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xs'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);

  get computedWidthOfCard() {
    const dividedPageWidthPerPage = this.sectionWidth / this.pageSize;

    return {
      'width': `${dividedPageWidthPerPage}px` || '0px'
    };
  }

  get numberOfShiftCards() {
    return this.currentPage - 1;
  }

  get styleOfLeftShiftPercentOnSlide() {
    const shiftingPercentage = 100 / this.projects.length;

    return {
      'transform': `translate(-${shiftingPercentage * this.numberOfShiftCards}%, 0)`,
      'transition': 'transform 0.3s ease-in-out'
    };
  }

  get isMobile() {
    return this.currentDevice === 'xs';
  }

  constructor(private projectsService: ProjectsService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<ProjectDetailsComponent>,
              private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver) {
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

    this.projects = this.projectsService.getProjects();
  }

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.sectionWidth = this.slide?.nativeElement?.offsetWidth || 0;
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sectionWidth = this.slide?.nativeElement?.offsetWidth || 0;
      this.loadingSignal.update(() => true);
    }, 200)
  }

  onOpenProjectDetails(project: Project) {
    this.dialogRef = this.dialog.open(ProjectDetailsComponent, {
      data: project,
    })
  }

  moveNextPage() {
    if (this.currentPage < this.projects.length) {
      this.currentPage += 1;
    }
  }

  movePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }
}
