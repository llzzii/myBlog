import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"],
})
export class ContentComponent implements OnInit {
  loading = true;
  tags = ["前端", "js", "TS", "Angular", "Vue"];
  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.loading = false;
  }
}
