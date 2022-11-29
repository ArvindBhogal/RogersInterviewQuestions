import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from '../services/contentful.service';
import data from '../../assets/dataModified.json';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  /* testData object definition to store modified data as specified in part 4 */
  testData: {
    url: string,
    title: string,
    description: string,
    isNoIndex: Boolean,
    category: {
      [key: string]: any;
    }}[] = [];

  /* testObject object definition to temporarily test the REST API call, currently unused but commented for reference */

  // testObject: {
  //   url: string,
  //   title: string,
  //   description: string,
  //   isNoIndex: Boolean,
  // } = {
  //   url: "",
  //   title: "",
  //   description: "",
  //   isNoIndex: false,
  // }

  constructor(
    private api: ContentfulService,
  ) {}



  ngOnInit() {
    /* Parses the data modified from 4 for the application to read */
    this.testData = JSON.parse(JSON.stringify(data));

    /* The code below uses a GrasphQL call specified in 3 to retrieve data.
    This data was manually stored in "data.json" for now, but the call request and
    results can be seen in developer tools */

    this.api.retrieveGraphQLContent().subscribe((data) => {
      console.log(data);
    })

    /* parseJson() accepts the data returned from step 3 and modifies it to fit the requirements of step 4
    Presently, this is uncommented as the data from here has been stored to dataModified.json
    and as such, there is no need to run this function every time */

    // this.parseJSON(this.testData);

    /* Code below was to test the REST api call and store required information into an object */

    // this.api.retrieveContent().subscribe((data) => {
    //   this.testObject.url = data.items[0].fields.url;
    //   this.testObject.seoTitle = data.includes.Entry[0].fields.title;
    //   this.testObject.description = data.includes.Entry[0].fields.description;
    //   this.testObject.isNoIndex = data.includes.Entry[0].fields.isNoIndex;
    //   console.log(this.testObject);
    // })
  }

  parseJSON(testData: any[]) {
    for (let item in testData) {
      var newObj: {
        url: string,
        title: string,
        description: string,
        isNoIndex: Boolean,
        category: {
          [key: string]: any;
        },
      } = {
        url: "",
        title: "",
        description: "",
        isNoIndex: false,
        category: {},
      };

      var tmpArray = [];

      if (testData[item].seo === null) {
        continue;
      } else {

        testData[item].url = testData[item].url.replace("/home", "");
        tmpArray = testData[item].url.split("/");
        tmpArray.shift();

        for (let category in tmpArray) {
          let stringTry = (+category + 1).toString();
          tmpArray[category] = tmpArray[category].charAt(0).toUpperCase()  + tmpArray[category].slice(1);
          newObj.category[stringTry] = tmpArray[category];

        }
        testData[item].url = testData[item].url.replace("/", "https://www.rogers.com/");
        newObj.url = testData[item].url;
        newObj.title = testData[item].seo.title;
        newObj.description = testData[item].seo.description.substring(0, 80);
        newObj.isNoIndex = testData[item].seo.isNoIndex;

        testData[item] = newObj;
      }
    }
  }
}
