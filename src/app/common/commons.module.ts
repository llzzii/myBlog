import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { Canvas2Component } from "../canvas2/canvas2.component";
import { EditorsComponent } from "../editors/editors.component";

import { EditorToHtmlComponent } from "./editor-to-html/editor-to-html.component";
@NgModule({
  declarations: [Canvas2Component, EditorsComponent, EditorToHtmlComponent],
  imports: [CommonModule],
  entryComponents: [EditorsComponent],
  exports: [EditorsComponent, Canvas2Component, EditorToHtmlComponent],
})
export class CommonsModule {}
