import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './start.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>('http://localhost:3000/api/posts')
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

}
