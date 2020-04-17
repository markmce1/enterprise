import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent} from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule }from '@angular/material/button'
import { MatToolbarModule }from '@angular/material/toolbar'
import { HeaderComponent } from './header/header.component';
import { MatExpansionModule }from '@angular/material/expansion';
import { DataComponent } from './data/data.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { AuthInterceptor } from './auth-interceptor';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    HeaderComponent,
    DataComponent,
    LoginComponent,
    SignupComponent,
    MylistingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
