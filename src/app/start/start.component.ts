import { Component, EventEmitter, Output } from '@angular/core';
import { Place } from '../start.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']

})
export class StartComponent {
    enteredTitle = "";
    enteredContent = "";
    @Output() postCreated = new EventEmitter<Place>();

    constructor(public postsService: PostsService) { }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }


}  