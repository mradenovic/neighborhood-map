import ko from 'knockout';
import alertsTemplate from 'text!./alerts.html';

class AlertsViewModel {

  constructor(params) {
    this.alerts = params.alerts;
  }

}

export default {
  viewModel: AlertsViewModel,
  template: alertsTemplate
};
