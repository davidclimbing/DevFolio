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
      'width': dividedPageWidthPerPage
    };
  }

  get numberOfShiftCards() {
    const numberOfCurrentPage = this.currentPage;
    let numberOfShiftCards = (this.currentPage - 1) * this.pageSize;
    if (numberOfCurrentPage < this.projects?.length) numberOfShiftCards = 0;
    return numberOfShiftCards;
  }

  get styleOfLeftShiftPercentOnSlide() {
    // if return {'transform': 'translate(0, 0)'};
    const percentPerCard = 100 / this.pageSize;
    // const percentPerCard = new Fraction(100).div(this.perPageOfTop);
    return {
      'transform': `translate(-${percentPerCard * this.numberOfShiftCards}%, 0)`
    };
  }

  constructor(private projectsService: ProjectsService) {
    this.projects = this.projectsService.getProjects();
  }

  ngOnInit() {
    this.sectionWidth = this.slide?.nativeElement?.offsetWidth || 0;

    fromEvent(window, 'resize').pipe(
      // 화면 사이즈 변화가 끝났을 때 이벤트만 받기 위해서 설정
      debounceTime(300)
    ).subscribe(() => {
      this.sectionWidth = this.slide?.nativeElement?.offsetWidth || 0;
    })
  }

  ngAfterViewInit() {
    this.sectionWidth = this.slide?.nativeElement?.offsetWidth || 0;
  }

  moveNextPage() {
    this.currentPage += 1;
  }

  movePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }
}
