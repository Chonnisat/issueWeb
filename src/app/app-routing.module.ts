import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicZoneComponent } from './pages/public-zone/public-zone.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivateZoneComponent } from './pages/private-zone/private-zone.component';
import { IssueListComponent } from './pages/issue-list/issue-list.component';
import { IssueComponent } from './pages/issue/issue.component';
import { IssueAttachComponent } from './pages/issue-attach/issue-attach.component';
import { LoginGuard } from './shared/user/login.guard';

const routes: Routes = [
  {
    path: '',
    component : PublicZoneComponent,
    children: [{
      path : '', 
      component: LoginComponent
    },{
      path : 'login', 
      component: LoginComponent
    }]
  },{
    path: 'admin',
    component : PrivateZoneComponent,
    canActivate: [LoginGuard],
    children: [{
      path : 'issue-list', 
      component: IssueListComponent
    },{
      path : 'issue', 
      component: IssueComponent
    },{
      path : 'issue/:id', 
      component: IssueComponent
    },{
      path : 'issue-attach/:id', 
      component: IssueAttachComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
