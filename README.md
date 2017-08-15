# Planning Center GraphQL Demo

This repository is home to three projects:

## Planning Center GraphQL Query Server

Located in [`./server`]. This a GraphQL query server for a subset of the
[Planning Center Public API][pcapi]. Written with [Apollo] and [DataLoader].

## Sample React Application

Located in [`./client`]. This is a web application built against the GraphQL
query server. Written with [React], [Apollo], [Redux], [i18next], and
[glamorous]. Features hot loading and code splitting via [webpack].

## Sample Ruby on Rails GraphQL Server

Located in [`./server-rails`] \(the interesting bits are in
[`./server-rails/app/graphql`]). This is a small ruby on rails application
which exposes a GraphQL api. Written with [Ruby on Rails], [`graphql-ruby`],
and [`dataloader`] (Ruby version).

# Setup

You will need to install two things to get up and running. First, you will need
a [Docker] runtime for your platform (I use [Docker for Mac]). Second, you will
need [`direnv`] (on macOS you can simply run `brew install direnv` to get
[`direnv`] via [Homebrew]). I prefer [`direnv`] over `docker-compose` [`.env`]
files for two reasons:

1. `docker-compose` environment variables only work in the same directory the
   `.env` file is declared. This isn't a big deal if you keep your terminal in
   the root directory of your project, but I like to move around the project.
1. [`direnv`] has more capabilities and is a more versatile tool in general.
   For instance, I have a `scripts` directory in this project which is
   automatically added to your `PATH` no matter where you are in the project.
   The scripts I have in this project are helpers for accessing tools inside of
   the [Docker] containers, including `npm`, `redis-cli`, and `rails`.

With those installed, you should copy `.envrc.sample` to a new file called
`.envrc` and fill in your [OAuth client id and secret from Planning
Center][oauth]. You can also change the ports the servers will run on (the node
server by default runs on port `8000` and the ruby server on `8001`), just also
remember to update the callback url to use the new port number.

With everything in place, all you need to do is run `docker-compose up`. This
will set up five containers for you:

1. A node container for the GraphQL server.
1. A redis container for session storage for the GraphQL server (useful for
   restarting the server and maintaining sessions).
1. Another node container for building the client and watching for changes.
1. A rails server which exposes a GraphQL API.
1. A PostgreSQL container for persistent storage in the rails container.

With everything running you can run `rails db:seed` to put sample data in the
PostgreSQL database. As long as you are anywhere in the project directory and
have [`direnv`] installed, `rails` refers to the `rails` executable inside of
the rails docker container.

[DataLoader]: https://github.com/facebook/dataloader
[Docker for Mac]: https://www.docker.com/docker-mac "Docker for Mac"
[Docker]: https://www.docker.com/ "Docker"
[Homebrew]: https://brew.sh/ "Homebrew"
[React]: https://facebook.github.io/react/ "React"
[Redux]: http://redux.js.org/ "Redux"
[Ruby on Rails]: http://rubyonrails.org/ "Ruby on Rails"
[`./client`]: ./client "client"
[`./server-rails/app/graphql`]: ./server-rails/app/graphql "./server-rails/app/graphql"
[`./server-rails`]: ./server-rails "server"
[`./server`]: ./server "server"
[`.env`]: https://docs.docker.com/compose/environment-variables/#the-env-file ".env"
[`dataloader`]: https://github.com/sheerun/dataloader "dataloader"
[`direnv`]: https://direnv.net/ "direnv"
[`graphql-ruby`]: http://graphql-ruby.org/ "graphql-ruby"
[apollo]: https://www.apollodata.com/ "Apollo"
[glamorous]: https://glamorous.rocks/ "glamorous"
[i18next]: https://www.i18next.com/ "i18next"
[oauth]: https://planningcenter.github.io/api-docs/#oauth-2.0 "OAuth"
[pcapi]: https://planningcenter.github.io/api-docs/ "Planning Center API References"
[webpack]: https://webpack.js.org/ "webpack"
