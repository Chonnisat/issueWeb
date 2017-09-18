import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../../shared/issue/issue.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  providers: [IssueService]
})
export class IssueListComponent implements OnInit {

  constructor(
    private router: Router,
    private issueService : IssueService
  ) { }

  issueData = [];
  currentPage: number = 0;
  rowPerPage: number = 10;
  offset: number = 0;
  totalPage: number = 0;
  imgUrl = `${environment.remoteAPI}/api/v1/upload/viewImg/project/`;
  criteria = {
    issueProject : "",
    issueStatus : "O",
    issuePic : "",
    issueDesc : "",
    issueClosed : "",
    issueId : "",
    issueModule : "",
    issuePriority : "",
    currentPage: this.currentPage,
    rowPerPage: this.rowPerPage,
    offset : this.offset
  };

  projectList = [];
  priorityList = [];
  statusList = [];
  picList = [];

  ngOnInit() {
    this.getDataDDL();
    this.onSearch();
  }

  onAddbtnClick() {
    this.router.navigate(['admin', 'issue']);
  }

  onEditbtnClick(id) {
    this.router.navigate(['admin', 'issue', id]);
  }

  onDelbtnClick(id) {
    this.issueService.deleteItem(id).subscribe(
      datas => {
        Materialize.toast('Delete data Complete', 3000);
        this.onSearch();
        this.onSearch();
      },
      err => {
        console.log(err);
      });
  }

  onSearch() {
    $('.collapsible').collapsible('close', 0);
    this.issueData = [];
    this.currentPage = 0;
    this.offset = 0;
    this.totalPage = 0;
    this.onLoadData();
  }

  onLoadData(){
    let searchBody = {
      issueProject : this.criteria.issueProject,
      issueStatus : this.criteria.issueStatus,
      issuePic : this.criteria.issuePic,
      issueDesc : this.criteria.issueDesc,
      issueClosed : this.criteria.issueClosed,
      issueId : this.criteria.issueId,
      issueModule : this.criteria.issueModule,
      issuePriority : this.criteria.issuePriority,
      currentPage: this.currentPage,
      rowPerPage: this.rowPerPage,
      offset: this.offset
    };

    this.issueService.onSearchData(searchBody).subscribe(
      data => {
        this.issueData = this.issueData.concat(data.rows);

        var paging_data = data['paging'];
        this.offset = paging_data.offset;
        this.currentPage = paging_data.current_page;
        this.totalPage = paging_data.total_page;
      }, error => {
        console.log(error);
      }
    );
  }

  renderPaging() {
    // this.totalPage = Math.ceil(this.total/this.rowPerPage);
    // this.paging = [];
    // let currentPage = this.numPage+1;
    // let start = (currentPage - 2) <= 0 ? 1 : currentPage - 2;
    // let limit = (start + 5) >= this.totalPage ? (this.totalPage+1) : (start + 5);
    // for(let i=start; i<limit; i++){
    //   this.paging.push(i);
    // }  
  }

  // gotoPage(pID){
  //   this.currentPage = pID;
  //   this.onSearch();
  // }

  onAttachbtnClick(id) {
    this.router.navigate(['admin', 'issue-attach', id]);
  }

  getDataDDL() {
    this.issueService.loadDataDDL().subscribe(
      datas => {
        this.projectList = datas['projectList'];
        this.priorityList = datas['priorityList'];
        this.statusList = datas['statusList'];
        this.picList = datas['picList'];
      },
      err => {
        console.log(err);
        alert(err);
      });
  }
}
