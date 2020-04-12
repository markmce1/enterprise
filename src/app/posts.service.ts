import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { Airbnb } from './start.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private listings: Airbnb[] = [];
  private listingsUpdated = new Subject<Airbnb[]>();

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
      })))//here can be removed
      .subscribe(transformedPlaces => {
        this.listings = transformedPlaces;
        this.listingsUpdated.next([...this.listings]);
      });
  }

  getPostUpdateListener() {
    return this.listingsUpdated.asObservable();
  }

  deleteListing(listingId: string){
    this.http.delete("http://localhost:3000/api/posts/" + listingId)
    .subscribe(()=>{
      const updatedlistings = this.listings.filter(listing => listing.id !== listingId);
      this.listings = updatedlistings;
      this.listingsUpdated.next([...this.listings]);
    });
  }

  addPost(name:string, summary:string){
    const listing: Airbnb = { id: null, name:name, summary: summary};
    this.http.post<{message:string, listingId}>('http://localhost:3000/api/posts',listing)
    .subscribe((responseData)=> {
      const newId = responseData.listingId;
      listing.id = newId;
      this.listings.push(listing);
      this.listingsUpdated.next([...this.listings]);
    });
  }


}
