import ko from 'knockout';
import GoogleMapsLoader from 'google-maps';
import homeTemplate from 'text!./home.html';

class HomeViewModel {
    // let self = this;

    constructor(route) {

        this.markers = [];
        this.filterOptions = ko.observableArray(['all']);
        this.selectedFilter = ko.observable();
        this.places = ko.observableArray();
        this.loadGoogleMapsAPI();
    }

    loadGoogleMapsAPI() {
      GoogleMapsLoader.LIBRARIES = ['places'];
      GoogleMapsLoader.KEY = 'AIzaSyDaNOX7XbtJ6LTgCHIVtxoC2VFGukikTf8';
      GoogleMapsLoader.load((google) => {
        this.initGoogleMap(google);
      });
    }

    initGoogleMap(google) {
      let sunnyside = {lat: 40.7436618, lng: -73.9264847};

      let GOOGLE_MAP_OPTIONS = {
        center: sunnyside,
        zoom: 15,
      };

      this.map = new google.maps.Map(document.getElementById('google-map'), GOOGLE_MAP_OPTIONS)
      this.infowindow = new google.maps.InfoWindow();

      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: sunnyside,
        radius: 1000,
        keyword: ['food'],
      }, this.callback.bind(this));
    }

    callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          this.updateFilter(results[i]);
          this.updatePlaces(results[i]);
          this.createMarker(results[i]);
        }
      }
    }

    updateFilter (place) {
      let type = place.types[0];
      if (this.filterOptions.indexOf(type) == -1) {
        this.filterOptions.push(type);
      }
    }

    updatePlaces(place) {
      this.places.push(place);
    }

    createMarker(place) {
      let placeLoc = place.geometry.location;
      let icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      let marker = new google.maps.Marker({
        map: this.map,
        icon: icon,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', (e) => {
        let i = this.markers.indexOf(marker);
        this.locationClick(this.places()[i], e);
      });

      this.markers.push(marker);
    }

    locationClick(place, e) {
      let i = this.places().indexOf(place);
      let marker = this.markers[i];
      
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {marker.setAnimation(null)}, 3550);

      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map, this.markers[i]);
    }

    filterChange() {
      let markers = this.markers;
      let places = this.places();
      for (var i = 0; i < markers.length; i++) {
        let visible = this.placeIsVisible(places[i]);
        let map = visible ? this.map : null;
        markers[i].setMap(map);
      }
    }

    placeIsVisible(place) {
      let selectedFilter = this.selectedFilter();
      let visible = (selectedFilter == place.types[0]) || (selectedFilter == 'all');
      return visible;
    }
}

export default { viewModel: HomeViewModel, template: homeTemplate };
