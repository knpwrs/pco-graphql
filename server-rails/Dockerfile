FROM ruby:2.4.1
ENV HOME=/home/rails
ENV APP=$HOME/app
# Install system dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs netcat
# Create app directory
RUN mkdir -p $APP
WORKDIR $APP
# Install dependencies without application code to take advantage of docker cache
ADD Gemfile Gemfile.lock $APP/
RUN bundle install
# Copy application code
ADD . $APP
# USER rails
EXPOSE 8000
CMD ["bin/rails", "s", "-p", "8000", "-b", "0.0.0.0"]
