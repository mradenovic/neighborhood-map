import ko from 'knockout';
import GoogleMapsLoader from 'google-maps';
import homeTemplate from 'text!./home.html';

class HomeViewModel {
    constructor(route) {
        let self = this;
        this.message = ko.observable('Welcome to Neighborhood Map!');
        self.initGoogleMap();
    }

    initGoogleMap() {
      let GOOGLE_MAP_OPTIONS = {
        center: {lat: 40.7436618, lng: -73.9264847},
        zoom: 15,
      }

      GoogleMapsLoader.LIBRARIES = ['places'];
      GoogleMapsLoader.KEY = 'AIzaSyDaNOX7XbtJ6LTgCHIVtxoC2VFGukikTf8';
      GoogleMapsLoader.load(function(google) {
        self.map = new google.maps.Map(document.getElementById('google-map'), GOOGLE_MAP_OPTIONS)
      });
    }

    doSomething() {
        this.message('You invoked doSomething() on the viewmodel.');
    }
}

export default { viewModel: HomeViewModel, template: homeTemplate };
