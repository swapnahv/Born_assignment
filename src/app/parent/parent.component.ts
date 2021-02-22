import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  formGroup: FormGroup;

  constructor(private DetailsService:DetailsService) { }

  ngOnInit(): void {
  }

  getFormFields(){
  	this.DetailsService.getForm().subscribe(response=>{
      this.formDetails = response;
      this.setupForms();
    });
  }

  setupForms(formDetails?: any) {
    formDetails = formDetails || this.formDetails;
    let group = {};

    formDetails.data.form_fields.forEach(formTemplate => {
      if(formTemplate.component === "checkbox" || formTemplate.component === "select") {
        let boxGroup = {};
        formTemplate.options.forEach(option => {
          let validators = [];
          boxGroup[option] = new FormControl((formTemplate.autoselect && formTemplate.autoselect.includes(option)) || false);
        });
        group[formTemplate.label] = new FormGroup(boxGroup);
      }
      else {
        group[formTemplate.label] = new FormControl(formDetails.autofill || '');
        let validators = [];
  
        if (formTemplate.required) validators.push(Validators.required);
        if (formTemplate.validation) validators.push(Validators.pattern(formTemplate.validation));
  
        group[formTemplate.label].setValidators(validators);
      }
      if(!formTemplate.editable) group[formTemplate.label].disable();
    });
    
    this.formGroup = new FormGroup(group);
  }

  onSubmit(){
    this.DetailsService.postForm(this.formGroup.value).subscribe(response => {
      console.log(response);
    })
  }
}
