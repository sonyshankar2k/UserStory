import { RouterModule } from '@angular/router';
import { NgModule  } from '@angular/core';
import { HomeComponent } from './home.component';

// Routes
import { HomeRoutes as routes } from './home.routes';
import { UserStoryService } from '../core/services/userStory.service';
import { DataGridComponent } from '../shared/data-grid/data-grid.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  exports: [],
  imports: [RouterModule.forChild(routes)],
  providers: [ UserStoryService ]
})

export class HomeModule {}
