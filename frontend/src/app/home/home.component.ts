import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.listPosts();
    console.log(this.posts);
  }

  createPost(form: NgForm) {
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    }
    this.postService.createPost(post);
    this.ngOnInit();
  }
}
