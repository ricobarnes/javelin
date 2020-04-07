import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './feature/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './feature/pages/dashboard/dashboard.component';
import { TasksComponent } from './feature/pages/tasks/tasks.component';
import { ProjectsComponent } from './feature/pages/projects/projects.component';
import { MetricsComponent } from './feature/pages/metrics/metrics.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'metrics', component: MetricsComponent },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
