import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FeedbackComponent } from 'src/app/pages/feedback/feedback.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PassesComponent } from 'src/app/pages/passes/passes.component';
import { RouteDetailedComponent } from 'src/app/pages/route-detailed/route-detailed.component';
import { RoutesComponent } from 'src/app/pages/routes/routes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'routes/:routeId/details', component: RouteDetailedComponent, canActivate: [AuthGuard] },
  { path: 'routes', component: RoutesComponent, canActivate: [AuthGuard] },
  { path: 'my-passes', component: PassesComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
