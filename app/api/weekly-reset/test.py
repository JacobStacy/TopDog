import requests

url = "http://localhost:3000/api/weekly-reset"

try:
    response = requests.get(url)
    if response.status_code == 200:
        print("Weekly reset ran successfully!")
    else:
        print(f"Failed to reset. Status code: {response.status_code}")
except Exception as e:
    print(f"An error occurred: {e}")