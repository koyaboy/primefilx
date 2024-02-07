import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { unauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { LayoutComponent } from './components/layout/layout.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([unauthorizedInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
