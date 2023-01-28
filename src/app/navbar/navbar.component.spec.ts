import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { UserComponent } from '../user/user.component';
import { PostsComponent } from '../posts/posts.component';
import { SigninComponent } from '../signin/signin.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'user', component: UserComponent },
        { path: 'posts', component: PostsComponent },
        { path: '', component: SigninComponent }
        ]
      ), HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavbarComponent],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
  });



  it('navigates to /user when the "User" button is clicked', fakeAsync(() => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const buttons = fixture.debugElement.query(By.css('#user'));
    expect(buttons).toBeTruthy();
    (buttons.nativeElement as HTMLButtonElement).click();
    fixture.detectChanges();
    tick();
    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['/user']),
      jasmine.anything()
    );
  }));

  it('navigates to /posts when the "Post" button is clicked', fakeAsync(() => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const buttons = fixture.debugElement.query(By.css('#post'));
    expect(buttons).toBeTruthy();
    (buttons.nativeElement as HTMLButtonElement).click();
    fixture.detectChanges();
    tick();
    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['/posts']),
      jasmine.anything()
    );
  }));

  it('navigates to / and call empty() method when the "logout" button is clicked', async(() => {
    spyOn(component, 'empty');

    let button = fixture.debugElement.nativeElement.querySelector('#logout');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.empty).toHaveBeenCalled();
    });
  }));


  it('test if current path is / in NgOnint, display none', async () => {
    component.ngOnInit();
    await fixture.whenStable();
    component.currentPath = '/';
    fixture.detectChanges();
    const routerLogin = (document.getElementById('routerLogin') as HTMLInputElement).style.display = 'none'
    expect(routerLogin).toBe('none');
  });
  it('test if current path is NOT / in NgOnint, display block', async () => {
    component.ngOnInit();
    await fixture.whenStable();
    component.currentPath = 'otherPath';
    fixture.detectChanges();
    const routerLogin = (document.getElementById('routerLogin') as HTMLInputElement).style.display = 'block'
    expect(routerLogin).toBe('block');
  });


  //Test dei componenti grafici
  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('#title')).nativeElement;
    expect(title.innerHTML).toBe('Urban Score');
  });
  it('should have Users in "Users Button"', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#user');
    expect(btn.innerHTML).toBe('Users');
  });
  it('should have Posts in "Posts Button"', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#post');
    expect(btn.innerHTML).toBe('Posts');
  });
  it('should have Logout in "logout Button"', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#logout');
    expect(btn.innerHTML).toBe('Logout');
  });

  it(`urlPath has default value`, () => {
    expect(component.urlPath).toEqual(window.location.pathname);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
