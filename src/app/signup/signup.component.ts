import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notif/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    //make the text fields in html and use them to fill these fields
    username: string;
    email:string;
    password: string;
  
    constructor (private authService: AuthService,private notificationService: NotificationService) {
  
    }
  
  
  
    //Use this function when user presses the signup button
    //user ko currentUser mai store krdega, then you can navigate to the page which you want
    signup(){
      this.authService.signUp(this.username,this.password,this.email).subscribe(res=>{
        if(res){
          this.authService.isLoggedIn = true;
          this.authService.currentUser = res.result;
          this.notificationService.showSuccess('Successfully Logged in')
        }
      })
    }
}
