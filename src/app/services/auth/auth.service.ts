import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/usermodel';
import { EndPoints } from 'src/app/shared/endpoints';
import { NotificationService } from '../notif/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //current session:
  currentUser: User;
  isLoggedIn: boolean = false;


  constructor(private http: HttpClient,private notificationService: NotificationService) { }
  
  //create all the functions signUp or login the user

  signUp(username: string,password: string, email: string){

    //here
    //password => password: password
    const data = {
      username: username,
      password,
      email
    }

    return this.http.post<{message:string,result:User}>(EndPoints.signUpUrl,data);
  }

  login(username: string,password: string){
    const data = {
      username,
      password
    }

    return this.http.post<{message:string,user:User}>(EndPoints.loginUrl,data);
  }

}
