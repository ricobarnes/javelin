import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { MetricsComponent } from './pages/metrics/metrics.component';

@NgModule({
  declarations: [PageNotFoundComponent, DashboardComponent, ProjectsComponent, TasksComponent, MetricsComponent],
  imports: [CommonModule, SharedModule],
})
export class FeatureModule {}
