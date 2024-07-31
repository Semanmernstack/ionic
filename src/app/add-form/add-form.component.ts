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
  
  
 
  
  constructor(private router: Router, private navCtrl: NavController, private jsonService: JsonService) { }
  text: any = ''
 
  ngOnInit() {
    
    
    
    
   
  }
  ;
  uploadPercent: number | undefined;
  downloadURL: string | undefined;
  

  
  takePicture(){}
   newsItem: any = {
    
    id: uuidv4(),
    title: "",
    description:"",
    category:"",
    image: ""
  };

  createBlog () {
    
    

   this.jsonService.createNews( { users: [this.newsItem]  }).subscribe((data: any) => {
    console.log('Post added successfully', data);
      
     
      if (data  && data.record) {
        this.newsItem = data?.record
        
        console.log('New post:', data.record);

        this.loadNewsItems(); 
        
        this.router.navigate(['/']);
      } else {
        console.error('Unexpected response format:', data);
       
      }
      
      
      this.resetForm();
    
    })
  }

  loadNewsItems() {
    this.jsonService.getNews().subscribe(
      (newsItems: any[]) => {
        this.newsItem = newsItems; // Assuming this updates the list of items in the view
      },
      (error) => {
        console.error('Error fetching news items:', error);
      }
    );
  }

  resetForm() {
   
    this.newsItem = {
      
      id: '',
      title: '',
      description: '',
      category: '',
      image: ''
    };
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




