import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { SigninComponent } from './signin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let router: Router;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SigninComponent],
      providers: [
        { provide: AuthService },
        { provide: Router}
      ]
    });
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('Check Initial Form values for Login', () => {
    const form = component.form
    const formValues = {
      accesstoken: ''
    }
    expect(form.value).toEqual(formValues)
    })

    it('Check validation form after entering TITLE value (form postForm)',() =>{
      const formPost: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#formLogin').querySelectorAll('input')[0];
      formPost.value = '123'
      formPost.dispatchEvent(new Event('input'));
      fixture.detectChanges();
        const titleValueForm = component.form.get('accesstoken');
        expect(formPost.value).toEqual(titleValueForm!.value);
    }) 

    it('should have a link to https://gorest.co.in/consumer/login', () => {
      const debugElements = fixture.debugElement.queryAll(By.css('#externalTokenLink'));
      const index = debugElements.findIndex(de => {
        return de.properties['href'] === 'https://gorest.co.in/consumer/login';
      });
      expect(index).toBeGreaterThan(-1);
    });
    it('button should be valid if form value is valid tokenForm', () => {
      component.form.setValue({
        "accesstoken": "12345", 
      });
      expect(component.form.valid).toEqual(true);
    });

    it('button should be invalid if form value is valid tokenForm', () => {
      component.form.setValue({
        "accesstoken": "", 
      });
      expect(component.form.valid).toEqual(false);
    });
 
    it('should have a Login title', fakeAsync(() => {
      const title = fixture.debugElement.query(By.css('#title')).nativeElement;
      tick(1000)
      expect(title.innerHTML).toBe('Login');
    }));

    it('should disable submit button until form is valid', fakeAsync(() => {
      fixture = TestBed.createComponent(SigninComponent);
      component = fixture.componentInstance;
      component.form.setValue({
        "accesstoken": "", 
      });      
      tick();
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('[type="submit"]').disabled).toBeTruthy();
  }));
   
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const authService: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authService, 'signIn').and.callThrough();
      component.onSubmit();
      expect(authService.signIn).toHaveBeenCalled();
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
