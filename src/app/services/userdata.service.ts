import { Injectable } from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserdataService implements InMemoryDbService {

  constructor() { }
createDb(){
    let users: User[]=[
      {
        id:1,
        title:'Mr',
        firstname:'Oneeb',
        lastname:'Ashfaq',
        dob:'09/17/2001',
        email:'oneeb@test.com',
        password:'123456',
        Acceptterm: true,

      },
      {
        id:2,
        title:'Mr',
        firstname:'Oneeb',
        lastname:'Ashfaq',
        dob:'09/17/2001',
        email:'oneeb@test.com',
        password:'123456',
        Acceptterm: true,

      },
      {
        id:3,
        title:'Mr',
        firstname:'Oneeb',
        lastname:'Ashfaq',
        dob:'09/17/2001',
        email:'oneeb@test.com',
        password:'123456',
        Acceptterm: true,

      }
    ];
    return {users};
  };
  
}
