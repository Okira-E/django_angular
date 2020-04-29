import {Component, OnInit, Input} from '@angular/core';
import {PostService} from '../services/post.service';
import {NgForm} from '@angular/forms';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: Post[];
  public reachedLimit: boolean = false;
  public currentPage: number = 1;
  public isDeleted: boolean = false;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts = this.postService.listPosts(this.currentPage);
    this.postService.getReachedLimit().subscribe(bool => {
      this.reachedLimit = bool;
    });
  }

  createPost(form: NgForm): void {
    if (!form.value.title || !form.value.content) {
      return;
    }
    const post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postService.createPost(post);
    this.posts = this.postService.listPosts();
  }

  changePage(): void {
    this.posts = this.postService.listPosts(++this.currentPage);
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post);
    this.isDeleted = true;
  }
}
