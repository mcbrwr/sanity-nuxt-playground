// sanity-config.js

import sanityClient from "@sanity/client";

export default sanityClient({
   // Find your project ID and dataset in `sanity.json` in your studio project
   projectId: "22gbf1mn",
   dataset: "production",
   useCdn: true,
   // useCdn == true gives fast, cheap responses using a globally distributed cache.
   // Set this to false if your application requires the freshest possible
   // data always (potentially slightly slower and a bit more expensive).
});