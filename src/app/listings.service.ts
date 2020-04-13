import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { Airbnb } from './start.model';

@Injectable({providedIn: 'root'})
export class ListingsService {
  private listings: Airbnb[] = [];
  private listingsUpdated = new Subject<Airbnb[]>();

  constructor(private http: HttpClient) {}

  getListings() {//gets the listings from the backend, ala the api/listings part there
    this.http
      .get<{ message: string; listing: any }>(
        "http://localhost:3000/api/listings"
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
      })))
      .subscribe(transformedPlaces => {
        this.listings = transformedPlaces;
        this.listingsUpdated.next([...this.listings]);
      });
  }

  getListingUpdateListener() {//updates after adding and deleting so that theres real time adding and deleting
    return this.listingsUpdated.asObservable();
  }

  getListing(id: string){
    return{...this.listings.find(l => l.id === id)};
  }

  updateListing(id:string, name:string, summary:string, location:string, description:string){
    const listing: Airbnb=  { id: id, name: name, summary: summary, location: location, description:description};
    this.http.put("http://localhost:3000/api/listings/"+ id,listing)
    .subscribe(response => console.log(response));
  }

  deleteListing(listingId: string){//grabs the id of what is deleting and passes it to the back end with the http.delete method and subscribes. Refreshes the listing to remove any listings that arent in the db
    this.http.delete("http://localhost:3000/api/listings/" + listingId)
    .subscribe(()=>{
      const updatedlistings = this.listings.filter(listing => listing.id !== listingId);
      this.listings = updatedlistings;
      this.listingsUpdated.next([...this.listings]);
    });
  }

  addListing(name:string, summary:string, location:string, description:string){
    const listing: Airbnb = { id: null, name: name, summary: summary, location: location, description:description};
    this.http.post<{message:string, listingId}>('http://localhost:3000/api/listings',listing)
    .subscribe((responseData)=> {//adds the new ID of a newly added listing back to it, allows for deletion of new listings
      const newId = responseData.listingId;
      listing.id = newId;
      this.listings.push(listing);
      this.listingsUpdated.next([...this.listings]);
    });
  }


}
