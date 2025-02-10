import {AfterViewInit, Component, ElementRef, Input, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {ProjectsService} from "../../services/project.service";
import {Project} from "../../schemas/project";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {debounceTime, fromEvent} from "rxjs";
import {NgClass} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent,
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
    const mobileWrapSize = 60;

    if (this.isMobile) {
      return {
        'width': `${dividedPageWidthPerPage - mobileWrapSize}px` || '0px',
      }
    }

    return {
      'width': `${dividedPageWidthPerPage}px` || '0px'
    };
  }

  get numberOfShiftCards() {
    return this.currentPage - 1;
  }

  get styleOfLeftShiftPercentOnSlide() {
    const shiftingPercentage = 100 / this.projects.length;

    if (this.isMobile) {
      return {'transform': `translate(0, 0)`};
    }

    return {
      'transform': `translate(-${shiftingPercentage * this.numberOfShiftCards}%, 0)`,
      'transition': 'transform 0.3s ease-in-out'
    };
  }

  get isMobile() {
    return this.currentDevice === 'xs';
  }

  get pageSizeForBreakpoints() {
    switch (this.currentDevice) {
      case 'xl':
      case 'lg':
      case 'md':
      case 'sm':
        return 2;
      case 'xs':
        return 1;
      default:
        return 2;
    }
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
    this.pageSize = this.pageSizeForBreakpoints;

    fromEvent(window, 'resize').pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.pageSize = this.pageSizeForBreakpoints;
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
