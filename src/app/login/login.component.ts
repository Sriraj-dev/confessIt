import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notif/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //make the text fields in html and use them to fill these fields
  username: string;
  password: string;

  constructor (private authService: AuthService,private notificationService: NotificationService) {

  }



  //Use this function when user presses the login button
  //user ko currentUser mai store krdega, then you can navigate to the page which you want
  login(){
    this.authService.login(this.username,this.password).subscribe(res=>{
      if(res){
        this.authService.isLoggedIn = true;
        this.authService.currentUser = res.user;
        this.notificationService.showSuccess('Successfully Logged in')
      }
    })
  }

}
