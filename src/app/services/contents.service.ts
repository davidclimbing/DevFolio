import {Injectable} from '@angular/core';
import {Contents} from "../schemas/contents";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  constructor(private http: HttpClient) {
  }

  getContents() {
    return this.http.get<Contents>('https://s3.ap-northeast-2.amazonaws.com/portfolio-contents.davidclimbing/contents.json');
  }
}
