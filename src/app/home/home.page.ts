import { ChangeDetectorRef, Component,  OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonText, IonLabel, IonCard, IonThumbnail, IonItem, IonCol, IonRow,  IonImg } from '@ionic/angular/standalone';
import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader,  IonTitle, IonButton, IonHeader, RouterLink, RouterOutlet, IonToolbar, IonThumbnail, IonSearchbar, IonItem, IonText, IonLabel, IonCard, IonThumbnail, IonCol, IonImg, IonRow, IonTitle, IonContent, CommonModule, NgFor],
})
export class HomePage implements OnInit {
  
  
  constructor(private jsonService: JsonService, private cdr: ChangeDetectorRef) {}
  metaData: any;
  items: any[] = []
  allItems: any[] = []
  newsItem: any[] = [] 
  newsId: any
  blogPosts: any[] = [];
  trackItemById(index: any, item: any): any {
    return item.id; // Assuming each item in newsItems has a unique 'id' property
  }
  
 


  ngOnInit() {
   
    this.homeList()
  }
  homeList() {
    this.jsonService.getNews().subscribe((data: any) => {
      console.log('Raw data received:', data);
      this.newsItem = data?.record?.record?.blog || []; // Adjust this line based on actual structure
      console.log('Blog array:', this.newsItem);
    }, error => {
      console.error('Error fetching news:', error);
    });
      
  }
  loadBlogPosts() {
    this.jsonService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts;
      console.log('Blog posts:', this.blogPosts);
    });
  }


  deleteItem(itemId: any) {
    this.newsItem = this.newsItem.filter(item => item.id !== itemId);
    //this.jsonService.deleteNews(itemId).subscribe(() => {
      //this.newsItem = this.newsItem.filter(item => item.id !== itemId);
      //console.log(itemId)
     
    //});
    
  }
        
    
}
