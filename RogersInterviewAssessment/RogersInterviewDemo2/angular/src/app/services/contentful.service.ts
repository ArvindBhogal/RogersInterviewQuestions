import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private URL = 'https://cdn.contentful.com/spaces/8utyj17y1gom/entries?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37&content_type=pageTemplate&include=1&fields.url=%2Fhome%2Fsupport';

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) {}

  /* retrieveContent() is the REST API call provided in step 1. Running a simple GET request to retrieve data */

  retrieveContent(): Observable<any> {
    return this.http.get(this.URL);
  }

  /* retrieveGraphQLContent() is the GraphQL API call constructed for step 2. Assistance of apollo-angular was used
  and the query returns the entire collection instead of just one page template. */

  retrieveGraphQLContent():  Observable<any> {
    return this.apollo.query({
        errorPolicy: "all",
        query: gql`
        {
          pageTemplateCollection {
            items{
              url
              seo{
                title
                description
                isNoIndex
              }
            }
          }
        }`
      });
  }
}
