// Map background settings.
// provider: "auto"   -> free Esri satellite / OpenStreetMap tiles (no key). Uses Google instead if a key is set below.
//           "tiles"  -> always the free tiles
//           "google" -> Google Maps (needs NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local, billing enabled)
//           "none"   -> no map, dark ground only
// Change lat / lng / headingDeg to where the colony really is. (Placeholder: near Jaipur, Rajasthan, India.)
export const MAP_CONFIG = {
  provider: "none",  // "none" = dark ground only, no network map tiles (best performance)
  apiKey: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GOOGLE_MAPS_API_KEY) || "",
  lat: 26.9285,          // site centre (latitude)
  lng: 75.7700,          // site centre (longitude)
  headingDeg: 0,         // rotate the plan clockwise relative to true north
  metersPerUnit: 13.5,   // size of one plan unit in metres (plan is ~0.46 m per drawing pixel)
  defaultType: "off",       // "off" = map disabled by default
  zoomFar: 18,           // map zoom used when the whole site is in view
  zoomNear: 19,          // map zoom used when zoomed in on plots
};
