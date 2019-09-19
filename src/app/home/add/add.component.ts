import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  id = 0;
  userName = "";
  catalogs = [];
  articleInfo = [];
  catalogName = "";

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
  AfterViewInit() {}
}
