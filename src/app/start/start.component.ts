import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Airbnb } from '../start.model';
import { NgForm } from '@angular/forms';
import { ListingsService } from '../listings.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']

})
export class StartComponent implements OnInit {
    enteredName = "";
    enteredSummary = "";
    private mode = "add";
    private listingId: string;
    listing: Airbnb;
    @Output() listingCreated = new EventEmitter<Airbnb>();

    constructor(public listingsService: ListingsService,public route: ActivatedRoute) { }
 
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("listingId")){
        this.mode = "edit";
        this.listingId = paramMap.get("listingId");
        this.listing = this.listingsService.getListing(this.listingId);
        console.log(paramMap);
      }else{
        this.mode = "create";
        this.listingId = null;
      }
    });
  }

    onSaveListing(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode === 'add'){
      this.listingsService.addListing(form.value.name, form.value.summary, form.value.location, form.value.description);
    }else{
      this.listingsService.updateListing(this.listingId,form.value.name, form.value.summary, form.value.location, form.value.description)
    }
  
    form.resetForm();
  }



}  