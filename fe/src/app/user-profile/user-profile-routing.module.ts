import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./components/user-profile.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
