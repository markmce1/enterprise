import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

import { Airbnb } from './start.model';

@Injectable({providedIn: 'root'})
export class ListingsService {
  private listings: Airbnb[] = [];
  private listingsUpdated = new Subject<{listings: Airbnb[], listingCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getListings(listingsPerPage: number, currentPage: number) {//gets the listings from the backend, ala the api/listings part there
    const queryParms= `?pagesize=${listingsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; listing: any, maxListings:number}>(
        "http://localhost:3000/api/listings" + queryParms
      )
      .pipe(map((placeData => {
        return { listings: placeData.listing.map(listingsAndReviews => {//makes all them listings equal to whats in the start.model.ts file, the airbnb model
          return{
            name: listingsAndReviews.name,
            summary: listingsAndReviews.summary,
            location: listingsAndReviews.location,
            description : listingsAndReviews.description,
            id: listingsAndReviews._id,
            imagePath:listingsAndReviews.imagePath
          }
        }), maxListings: placeData.maxListings};
      })))
      .subscribe(transformedPlaceData => {
        this.listings = transformedPlaceData.listings;
        this.listingsUpdated.next({listings: [...this.listings],
           listingCount:transformedPlaceData.maxListings
          });
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
      this.router.navigate(['/']);
    });
  }

  deleteListing(listingId: string){//grabs the id of what is deleting and passes it to the back end with the http.delete method and subscribes. Refreshes the listing to remove any listings that arent in the db
    return this.http.delete("http://localhost:3000/api/listings/" + listingId);
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
      this.router.navigate(['/']);

    });
  }


}
