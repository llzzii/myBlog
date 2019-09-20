import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  addBlog: FormGroup;

  id = 0;
  userName = "";
  catalogs = [];
  articleInfo = [];
  catalogName = "";
  isLoading = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  content: any;
  title;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  submit(): void {
    this.isLoading = true;
    let data = {};
    data["title"] = this.title;
    data["tags"] = this.listOfTagOptions;
    data["title"] = this.content;

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
  getHtmlValue(e) {
    this.content = e.value;
  }
  ngOnInit() {
    this.addBlog = this.fb.group({
      title: [null, [Validators.required]],
      tagss: [null, [Validators.required]],
    });

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;

    let leftMainHeight = window.innerHeight;
    let mainHeight = document.getElementById("mainHeight");

    mainHeight.style.height = leftMainHeight - 100 + "px";
  }
  AfterViewInit() {}
}
