import { Component, OnInit } from "@angular/core";

import { COLORS } from "../../common/color";

@Component({
  selector: "app-left-aider",
  templateUrl: "./left-aider.component.html",
  styleUrls: ["./left-aider.component.css"],
})
export class LeftAiderComponent implements OnInit {
  loading = false;
  data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  tags = ["前端", "js", "TS", "Angular", "Vue"];
  tagDatas = [];
  constructor() {}

  change(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: "Ant Design Title 1",
          },
          {
            title: "Ant Design Title 2",
          },
          {
            title: "Ant Design Title 3",
          },
          {
            title: "Ant Design Title 4",
          },
          {
            title: "Ant Design Title 1",
          },
          {
            title: "Ant Design Title 2",
          },
          {
            title: "Ant Design Title 3",
          },
          {
            title: "Ant Design Title 4",
          },
          {
            title: "Ant Design Title 1",
          },
          {
            title: "Ant Design Title 2",
          },
          {
            title: "Ant Design Title 3",
          },
          {
            title: "Ant Design Title 4",
          },
        ];
        this.loading = false;
      }, 1000);
    }
  }
  ngOnInit() {
    for (let i = 0; i < this.tags.length; i++) {
      let data: any = {};
      let count = Math.floor(Math.random() * 26);
      data.color = COLORS.colors[count];
      data.tag = this.tags[i];
      this.tagDatas.push(data);
    }
  }
}
