import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { Place } from './start.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Place[] = [];
  private postsUpdated = new Subject<Place[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((placeData => {
        return placeData.posts.map(places => {
          return{
            title: places.title,
            content: places.content,
            id: places._id
          }
        });
      })))
      .subscribe(transformedPlaces => {
        this.posts = transformedPlaces;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title:string, content:string){
    const post: Place = { id: null, title:title, content: content};
    this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responseData)=> {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

}
