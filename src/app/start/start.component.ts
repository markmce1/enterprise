
import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../start.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']

})
export class StartComponent {
    enteredTitle = "";
    enteredContent = "";
    @Output() postCreated = new EventEmitter<Post>();

    onAddPost(form: NgForm)
    { 
        console.log('ds')
        const post: Post = {
            title: form.value.title, 
            content: form.value.content
        };
        this.postCreated.emit(post);
    }


}  