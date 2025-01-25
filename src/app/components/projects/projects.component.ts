import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectsService} from "../../services/project.service";
import {Project} from "../../schemas/project";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {debounceTime, fromEvent} from "rxjs";

class ProjectLoader {
  projects: Project[] = [];

  constructor(page: number,
              pageSize: number,
              private projectService: ProjectsService) {
  }

  load() {

  }
}

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent
  ],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects: Project[] = [];
  sectionWidth: number = 0;
  pageSize: number = 2;
  currentPage: number = 1;

  isLoading: boolean = false;

  @ViewChild("slide") slide: ElementRef;

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
    return {
      'transform': `translate(-${50 * this.numberOfShiftCards}%, 0)`, // 50%씩 이동 (2개 카드 기준)
      'transition': 'transform 0.3s ease-in-out'
    };
  }

  constructor(private projectsService: ProjectsService) {
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
    }, 0)
  }

  moveNextPage() {
    if (this.currentPage < this.projects.length)
    this.currentPage += 1;
  }

  movePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }
}
