import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Airbnb } from '../start.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingsService } from '../listings.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
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
    isloading = false;
    listing: Airbnb;
    imagePreview: string;
    form:FormGroup;
    @Output() listingCreated = new EventEmitter<Airbnb>();

    constructor(public listingsService: ListingsService,public route: ActivatedRoute) { }
 
  ngOnInit(){
    this.form = new FormGroup({
      name:new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]}),
      summary: new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]}),
      location:new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]}),
      description:new FormControl(null,{
        validators:[Validators.required, Validators.minLength(10)]}),
      image:new FormControl(null,{
        validators: [ Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("listingId")){
        this.mode = "edit";
        this.listingId = paramMap.get("listingId");
        this.isloading = true;
        this.listingsService.getListing(this.listingId).subscribe(listingData =>{
        this.isloading = false;
          this.listing = {
            id:listingData._id, 
            name: listingData.name,
            summary: listingData.summary,
            location: listingData.location,
            description: listingData.description,
            imagePath: listingData.imagePath,
            creator:listingData.creator
          }
          this.form.setValue({
            name:this.listing.name, summary: this.listing.summary,
            location:this.listing.location, description:this.listing.description,
            image:this.listing.imagePath
          });
        });   
      }else{
        this.mode = "add";
        this.listingId = null;
      }
    });
  }
  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

    onSaveListing() {
    if (this.form.invalid) {
      return;
    }
    this.isloading = true;
    if(this.mode === 'add'){
      this.listingsService.addListing(

        this.form.value.name,
        this.form.value.summary, 
        this.form.value.location,
        this.form.value.description,
        this.form.value.image
        );
    }else{
      this.listingsService.updateListing
      (
        this.listingId,
        this.form.value.name, 
        this.form.value.summary, 
        this.form.value.location, 
        this.form.value.description, 
        this.form.value.image
      );
    }
  
    this.form.reset();
  }



}  