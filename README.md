
# Budget-It [![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

Budget-It on mobiiliapplikaatio oman henkilökohtaisen talouden menojen ja tulojen budjetoimiseen. Käyttäjä voi suunnitella tulevaa kulutustaan ja tulojaan kategorisoimalla ne, esim. Ruokalasku 43.72 € (01-M Ruokakauppa) ja palkka 2600.00 € (01-T Ansiotulo). Hintatiedot lisätään joko manuaalisesti tai nimen perusteella tehdään rajapintaan haku.

Applikaatiossa on mahdollista tarkastella kulutusta ja tuloja eri tavoilla (listana ja graafeina) ja applikaatio tekee arvion käyttäjän tulotason riittävyydestä hänen kulutustottumuksilleen. Käyttäjä voi luoda itselleen kauppalistoja ja applikaatio käyttää hyödykseen eri laiteominaisuuksia, joita käyttäjän mobiililaitteelta löytyy, kuten kamera (kuvien liittäminen kauppalistaan), mikrofoni (kauppalistan sanelu) ja sijainti (applikaatio etsii tietyn alan kaupat läheltä).

Tallennus tapahtuu Firebasen Storageen ja Realtime Databaseen.

## Authors

- [@otsojm](https://www.github.com/otsojm)


## Features

- Expenses/incomes statistics page
- Manage expenses (add, remove)
- Manage incomes (add, remove)
- Make and remove shopping lists and add photos to them
- Locate nearby stores based on a user's location


## Dependencies

```bash
"dependencies": {
    "@react-native-picker/picker": "^2.4.1",
    "@react-navigation/drawer": "^6.4.1",
    "@react-navigation/native": "^6.0.10",
    "expo": "~44.0.0",
    "expo-camera": "~12.1.2",
    "expo-status-bar": "~1.2.0",
    "firebase": "^9.6.10",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-native": "0.64.3",
    "react-native-dotenv": "^3.3.1",
    "react-native-elements": "^3.4.2",
    "react-native-gesture-handler": "~2.1.0",
    "react-native-reanimated": "2.3.1",
    "react-native-safe-area-context": "3.3.2",
    "react-native-web": "0.17.1",
    "react-success-indicator": "^1.1.0",
    "rn-nodeify": "^10.3.0"
  }
  ```


## Demo

- [Expo address here](https://placeholder.com)


## Environment Variables

To run this project, you will need to at least add the following environment variables to your .env file:

priceAPI Token

`API_VALUE`

Firebase Configuration

`API_KEY`

`AUTH_DOMAIN`

`DATABASE_URL`

`PROJECT_ID`

`STORAGE_BUCKET`

`MESSAGING_SENDER_ID`

`APP_ID`

Google Places API

`GOOGLE_API`



## Run Locally

Clone the project

```bash
  git clone https://github.com/otsojm/budget-it.git
```


Go to the project directory

```bash
  cd budget-it
```


Install dependencies

```bash
  npm install
```


Start the server

```bash
  expo start
```
    
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Related

Here are some pages related to this project

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [priceAPI](https://readme.priceapi.com/reference/request-process-overview)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

