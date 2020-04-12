import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { Place } from './start.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private listings: Place[] = [];
  private postsUpdated = new Subject<Place[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; listing: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((placeData => {
        return placeData.listing.map(listingsAndReviews => {
          return{
            name: listingsAndReviews.name,
            summary: listingsAndReviews.summary,
            id: listingsAndReviews._id
          }
        });
      })))
      .subscribe(transformedPlaces => {
        this.listings = transformedPlaces;
        this.postsUpdated.next([...this.listings]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title:string, content:string){
    const listing: Place = { id: null, title:title, content: content};
    this.http.post<{message:string}>('http://localhost:3000/api/posts',listing)
    .subscribe((responseData)=> {
      console.log(responseData.message);
      this.listings.push(listing);
      this.postsUpdated.next([...this.listings]);
    });
  }

}
