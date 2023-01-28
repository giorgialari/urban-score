import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from './posts';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;
  let fakeApi = 'abc123'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it("should call getPosts and return an array of user's post", () => {
    const post: Post[] =[
    {
      "id": 1107,
      "user_id": 2173,
      "title": "Aegrotatio vorago conculco tabernus ocer brevis turbo sequi comparo acsi utrum hic.",
      "body": "Vulticulus tutamen verbera. Autem adfectus credo. Ipsa casus tener. Correptius adduco dolores. Charisma conculco quaerat. Arbor dens arx. Cogito avarus tonsor. Administratio denuncio odit. Depereo cunae virga. Apud praesentium adulatio. Tener suscipit colo. Canto vulnus volaticus. Solutio amaritudo iure. Arcesso iste cubicularis. Nostrum centum anser."
    }]

    service.APIkey = fakeApi
    let APIkey = service.APIkey
    let userid = 2173;
    service.userid = userid
    let url = 'https://gorest.co.in/public/v2/users'
 
    service.getPosts().subscribe((res) => {
      expect(res).toBe(post)
    });
  
    const req = httpTestingController.expectOne({
  
      method: 'GET',
      url: `${url}/${userid}/posts?access-token=${APIkey}`,
    });
    req.flush(post);
  });

  it("should call getAllPosts", () => {
    const post: Post[] =[
      {
        "id": 9215,
        "user_id": 4161,
        "title": "Post di Rajan Trivedi",
        "body": "Commento di  Rajan Trivedi"
      },
      {
        "id": 4885,
        "user_id": 3167,
        "title": "Test title",
        "body": "Test body"
      },
      {
        "id": 2173,
        "user_id": 4381,
        "title": "Voluptatem vitiosus acidus terminatio comitatus quod similique velut constans vesper synagoga ullam abbas aggero cultura facilis acerbitas.",
        "body": "Arbustum taedium accusator. Defetiscor basium certo. Uberrime vulariter acies. Allatus debeo solitudo. Subiungo cumque aestus. Talus sunt qui. Ducimus videlicet repudiandae. Cinis curiositas tres. Alius nemo adfectus. Omnis subiungo confugo. Supra tunc comptus. Circumvenio harum ambitus. Comminor delibero charisma. Currus asper arma. Vilicus aequitas correptius. Succurro tribuo suppono. Casso ciminatio combibo. Coruscus tum callide. Vado conicio trucido. Cohibeo timidus aufero."
      },
      {
        "id": 2172,
        "user_id": 4380,
        "title": "Tibi termes contra utique cerno apto auditor sortitus tandem fuga dolorem atrox coniecto.",
        "body": "Umerus conventus demitto. Templum volva valens. Decens arbor curvus. Demoror curvo subvenio. Creo ut error. Nobis audacia argumentum. Pauci cornu vester. Degusto talis tenetur. Tabella succurro capitulus. Centum denego deleniti. Valeo vel alienus. Ver tamen minus. Capitulus non nihil. Degero voluptatem mollitia. Sed patior vero. Careo deinde adficio. Demens tamdiu et. Timidus sed ad. Thermae amo thorax. Cunctatio ut subito."
      },
      {
        "id": 2170,
        "user_id": 4375,
        "title": "Non pariatur nobis beatae absconditus nam acquiro vulgus talus triumphus arbitro molestiae cattus decet venia clementia quia viscus sono.",
        "body": "Et aut suggero. Aequus est soleo. Volva triginta voluptas. Anser comptus balbus. Praesentium aureus deporto. Armarium depopulo audeo. Vicissitudo atrox itaque. Arcesso advenio pel. Cauda vicinus qui. Ocer taedium degenero. Defigo communis deduco. Supellex coniuratio adinventitias. Ademptio comitatus auditor. Perspiciatis quis caries. Artificiose eum vero."
      },
      {
        "id": 2169,
        "user_id": 4369,
        "title": "Calculus sol non conduco alias illum voluptatem sodalitas acceptus rerum comparo denuo et cedo volubilis cimentarius.",
        "body": "Custodia articulus valetudo. Sit summisse angulus. Coerceo adficio adimpleo. Vicinus suscipit voveo. Voco talis unde. Inflammatio aufero vir. Curia urbanus trucido. Sophismata vinitor curto. Suggero valeo velit. Cauda vigilo demo. Summa deorsum clam. Sumo vulticulus calcar. Corrigo accusator conventus. Aegrus viduata thymum. Carpo ducimus cursim. Dens quia aduro. Velut adeo uter. Urbanus perferendis callide. Arguo ut volva. Sperno apud eos."
      },
      {
        "id": 2168,
        "user_id": 4366,
        "title": "Qui caveo textus demulceo adfectus valens.",
        "body": "Nemo cui asperiores. Quasi voveo velit. Arbustum argentum crastinus. Tibi viduo arx. Amo annus succedo. Tolero sublime tabella. Ager tamdiu porro. Textus vis caritas. Cauda arbitro et. Tabula cupiditate ascisco. Thesaurus omnis valeo. Eaque curis cresco. Vado dolorem delectatio. Rerum addo defigo. Creo animadverto cresco. Vilicus sint spiculum."
      },
      {
        "id": 2167,
        "user_id": 4359,
        "title": "Desidero advoco tabella rerum admoneo carmen vitiosus est adfero barba vere.",
        "body": "Via vestrum verus. Consequatur arbitro suscipio. Vulnero combibo utrimque. Adaugeo callide cresco. Assumenda et adipiscor. Sint vester basium. Solus nemo substantia. Alioqui inventore termes. Nostrum quod verecundia. Consequatur deludo culpa. Verumtamen collum curo. Sed surculus succedo. Capio iste audax. Vergo defluo synagoga. Soleo taedium brevis. Cibo cultellus utrum."
      },
      {
        "id": 2166,
        "user_id": 4359,
        "title": "Perferendis speciosus solus carpo videlicet arguo timor torqueo admiratio suspendo votum una angelus commodo sponte calamitas strenuus crinis.",
        "body": "Animi minus speculum. Bonus summopere desino. Vehemens autem pariatur. Degusto dolorum conor. Odio creta animi. Patrocinor eaque suadeo. Caries sonitus eos. Cum statua tutamen. Officia illum tamquam. Harum amplexus ullam. Spiritus subvenio cado. Celo sufficio vulariter. Viduo clam ancilla. Defero sulum esse. Defungo aestus voluptatem. Ocer subvenio tunc. Suscipio vel compello."
      },
      {
        "id": 2165,
        "user_id": 4358,
        "title": "Cena succurro cuppedia una summa decerno comitatus tribuo contego totidem certe volva amissio voluptatem colloco.",
        "body": "Attonbitus confero sumo. Arcesso balbus vel. Coadunatio aptus alias. Templum vilicus nisi. Virga cenaculum aro. Synagoga acies bis. Spargo sub angustus. Sto thorax culpa. Aurum voluptatum cunae. Timidus fugit varietas. Cattus delectatio tum. Acceptus truculenter unus. Villa ut uberrime. Cuius appono decretum. Cuius comis labore. Cupiditate attero vereor. Talus non valetudo. Viduata curia vester. Sed universe antepono. Audentia dignissimos ut. Verus aspernatur brevis."
      }]

    service.APIkey = fakeApi
    let APIkey = service.APIkey
    let nPost = 10;
    let nPage = 1;
    let url = 'https://gorest.co.in/public/v2/posts'
 
    service.getAllPosts().subscribe((res) => {
      expect(res).toBe(post)
    });
    const req = httpTestingController.expectOne({
  
      method: 'GET',
      url: `${url}?per_page=${nPost}&page=${nPage}&access-token=${APIkey}`,
    });
    req.flush(post);
  });

  it('should call addPosts', () => {
    const event = { target: { value: "test" } };
    const expectedPost =  {
      title: "New title post",
      body: "New body post",
      returnSecureToken: true
    }

  service.APIkey = fakeApi
  let APIkey = service.APIkey
  let url = 'https://gorest.co.in/public/v2/users'
  let userid = 2173;
  service.userid = userid

  service.addPosts("New title post", "New body post").subscribe((res) => {
    expect(req.request.body).toEqual(expectedPost);
  });
  const req = httpTestingController.expectOne({
    method: 'POST',
    url: `${url}/${userid}/posts?access-token=${APIkey}`,
  });
  req.flush(expectedPost);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
