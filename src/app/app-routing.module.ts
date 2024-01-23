import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "movies",
    component: MoviesComponent
  },
  {
    path: "series",
    component: SeriesComponent
  },
  {
    path: "bookmarks",
    component: BookmarksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
