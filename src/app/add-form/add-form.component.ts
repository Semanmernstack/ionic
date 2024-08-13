import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

import { CommonModule, NgFor } from '@angular/common';

import { IonHeader, IonToolbar, IonTitle, IonSearchbar, IonText, IonLabel, IonCard, IonTextarea, IonInput,  IonThumbnail, IonItem, IonCol, IonRow, IonButton,  IonImg } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { JsonService } from '../services/json.service';





@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],
  standalone: true,
  imports: [FormsModule,  IonHeader, IonToolbar, IonTextarea, IonThumbnail, IonInput, IonSearchbar, IonItem, IonText, IonLabel, IonButton, IonCard, IonThumbnail, IonCol, IonImg, IonRow, IonTitle, CommonModule]
})
export class AddFormComponent  implements OnInit{
  
  category = ['News', 'Entertainment', 'Sport'];
  newsItem: any = {
    
    id: uuidv4(),
    title: '',
    description: '',
    category: this.category[2],
    image: ''
  };
  
  constructor(private router: Router, private navCtrl: NavController, private jsonService: JsonService) { }
  text: any = ''
 
  ngOnInit() {
    
    
    
    
   
  }
  selectedFile: File | null = null;
  uploadPercent: number | undefined;
  uploadUrl: string | undefined;


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
 
   
  createBlog() {
    

    this.jsonService.getNews().subscribe((data: any) => {
      const currentPosts = data?.record?.blog || [];
      currentPosts.push(this.newsItem);

      this.jsonService.createNews(currentPosts).subscribe(
        (updateResponse: any) => {
          console.log('Post added successfully', updateResponse);
          this.router.navigate(['/']); // Navigate back to homepage
          
        },
        (error) => {
          console.error('Error updating posts:', error);
        }
      );
    });
  
  } 
  
  

  

  
  takePicture(){

  }
  uploadFile(): void {
    if (this.selectedFile) {
      this.jsonService.uploadImage(this.selectedFile).subscribe((response) => {
        this.newsItem.image = response.secure_url;
        console.log('File available at', this.newsItem.image);
      });
    }
  }
   

  

  //loadNewsItems() {
    //this.jsonService.getNews().subscribe((data: any) => {
     // const currentPosts = data?.record?.blog || [];
     // currentPosts.push(this.newsItem);
  //}
//}

  resetForm() {
   
    this.newsItem = {
      
      id: '',
      title: '',
      description: '',
      category: '',
      image: ''
    };
    this.selectedFile = null;
  }
  createD(): void {
    const todoData = {
      title: this.newsItem.title,
      description: this.newsItem.description,
      category: this.newsItem.category
     
    };
  
    this.jsonService.addTodo(todoData).subscribe({
      next: (response) => {
        console.log('Todo added with ID:', response.id);
        alert("saved to the database")
       
      },
      error: (error) => {
        console.error('Error adding todo:', error);
       
      }
    });
  }
  

}




