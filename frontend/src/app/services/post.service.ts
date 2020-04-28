import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = 'http://0.0.0.0:8000';
  public posts: Post[] = [];
  public reachedLimitListener = new Subject<boolean>();


  constructor(private http: HttpClient) { }

  createPost(post: Post): void {
    this.http.post(`${this.url}/api/posts/`, post)
      .subscribe();
  }

  listPosts(currentPage = 1): Post[] {
    const queryString: string = `?page=${currentPage}`;
    this.http.get<any>(`${this.url}/api/posts/` + queryString)
      .subscribe(res => {             // [{title: "", content:""}, {title: "", content:""}]
        console.log(res);
        for (let i = 0; i < res.results.length; i++) {
          this.posts.push(res.results[i]);
          if (this.posts.length < res.count) {
            this.reachedLimitListener.next(true);
          } else {
            this.reachedLimitListener.next(false);
          }
        }
      });
    return this.posts;
  }

  getReachedLimit() {
    return this.reachedLimitListener.asObservable();
  }

}
