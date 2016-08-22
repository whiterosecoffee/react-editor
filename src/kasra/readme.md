# Kasra

The Kasra module composes together all other modules to form the Kasra site. It contains site wide configuration and functionality. This module should be kept as small as possible; functionality that applies to multiple modules, but not all modules, does not belong here.

## Express App (Server Side)

The Kasra app serves the static assets of the client side React application from the root path (`"/"`).

## React App (Client Side)

Top level request routing and navigation is handled in the KasraApp React component. Currently, internal path are routed using hash urls like `"/#/home-page"`.

## Routing

We will be switching to HTML5 Push State to use proper url paths, which will require creating Express paths to mactch each React path. Both apps should reference a common route map in order to avoid duplicated information.

Having routing info available to both the client and the server will enable us to render requests on the server and serve up static HTML. This is required for search crawlers to understand the content they receive. It will also allow a visitor to view the content they requested before Javascript loads on the page. React can take over the static content as soon as it loads.

Routing is handled by [React Router](https://github.com/rackt/react-router/).
