
//All the endpoints of the application!
export class EndPoints{
    static baseUrl:string = "http://localhost:3000";

    static signUpUrl : string = this.baseUrl + '/signup';
    static loginUrl : string = this.baseUrl + '/login';
    static postconfession : string = this.baseUrl + '/postConfession';
    static getConfessions : string = this.baseUrl + '/getConfessions';
    static likeConfession : string = this.baseUrl + '/like';
    static dislikeConfession : string = this.baseUrl + '/dislike';
    static comment : string = this.baseUrl + '/comment'
}