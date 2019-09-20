import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef, NzModalService } from "ng-zorro-antd";

import { AddComponent } from "../add/add.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  islogin = false;
  loginForm: FormGroup;
  constructor(private modalService: NzModalService, private fb: FormBuilder) {}

  openAddModal(loginfrom): void {
    const modal = this.modalService.create({
      nzTitle: "写博客",
      nzContent: loginfrom,
      nzComponentParams: {},
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

  login(loginfrom) {
    const modal = this.modalService.create({
      nzTitle: "登录/注册",
      nzContent: loginfrom,
      nzComponentParams: {},
      nzCancelText: "取消",
      nzOkText: "提交",
      nzOnOk: (componentInstance: AddComponent) => {
        // return componentInstance.submitForm();
        for (const i in this.loginForm.controls) {
          this.loginForm.controls[i].markAsDirty();
          this.loginForm.controls[i].updateValueAndValidity();
        }
        sessionStorage.setItem("isLogin", "true");
        this.islogin = true;
      },
    });

    modal.afterOpen.subscribe(() => console.log("[afterOpen] emitted!"));

    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log("[afterClose] The result is:", result));
  }
  logout() {
    sessionStorage.removeItem("isLogin");
    this.islogin = false;
  }
  ngOnInit() {
    if (sessionStorage.getItem("isLogin") === "true") {
      this.islogin = true;
    }
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
