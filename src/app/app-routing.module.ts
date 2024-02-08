import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: "*", redirectTo: "", pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: "*", redirectTo: "", pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
