import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../models/post.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: Post[];
  public reachedLimit: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.listPosts();
    if (!this.reachedLimit) {
      interval(500).subscribe(count => {
        if (this.posts.length >= 2) {
          this.reachedLimit = true;
        }
      })
    }
  }

  createPost(form: NgForm) {
    if (!form.value.title || !form.value.content) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    }
    this.postService.createPost(post);
    this.postService.listPosts();
  }
}
