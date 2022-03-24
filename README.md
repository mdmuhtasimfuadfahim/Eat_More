# <h1 align="center">Eat_More: Real time Food Service App</h1>

![demo pic](https://user-images.githubusercontent.com/69357704/159982643-420d650a-01a2-4fa8-8a23-955fcf076306.png)

### Requiremnet for initial setup

- Insatall [NodeJS](https://nodejs.org/en/).
- Install [Yarn](https://yarnpkg.com/) or use NPM.
- Use [MongoDB Compass](https://www.mongodb.com/products/compass) (local databse) or [MongoDB Atlas](https://www.mongodb.com/atlas/database) (cloud database).
- [Stripe](https://stripe.com/) for payment system.


### Setting up

1. Clone/download the repository.
2. Install all the dependencies.
3. Create .env file and set the settings and create a database.
4. Change the port or leave it as it is.
5. Run the [Node](https://nodejs.org/en/) and [Laravel-Mix](https://laravel-mix.com/) server.

**Use the following commands**
```
git clone https://github.com/mdmuhtasimfuadfahim/Eat_More
npm install or yarn install
```
**Setting up the .env file**

```
MONGO_CONNECTION_URL = "mongoDB_compass_database_url or mongoDB_atlas_database_url"
COOKIE_SECRET = cookie_secret

STRIPE_PRIVATE_KEY = stripe_key
```
> Create a mongoDB database and give the url to .env file.

```
npm run serve or yarn serve
npm run production or yarn production
```

### Live demo
 - [Live link](https://eat-more-muhtasim.herokuapp.com/)
 
### License
 - MIT
