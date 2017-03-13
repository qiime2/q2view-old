> This README is for developers and people interested in learning more about q2view. If you just need the functionality, q2view is already compiled and hosted at [https://view.qiime2.org](https://view.qiime2.org)

# q2view

This HTML 5 interface provides a way to view `.qza`/`.qzv` files produced by
QIIME 2. It provides:
  - Inspection of basic metadata
  - Viewing of complex web-based visualizations
  - Inspection of provenance

This interface uses the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
to "hoist" the contents of a `.qzv`'s `/data` directory into the interface
allowing relative links within a visualization to work via standard HTTP
requests.

To build, first install the dependencies (while in root of the repo):
```
npm install
```
Then run:
```
npm run build
```
This will create a `build` directory containing the constructed contents. These
should then be hosted somewhere capable of managing static pages.
**Important:** HTTPS is required (by service worker API) when not hosting
from `localhost`.

It is also possible to use webpack HMR, though it doesn't work very well at the
moment due to the nature of service workers:
```
npm start
```
