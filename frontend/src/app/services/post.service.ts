import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = 'http://0.0.0.0:8000';
  

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    this.http.post(`${this.url}/api/posts/`, post)
    .subscribe(res => console.log(res));
  }
}
