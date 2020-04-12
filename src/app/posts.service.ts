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

  getListings() {//gets the listings from the backend, ala the api/posts part there
    this.http
      .get<{ message: string; listing: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((placeData => {
        return placeData.listing.map(listingsAndReviews => {//makes all them listings equal to whats in the start.model.ts file, the airbnb model
          return{
            name: listingsAndReviews.name,
            summary: listingsAndReviews.summary,
            location: listingsAndReviews.location,
            description : listingsAndReviews.description,
            id: listingsAndReviews._id
          }
        });
      })))//here can be removed
      .subscribe(transformedPlaces => {
        this.listings = transformedPlaces;
        this.listingsUpdated.next([...this.listings]);
      });
  }

  getListingUpdateListener() {//updates after adding and deleting so that theres real time adding and deleting
    return this.listingsUpdated.asObservable();
  }

  deleteListing(listingId: string){//grabs the id of what is deleting and passes it to the back end with the http.delete method and subscribes. Refreshes the listing to remove any posts that arent in the db
    this.http.delete("http://localhost:3000/api/posts/" + listingId)
    .subscribe(()=>{
      const updatedlistings = this.listings.filter(listing => listing.id !== listingId);
      this.listings = updatedlistings;
      this.listingsUpdated.next([...this.listings]);
    });
  }

  addListing(name:string, summary:string, location:string, description:string){
    const listing: Airbnb = { id: null, name: name, summary: summary, location: location, description:description};
    this.http.post<{message:string, listingId}>('http://localhost:3000/api/posts',listing)
    .subscribe((responseData)=> {//adds the new ID of a newly added post back to it, allows for deletion of new posts
      const newId = responseData.listingId;
      listing.id = newId;
      this.listings.push(listing);
      this.listingsUpdated.next([...this.listings]);
    });
  }


}
