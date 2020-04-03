import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './feature/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './feature/pages/dashboard/dashboard.component';

const routes: Routes = [
  // { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'tasks',
  //   component: TasksComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
    // canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
