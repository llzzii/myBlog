import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { CommonsModule } from "../common/commons.module";

import { AddComponent } from "./add/add.component";
import { ContentComponent } from "./content/content.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home.component";
import { LeftAiderComponent } from "./left-aider/left-aider.component";
import { RightAiderComponent } from "./right-aider/right-aider.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        children: [{ path: "con", component: ContentComponent }, { path: "", component: ContentComponent }],
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, LeftAiderComponent, RightAiderComponent, ContentComponent, AddComponent],
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes), CommonsModule, NgZorroAntdModule],
  exports: [RouterModule],
  entryComponents: [AddComponent],
})
export class HomeModule {}
