# Kasra 2.0 Scope Document

## Tech Stack
- **Node** - server
- **MongoDB** - document store
- **AmazonS3** - image store
- **React** - app components
- **Reflux** - routing table
- **Express** - http framework
- **React Router Component** - navigation
- **Frozen Head React Component** - controls title and meta tags
- **SCSS** - styling
- **Joi, Selenium, Sinon, Chai, Mocha** - testing

## High-Level Architecture
All of our project services, web server, and document store are currently hosted on the same server, and our image store is on Amazon S3.

All information is kept in either the Document Store or the Image Store. When a request comes from the Kasra React App it is routed by the Express web server to either the Article Service or the User Service. These services fetch requests from the necessary store and return a JSON string to the app. In the case of images this string is the image url which is then requested directly by the browser. Static files such as css and scripts will be delivered to the browser by the web server, via CDN.
 
## Services - Data Layer
Services provide access to data from the document store (MongoDB). HTTP requests come through the browser via Express, which returns a JSON string.

Kasra 2.0 currently has two services:

 -  Users
 -  Articles

### Users
The User Service does not currently have predefined data values. This service will store all user data required by menaPOST. To be defined and verified at a later date.

### Articles
The Article Service currently stores all data attached to an article. Currently the following fields are being stored:

- title
- description
- credit
- headerVia
- via
- optionalHeadline
- body
- slug
- publishDate : YYYY-MM-DDTHH:MM:SS.SSS

When an image is uploaded the following image data is stored:

- imageType
- articleId
- url
- imageSlug
- created_at

## Security
All code will follow basic best practices for security as defined below.   A full security audit will be completed after the initial launch, referencing [OWASP](https://www.owasp.org/images/0/08/OWASP_SCP_Quick_Reference_Guide_v2.pdf).

## Server Side Rendering
-  HTTP Request
	-  run `<KasraApp>`
	-  dehydrate state
	-  render app into template
	-  render state into template
	- response -> Client
	- App loads state
	- onRehydrate components poll stores (stores<->server)

![server side rendering](/Users/Kasra/kasra2/uploads/server-side-rendering.JPG)

1. The `<head>` is rendered by the server using a [Swig Template](http://paularmstrong.github.io/swig/)
2. The `<body>` is rendered by the root React app `<KasraApp>`
3. When we dehydrate the app it produces a script, which contains all of the app's current state.  This script will be written just after `</body>`

- Tests
	-  Initialize Test DB, Create article
	-  Navigate to test article gets same result as an HTTP request for it.
	- Create 2nd DOM, Navigate to test article form home page. Ajax request for test article ADP. Serialize DOM, compare `<body>`