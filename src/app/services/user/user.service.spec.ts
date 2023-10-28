import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../../models/users';



describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  let fakeApi = 'abc123'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });


it('should call getUsers and return an array of users', () => {
  const user: User [] = [
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
  userService.APIkey = fakeApi
  let APIkey = userService.APIkey
  let url = 'https://gorest.co.in/public/v2/users'
  let nUsers = '10';
  let nPage = 1;

  userService.getUsers().subscribe((res) => {
    expect(res).toEqual(user);
  });

  const req = httpTestingController.expectOne({

    method: 'GET',
    url: `${url}?page=${nPage}&per_page=${nUsers}&access-token=${APIkey}`,
  });

  req.flush(user);
});


it('should call getUsersById', () => {
  const user =
    {
      id: 23556,
      name: "unique Ramakrishna",
      email: "new.ramakrishna@15ce.com",
      gender: "male",
      status: "active"
    }

  userService.APIkey = fakeApi
  let APIkey = userService.APIkey
  let url = 'https://gorest.co.in/public/v2/users'
  let nUsers = '10';
  let nPage = 1;
  let id = 23556
  userService.getUserById(id).subscribe((res) => {
   expect(res).toEqual(user)
  });

  const req = httpTestingController.expectOne({
    method: 'GET',
    url: `${url}/${id}?access-token=${APIkey}`,
  });

  req.flush(user);
});



it('should call addUser', () => {
    const expectedUser =  {
      name: "unique Ramakrishna",
      email: "new.ramakrishna@15ce.com",
      gender: "male",
      status: "active",
      returnSecureToken: true
    }

  userService.APIkey = fakeApi
  let APIkey = userService.APIkey
  let url = 'https://gorest.co.in/public/v2/users'

  userService.addUser("new.ramakrishna@15ce.com", "unique Ramakrishna", "male","active").subscribe((res) => {
    expect(req.request.body).toEqual(expectedUser);
  });
  const req = httpTestingController.expectOne({
    method: 'POST',
    url: `${url}?access-token=${APIkey}`,
  });
  req.flush(expectedUser);
});

it('should delete the correct data of deleteUser', () => {
  let id = 23556
  userService.APIkey = fakeApi
  let url = 'https://gorest.co.in/public/v2/users'
  let APIkey = userService.APIkey
  userService.deleteUser(id).subscribe((data: any) => {
    expect(data).toBe(id);
  });

  const req = httpTestingController.expectOne({
    method: 'DELETE',
    url: `${url}/${id}/?access-token=${APIkey}`,
  });
  expect(req.request.method).toBe('DELETE');

  req.flush(23556);
});

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  });



