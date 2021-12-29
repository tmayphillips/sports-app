import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

GNEWS_API_KEY = '0e1dd6f544447f6d4c4fe3475e37dd46'
gnewsUrl = `https://gnews.io/api/v4/search?q=`

  constructor(private http:HttpClient) { }
  
  public getNewsQuery(query:string | null) {
    let url = `${this.gnewsUrl}${query}&token=${this.GNEWS_API_KEY}`
    return new Promise((resolve,reject) => {
        this.http.get(url).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }
}
