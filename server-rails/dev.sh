#!/usr/bin/env bash
set -e
while ! nc -z db 5432; do sleep 1; done
rm -f tmp/pids/server.pid
rake db:create
bin/rails db:migrate
bin/rails s -p 8000 -b 0.0.0.0
