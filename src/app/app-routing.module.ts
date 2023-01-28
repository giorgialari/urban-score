import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'detail/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
