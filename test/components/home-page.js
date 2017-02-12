define(['components/home-page/home'], function(homePage) {
  var HomePageViewModel = homePage.viewModel;
  var instance;

  describe('Home page view model', function() {

    beforeEach(function() {
      spyOn(HomePageViewModel.prototype, 'loadYelpPlaces').and.callThrough();
      instance = new HomePageViewModel();
    });

    it('should call loadYelpPlaces', function() {
      expect(instance.loadYelpPlaces).toHaveBeenCalled();
    });

    it('filterOptions array should eqal ["all"]', function() {
      expect(instance.filterOptions()).toEqual(['all']);
    });

  });

});
