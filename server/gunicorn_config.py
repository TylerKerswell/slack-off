import os



workers = int(os.environ.get('GUNICORN_PROCESSES', '2'))

threads = int(os.environ.get('GUNICORN_THREADS', '4'))

# timeout = int(os.environ.get('GUNICORN_TIMEOUT', '120'))

bind = os.environ.get('GUNICORN_BIND', '0.0.0.0:8080')

# runcommand -> gunicorn -w 2 -b 0.0.0.0:9000 --timeout 0 --chdir server python-server:app --daemon

forwarded_allow_ips = '*'

secure_scheme_headers = { 'X-Forwarded-Proto': 'https' }


# [Unit]
# Description=Gunicorn instance to serve slack-off
# After=network.target

# [Service]
# User=root
# Group=www-data

# WorkingDirectory=/root/GitHub/slack-off
# Environment="PATH=/root/GitHub/slack-off/server/.venv/bin"
# ExecStart=/root/GitHub/slack-off/server/gunicorn -w 2 -b 0.0.0.0:9000 --timeout 0 python-server:app

# [Install]
# WantedBy=multi-user.target


