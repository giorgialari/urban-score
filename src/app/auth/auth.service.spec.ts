import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../models/users';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let fakeApi = 'abc123'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call signIn', () => {
    const user:User[]= [
      {
      "id": 23556,
      "name": "unique Ramakrishna",
      "email": "new.ramakrishna@15ce.com",
      "gender": "male",
      "status": "active"
      },
      {
      "id": 23552,
      "name": "postman Ramakrishna",
      "email": "postman.ramakrishna@15ce.com",
      "gender": "male",
      "status": "active"
      },
      {
      "id": 23509,
      "name": "Tenali Ramakrishna",
      "email": "4@test.com",
      "gender": "male",
      "status": "active"
      },
      {
      "id": 23505,
      "name": "Tenali Ramakrishna",
      "email": "3@test.com",
      "gender": "male",
      "status": "active"
      },
      {
      "id": 23485,
      "name": "Tenali Ramakrishna",
      "email": "2@test.com",
      "gender": "male",
      "status": "active"
      },
      {
      "id": 4410,
      "name": "Divya Dubashi",
      "email": "divya_dubashi@hammes-beahan.biz",
      "gender": "female",
      "status": "inactive"
      },
      {
      "id": 4409,
      "name": "Vimal Pilla",
      "email": "pilla_vimal@lindgren.name",
      "gender": "female",
      "status": "inactive"
      },
      {
      "id": 4408,
      "name": "Bhamini Varman",
      "email": "varman_bhamini@veum.io",
      "gender": "female",
      "status": "active"
      },
      {
      "id": 4407,
      "name": "Chaten Varma",
      "email": "chaten_varma@farrell.biz",
      "gender": "male",
      "status": "inactive"
      },
      {
      "id": 4406,
      "name": "Vasudha Tagore",
      "email": "tagore_vasudha@koss.co",
      "gender": "female",
      "status": "active"
      }
      ]
    service.APIkey = fakeApi
    let APIkey = service.APIkey
    let url = 'https://gorest.co.in/public/v2/users'

    service.signIn(APIkey).subscribe((res) => {
      expect(res.status).toEqual(200)
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}?access-token=${APIkey}`,
    });
    req.flush(user);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
