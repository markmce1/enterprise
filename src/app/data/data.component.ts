import { Component, OnInit } from '@angular/core'; 
import { PostsService } from '../posts.service';
import { Post } from '../start.model';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  public posts: Post[];
  

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe( data => {
      this.posts = data;
      
    console.log(this.posts);
    });
  }

}