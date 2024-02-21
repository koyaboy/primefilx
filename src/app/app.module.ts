import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { SkeletonLoaderDirective } from './directives/skeleton-loader.directive';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { TrendingSkeletonComponent } from './components/trending-skeleton/trending-skeleton.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

import { unauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { VideoPlayerModule } from './components/video-player/video-player.module';

@NgModule({
  declarations: [
    SkeletonLoaderDirective,
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    HomeComponent,
    MoviesComponent,
    SeriesComponent,
    BookmarksComponent,
    ShowsListComponent,
    SkeletonComponent,
    TrendingSkeletonComponent,
    LoginComponent,
    LayoutComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    A11yModule,
    PortalModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

    VideoPlayerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([unauthorizedInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
