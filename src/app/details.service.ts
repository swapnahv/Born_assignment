import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':'application/json'
	})
};

@Injectable({
  providedIn: 'root'
})

export class DetailsService {

  constructor(private http: HttpClient) { }
  getForm(){
  	const apiGetFormeUrl = 'https://randomform.herokuapp.com';
  	return this.http.get(apiGetFormeUrl);
  }
  postForm(formDetails){
  	const apiSubmitFormUrl = 'https://randomform.herokuapp.com/submit';
  	return this.http.post<boolean>(apiSubmitFormUrl,formDetails,httpOptions);
  }
}
