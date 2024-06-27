# Narzędzie API do analizy cen złota

```
cd server
npm i
nodemon server

cd ..
cd client
npm i
npm run dev
```

## Skrypty do pobrania danych

[Skrypt do pobrania i zaladowania danych do bazy danych, daty jako typ string](https://github.com/kacperblotny/nbp-api-gold/blob/main/typesStrings.py)  
[Skrypt do pobrania i zaladowania danych do bazy danych, daty jako typ daty](https://github.com/kacperblotny/nbp-api-gold/blob/main/typesStrings.py)

[Dane pobrane z bazy](https://github.com/kacperblotny/nbp-api-gold/blob/main/gold_data.json)

<img width="475" alt="Screenshot 2024-06-11 at 9 56 19 AM" src="https://github.com/kacperblotny/nbp-api-gold/assets/43350503/0d79b1fb-a272-4fb9-b0f6-cd28daa8694c">  
<img width="547" alt="Screenshot 2024-06-11 at 9 56 36 AM" src="https://github.com/kacperblotny/nbp-api-gold/assets/43350503/e69de8cc-29e5-4570-ad95-705a51cfa4ed">  
  
NBP nie pracuję w święta i weekendy więc ich API ma braki w danych

## API

```
@GET wszystkie ceny złota

/api/gold_prices
```

```
@GET cena złota z dania w formacie YYYY-MM-DD

/api/gold_price/:date
```

```
@GET cena złota z zakresu w formacie YYYY-MM-DD

/api/gold_prices/:fromdate/:todate
```

<img width="1636" alt="Screenshot 2024-06-11 at 10 20 51 AM" src="https://github.com/kacperblotny/nbp-api-gold/assets/43350503/3ce503e8-f0d9-43b4-a712-35e14b8afca6">

Użytkownik ma opcje pobrania danych z każdego grafu oraz jego .png
