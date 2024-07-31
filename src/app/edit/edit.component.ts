import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from '../services/json.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonSearchbar, IonText,  IonSelect, IonLabel, IonCard, IonTextarea, IonInput,  IonThumbnail, IonItem, IonCol, IonRow, IonButton,  IonImg } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],
  standalone: true,
  imports: [FormsModule,  IonHeader, IonToolbar, IonSelect, IonTextarea, IonThumbnail, IonInput, IonSearchbar, IonItem, IonText, IonLabel, IonButton, IonCard, IonThumbnail, IonCol, IonImg, IonRow, IonTitle, CommonModule]
})
export class EditComponent  implements OnInit {
  id: any
  newsItem: any = {
    
    id: uuidv4(),
    title: '',
    description: '',
    category: '',
    image: ''
  };

  constructor(private route: ActivatedRoute,  private navCtrl: NavController,  private jsonService: JsonService, private router: Router) { }
  ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.jsonService.getNewsItem(itemId).subscribe(
        (data) => {
          this.newsItem = data; // Assign fetched data to newsItem including id
        },
        (error) => {
          console.error('Error fetching news item:', error);
        }
      );
    } else {
      console.error('itemId is undefined');
    }
  }

  EditNews() {
    console.log('News item to update:', this.newsItem); // Log the newsItem before update
    if (this.newsItem.id) {
      this.jsonService.updateNews(this.newsItem ).subscribe(
        (data: any) => {
          this.newsItem = data;
          console.log('Successfully updated news item:', data);
          this.navCtrl.navigateRoot('/'); // Navigate back to home or list page after update
        },
        (error) => {
          console.error('Error updating news item:', error);
        }
      );
    } else {
      console.error('newsItem.id is undefined or null');
    }
  }

  
 }
 



