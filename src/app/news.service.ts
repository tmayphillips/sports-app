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
  // NEWS_API_KEY = 'pub_3159ec8574123bc3c83b334473a8f7471bfc'
  NEWS_API_KEY = 'pub_3172ce0334ba1aecf22af8cdccf220e3414d'
  // NEWS_API_KEY = 'pub_31595f914704494de2586dafa0f7783b5e81'
  // NEWS_API_KEY = ''
  newsUrl = `https://newsdata.io/api/1/news?apikey=${this.NEWS_API_KEY}&category=sports&language=en&q=`

GNEWS_API_KEY = '0e1dd6f544447f6d4c4fe3475e37dd46'
gnewsUrl = `https://gnews.io/api/v4/search?q=`

  constructor(private http:HttpClient) { }
  
  public getNewsQuery(query:string | null) {
    console.log(`${this.newsUrl}${query}`)
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
