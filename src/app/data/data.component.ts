import { Component,  OnInit, OnDestroy } from '@angular/core'; 
import { PostsService } from '../posts.service';
import { Post } from '../start.model';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {


  posts: Post[] = [];
  private postsSub: Subscription;
  
  constructor(private postsService: PostsService) { }
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
