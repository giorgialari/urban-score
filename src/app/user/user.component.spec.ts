import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { User } from '../users';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';




describe('UserComponent', () => {
  let USERS: User[]
  let component: UserComponent;
  let userService: UserService;
  let mockUserService: any;

  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    USERS = [
      {
        "id": 34795,
        "name": "User",
        "email": "sadasGuru@email.com",
        "gender": "male",
        "status": "active"
      },
      {
        "id": 34791,
        "name": "emailc",
        "email": "sdadsada@gmail.com",
        "gender": "female",
        "status": "active"
      },
      {
        "id": 34790,
        "name": "ssasdasa",
        "email": "emailproava@mai.com",
        "gender": "male",
        "status": "active"
      },
      {
        "id": 34789,
        "name": "maek",
        "email": "emailprova@mai.com",
        "gender": "female",
        "status": "active"
      },
      {
        "id": 34788,
        "name": "sdaNuo",
        "email": "nuvow@email.cpm",
        "gender": "female",
        "status": "active"
      },
      {
        "id": 34786,
        "name": "Nuvoo",
        "email": "emailN@email.com",
        "gender": "male",
        "status": "active"
      },
      {
        "id": 23556,
        "name": "unique Ramakrishna",
        "email": "new.ramakrishna@15ce.com",
        "gender": "female",
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
      }
    ]
    //Mock UserComponent
    mockUserService = jasmine.createSpyObj(['deleteUser', 'addUser'])
    component = new UserComponent(mockUserService)
    spyOn(window, "alert");



    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        NoopAnimationsModule,
        MatSlideToggleModule,
        RouterTestingModule,
        Ng2SearchPipeModule],
      providers: [UserService],
      declarations: [UserComponent,],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);

    userService = TestBed.get<UserService>(UserService);
    component = fixture.componentInstance;


    fixture.detectChanges();

  });




  //Test FORM addUser
  it('title form should be Add User', () => {
    const title = fixture.debugElement.query(By.css('#titleForm')).nativeElement;

    expect(title.textContent).toEqual('Add User');
  });
  it('Check Initial Form values for addUser', () => {
    const form = component.form
    const formValues = {
      email: '',
      name: '',
      gender: '',
      status: ''
    }
    expect(form.value).toEqual(formValues)
  })

  it('Check validation form after entering EMAIL value (form addUser)', () => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[0];
    formUser.value = 'emailtest@email.com'
    formUser.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const emailValueForm = component.form.get('email');
    expect(formUser.value).toEqual(emailValueForm!.value);
    expect(emailValueForm!.errors).toBeNull();
  })

  it('Check validation form after entering NAME value (form addUser)', () => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[1];
    formUser.value = 'Rachida'
    formUser.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const emailValueForm = component.form.get('name');
    expect(formUser.value).toEqual(emailValueForm!.value);
    expect(emailValueForm!.errors).toBeNull();
  })

  it('Check validation form after entering GENDER value (form addUser)', () => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[2];
    formUser.value = 'male'
    formUser.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const emailValueForm = component.form.get('gender');
    expect(formUser.value).toEqual(emailValueForm!.value);
    expect(emailValueForm!.errors).toBeNull();
  })

  it('Check validation form after entering STATUS value (form addUser)', () => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[3];
    formUser.value = 'active'
    formUser.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const emailValueForm = component.form.get('status');
    expect(formUser.value).toEqual(emailValueForm!.value);
    expect(emailValueForm!.errors).toBeNull();
  })
  it('form is invalide button is disable', () => {
    let submitEL: DebugElement = fixture.debugElement.query(By.css('.submitButton[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  })



  //Test FORM number of users
  it('title form should be Number of users', () => {
    const title = fixture.debugElement.query(By.css('#titleNumberUsersForm')).nativeElement;

    expect(title.textContent).toEqual('Number of users');
  });

  it('Check Initial Form values for numberUsers', () => {
    const form = component.nUserForm
    const formValues = {
      userNumber: ''
    }
    expect(form.value).toEqual(formValues)
  });

  it('should be valid if form value is valid numberUsers', () => {
    component.nUserForm.setValue({
      "userNumber": "1",
    });
    expect(component.nUserForm.valid).toEqual(true);
  });
  it('form is invalide button is disable', () => {
    let submitEL: DebugElement = fixture.debugElement.query(By.css('.submitButton[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  })

  it('if form and numberUsers are valid button are enable', waitForAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.nativeElement.querySelectorAll('[matInput]');
      input.value = 'someValue';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    });
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeFalsy();
  }));



  //Test dei metodi
  it('method should be called getUsers', () => {
    var spy = spyOn(component, "getUsers")();
    expect(component).toBeDefined();
    expect(spy);
    expect(component.getUsers).toHaveBeenCalled();
  });
  it("should call getUsers and return list of users getUsers()", fakeAsync(() => {
    const response: User[] = [];
    spyOn(userService, 'getUsers').and.returnValue(of(response))
    component.getUsers();
    tick();
    expect(component.users).toEqual(response);
  }));

  it('should DELETE the select User from users', () => {
    component.users = USERS
    spyOn(userService, 'deleteUser').and.returnValue(of(USERS[1]));
    component.delete(USERS[1])
    expect(component.users.length).toBe(9)
  })

  it('should ADD the select User from users', () => {
    component.users = USERS
    let newUser: User = {
      "id": 1213,
      "name": "NomeN",
      "gender": "Male",
      "status": "Active",
      "email": "email@test.com"
    }
    component.add
    expect(component.add).toBeTruthy();
    //Conta quanti argomenti devono esserci all'interno del metodo
    expect(component.add.length).toBe(4);
    //Simula una chiamata all'api per aggiungere un nuovo utente
    mockUserService.addUser.and.returnValue(of(newUser));
    mockUserService.addUser().subscribe((adduser: User) => {
      component.users.push(adduser);
    })
    expect(component.users.length).toBe(11)
  })

  it('should check for the add error call ', () => {
    let error: { status: string; } = {'status': '401'}
    spyOn(userService, 'addUser').and.returnValue(throwError(error));
    component.add("", "", "", "");
    fixture.autoDetectChanges();
    expect(userService.addUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });


  //Test dei componenti grafici
  it('should count element in ngFor component', () => {
    component.users = USERS;
    fixture.detectChanges();
    const element: DebugElement[] = fixture.debugElement.queryAll(By.css('.example-card'));
    expect(element.length).toEqual(10)
  })

  it('button click event nextPage', waitForAsync(() => {
    spyOn(component, 'nextPage');
    let button = fixture.debugElement.nativeElement.querySelector('.nextPage');
    button.click();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  }));

  it('button click previousPage is disabled', waitForAsync(() => {
    expect(fixture.debugElement.nativeElement.querySelector('.previousPageDisabled').disabled).toBeTruthy();
  }))

  it('button click previousPage is enabled when click on nextPage', waitForAsync(() => {
    expect(fixture.debugElement.nativeElement.querySelector('.previousPageDisabled').disabled).toBeTruthy();
    //trigger change
    const button = fixture.debugElement.nativeElement.querySelector(('.nextPage'));
    button.click();   // this will change show to false
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.previousPageEnabled').disabled).toBeFalsy();
  }))

  it('sidebar should be close', fakeAsync(() => {
    const slider = fixture.debugElement.query(By.css('mat-drawer'));
    expect(slider).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-drawer-opened')).toBeFalsy()
  }))
  it('should OPEN sidebar when click on Edit button', () => {
    let button = fixture.debugElement.nativeElement.querySelector('.editButton');
    button.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-drawer-opened')).toBeTruthy()
  })

  it('should CLOSE sidebar when click on Edit button', () => {
    let button = fixture.debugElement.nativeElement.querySelector('.editButton');
    button.click();
    fixture.detectChanges();
    let closebutton = fixture.debugElement.nativeElement.querySelector('.closeButton');
    closebutton.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-drawer-opened')).toBeFalsy()

  })

  it('navigates to DETAILS OF USER when the "DETAILS" button is clicked', () => {
    //Carica il componente per avere tutte le card
    component.users = USERS;
    fixture.detectChanges();
    // console.log(fixture.debugElement.nativeElement.outerHTML)
    let router = TestBed.inject(Router);
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('#detailsUserButton');
    button.click();
    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['/detail/34795']),
      jasmine.anything()
    );
  });

  it('should call DELETE method when click om DELETE button', fakeAsync(() => {
    //Carica il componente per avere tutte le card
    component.users = USERS;
    fixture.detectChanges();
    spyOn(component, 'delete');
    let button = fixture.debugElement.nativeElement.querySelector('.delete');
    button.click();
    tick();
    expect(component.delete).toHaveBeenCalled();
  }));




  //Test ngIf
  it("ngIf Form value GENDER - if inputGender is empty DOESN'T APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[2];
    formUser.value = ''
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretGenderValue')
    expect(element).toBeNull()
  }));

  it("ngIf Form value GENDER - if inputGender is dirty APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[2];
    formUser.value = 'someValue'
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretGenderValueMessage')
    expect(element).toBeTruthy()
  }));

  it("ngIf Form value GENDER - if inputGender contains 'MALE' corretGenderValueMessage DOESN'T APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[2];
    formUser.value = 'female'
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretGenderValueMessage')
    expect(element).toBeNull()
  }));

  it("ngIf Form value GENDER - if inputGender contains 'FEMALE' corretGenderValueMessage DOESN'T APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[2];
    formUser.value = 'male'
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretGenderValueMessage')
    expect(element).toBeNull()
  }));

  it("ngIf Form value STATUS - if inputStatus is empty DOESN'T APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[3];
    formUser.value = ''
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretStatusValue')
    expect(element).toBeNull()
  }));

  it("ngIf Form value STATUS - if inputStatus is dirty APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[3];
    formUser.value = 'someValue'
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretStatusValueMessage')
    expect(element).toBeTruthy()
  }));

  it("ngIf Form value STATUS - if inputStatus contains 'ACTIVE' corretStatusValueMessage DOESN'T APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[3];
    formUser.value = 'active'
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretStatusValueMessage')
    expect(element).toBeNull()
  }));

  it("ngIf Form value STATUS - if inputStatus contains 'INACTIVE' corretStatusValueMessage DOESN'T APPEARS", waitForAsync(() => {
    const formUser: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('.formUser').querySelectorAll('input')[3];
    formUser.value = 'inactive'
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#corretStatusValueMessage')
    expect(element).toBeNull()
  }));

  it("ngIf Card - If GENDER is Male appears a girl in src image", waitForAsync(() => {
    component.users = USERS;
    fixture.detectChanges();

    const genderText = fixture.debugElement.query(By.css('#genderType'));
    expect(genderText.nativeElement.textContent.trim()).toBe('Gender: male')

    expect(fixture.debugElement.nativeElement.querySelector('.profileImageMale').src).toContain('/assets/img/user-male-image.jpeg');
  }));

  it("ngIf Card - If GENDER is Female appears a girl in src image", waitForAsync(() => {
    component.users = USERS;
    fixture.detectChanges();
    // console.log(fixture.debugElement.nativeElement.outerHTML)

    const genderText = fixture.debugElement.nativeElement.querySelector('.cardContainer')
      .querySelectorAll('#genderType')[1]
    expect(genderText.textContent.trim()).toBe('Gender: female')

    expect(fixture.debugElement.nativeElement.querySelector('.profileImageFemale').src).toContain('/assets/img/user-female-image.png');
  }));


  it('should create', waitForAsync(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
