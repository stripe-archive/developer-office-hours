# Stripe foundations: Webhooks

A Flask server example for handling Stripe webhooks.

## Requirements

- Python 3
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## How to run

1. Create and activate a new virtual environment

**MacOS / Unix**

```
python3 -m venv env
source env/bin/activate
```

**Windows (PowerShell)**

```
python3 -m venv env
.\env\Scripts\activate.bat
```

2. Install dependencies

```
pip install stripe flask
```

3. Export and run the application

**MacOS / Unix**

```
export FLASK_APP=server.py
python3 -m flask run --port=4242
```

**Windows (PowerShell)**

```
$env:FLASK_APP=“server.py"
python3 -m flask run --port=4242
```

4. Start the webhook forwarding

```bash
stripe listen --forward-to=localhost:4242/webhook
```

5. Trigger an event

```bash
stripe trigger customer.created
```
