import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Post } from '../posts';

import { PostsComponent } from './posts.component';
import { PostService } from '../post.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../users';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';


describe('PostsComponent', () => {
  let component: PostsComponent;
  let postService: PostService;
  let mockPostService: any;
  let commentService: any;
  let userService: any;



  let USERS: User[]
  let POSTS: Post[]


  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
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

    POSTS = [{
      "id": 4885,
      "user_id": 3167,
      "title": "Test title",
      "body": "Test body"
      },
      {
      "id": 1840,
      "user_id": 3698,
      "title": "Decretum decimus stipes unde cervus enim vinculum volup amo sortitus conatus accusantium aut demens utrimque termes.",
      "body": "Credo tenax depopulo. Facilis stultus aestas. Tot caterva cubicularis. Temeritas voluptas odit. Conscendo comparo deleo. Concido deludo apostolus. Vito aggero animus. Subseco conforto deripio. Unde curvus stillicidium. Uberrime adhuc solium. Comis vultuosus casus. Umbra beatae accusamus. Demens succurro celo. Derideo mollitia vesper. Corpus iusto cilicium. Utrimque textus tactus. Ventus suppellex ipsa. Paens spiculum tendo."
      },
      {
      "id": 1838,
      "user_id": 3696,
      "title": "Pecco admoveo xiphias taceo doloribus abundans vulnero adfectus.",
      "body": "Cum commodo tyrannus. Suasoria consuasor desparatus. Vapulus circumvenio admitto. Cunae deinde solium. Admoneo sufficio solio. Sodalitas bene utroque. Aliqua doloribus vespillo. Suscipio cavus voluptas. Comburo voro antepono. Vulariter xiphias id. Viduo trans utpote. Sursum est laboriosam. Vociferor decor caste. Defleo confido amplexus. Distinctio veritas vulnero. Calculus mollitia terror. Aeneus adulescens audacia. Ea cunae uredo. Incidunt cum recusandae."
      },
      {
      "id": 1837,
      "user_id": 3689,
      "title": "Incidunt pecunia excepturi templum capitulus conduco comminor uter nesciunt corroboro thesis adimpleo.",
      "body": "Aedificium omnis uberrime. Adaugeo solium harum. Astrum sint decipio. Thermae repudiandae consequatur. Consequatur canonicus verto. Ducimus trepide spiritus. Curriculum pariatur deludo. Curia voro vorago. Supplanto cohaero arcus. Admitto quaerat appono. Celer vilitas cultellus. Audentia appositus artificiose. Comprehendo repellat defetiscor. Teneo laboriosam carcer. Stabilis triginta comburo. Speciosus tamen capto. Minus corrupti verbera."
      },
      {
      "id": 1836,
      "user_id": 3686,
      "title": "Cado decens vomito adimpleo utroque denique aperiam rerum pecco minima canis temperantia ducimus tametsi coepi.",
      "body": "Vomito ventus suppellex. Censura arbor spiculum. Vomer currus solio. Tenetur aggero voluptate. Repudiandae natus aliqua. Ceno demitto adversus. Tempus acer abundans. Illo acquiro utroque. Claro autus tersus. Alienus aduro accusator. Circumvenio calcar adaugeo. Sponte eos victoria. Spiritus alii campana. Recusandae vestrum soleo. Labore sapiente vester. Tardus sursum vociferor. Sursum bonus vilicus. Apostolus artificiose culpa."
      },
      {
      "id": 1835,
      "user_id": 3681,
      "title": "Adeptio et ara amiculum coniuratio enim vorax verbera.",
      "body": "Aptus voluptatem caput. Aro videlicet synagoga. Altus cohaero concido. Sumo annus est. Terra sint contra. Utilis aranea utrimque. Architecto vesica chirographum. Architecto arca ager. Succurro deorsum conservo. Vomer ut caelum. Occaecati averto thesis. Non defungo vere. Colloco trepide acies. Patruus optio eos. Triduana dolorum complectus. Argumentum virgo talus. Tamisium statua bellum. Alius alo bellum. Attollo ipsa tamisium. Quo averto comes."
      },
      {
      "id": 1834,
      "user_id": 3681,
      "title": "Texo eum demitto hic antea velut commodo cribro.",
      "body": "Vacuus deludo illo. Aperiam quidem summa. Thesaurus consequatur turpis. Clementia vero subiungo. Sed et et. Tenuis quia facilis. Defessus baiulus sollers. Ipsam utrum ab. Benevolentia et vesper. Corpus molestiae illum. Suffragium caste tepesco. Dignissimos tametsi quo. Sint denuo amissio. Subnecto tametsi veritatis. Valde denego tutamen. Magni asporto nemo. Aspicio laborum et. Surculus bellum cursim. Trans qui cogo. Voluptatem corrupti uter. Summa taceo stabilis."
      },
      {
      "id": 1833,
      "user_id": 3678,
      "title": "Tempus vix quasi venustas debitis ullus.",
      "body": "Contra theca auctus. Surgo alter venustas. Thema patior assumenda. Capto delectatio arceo. Dignissimos maiores voluptatem. Eum amo comprehendo. Temperantia consequatur cum. Ademptio culpo ventosus. Aer aeternus repellendus. Circumvenio cernuus venustas. Earum culpa theatrum. Corpus antiquus decens. Subseco benigne viduo. Sto appono avaritia. Ulterius tonsor aliqua. Audentia combibo deprimo."
      },
      {
      "id": 1832,
      "user_id": 3678,
      "title": "Autus arbustum casso ustulo culpa pel vespillo cunctatio vomito triumphus sapiente subvenio apostolus censura.",
      "body": "Curto varietas tripudio. Subito culpa somnus. Aeneus perspiciatis curvus. Conicio umerus rerum. Voluptas hic eligendi. Suus color placeat. Aestas vae casso. Brevis clarus curatio. Tener adulescens sonitus. Cavus cibo sodalitas. Ambulo cohaero viridis. Curtus decretum studio. Confugo voluptatem et. Dapifer spiritus sequi. Atavus turpe vero. Surculus cum creator. Arca desidero cavus. Vel utrimque barba. Creo viscus creta. Abscido auxilium asperiores."
      },
      {
      "id": 1831,
      "user_id": 3676,
      "title": "Dolorem inventore approbo tubineus communis vitium textor.",
      "body": "Claustrum pauper usitas. Suasoria commodo illo. Amissio totidem tumultus. Pecco suadeo ambitus. Cogo bellicus amaritudo. Amissio veritatis amitto. Arceo peior non. Venio tergiversatio cum. Totam cinis sed. Spargo temperantia speciosus. Sulum decens patior. Aliquam expedita aestus. Villa venio delicate. Omnis derideo pauper. Cornu est aestivus. Dolorem cras quibusdam."}
    ]
     //Mock UserComponent
     mockPostService = jasmine.createSpyObj(['addPosts'])
     component = new PostsComponent(mockPostService,commentService,userService)
     
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule, 
        MatSlideToggleModule, 
        MatSidenavModule, 
        RouterTestingModule],
      declarations: [PostsComponent],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.get<PostService>(PostService);

    fixture.detectChanges();
  });



  //Test form addPost
  it('title form should be Add Posts', () => {
    const title = fixture.debugElement.query(By.css('#titleFormPosts')).nativeElement;

    expect(title.textContent).toEqual('Add Posts');
  });
  it('Check Initial Form values for addPost', () => {
    const postForm = component.postForm
    const formValues = {
      user: '',
      title: '',
      body: ''
    }
    expect(postForm.value).toEqual(formValues)
  });

  it('form is invalide button is disable', () => {
    let submitEL: DebugElement = fixture.debugElement.query(By.css('.submitButton[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  })

  it('Check validation form after entering SELECT value (form postForm)', () => {
    component.users = USERS;
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    // open options dialog
    const matSelect = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    // select the first option (use queryAll if you want to chose an option)
    const matOption = debugElement.query(By.css('mat-option')).nativeElement;
    matOption.click();
    fixture.detectChanges();
    //select value from option
    const matOptionValue = matOption.attributes.getNamedItem('ng-reflect-value')
    const selectValueForm = component.postForm.get('user');
    //trasform string value in number
    let valueN = Number(matOptionValue.value)
    expect(valueN).toEqual(selectValueForm!.value);
    expect(selectValueForm!.errors).toBeNull();

    
  })

  it('Check validation form after entering TITLE value (form postForm)', () => {
    const formPost: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#postForm').querySelectorAll('input')[0];
    formPost.value = 'title'
    formPost.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const titleValueForm = component.postForm.get('title');
    expect(formPost.value).toEqual(titleValueForm!.value);
    expect(titleValueForm!.errors).toBeNull();
  })
  it('Check validation form after entering BODY value (form postForm)', () => {
    const formPost: HTMLInputElement = fixture.debugElement.nativeElement.
      querySelector('#postForm').querySelectorAll('textarea')[0];
    formPost.value = 'Body text'
    formPost.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const bodyValueForm = component.postForm.get('body');
    expect(formPost.value).toEqual(bodyValueForm!.value);
    expect(bodyValueForm!.errors).toBeNull();
  })



  //Test form numberPosts
  it('title form should be Number of posts', () => {
    const title = fixture.debugElement.query(By.css('#titleNumberPosts')).nativeElement;
    expect(title.textContent).toEqual('Number of posts');
  });
  it('Check Initial Form values for numberPosts', () => {
    const form = component.nPostsForm
    const formValues = {
      postNumber: ''
    }
    expect(form.value).toEqual(formValues)
  });
  it('should be valid if form value is valid numberPosts', () => {
    component.nPostsForm.setValue({
      "postNumber": "1",
    });
    expect(component.nPostsForm.valid).toEqual(true);
  });
  it('form is invalide button is disable', () => {
    let submitEL: DebugElement = fixture.debugElement.query(By.css('.submitButtonUser[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  })
  it('form and numberPosts are valid button are enable', (() => {
    let fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    let input = fixture.debugElement.nativeElement.querySelector('[matInput]');
    input.value = '1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeFalsy();
  }));




  //Test dei componenti grafici
  it('should count element in ngFor component', () => {
    component.posts = POSTS;
    fixture.detectChanges();
    const element: DebugElement[] = fixture.debugElement.queryAll(By.css('.example-card'));
    expect(element.length).toEqual(10)
  })
  it('button click event nextPage', async(() => {
    spyOn(component, 'nextPage');
    let button = fixture.debugElement.nativeElement.querySelector('.nextPage');
    button.click();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  }));

  it('button click previousPage is disabled', async(() => {
    expect(fixture.debugElement.nativeElement.querySelector('.previousPageDisabled').disabled).toBeTruthy();
  }))

  it('button click previousPage is enabled when click on nextPage', async(() => {
    expect(fixture.debugElement.nativeElement.querySelector('.previousPageDisabled').disabled).toBeTruthy();
    const button = fixture.debugElement.nativeElement.querySelector(('.nextPage'));
    button.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.previousPageEnabled').disabled).toBeFalsy();
  }))
  it('sidebar should be close', fakeAsync(() => {
    const slider = fixture.debugElement.query(By.css('mat-drawer'));
    expect(slider).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-drawer-opened')).toBeFalsy()
  }))

  it('should OPEN sidebar when click on Edit button', () => {
    let button = fixture.debugElement.nativeElement.querySelector('#editButtonPosts');
    button.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-drawer-opened')).toBeTruthy()
  })
  it('should CLOSE sidebar when click on Edit button', () => {
    let button = fixture.debugElement.nativeElement.querySelector('#editButtonPosts');
    button.click();
    fixture.detectChanges();
    let closebutton = fixture.debugElement.nativeElement.querySelector('.closeButton');
    closebutton.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.mat-drawer-opened')).toBeFalsy()

  })
  it('should call openPopup method when click om COMMENTS button', fakeAsync(() => {
    //Carica il componente per avere tutte le card
    component.posts = POSTS;
    fixture.detectChanges();
    spyOn(component, 'openPopup');
    let button = fixture.debugElement.nativeElement.querySelector('.showDataBtn');
    button.click();
    tick();
    expect(component.openPopup).toHaveBeenCalled();
  }));

  it('should call closePopup method when click on CLOSE button in Comments', fakeAsync(() => {
    //Carica il componente per avere tutte le card
    component.posts = POSTS;
    fixture.detectChanges();
    spyOn(component, 'closePopup');
    let button = fixture.debugElement.nativeElement.querySelector('.closePopup');
    button.click();
    tick();
    expect(component.closePopup).toHaveBeenCalled();
  }));

  //Test dei metodi
  it('method should be called getAllPost', () => {
    var spy = spyOn(component, "getAllPost")();
    expect(component).toBeDefined();
    expect(spy);
    expect(component.getAllPost).toHaveBeenCalled();
  });
  it('method should be called getCommentDetailByUser', () => {
    var spy = spyOn(component, "getCommentDetailByUser")();
    expect(component).toBeDefined();
    expect(spy);
    expect(component.getCommentDetailByUser).toHaveBeenCalled();
  });
  it('method should be called getUsers', () => {
    var spy = spyOn(component, "getUsers")();
    expect(component).toBeDefined();
    expect(spy);
    expect(component.getUsers).toHaveBeenCalled();
  });
  it("should call getPosts and return list of posts getAllPosts()", fakeAsync(() => {
    const response: Post[] = [];
    spyOn(postService, 'getAllPosts').and.returnValue(of(response))
    component.getAllPost();
    tick();
    expect(component.posts).toEqual(response);
  }));
  it('should ADD the select Post from posts', () => {
    component.posts = POSTS
    let newPost: Post = {
      "id": 4875,
      "user_id": 3177,
      "title": "Test title",
      "body": "Test body"
    }

    spyOn(component, 'addPost')
    expect(component.addPost).toBeTruthy();
    //Conta quanti argomenti devono esserci all'interno del metodo
    expect(component.addPost.length).toBe(2);
    //Simula una chiamata all'api per aggiungere un nuovo utente
    mockPostService.addPosts.and.returnValue(of(newPost));
    mockPostService.addPosts().subscribe((addpost: Post) => {
      component.posts.push(addpost);
    })
    expect(component.posts.length).toBe(11)
  })
  it('should only have one argument to call idUser' , () => {
    spyOn(component, 'idUser')
    expect(component.idUser).toBeTruthy();
    //Conta quanti argomenti devono esserci all'interno del metodo
    expect(component.idUser.length).toBe(1);
  })
  it('should check for the add error call ', () => {
    spyOn(window, "alert");
    let error: { status: string; } = {'status': '401'}
    spyOn(postService, 'addPosts').and.returnValue(throwError(error));
    component.addPost("", "");
    fixture.autoDetectChanges();
    expect(postService.addPosts).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

    
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
