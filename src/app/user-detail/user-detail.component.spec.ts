import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { PostService } from '../services/post/post.service';
import { CommentService } from '../services/comment/comment.service';
import { UserDetailComponent } from './user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let commentService: CommentService;

  beforeEach(() => {

    spyOn(window, "alert");

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserDetailComponent],
      providers: [CommentService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get(): string { return '123'; } } } } },
      ]
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    commentService = TestBed.get<CommentService>(CommentService);

    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it(`posts has default value`, () => {
    expect(component.posts).toEqual([]);
  });

  it(`comments has default value`, () => {
    expect(component.comments).toEqual([]);
  });

  it(`displayStyle has default value`, () => {
    expect(component.displayStyle).toEqual(`none`);
  });

  it(`urlPath has default value`, () => {
    expect(component.urlPath).toEqual(window.location.pathname);
  });

  it('should calls getDetailUser and getPostDetailByUser ', () => {
    spyOn(component, 'getDetailUser').and.callThrough();
    spyOn(component, 'getPostDetailByUser').and.callThrough();
    component.ngOnInit();
    expect(component.getDetailUser).toHaveBeenCalled();
    expect(component.getPostDetailByUser).toHaveBeenCalled();
  });

  it('should calls getCommentDetailByUser', () => {
    const commentServiceStub: CommentService = fixture.debugElement.injector.get(
      CommentService
    );
    spyOn(commentServiceStub, 'getComments').and.callThrough();
    component.getCommentDetailByUser();
    expect(commentServiceStub.getComments).toHaveBeenCalled();
  });

  it('should calls getPostDetailByUser', () => {
    const postServiceStub: PostService = fixture.debugElement.injector.get(
      PostService
    );
    spyOn(postServiceStub, 'getPosts').and.callThrough();
    component.getPostDetailByUser();
    expect(postServiceStub.getPosts).toHaveBeenCalled();
  });

  it('should calls getDetailUser', () => {
    const userServiceStub: UserService = fixture.debugElement.injector.get(
      UserService
    );
    spyOn(userServiceStub, 'getUserById').and.callThrough();
    component.getDetailUser();
    expect(userServiceStub.getUserById).toHaveBeenCalled();
  });

  it('should create', waitForAsync(() => {
    const fixture = TestBed.createComponent(UserDetailComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
  it('should check for the add error call ', () => {
    let error: { status: string; } = {'status': '401'}
    spyOn(commentService, 'addComments')
    .and.returnValue(throwError(error));
    component.onSubmitComment("", "", "");
    fixture.autoDetectChanges();
    expect(commentService.addComments).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
