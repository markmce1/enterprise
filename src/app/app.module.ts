import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent} from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule }from '@angular/material/button'
import { MatToolbarModule }from '@angular/material/toolbar'
import { HeaderComponent } from './header/header.component';
import { StartListComponent } from './start-list/start-list.component';
import { MatExpansionModule }from '@angular/material/expansion'; 

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    HeaderComponent,
    StartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
