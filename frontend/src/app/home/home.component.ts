import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../models/post.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: Post[];
  public reachedLimitSub: Subscription;
  public reachedLimit: boolean = false;
  public page: number = 1;
  public currentPage: number = 1;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.listPosts(this.currentPage);
    this.postService.getReachedLimit().subscribe(bool => {
      this.reachedLimit = bool;  
    })
    console.log(this.posts);
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

  changePage() {
    this.posts = this.postService.listPosts(++this.currentPage);
  }
}
