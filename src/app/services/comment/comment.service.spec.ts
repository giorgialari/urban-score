import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommentService } from './comment.service';
import { Comment } from '../../models/comments';

describe('CommentService', () => {
  let service: CommentService;
  let httpTestingController: HttpTestingController;
  let fakeApi = 'abc123'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call getComments() and return an array of comments', () => {
    const comment: Comment [] = [
      { "id": 2214,
        "post_id": 2173,
        "name": "Rep. Kamla Kaur",
        "email": "kaur_rep_kamla@gusikowski.name",
        "body": "Dolor praesentium rerum."}
      ]
    service.APIkey = fakeApi
    let APIkey = service.APIkey
    let url = 'https://gorest.co.in/public/v2/posts'
    let postId = 2173;
    service.postId = postId;

    service.getComments().subscribe((res) => {
      expect(res).toEqual(comment);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}/${postId}/comments?access-token=${APIkey}`,
    });

    req.flush(comment);
  });

  it('should call addComments()', () => {
    const expectedComment =  {
        "name": "unique Ramakrishna",
        "email": "new.ramakrishna@15ce.com",
        "body": "New comment",
      returnSecureToken: true
    }

  service.APIkey = fakeApi
  let APIkey = service.APIkey
  let url = 'https://gorest.co.in/public/v2/posts'
  let postId = 1107
  service.postId = postId

  service.addComments("new.ramakrishna@15ce.com", "unique Ramakrishna", "New comment").subscribe((res) => {
    expect(req.request.body).toEqual(expectedComment);
  });
  const req = httpTestingController.expectOne({
    method: 'POST',
    url: `${url}/${postId}/comments?access-token=${APIkey}`,
  });
  req.flush(expectedComment);
});

describe('handleError', () => {
  it('should handle error ', () => {
    service.APIkey = fakeApi
    let APIkey = service.APIkey
    let url = 'https://gorest.co.in/public/v2/posts'
    let postId = 2173;
    service.postId = postId;
    let operation;

    spyOn(service, 'handleError').and.callThrough();
    spyOn(service, 'log').and.callThrough();
    spyOn(console, 'error');

    service.getComments().subscribe(
      response => expect(response).toEqual([]),
      fail
    );
    // Receive GET request
    const req = httpTestingController.expectOne(`${url}/${postId}/comments?access-token=${APIkey}`);
    expect(req.request.method).toEqual('GET');
    // Respond with the mock heroes
    req.flush(operation = 'Invalid request parameters', { status: 404, statusText: 'Bad Request' });

    //The focal point of this test
    expect(service.handleError).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(service.log).toHaveBeenCalledTimes(1);
  });
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
