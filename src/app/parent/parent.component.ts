import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  EmployeeName = new FormControl('');
  formDetails;
  submissionResult;
  constructor(private DetailsService:DetailsService) { }

  ngOnInit(): void {
  }

  getFormFields(){
  	this.DetailsService.getForm().subscribe(response=>{
      this.formDetails = response;
    });
  }

  submitForm() {
    const formDetails = {
      "name": "xyz",
      "address": "123"
    };
    this.DetailsService.postForm(formDetails).subscribe(response => {
      console.log(response);
    })
  }
}
