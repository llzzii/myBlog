import { Component, Input, OnInit } from "@angular/core";

import { COLORS } from "../../common/color";
import { CommunicationService } from "../../common/communication.service";
import { ResponseData } from "../../entity";
import { HomeService } from "../home.service";

@Component({
  selector: "app-left-aider",
  templateUrl: "./left-aider.component.html",
  styleUrls: ["./left-aider.component.css"],
})
export class LeftAiderComponent implements OnInit {
  @Input() username;
  @Input() isLogin;
  loading = false;
  data = [];
  tags = [];
  tagDatas = [];
  user_des = "";
  userImgUrl = "";
  constructor(private homeService: HomeService, private communicationService: CommunicationService) {}

  getList(): void {
    this.loading = true;
    this.homeService.getNewsBlogs().subscribe((datas: ResponseData) => {
      if (datas.isok) {
        this.data = datas.data;
      }
      this.loading = false;
    });
  }
  getTags() {
    this.homeService.getTags().subscribe((datas) => {
      if (datas.isok) {
        this.tags = datas.data;
        for (let i = 0; i < this.tags.length; i++) {
          let data: any = {};
          let count = Math.floor(Math.random() * 26);
          data.color = COLORS.colors[count];
          data.tag = this.tags[i].tag_name;
          this.tagDatas.push(data);
        }
      }
      this.loading = false;
    });
  }
  getUser() {
    let username = sessionStorage.getItem("user_name");
    if (!this.isLogin) {
      this.username = "游客";
      this.user_des = "咸鱼一条";
      this.userImgUrl = "../../../assets/user/nan.jpg";
    } else {
      this.homeService.getUser(this.username).subscribe((datas: ResponseData) => {
        if (datas.isok) {
          this.username = datas.data[0].user_nickname || datas.data[0].user_name;
          this.user_des = datas.data[0].user_declaration || "咸鱼一条";
          this.userImgUrl = datas.data[0].user_imgurl || "../../../assets/user/nan.jpg";
        }
      });
    }
  }
  ngOnInit() {
    // this.isLogin = this.communicationService.islogin;
    // this.username = this.communicationService.username;
    this.getList();
    this.getTags();
    this.getUser();
  }
  ngOnChanges(): void {
    this.getUser();
  }
}
