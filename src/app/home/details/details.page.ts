import { Component, IterableDiffers, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonText, IonLabel, IonBackButton, IonCard, IonThumbnail, IonCol, IonRow, IonContent, IonImg, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from 'src/app/services/json.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonCardHeader, IonCardTitle, IonCardContent, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonHeader, RouterLink, RouterOutlet, IonToolbar, IonButtons, IonThumbnail, IonSearchbar, IonText, IonLabel, IonCard, IonThumbnail, IonCol, IonImg, IonRow, IonTitle, IonContent, CommonModule]
})
export class DetailsPage implements OnInit {
  itemId: any;
  users: any
  
  

  constructor(private route: ActivatedRoute,  private jsonService: JsonService) { }
  newsItem: any 
  errorMessage: string = '';

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('itemId');
    console.log(postId)
    if (postId) {
      this.jsonService.getNewsItem(+postId).subscribe(
        (response: any) => {
          this.newsItem= response;
          console.log('News item:', this.newsItem);
         
         
        },
        
        error => {
          this.errorMessage = error;
          console.error('There was an error fetching the post!', error);
        }
      );
    }
    
    console.log(postId)
   

  }
}



