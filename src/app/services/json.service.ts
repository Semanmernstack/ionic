import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientJsonpModule } from '@angular/common/http';
import {  Injectable, inject} from '@angular/core';

import { Observable, catchError, from, map, throwError } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';


export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  img: string;
  snippet: string;
  date: string;
  users?: [];
  record?: any;
}






@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private apiUrl = 'https://api.jsonbin.io/v3/b/66a9e2acad19ca34f88f507a'
  private apiKey = '$2a$10$O1O6Mo5Uho3q4ikoe9CWguBXU6YJ6cJ/KiEJSekY7.LxB1BWqL29a'
  
  
  private headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Master-Key': this.apiKey
    
    })
  constructor(private http: HttpClient, private firestore: Firestore) { }
 
  todosCollection = collection(this.firestore, 'blog');

 
  
  getNews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/latest', {headers: this.headers})
     
  }
 

  
  //createNews(newsItem: any): Observable<any> {
  //  return this.http.put(this.apiUrl, newsItem, {headers: this.headers} ) 
  //  console.log(newsItem)
    
  //}
  createNews(newsItem: any): Observable<any> {
    return this.http.put(this.apiUrl, newsItem, {headers: this.headers})
      .pipe(
        catchError(error => {
          console.error('Error creating news:', error);
          return throwError(() => new Error(error));
        })
      );
  }
  
  
  updateNews(newsItem: any): Observable<any> {
    const itemId = newsItem.id;
    if (!itemId) {
      console.error('updateNews: itemId is undefined or null');
      return throwError('itemId is undefined or null');
    }
    
    return this.http.put(`${this.apiUrl}`, newsItem, { headers: this.headers });
  }
  
  
  

  deleteNews(newsId: any): Observable<any> {
    const url = `${this.apiUrl}/${newsId}`;
    return this.http.delete<any>(url, { headers: this.headers })
      
  }
  
  getNewsItem(id: any): Observable<any> {
    return this.http.get<{ record: { users: any[] } }>(`${this.apiUrl}/latest`).pipe(
      map(response => {
        console.log('API Response:', response);
        const user = response.record.users.find((post: any) => post.id == id);
        console.log('Found User:', user);
        return user ? user : { id: id, name: 'User Not Found' }; 
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return throwError(() => new Error(error));
      })
    );
  }

  addTodo(text: any): Observable<any> {
    ;
    const promise = addDoc(this.todosCollection, text).then(
      (response) => response.id
    );
    return from(promise);
  }

}

