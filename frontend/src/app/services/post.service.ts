import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = 'http://0.0.0.0:8000';
  private token: string;
  public posts: Post[] = [];
  

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    this.http.post(`${this.url}/api/posts/`, post)
      .subscribe();
  }

  listPosts() {
    this.http.get<Post[]>(`${this.url}/api/posts`)
      .subscribe(res => {             // [{title: "", content:""}, {title: "", content:""}]
        for (let i = 0; i < res.length; i++) {
        this.posts.push(res[i]);
        }
      });
      return this.posts;
  }

}
