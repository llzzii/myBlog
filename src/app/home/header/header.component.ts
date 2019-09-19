import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd";

import { AddComponent } from "../add/add.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private modalService: NzModalService) {}

  openAddModal(): void {
    const modal = this.modalService.create({
      nzTitle: "写博客",
      nzContent: AddComponent,
      nzComponentParams: {},
      nzWidth: "1200",
      nzCancelText: "取消",
      nzOkText: "提交",
      nzOnOk: (componentInstance: AddComponent) => {
        // return componentInstance.submitForm();
      },
    });

    modal.afterOpen.subscribe(() => console.log("[afterOpen] emitted!"));

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log("[afterClose] The result is:", result));
  }
  ngOnInit() {}
}
