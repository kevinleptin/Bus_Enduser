import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from '../../pages/home/home.component';
import { RoutesComponent } from '../../pages/routes/routes.component';
import { RouteDetailedComponent } from '../../pages/route-detailed/route-detailed.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PassesComponent } from '../../pages/passes/passes.component';
import { FeedbackComponent } from '../../pages/feedback/feedback.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    RoutesComponent,
    RouteDetailedComponent,
    PassesComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    NgbModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class AdminLayoutModule { }
