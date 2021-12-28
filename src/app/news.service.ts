import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // NEWS_API_KEY = 'e649cbf596a44a52aa8dac90c9843e62'
  // NEWS_API_KEY = 'ea6a347cc0974d58a613a334a4403c92'
  // newsUrl = `https://newsapi.org/v2/everything?q=`

  // NEWS_API_KEY = 'pub_31491f92fff784a579a70f937f395e9f90fb'
  NEWS_API_KEY = 'pub_3159ec8574123bc3c83b334473a8f7471bfc'
  newsUrl = `https://newsdata.io/api/1/news?apikey=${this.NEWS_API_KEY}&category=sports&language=en&q=`

  constructor(private http:HttpClient) { }

  public getNewsQuery(query:string | null) {
    console.log(`${this.newsUrl}${query}`)
    return new Promise((resolve,reject) => {
        this.http.get(`${this.newsUrl}${query}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

}
