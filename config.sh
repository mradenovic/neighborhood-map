sudo apt-get -qqy update
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g gulp bower
cd /vagrant
npm install
bower install
gulp
