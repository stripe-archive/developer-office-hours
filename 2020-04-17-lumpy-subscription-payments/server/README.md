# Lumpy Subscription Payments

Walk through the advanced Subscription
Schedules feature allowing you to
create lumpy subscription payments.

> [🎬 Watch on YouTube](https://youtu.be/NA19ikfx2qQ)

## Requirements
* Python 3
* [Configured .env file](../README.md)


## How to run

1. Create and activate a new virtual environment

**On Linux / Unix / MacOS**

```
python3 -m venv /path/to/new/virtual/environment
source /path/to/new/virtual/environment/venv/bin/activate
```

**On Windows** (PowerShell)

```
python3 -m venv /path/to/new/virtual/environment
.\venv\Scripts\activate.bat
```

2. Install dependencies

```
pip install -r requirements.txt
```

3. Export and run the application

**On Linux / Unix / MacOS**

```
export FLASK_APP=server.py
python3 -m flask run --port=4242
```

**On Windows** (PowerShell)

```
$env:FLASK_APP=“server.py"
python3 -m flask run --port=4242
```

4. Go to `localhost:4242` in your browser to see the demo
