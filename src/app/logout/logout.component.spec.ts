import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  class RouterStub {
    url = '';
    navigate(commands: any[], extras?: any) { }
  }
  beforeEach(() => {
  
    TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LogoutComponent],
      providers: [
        { provide: AuthService },
        { provide: Router, useClass: RouterStub}
      ]
    });
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy(); 
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(authServiceStub, 'logout').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.ngOnInit();
      expect(authServiceStub.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
