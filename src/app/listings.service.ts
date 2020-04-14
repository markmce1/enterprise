import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

import { Airbnb } from './start.model';

@Injectable({providedIn: 'root'})
export class ListingsService {
  private listings: Airbnb[] = [];
  private listingsUpdated = new Subject<Airbnb[]>();

  constructor(private http: HttpClient, private router:Router) {}

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
            id: listingsAndReviews._id,
            imagePath:listingsAndReviews.imagePath
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
    return this.http.get<{ _id: string, name:string, summary: string, location: string, description: string, imagePath: string }>
    (
      "http://localhost:3000/api/listings/"+ id
    );
  }

  updateListing(id:string, name:string, summary:string, location:string, description:string, image: File  | string){
    let listingData:Airbnb | FormData;
    if(typeof image === 'object')
    {
      listingData = new FormData();
      listingData.append("id",id);
      listingData.append("name",name);
      listingData.append("summary", summary);
      listingData.append("location",location);
      listingData.append("description",description);
      listingData.append("image",image,name);
    }else{
      listingData = { 
        id:id,
        name:name,
        summary:summary,
        location:location,
        description:description,
        imagePath:image
      } 
    };
    this.http.put("http://localhost:3000/api/listings/"+ id,listingData)
    .subscribe(response => {
      const updatedListings = [...this.listings];
      const oldListingIndex = updatedListings.findIndex(l => l.id === id);
      const listing: Airbnb= {
        id:id,
        name:name,
        summary:summary,
        location:location,
        description:description,
        imagePath:""

      }
      updatedListings[oldListingIndex] = listing;
      this.listings = updatedListings;
      this.listingsUpdated.next([...this.listings]);
      this.router.navigate(['/']);
    });
  }

  deleteListing(listingId: string){//grabs the id of what is deleting and passes it to the back end with the http.delete method and subscribes. Refreshes the listing to remove any listings that arent in the db
    this.http.delete("http://localhost:3000/api/listings/" + listingId)
    .subscribe(()=>{
      const updatedlistings = this.listings.filter(listing => listing.id !== listingId);
      this.listings = updatedlistings;
      this.listingsUpdated.next([...this.listings]);
    });
  }

  addListing(name:string, summary:string, location:string, description:string, image:File){
    const listingData = new FormData();
    listingData.append("name",name);
    listingData.append("summary",summary);
    listingData.append("location",location);
    listingData.append("description",description);
    listingData.append("image",image, name);
    this.http
    .post<{message:string, listing:Airbnb}>(
      'http://localhost:3000/api/listings',listingData
      )
    .subscribe((responseData)=> {
      //adds the new ID of a newly added listing back to it, allows for deletion of new listings
      const listing: Airbnb = {
        id:responseData.listing.id, 
        name: name, 
        summary: summary, 
        location: location, 
        description:description,
        imagePath: responseData.listing.imagePath
      };
      this.listings.push(listing);
      this.listingsUpdated.next([...this.listings]);
      this.router.navigate(['/']);

    });
  }


}
