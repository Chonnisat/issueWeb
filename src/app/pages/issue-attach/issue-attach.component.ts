import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../shared/upload/upload.service';
import { IssueAttachService } from '../../shared/issue/issue-attach.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-issue-attach',
  templateUrl: './issue-attach.component.html',
  styleUrls: ['./issue-attach.component.css'],
  providers: [UploadService, IssueAttachService]
})
export class IssueAttachComponent implements OnInit {

  filesToUpload: Array<File>;
  id = "";
  fileData = [];
  constructor(
    private uploadService: UploadService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private issueAttachService: IssueAttachService
  ) {

  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params['id'];
        this.id = id;
        this.listFile();
      }
    });
  }

  fileChangeEvent(fileInput) {
		this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  upload() {
    if (this.filesToUpload.length > 0) {
      this.uploadService.makeFileRequest(`${environment.remoteAPI}/api/v1/issue/attach/${this.id}`,
        this.filesToUpload).subscribe((res) => {
            this.listFile();
        });
    }
  }

  listFile(){
    this.issueAttachService.listFile(this.id).subscribe( 
      (fileData)=>{
        this.fileData = fileData;
    } )
  }

  viewFile(fileName){
    window.open(
      `${environment.remoteAPI}/api/v1/issue/view-attach/${this.id}/${fileName}`
    )
  }

  removeFile(fileName){
    var folder = `${this.id}/${fileName}`;
    this.issueAttachService.removeFile(folder).subscribe( 
      (fileData)=>{
        Materialize.toast(`Delete ${fileName} complete.`, 1000);
        this.listFile();
    } )
  }

  onBack() {
    this.router.navigate(['admin', 'issue-list']);
  }

}