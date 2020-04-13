import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data/data.component';
import { StartComponent } from './start/start.component';


const routes: Routes = [
  { path: '',component: DataComponent },
  {path: 'add',component:StartComponent},
  {path: 'edit/:listingId',component:StartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
