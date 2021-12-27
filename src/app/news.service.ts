import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // NEWS_API_KEY = 'e649cbf596a44a52aa8dac90c9843e62'
  NEWS_API_KEY = 'ea6a347cc0974d58a613a334a4403c92'
  newsUrl = `https://newsapi.org/v2/everything?q=`

  constructor(private http:HttpClient) { }

  public getNewsQuery(query:string | null) {
    console.log(`${this.newsUrl}${query}&sortBy=publishedAt&apiKey=${this.NEWS_API_KEY}`)
    return new Promise((resolve,reject) => {
        this.http.get(`${this.newsUrl}${query}&sortBy=publishedAt&apiKey=${this.NEWS_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

}
