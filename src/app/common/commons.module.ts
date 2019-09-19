import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { Canvas2Component } from "../canvas2/canvas2.component";
import { EditorsComponent } from "../editors/editors.component";
@NgModule({
  declarations: [Canvas2Component, EditorsComponent],
  imports: [CommonModule],
  entryComponents: [EditorsComponent],
  exports: [EditorsComponent, Canvas2Component],
})
export class CommonsModule {}
