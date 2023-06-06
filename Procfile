release: python manage.py migrate
web: gunicorn drp39.wsgi
web2: daphne patientoncall_api.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python3 manage.py runworker channel_layer -v2