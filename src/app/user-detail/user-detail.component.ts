import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



import { User } from '../users'
import { UserService } from '../user.service';
import { PostService } from '../post.service';
import { CommentService } from '../comment.service';
import { Post } from '../posts';
import { Comment } from '../comments';

import { ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {


  user: User | undefined;
  posts: Post[] = [];
  comments: Comment[] = [];
  commentForm: FormGroup

  @ViewChild('post') post!: ElementRef;
  @ViewChild('postIdP') postIdP!: ElementRef;
  @ViewChild('postNameP') postNameP!: ElementRef;

  @ViewChild('postIdEl') postIdEl!: ElementRef;
  @ViewChild('postTitle') postTitle!: ElementRef;
  @ViewChild('postBody') postBody!: ElementRef;
  @ViewChild('idPostValue') idPostValue!: ElementRef;





  //Riaggiorna il componente per selezionare un nuovo dettaglio utente
  //senza che rimanga in memoria il valore precedente
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    location.reload()
  }


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
  ) {
    // Initialize the form Comment
    this.commentForm = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  @ViewChild('idCommentPost') idCommentPost!: ElementRef;


  ngOnInit(): void {
    this.getDetailUser();
    this.getPostDetailByUser();

  }
  displayStyle = "none";
  openPopup(idPost: any) {
    this.displayStyle = "block";
    this.commentService.postId = idPost
    this.getCommentDetailByUser();
    this.commentForm.reset();
    setTimeout(() => {
      this.idCommentPost.nativeElement.value = idPost;
    }, 1000);
  }
  closePopup() {
    this.displayStyle = "none";
  }


  onSubmitComment(email: string, name: string, body: string): void {
    email = email.trim();
    name = name.trim();
    body = body.trim();
    this.commentService.APIkey = localStorage.getItem('token') as string;
    this.commentService.postId = this.idCommentPost.nativeElement.value

    this.commentService.addComments(email, name, body).subscribe(data => {
      this.comments.push(data);
      //Aggiorna la modale per inserire il commento
      this.openPopup(this.idCommentPost.nativeElement.value)
      // Reset form-inputs:
      this.commentForm.reset();
    },
      error => {
        if (error.status) {
          alert('Errore: ' + JSON.stringify(error.error));
        }
      });

  }
  getCommentDetailByUser(): void {
    this.commentService.APIkey = localStorage.getItem('token') as string;
    this.commentService.getComments().subscribe(comments => this.comments = comments);
  }
  //User by ID
  getPostDetailByUser(): void {
    this.postService.APIkey = localStorage.getItem('token') as string;
    this.postService.userid = this.route.snapshot.paramMap.get('id')
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  getDetailUser(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userService.getUserById(id)
      .subscribe(user => this.user = user);
  }



}
