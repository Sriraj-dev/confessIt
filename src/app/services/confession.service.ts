import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../shared/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConfessionService {

  // write all the functions to fetch/update the confessions
  // like adding a post, deleting a post, like/comment etc.
  // send http requests to the server for making required changes



  constructor(private http:HttpClient) { }

  postConfession(title:string,description:string){
    const data = {
      title,
      description
    }
    return this.http.post(EndPoints.postconfession,data);
  }

  getConfessions(){
    return this.http.get(EndPoints.getConfessions)
  }

  likeConfession(){

  }

  unlikeConfession(){

  }

  comment(){

  }
}
