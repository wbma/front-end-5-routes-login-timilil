import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaServiceService {

  username: string;
  password: string;
  status: string;
  apiUrl: 'http://media.mw.metropolia.fi/wbma';
  moi: 'MOI';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login() {
    console.log('uname: ' + this.username);
    console.log('pwd ' + this.password);

    const body = {
      username: this.username,
      password: this.password,
    };

    // this is optional
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    this.http.post('http://media.mw.metropolia.fi/wbma/login', body, settings).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        this.router.navigate(['front']);
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
      });
  }

  register(user) {
    return this.http.post('http://media.mw.metropolia.fi/wbma/users', user);
  }

  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.get('http://media.mw.metropolia.fi/wbma/users/user',
      settings);
  }

}
