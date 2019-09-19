import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let leftMainHeight = window.innerHeight;
    let rightMain = document.getElementById("rightHeight");
    let mainHeight = document.getElementById("mainHeight");
    rightMain.style.height = leftMainHeight - 160 + "px";
    mainHeight.style.height = leftMainHeight - 160 + "px";
  }
  // 设置页面高度
  AfterViewChecked(): void {}
}
