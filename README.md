# README
Description:
Create new posts and share them with friends after logging in!

System Requirements:
Ruby 2.7.3
NodeJS (v14 of higher), and npm
PostgreSQL
See Environment Setup below for instructions on installing these tools if you don't already have them.

Quick Start:
bundle install
rails db:create
rails db:migrate db:seed
npm install --prefix client
npm start --prefix client

Setup:
bundle install
rails db:create
npm install --prefix client
You can use the following commands to run the application:
rails s: run the backend on http://localhost:3000
npm start --prefix client: run the frontend on http://localhost:4000
Make sure to also update this README to include documentation about your project. Here's a list of some awesome readmes for inspiration.

Environment Setup:
Install the Latest Ruby Version
Verify which version of Ruby you're running by entering this in the terminal:

ruby -v
Make sure that the Ruby version you're running is listed in the supported runtimes by Heroku. At the time of writing, supported versions are 2.6.8, 2.7.4, or 3.0.2. Our recommendation is 2.7.4, but make sure to check the site for the latest supported versions.

If it's not, you can use rvm to install a newer version of Ruby:

rvm install 2.7.4 --default
You should also install the latest versions of bundler and rails:

gem install bundler
gem install rails
Install NodeJS
Verify you are running a recent version of Node with:

node -v
If your Node version is less than 14, update it with:

nvm install node
You can also update your npm version with:

npm i -g npm
Install Postgresql
Heroku requires that you use PostgreSQL for your database instead of SQLite. PostgreSQL (or just Postgres for short) is an advanced database management system with more features than SQLite. If you don't already have it installed, you'll need to set it up.

PostgreSQL Installation for WSL
To install Postgres for WSL, run the following commands from your Ubuntu terminal:

sudo apt update
sudo apt install postgresql postgresql-contrib
Then confirm that Postgres was installed successfully:

psql --version
Run this command to start the Postgres service:

sudo service postgresql start
Finally, you'll also need to create a database user so that you are able to connect to the database from Rails. First, check what your operating system username is:

whoami
If your username is "ian", for example, you'd need to create a Postgres user with that same name. To do so, run this command to open the Postgres CLI:

sudo -u postgres -i
From the Postgres CLI, run this command (replacing "ian" with your username):

createuser -sr ian
Then enter control + d or type logout to exit.

This guide has more info on setting up Postgres on WSL if you get stuck.

Postgresql Installation for OSX
To install Postgres for OSX, you can use Homebrew:

brew install postgresql
Once Postgres has been installed, run this command to start the Postgres service:

brew services start postgresql
Troubleshooting
If you ran into any errors along the way, here are some things you can try to troubleshoot:

If you're on a Mac and got a server connection error when you tried to run rails db:create, one option for solving this problem for Mac users is to install the Postgres app. To do this, first uninstall postgresql by running brew remove postgresql. Next, download the app from the Postgres downloads page and install it. Launch the app and click "Initialize" to create a new server. You should now be able to run rails db:create.

If you're using WSL and got the following error running rails db:create:

PG::ConnectionBad: FATAL:  role "yourusername" does not exist
The issue is that you did not create a role in Postgres for the default user account. Check this video for one possible fix.

Resources used in this project:

./bin/webpack-dev-server

https://www.pexels.com/videos

https://loremipsum.io/generator/?n=2&t=p