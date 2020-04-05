import { Component, Input } from '@angular/core';
import { Post } from '../start.model';
@Component({

    selector: 'app-start-list',
    templateUrl: './start-list.component.html',
    styleUrls: ['./start-list.component.scss']
})
export class StartListComponent {
  //   posts = [ 
  //      {title: 'first post', content: 'This is the first post'},
  //     {title: 'second post', content: 'This is the second post'},
  //     {title: 'third post', content: 'This is the third post'},
  //
  //  ];
  @Input() posts: Post [];
}