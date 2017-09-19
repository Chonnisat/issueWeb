import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../../shared/issue/issue.service';
import { Issue } from '../../shared/issue/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [IssueService]
})
export class IssueComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService
  ) { }

  projectList = [];
  typeList = [];
  priorityList = [];
  statusList = [];
  picList = [];
  issueByList = [];
  issue: Issue;
  msg = '';

  ngOnInit() {
    this.issue = new Issue();
    this.getDataDDL();
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params["id"];
        this.getDataById(id);
        this.issue.issueId = id;
      }else{
        this.issue.issueStatus = 'O';
        this.issue.issueType = '2';
        var date = new Date();
        this.issue.issueDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
      }
    });
  }

  getDataDDL() {
    this.issueService.loadDataDDL().subscribe(
      datas => {
        this.projectList = datas['projectList'];
        this.typeList = datas['typeList'];
        this.priorityList = datas['priorityList'];
        this.statusList = datas['statusList'];
        this.picList = datas['picList'];
      },
      err => {
        console.log(err);
        alert(err);
      });
  }

  onBack() {
    this.router.navigate(['admin', 'issue-list']);
  }

  onSave() {
    if(this.validateData()){
      if (this.issue.issueId) {
        this.issueService.updateItem(this.issue.issueId, this.issue).subscribe(
          data => {
            Materialize.toast("Update Complete", 3000);
            this.router.navigate(['admin', 'issue-list']);
          },
          err => {
            console.log(err);
          });
      }
      else {
        this.issueService.addItem(this.issue).subscribe(
          user => {
            Materialize.toast('Add Item Complete', 3000);
            this.router.navigate(['admin', 'issue-list']);
          },
          err => {
            console.log(err);
          });
      }
    }else{
      this.alertMsg();
    }
  }

  onProjectChange() {
    this.issue.issueBy = '';
    this.onloadIssueBy();
  }

  onloadIssueBy(){
    this.issueService.loadIssueBy(this.issue.issueProject).subscribe(
      data => {
        this.issueByList = data;
      },
      err => {
        console.log(err);
        alert(err);
      });
  }

  getDataById(id){
    this.issueService.loadDataById(id).subscribe(
      issue => {
        this.issue = issue[0];
        this.onloadIssueBy();
        setTimeout(() => {
          $('#issueDesc').trigger('autoresize');
          $('#issueSolution').trigger('autoresize');
        }, 0);
      },
      err => {
        console.log(err);
      });
  }

  setIssueBy(by){
    this.issue.issueBy = by;
  }

  validateData(){
    var ret = true;

    if(!this.issue.issueProject){
      ret = false;
      this.msg = 'Please enter project.';
    }

    if(!this.issue.issueDate){
      ret = false;
      this.msg = 'Please enter issue date.';
    }

    if(!this.issue.issueType){
      ret = false;
      this.msg = 'Please enter issue type.';
    }

    if(!this.issue.issueStatus){
      ret = false;
      this.msg = 'Please enter status.';
    }

    if(!this.issue.issuePic){
      ret = false;
      this.msg = 'Please enter PIC.';
    }

    return ret;
  }

  alertMsg(){
    Materialize.toast(this.msg, 3000, 'deep-orange darken-1');
  }
}