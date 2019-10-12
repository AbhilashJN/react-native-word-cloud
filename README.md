### react-native-word-cloud
Simple wordcloud generator for react-native. Renders a word cloud made of circles in a canvas inside a webview. Uses [react-native-webview](https://www.npmjs.com/package/react-native-webview) and [react-native-canvas](https://www.npmjs.com/package/react-native-canvas).

### Installation
```
npm i react-native-webview
cd ios && pod install       //this should automatically link react-native-webview in RN >=0.60
react-native link react-native-webview          //if automatic linking doesn't work or you are using RN <0.60
npm i react-native-word-cloud
```

### Usage
```
import React, { Component } from 'react';
import Cloud from 'react-native-word-cloud';
 
class App extends Component {
 ...
 ...
  render() {
    return (
      ...
      <Cloud keywords={keywordsArray} scale={250} largestAtCenter={true} drawContainerCircle={true} containerCircleColor={'#345678'}/>
      ...
    )
  }
}
```


### API

## Props
* **keywords** : array of keyword objects. Each keyword object should be of type 
```
    {
        keyword: "word1",    // the actual keyword
        frequency: 123,      // the frequency of this keyword
        color: "#121234"     // the color of the circle that shows this keyword
    }
```
*  **scale** : number which determines the scaling of the circles. Play around with it to find out which value gives you the size you need. Defaults to **250**

* **largestAtCenter** : boolean which determines whether the largest circles should be concentrated towards the center of the cloud or vice versa. Defaults to **true**

* **drawContainerCircle** : boolean which determines whether or not to draw a container circle around the word cloud. Defaults to **false**

* **containerCircleColor** : fill color for the container circle. Defaults to **'#FF000030'**


## Screenshots

- **Example with largestAtCenter=true and drawContainerCircle=false**

![Example with largestAtCenter=true and drawContainerCircle=false](https://raw.githubusercontent.com/AbhilashJN/react-native-word-cloud/master/screenshots/ss1.png "Example with largestAtCenter=true and drawContainerCircle=false")


- **Example with largestAtCenter=false and drawContainerCircle=false**

![Example with largestAtCenter=false and drawContainerCircle=false](https://raw.githubusercontent.com/AbhilashJN/react-native-word-cloud/master/screenshots/ss2.png "Example with largestAtCenter=false and drawContainerCircle=false")

- **Example with largestAtCenter=true and drawContainerCircle=true**

![Example with largestAtCenter=true and drawContainerCircle=true](https://raw.githubusercontent.com/AbhilashJN/react-native-word-cloud/master/screenshots/ss3.png "Example with largestAtCenter=true and drawContainerCircle=true")

- **Example with largestAtCenter=false and drawContainerCircle=true**

![Example with largestAtCenter=false and drawContainerCircle=true](https://raw.githubusercontent.com/AbhilashJN/react-native-word-cloud/master/screenshots/ss4.png "Example with largestAtCenter=false and drawContainerCircle=true")