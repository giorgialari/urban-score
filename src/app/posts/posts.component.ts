import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../posts';
import { CommentService } from '../comment.service';
import { Comment } from '../comments';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../users';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit {
  searchText: any;
  posts: Post[] = [];
  users: User[] = [];
  comments: Comment[] = [];
  postForm: FormGroup;
  nPostsForm: FormGroup;

  @ViewChild('selectVal') selectVal!: ElementRef
  @ViewChild('postTitle') postTitle!: ElementRef
  @ViewChild('postBody') postBody!: ElementRef



  constructor(
    public postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) {
    this.postForm = new FormGroup({
      user: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
    this.nPostsForm = new FormGroup({
      postNumber: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.getAllPost();
    this.getUsers();

  }
  ngAfterViewInit() {
    setTimeout(() => {
    }, 10000);
  }

  nextPage() {
    this.postService.nPage = this.postService.nPage + 1
    this.getAllPost();
  }
  previousPage() {
    this.postService.nPage = this.postService.nPage - 1
    this.getAllPost();
  }

  urlParams = new URLSearchParams(window.location.search)
  urlToken = this.urlParams.get('token')

  getAllPost(): void {
    this.postService.APIkey = this.urlToken as string
    this.postService.nPost = this.nPostsForm.value.postNumber;
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
  }
  displayStyle = "none";

  openPopup(idPost: any) {
    this.displayStyle = "block";
    this.commentService.postId = idPost
    this.getCommentDetailByUser();
  }
  closePopup() {
    this.displayStyle = "none";
  }
  getCommentDetailByUser(): void {
    this.commentService.APIkey = this.urlToken as string
    this.commentService.getComments().subscribe(comments => this.comments = comments);
  }
  getUsers() {
    this.userService.APIkey = this.urlToken as string
    this.userService.nUsers = 100;
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  selectedUserId: string | undefined;

  idUser(value: any) {
    this.selectedUserId = value;
  }

  addPost(title: string, body: string): void {
    title = title.trim();
    body = body.trim();
    this.postService.APIkey = this.urlToken as string

    this.postService.userid = this.selectedUserId

    this.postService.addPosts(title, body).subscribe(data => {
      this.posts.push(data);
      this.getAllPost()
    },
      error => {
        if (error.status) {
          alert('Errore: ' + JSON.stringify(error.error));
        }
      });

  }
}
