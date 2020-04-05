
import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../start.model';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']

})
export class StartComponent {
    enteredTitle = "";
    enteredContent = "";
    @Output() postCreated = new EventEmitter<Post>();

    onAddPost()
    { 
        console.log('ds')
        const post: Post = {
            title: this.enteredTitle, 
            content:this.enteredContent
        };
        this.postCreated.emit(post);
    }


}  