import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'movies',
        loadComponent: () =>
          import('./components/movies/movies.component').then(
            (m) => m.MoviesComponent
          ),
      },
      {
        path: 'series',
        loadComponent: () =>
          import('./components/series/series.component').then(
            (m) => m.SeriesComponent
          ),
      },
      {
        path: 'bookmarks',
        loadComponent: () =>
          import('./components/bookmarks/bookmarks.component').then(
            (m) => m.BookmarksComponent
          ),
      },
      {
        path: 'video/:id',
        loadChildren: () =>
          import('./components/video-player/video-player.module').then(
            (m) => m.VideoPlayerModule
          ),
      },
      { path: '*', redirectTo: '', pathMatch: 'full' },
    ],
  },
  // { path: "signup", component: SignupComponent },
  // { path: 'login', component: LoginComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
