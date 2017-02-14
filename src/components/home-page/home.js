import ko from 'knockout';
import GoogleMapsLoader from 'google-maps';
import homeTemplate from 'text!./home.html';
import infoWindowTemplate from 'text!../info-window/info-window.html';
import request_config from 'yelp';

class HomeViewModel {

  constructor(route) {
    this.alerts = ko.observableArray();
    this.markers = [];
    this.filterOptions = ko.observableArray(['all']);
    this.selectedFilter = ko.observable();
    this.yelpPlaces = ko.observableArray();
    this.loadYelpPlaces();
  }

  loadYelpPlaces() {
    $.ajax(request_config)
      .done((data, textStatus, jqXHR) => {
        this.yelpPlaces( data.businesses );
        this.mapCenter = this.getLatLng(data.region.center);
        this.loadGoogleMapsAPI();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        this.alerts.push({
          message: 'Failed to load Yelp places',
          type: 'alert-danger'
        });
      });
  }

  loadGoogleMapsAPI() {
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.KEY = 'AIzaSyDaNOX7XbtJ6LTgCHIVtxoC2VFGukikTf8';
    GoogleMapsLoader.load((google) => {
      this.initGoogleMap(google);
    });
  }

  initGoogleMap(google) {
    let center = this.mapCenter;
    let GOOGLE_MAP_OPTIONS = {
      center: center,
      zoom: 16,
    };

    try {
      this.map = new google.maps.Map(document.getElementById('google-map'), GOOGLE_MAP_OPTIONS)
      this.infowindow = new google.maps.InfoWindow({maxWidth: 350});
      this.updateData();
    }
    catch(err) {
      this.alerts.push({
        message: err,
        type: 'alert-danger'
      });
    }
  }

  updateData() {
    let places = this.yelpPlaces();
    for (let i = 0; i < places.length; i++) {
      this.updateFilter(places[i]);
      this.updateMarkers(places[i]);
    }
  }

  updateFilter(place) {
    for (let i = 0; i < place.categories.length; i++) {
      let category = place.categories[i][0];
      if (this.filterOptions.indexOf(category) == -1) {
        this.filterOptions.push(category);
      }
    }
  }

  updateMarkers(place) {
    let map = this.map;
    let position = this.getLatLng(place.location.coordinate);
    let icon = this.getMarkerIcon(place.image_url);

    let marker = new google.maps.Marker({
      map: map,
      icon: icon,
      position: position
    });

    this.addMarkerListener(marker);
    this.markers.push(marker);
  }

  locationClick(i) {
    let map = this.map;
    let infoWindow = this.infowindow;
    let place = this.yelpPlaces()[i]
    let marker = this.markers[i];

    this.setMarkerAnimation(marker);

    let content = this.getInfoContent(place);
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
  }

  filterChange() {
    let markers = this.markers;
    let places = this.yelpPlaces();
    for (var i = 0; i < markers.length; i++) {
      let visible = this.placeIsVisible(places[i]);
      let map = visible ? this.map : null;
      markers[i].setMap(map);
    }
  }

  placeIsVisible(place) {
    let selectedFilter = this.selectedFilter();
    let visible = false;
    for (let i = 0; i < place.categories.length ; i++) {
      let category = place.categories[i][0];
      visible = (selectedFilter == category) || (selectedFilter == 'all');
      if ( visible ) { break; }
    }
    return visible;
  }

  getInfoContent(place) {
    let content = eval(infoWindowTemplate);
    return content;
  }

  getMarkerIcon(imageUrl) {
    let icon = {
      url: imageUrl,
      size: new google.maps.Size(100, 100),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(32, 32)
    };
    return icon;
  }

  setMarkerAnimation(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null)
    }, 3550);
  }

  addMarkerListener(marker) {
    google.maps.event.addListener(marker, 'click', (e) => {
      let i = this.markers.indexOf(marker);
      this.locationClick(i);
    });
  }

  getLatLng(location) {
    let latLng =  {
      lat: location.latitude,
      lng: location.longitude
    };
    return latLng;
  }

}

export default {
  viewModel: HomeViewModel,
  template: homeTemplate
};
