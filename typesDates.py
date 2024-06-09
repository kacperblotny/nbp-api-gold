import requests
import pymongo
from datetime import datetime, timedelta

connection_string = "mongodb+srv://kblotny:kblotny@nbpcluster.e1fjfyn.mongodb.net/?retryWrites=true&w=majority&appName=nbpcluster"
client = pymongo.MongoClient(connection_string)

db = client.nbp
collection_gold = db.gold_prices_dates
collection_missing = db.missing_dates_dates


def fetch_gold_data(date):
    url = f"http://api.nbp.pl/api/cenyzlota/{date}/?format=json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data for {date}: {response.status_code}")
        return None

def record_exists(collection, date):
    return collection.count_documents({"data": date}) > 0

def fetch_all_data():
    start_date = datetime(2013, 1, 2)  # API NBP ma dane od 2013-01-02
    end_date = datetime.now()
    current_date = start_date

    new_data = []
    missing_dates = []

    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%m-%d")
        if not record_exists(collection_gold, date_str):
            data = fetch_gold_data(date_str)
            if data:
                for record in data:
                    # Convert date string to datetime object
                    record['data'] = datetime.strptime(record['data'], "%Y-%m-%d")
                new_data.extend(data)
            else:
                missing_dates.append({"data": datetime.strptime(date_str, "%Y-%m-%d")})
        current_date += timedelta(days=1)

    return new_data, missing_dates

new_gold_data, missing_dates = fetch_all_data()
if new_gold_data:
    collection_gold.insert_many(new_gold_data)
    print(f"Inserted {len(new_gold_data)} new records into the database.")
else:
    print("No new data to insert.")

if missing_dates:
    collection_missing.insert_many(missing_dates)
    print(f"Inserted {len(missing_dates)} missing dates into the database.")
else:
    print("No missing dates to insert.")
