// ==============================================
// GLOBAL VOLCANO MAP — main.js
// ==============================================

// --- CONSTANTS ---
const HOLOCENE_URL    = "data/holocene_volcanoes.geojson";
const PLEISTOCENE_URL = "data/pleistocene_volcanoes.geojson";
const CURRENT_YEAR    = new Date().getFullYear();

// --- REGION → CONTINENT (all 19 GVP geographic regions) ---
const REGION_TO_CONTINENT = {
  "Antarctic-Scotia Volcanic Regions":         "Antarctica",
  "Arabia-Central Asia Volcanic Regions":      "Asia",
  "Atlantic Ocean Volcanic Regions":           "Europe",
  "Eastern Africa Volcanic Regions":           "Africa",
  "Eastern Asia Volcanic Regions":             "Asia",
  "Eastern Australia Volcanic Regions":        "Oceania",
  "Eastern Pacific Volcanic Regions":          "Oceania",
  "European Volcanic Regions":                 "Europe",
  "Middle America-Caribbean Volcanic Regions": "North America",
  "North America Volcanic Regions":            "North America",
  "Northern Africa Volcanic Regions":          "Africa",
  "Northwestern Pacific Volcanic Regions":     "Asia",
  "Somalian-Antarctic Volcanic Regions":       "Africa",
  "South America Volcanic Regions":            "South America",
  "Southern Pacific Volcanic Regions":         "Oceania",
  "Southwestern Pacific Volcanic Regions":     "Oceania",
  "Sunda-Banda Volcanic Regions":              "Asia",
  "Tonga-Kermadec Volcanic Regions":           "Oceania",
  "Western Pacific Volcanic Regions":          "Asia",
};

// --- COUNTRY → CONTINENT (fallback; GVP naming conventions) ---
const COUNTRY_TO_CONTINENT = {
  // North America
  "United States": "North America", "Canada": "North America", "Mexico": "North America",
  "Guatemala": "North America", "Belize": "North America", "Honduras": "North America",
  "El Salvador": "North America", "Nicaragua": "North America", "Costa Rica": "North America",
  "Panama": "North America", "Cuba": "North America", "Haiti": "North America",
  "Dominican Republic": "North America", "Jamaica": "North America",
  "Trinidad and Tobago": "North America", "Martinique": "North America",
  "Guadeloupe": "North America", "Saint Kitts and Nevis": "North America",
  "Montserrat": "North America", "Saint Vincent and the Grenadines": "North America",
  "Dominica": "North America", "Grenada": "North America",
  "Sint Eustatius": "North America", "Saba": "North America", "Barbados": "North America",
  // South America
  "Colombia": "South America", "Venezuela": "South America", "Guyana": "South America",
  "Suriname": "South America", "French Guiana": "South America", "Brazil": "South America",
  "Ecuador": "South America", "Peru": "South America", "Bolivia": "South America",
  "Chile": "South America", "Argentina": "South America", "Paraguay": "South America",
  "Uruguay": "South America",
  // Europe
  "Iceland": "Europe", "Ireland": "Europe", "United Kingdom": "Europe",
  "Norway": "Europe", "Sweden": "Europe", "Finland": "Europe", "Denmark": "Europe",
  "Germany": "Europe", "Netherlands": "Europe", "Belgium": "Europe",
  "France": "Europe", "Spain": "Europe", "Portugal": "Europe",
  "Italy": "Europe", "Greece": "Europe", "Austria": "Europe", "Switzerland": "Europe",
  "Croatia": "Europe", "Bosnia and Herzegovina": "Europe", "Serbia": "Europe",
  "Montenegro": "Europe", "Albania": "Europe", "North Macedonia": "Europe",
  "Kosovo": "Europe", "Hungary": "Europe", "Czech Republic": "Europe",
  "Czechia": "Europe", "Slovakia": "Europe", "Poland": "Europe",
  "Ukraine": "Europe", "Belarus": "Europe", "Romania": "Europe", "Bulgaria": "Europe",
  "Moldova": "Europe", "Lithuania": "Europe", "Latvia": "Europe",
  "Estonia": "Europe", "Slovenia": "Europe", "Luxembourg": "Europe",
  // Asia (Russia & Turkey placed here — bulk volcanic activity is in Asian portion)
  "Russia": "Asia", "Turkey": "Asia", "Turkiye": "Asia",
  "Armenia": "Asia", "Azerbaijan": "Asia", "Georgia": "Asia",
  "Syria": "Asia", "Lebanon": "Asia", "Israel": "Asia", "Palestine": "Asia",
  "Jordan": "Asia", "Saudi Arabia": "Asia", "Yemen": "Asia", "Oman": "Asia",
  "United Arab Emirates": "Asia", "Kuwait": "Asia", "Bahrain": "Asia",
  "Qatar": "Asia", "Iraq": "Asia", "Iran": "Asia", "Afghanistan": "Asia",
  "Pakistan": "Asia", "India": "Asia", "Nepal": "Asia", "Bhutan": "Asia",
  "Bangladesh": "Asia", "Sri Lanka": "Asia", "Maldives": "Asia",
  "China": "Asia", "Taiwan": "Asia", "South Korea": "Asia", "North Korea": "Asia",
  "Japan": "Asia", "Mongolia": "Asia", "Kazakhstan": "Asia", "Kyrgyzstan": "Asia",
  "Tajikistan": "Asia", "Turkmenistan": "Asia", "Uzbekistan": "Asia",
  "Myanmar": "Asia", "Burma (Myanmar)": "Asia", "Thailand": "Asia",
  "Laos": "Asia", "Vietnam": "Asia", "Cambodia": "Asia",
  "Malaysia": "Asia", "Singapore": "Asia", "Brunei": "Asia",
  "Indonesia": "Asia", "Philippines": "Asia", "Timor-Leste": "Asia",
  // Africa
  "Morocco": "Africa", "Algeria": "Africa", "Tunisia": "Africa", "Libya": "Africa",
  "Egypt": "Africa", "Sudan": "Africa", "South Sudan": "Africa", "Eritrea": "Africa",
  "Ethiopia": "Africa", "Djibouti": "Africa", "Somalia": "Africa", "Kenya": "Africa",
  "Uganda": "Africa", "Tanzania": "Africa", "Rwanda": "Africa", "Burundi": "Africa",
  "DR Congo": "Africa", "Democratic Republic of Congo": "Africa",
  "Republic of Congo": "Africa", "Congo": "Africa",
  "Central African Republic": "Africa", "Cameroon": "Africa", "Nigeria": "Africa",
  "Niger": "Africa", "Chad": "Africa", "Mali": "Africa", "Burkina Faso": "Africa",
  "Ghana": "Africa", "Togo": "Africa", "Benin": "Africa", "Senegal": "Africa",
  "Guinea": "Africa", "Guinea-Bissau": "Africa", "Sierra Leone": "Africa",
  "Liberia": "Africa", "Ivory Coast": "Africa", "Côte d'Ivoire": "Africa",
  "Cape Verde": "Africa", "Cabo Verde": "Africa", "Mauritania": "Africa",
  "Western Sahara": "Africa", "Angola": "Africa", "Zambia": "Africa",
  "Zimbabwe": "Africa", "Mozambique": "Africa", "Madagascar": "Africa",
  "Malawi": "Africa", "South Africa": "Africa", "Namibia": "Africa",
  "Botswana": "Africa", "Lesotho": "Africa", "Eswatini": "Africa", "Swaziland": "Africa",
  "Equatorial Guinea": "Africa", "Gabon": "Africa",
  "São Tomé and Príncipe": "Africa", "Sao Tome and Principe": "Africa",
  "Comoros": "Africa", "Union of the Comoros": "Africa",
  "Mauritius": "Africa", "Réunion": "Africa", "Seychelles": "Africa",
  "Canary Islands": "Africa", "Ascension Island": "Africa",
  "Saint Helena": "Africa", "Tristan da Cunha": "Africa",
  // Oceania
  "Australia": "Oceania", "New Zealand": "Oceania", "Papua New Guinea": "Oceania",
  "Fiji": "Oceania", "Vanuatu": "Oceania", "Solomon Islands": "Oceania",
  "Tonga": "Oceania", "Samoa": "Oceania", "American Samoa": "Oceania",
  "Tuvalu": "Oceania", "Kiribati": "Oceania", "Nauru": "Oceania",
  "Marshall Islands": "Oceania", "Micronesia": "Oceania", "Palau": "Oceania",
  "Northern Mariana Islands": "Oceania", "Guam": "Oceania",
  "New Caledonia": "Oceania", "French Polynesia": "Oceania",
  "Wallis and Futuna": "Oceania", "Cook Islands": "Oceania",
  "Niue": "Oceania", "Pitcairn Islands": "Oceania", "Easter Island": "Oceania",
  // Antarctica
  "Antarctica": "Antarctica",
  "South Georgia and the South Sandwich Islands": "Antarctica",
  "Heard Island and McDonald Islands": "Antarctica",
  "Bouvet Island": "Antarctica",
  // GVP cross-border / disputed entries
  "Armenia-Azerbaijan": "Asia", "China-North Korea": "Asia",
  "North Korea-South Korea": "Asia", "Cambodia-Vietnam": "Asia",
  "DR Congo-Rwanda": "Africa", "Eritrea-Djibouti": "Africa",
  "Ethiopia-Djibouti": "Africa", "Ethiopia-Eritrea": "Africa",
  "Ethiopia-Eritrea-Djibouti": "Africa", "Ethiopia-Kenya": "Africa",
  "Uganda-Rwanda": "Africa", "Colombia-Ecuador": "South America",
  "Chile-Argentina": "South America", "Chile-Bolivia": "South America",
  "El Salvador-Guatemala": "North America", "Guatemala-El Salvador": "North America",
  "Mexico-Guatemala": "North America", "Hungary-Slovakia": "Europe",
  "Syria-Jordan-Saudi Arabia": "Asia",
  "Japan - administered by Russia": "Asia",
  "France - claimed by Vanuatu": "Oceania",
  "Undersea Features": "Oceania",
};

// --- MAP SETUP ---
// tap: false        — disables Leaflet's custom tap handler (double-fires on some mobile browsers)
// closePopupOnClick: false — prevents the ghost map-click from calling map.closePopup()
const map = L.map("map", { zoomControl: true, tap: false, closePopupOnClick: false }).setView([20, 0], 2);

const darkMatter = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd", maxZoom: 19,
  }
).addTo(map);

const positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd", maxZoom: 19,
  }
);
const osm  = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  { attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a>' });

L.control.layers(
  { "Dark (default)": darkMatter, "Light": positron, "OpenStreetMap": osm, "Topographic": topo },
  {}, { position: "topright" }
).addTo(map);

// --- STATE ---
let holoceneFeatures    = [];
let pleistoceneFeatures = [];
let holoceneCluster     = null;
let pleistoceneCluster  = null;
let lastFilteredH       = [];   // cached for CSV export
let lastFilteredP       = [];

// ================================================================
// MARKER HELPERS
// ================================================================

function parseEruptionYear(raw) {
  if (raw === null || raw === undefined || raw === "NULL" || raw === "None") return null;
  const n = Number(raw);
  return isNaN(n) ? null : Math.round(n);
}

// Color by eruption recency (fill color)
function eruptionColor(feature) {
  const year = parseEruptionYear(feature.properties.Last_Eruption_Year);
  if (year === null) return "#6b7280";           // unknown — grey
  const ago = CURRENT_YEAR - year;
  if (ago <= 10)    return "#dc2626";            // active / last decade — deep red
  if (ago <= 50)    return "#ef4444";            // within living memory — red
  if (ago <= 200)   return "#f97316";            // historical record — orange
  if (ago <= 500)   return "#eab308";            // early modern — yellow
  if (ago <= 2000)  return "#84cc16";            // medieval / ancient historic — lime
  if (ago <= 10000) return "#22d3ee";            // holocene — cyan
  return "#6b7280";                              // older — grey
}

// Marker diameter (px) scaled to elevation
function markerDiameter(elevation) {
  if (elevation == null) return 8;
  const e = Number(elevation);
  if (isNaN(e) || e < 0) return 6;   // submarine
  if (e < 500)  return 8;
  if (e < 1500) return 10;
  if (e < 3000) return 12;
  if (e < 5000) return 14;
  return 16;                          // > 5000 m — very high peaks
}

// L.divIcon circle — period distinction removed from visuals (surfaced via filter panel + popup badge)
function createVolcanoIcon(feature, _period) {
  const color = eruptionColor(feature);
  const size  = markerDiameter(feature.properties.Elevation);

  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${color};
      border:1.5px solid rgba(255,255,255,0.45);
      opacity:1;
      box-shadow:0 1px 4px rgba(0,0,0,0.4);
    "></div>`,
    className: "",
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor:[0, -(size / 2 + 4)],
  });
}

// MarkerClusterGroup factory — neutral style (clusters are navigation aids, not data)
function createClusterGroup(_period) {
  return L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 50,
    disableClusteringAtZoom: 7,
    iconCreateFunction(cluster) {
      const count = cluster.getChildCount();
      const size  = count < 10 ? 28 : count < 50 ? 36 : count < 200 ? 44 : 52;
      const fs    = size < 36 ? 10 : 11;
      return L.divIcon({
        html: `
          <div title="${count.toLocaleString()} volcanoes — zoom in to explore" style="
            position:relative;
            width:${size}px;height:${size}px;
          ">
            <div style="
              position:absolute;
              inset:-5px;
              border-radius:50%;
              background:rgba(148,163,184,0.15);
              border:1px solid rgba(148,163,184,0.25);
            "></div>
            <div style="
              position:absolute;inset:0;
              border-radius:50%;
              background:rgba(30,41,59,0.92);
              border:1.5px solid rgba(148,163,184,0.5);
              display:flex;align-items:center;justify-content:center;
              color:#e2e8f0;font-weight:700;font-size:${fs}px;
              font-family:system-ui,sans-serif;
              box-shadow:0 2px 10px rgba(0,0,0,0.5);
            ">${count}</div>
          </div>`,
        className: "",
        iconSize:   [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    },
  });
}

// ================================================================
// DATA FETCH
// ================================================================
async function fetchVolcanoes() {
  const overlay = document.getElementById("loading-overlay");
  const msg     = document.getElementById("loading-msg");
  try {
    const [hRes, pRes] = await Promise.all([
      fetch(HOLOCENE_URL), fetch(PLEISTOCENE_URL),
    ]);
    const [hJson, pJson] = await Promise.all([hRes.json(), pRes.json()]);
    holoceneFeatures    = hJson.features;
    pleistoceneFeatures = pJson.features;
    initializeVolcanoTypeFilters();
    renderLayers();
  } catch (err) {
    console.error("Failed to load volcano data:", err);
    msg.textContent = "Failed to load data. Please refresh the page.";
    document.querySelector(".spinner").style.display = "none";
    return;
  }
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  setTimeout(() => { overlay.style.display = "none"; }, 400);
}

// ================================================================
// POPUP
// ================================================================
function volcanoPopup(feature, period) {
  const p = feature.properties;
  const name    = p.Volcano_Name         || "Unnamed Volcano";
  const country = p.Country              || "Unknown";
  const region  = p.Region               || "Unknown";
  const elev    = p.Elevation != null
    ? Number(p.Elevation).toLocaleString() + " m" : "N/A";
  const type    = p.Primary_Volcano_Type || "Unknown";
  const last    = p.Last_Eruption_Year != null ? p.Last_Eruption_Year : "Unknown";
  const tect    = p.Tectonic_Setting     || null;
  const rock    = p.Major_Rock_Type      || null;
  const summary = p.Geological_Summary   || null;
  const gvpURL  = p.Volcano_Number
    ? `https://volcano.si.edu/volcano.cfm?vn=${p.Volcano_Number}` : null;

  const badge = period === "holocene"
    ? '<span class="popup-badge badge-holocene">Holocene</span>'
    : '<span class="popup-badge badge-pleistocene">Pleistocene</span>';

  const rows = [
    ["Country",          country],
    ["Region",           region],
    ["Elevation",        elev],
    ["Last eruption",    last],
    tect ? ["Tectonic setting", tect] : null,
    rock ? ["Rock type",        rock] : null,
  ]
    .filter(Boolean)
    .map(([k, v]) =>
      `<tr><td class="popup-key">${k}</td><td class="popup-val">${v}</td></tr>`
    ).join("");

  const summaryHtml = summary
    ? `<p class="popup-summary">${summary.length > 260
        ? summary.slice(0, 260) + "…" : summary}</p>` : "";

  const photoHtml = gvpURL
    ? `<a class="popup-photo-link" href="${gvpURL}" target="_blank" rel="noopener">View on GVP →</a>`
    : "";

  return `
    <div class="volcano-popup">
      <div class="popup-header">
        <span class="popup-name">${name}</span>${badge}
      </div>
      <div class="popup-type">${type}</div>
      <table class="popup-table">${rows}</table>
      ${summaryHtml}${photoHtml}
    </div>`;
}

// ================================================================
// FILTERS
// ================================================================
function passesNameFilter(feature, value) {
  if (!value) return true;
  return (feature.properties.Volcano_Name || "").toLowerCase().includes(value.toLowerCase());
}

function passesCountryFilter(feature, value) {
  if (!value) return true;
  return (feature.properties.Country || "").toLowerCase().includes(value.toLowerCase());
}

function passesContinentFilter(feature, enabledContinents) {
  if (enabledContinents.length === 0) return false;
  const region = feature.properties.Region;
  const contByRegion = REGION_TO_CONTINENT[region];
  if (contByRegion) return enabledContinents.includes(contByRegion);
  const country = feature.properties.Country || "";
  const contByCountry = COUNTRY_TO_CONTINENT[country];
  if (contByCountry) return enabledContinents.includes(contByCountry);
  console.warn("Unmapped region/country:", region, "/", country);
  return true;
}

function passesVolcanoTypeFilter(feature, enabledTypes) {
  return enabledTypes.includes(feature.properties.Primary_Volcano_Type);
}

function passesEruptionFilter(feature, { minYear, maxYear, includePreCE, includeUnknown }) {
  const year = parseEruptionYear(feature.properties.Last_Eruption_Year);
  if (year === null) return includeUnknown;
  if (year < 0)     return includePreCE;    // BCE values are negative integers
  if (year < minYear || year > maxYear) return false;
  return true;
}

function getEruptionFilterState() {
  const sliderEl = document.getElementById("eruption-slider");
  if (!sliderEl.noUiSlider) {
    return { minYear: 0, maxYear: CURRENT_YEAR, includePreCE: true, includeUnknown: true };
  }
  const vals = sliderEl.noUiSlider.get();
  const minYear = Math.round(Number(vals[0]));
  const maxYear = Math.round(Number(vals[1]));
  return {
    minYear,
    maxYear,
    includePreCE:    document.getElementById("eruption-include-pre").checked,
    includeUnknown:  document.getElementById("eruption-include-unknown").checked,
  };
}

function applyFilters(features) {
  const name     = document.getElementById("name-filter").value.trim();
  const country  = document.getElementById("country-filter").value.trim();
  const enabledContinents = [...document.querySelectorAll(".continent-filter:checked")].map(e => e.value);
  const enabledTypes      = [...document.querySelectorAll(".volcano-type-filter:checked")].map(e => e.value);
  const eruptionState     = getEruptionFilterState();

  return features.filter(f =>
    passesNameFilter(f, name) &&
    passesCountryFilter(f, country) &&
    passesContinentFilter(f, enabledContinents) &&
    passesVolcanoTypeFilter(f, enabledTypes) &&
    passesEruptionFilter(f, eruptionState)
  );
}

// ================================================================
// AUTOCOMPLETE
// ================================================================
function updateCountrySuggestions(value) {
  const box = document.getElementById("country-suggestions");
  box.innerHTML = "";
  if (!value) return;
  const allCountries = new Set(
    [...holoceneFeatures, ...pleistoceneFeatures].map(f => f.properties.Country).filter(Boolean)
  );
  [...allCountries]
    .filter(c => c.toLowerCase().includes(value.toLowerCase()))
    .sort().slice(0, 8)
    .forEach(c => {
      const div = document.createElement("div");
      div.textContent = c;
      div.addEventListener("mousedown", () => {
        document.getElementById("country-filter").value = c;
        box.innerHTML = "";
        renderLayers();
      });
      box.appendChild(div);
    });
}

// ================================================================
// VOLCANO TYPE FILTERS
// ================================================================
function initializeVolcanoTypeFilters() {
  const container = document.getElementById("volcano-type-filters");
  const types = new Set(
    [...holoceneFeatures, ...pleistoceneFeatures]
      .map(f => f.properties.Primary_Volcano_Type).filter(Boolean)
  );
  container.innerHTML = [...types].sort()
    .map(t =>
      `<label><input type="checkbox" class="volcano-type-filter" value="${t}" checked> ${t}</label>`
    ).join("");
  container.querySelectorAll(".volcano-type-filter").forEach(el =>
    el.addEventListener("change", renderLayers)
  );

  applyPendingTypeState();
}

// ================================================================
// RENDER LAYERS (clustering + dynamic style)
// ================================================================
function renderLayers() {
  const hEnabled = document.getElementById("filter-holocene").checked;
  const pEnabled = document.getElementById("filter-pleistocene").checked;

  if (holoceneCluster)    map.removeLayer(holoceneCluster);
  if (pleistoceneCluster) map.removeLayer(pleistoceneCluster);
  holoceneCluster = pleistoceneCluster = null;

  let filteredH = [], filteredP = [];

  if (hEnabled) {
    filteredH = applyFilters(holoceneFeatures);
    holoceneCluster = createClusterGroup("holocene");
    filteredH.forEach(f => {
      const [lon, lat] = f.geometry.coordinates;
      const marker = L.marker([lat, lon], { icon: createVolcanoIcon(f, "holocene") });
      const html = volcanoPopup(f, "holocene");
      if (window.innerWidth > 768) {
        // Desktop: bind popup — Leaflet handles open/close toggle itself
        marker.bindPopup(html, { maxWidth: 320, autoPan: true });
      } else {
        // Mobile: bottom sheet only, no Leaflet popup bound at all
        marker.on("click", e => {
          L.DomEvent.stopPropagation(e);
          if (openBottomSheet) openBottomSheet(html);
        });
      }
      holoceneCluster.addLayer(marker);
    });
    holoceneCluster.addTo(map);
  }

  if (pEnabled) {
    filteredP = applyFilters(pleistoceneFeatures);
    pleistoceneCluster = createClusterGroup("pleistocene");
    filteredP.forEach(f => {
      const [lon, lat] = f.geometry.coordinates;
      const marker = L.marker([lat, lon], { icon: createVolcanoIcon(f, "pleistocene") });
      const html = volcanoPopup(f, "pleistocene");
      if (window.innerWidth > 768) {
        marker.bindPopup(html, { maxWidth: 320, autoPan: true });
      } else {
        marker.on("click", e => {
          L.DomEvent.stopPropagation(e);
          if (openBottomSheet) openBottomSheet(html);
        });
      }
      pleistoceneCluster.addLayer(marker);
    });
    pleistoceneCluster.addTo(map);
  }

  lastFilteredH = filteredH;
  lastFilteredP = filteredP;

  const hCount = filteredH.length;
  const pCount = filteredP.length;
  document.getElementById("stat-holocene").textContent    = hCount.toLocaleString();
  document.getElementById("stat-pleistocene").textContent = pCount.toLocaleString();
  document.getElementById("stat-visible").textContent     = (hCount + pCount).toLocaleString();

  updateCharts(filteredH, filteredP);
  updateURL();
}

// ================================================================
// URL STATE — serialize / deserialize all filter + map state
// ================================================================
let pendingTypeState = null; // applied after dynamic type checkboxes are built
let urlUpdateTimer   = null;

const ALL_CONTINENTS = ["Africa","Asia","Europe","North America","South America","Oceania","Antarctica"];

function serializeState() {
  const p = new URLSearchParams();

  const name = document.getElementById("name-filter").value.trim();
  if (name) p.set("q", name);

  const country = document.getElementById("country-filter").value.trim();
  if (country) p.set("country", country);

  if (!document.getElementById("filter-holocene").checked)    p.set("h", "0");
  if (!document.getElementById("filter-pleistocene").checked) p.set("p", "0");

  const enabledC = [...document.querySelectorAll(".continent-filter:checked")].map(e => e.value);
  if (enabledC.length !== ALL_CONTINENTS.length) p.set("c", enabledC.join(","));

  const es = getEruptionFilterState();
  if (es.minYear !== 0)            p.set("emin", es.minYear);
  if (es.maxYear !== CURRENT_YEAR) p.set("emax", es.maxYear);
  if (!es.includePreCE)            p.set("pre", "0");
  if (!es.includeUnknown)          p.set("unk", "0");

  // Encode only the deselected types (usually all are selected — keeps URL short)
  const allTypeCBs   = [...document.querySelectorAll(".volcano-type-filter")];
  const excludedTypes = allTypeCBs.filter(cb => !cb.checked).map(cb => cb.value);
  if (excludedTypes.length > 0) {
    // "none" is a sentinel meaning every type was deselected
    p.set("xt", excludedTypes.length === allTypeCBs.length ? "none" : excludedTypes.join("|"));
  }

  // Map position
  const c = map.getCenter();
  p.set("lat", c.lat.toFixed(3));
  p.set("lng", c.lng.toFixed(3));
  p.set("z",   map.getZoom());

  return p.toString();
}

function updateURL() {
  const str = serializeState();
  history.replaceState(null, "", str ? `#${str}` : location.pathname + location.search);
}

// Debounced version used for map move/zoom events
function scheduleURLUpdate() {
  clearTimeout(urlUpdateTimer);
  urlUpdateTimer = setTimeout(updateURL, 400);
}

function deserializeState() {
  const hash = location.hash.slice(1);
  if (!hash) return;

  const p = new URLSearchParams(hash);

  const name = p.get("q");
  if (name) document.getElementById("name-filter").value = name;

  const country = p.get("country");
  if (country) document.getElementById("country-filter").value = country;

  if (p.get("h") === "0") document.getElementById("filter-holocene").checked    = false;
  if (p.get("p") === "0") document.getElementById("filter-pleistocene").checked = false;

  const cParam = p.get("c");
  if (cParam !== null) {
    const enabled = new Set(cParam ? cParam.split(",") : []);
    document.querySelectorAll(".continent-filter").forEach(cb => {
      cb.checked = enabled.has(cb.value);
    });
  }

  const emin = p.get("emin");
  const emax = p.get("emax");
  if ((emin || emax)) {
    const sliderEl = document.getElementById("eruption-slider");
    if (sliderEl.noUiSlider) {
      sliderEl.noUiSlider.set([
        emin ? Number(emin) : 0,
        emax ? Number(emax) : CURRENT_YEAR,
      ]);
    }
  }
  if (p.get("pre") === "0") document.getElementById("eruption-include-pre").checked     = false;
  if (p.get("unk") === "0") document.getElementById("eruption-include-unknown").checked = false;

  // Map view — apply immediately
  const lat = p.get("lat"), lng = p.get("lng"), z = p.get("z");
  if (lat && lng && z) map.setView([Number(lat), Number(lng)], Number(z));

  // Type state deferred — type checkboxes don't exist yet
  const xt = p.get("xt");
  if (xt) pendingTypeState = xt;
}

function applyPendingTypeState() {
  if (!pendingTypeState) return;
  const xt = pendingTypeState;
  pendingTypeState = null;

  if (xt === "none") {
    document.querySelectorAll(".volcano-type-filter").forEach(cb => (cb.checked = false));
  } else {
    const excluded = new Set(xt.split("|"));
    document.querySelectorAll(".volcano-type-filter").forEach(cb => {
      cb.checked = !excluded.has(cb.value);
    });
  }
}

function setupCopyLink() {
  const btn  = document.getElementById("copy-link-btn");
  const icon = document.getElementById("copy-link-icon");

  btn.addEventListener("click", () => {
    updateURL(); // ensure latest state
    navigator.clipboard.writeText(location.href).then(() => {
      icon.textContent = "✓";
      btn.classList.add("copied");
      setTimeout(() => { icon.textContent = "⎘"; btn.classList.remove("copied"); }, 2000);
    });
  });
}

// ================================================================
// RESET ALL FILTERS
// ================================================================
function resetAllFilters() {
  document.getElementById("name-filter").value = "";
  document.getElementById("country-filter").value = "";
  document.getElementById("country-suggestions").innerHTML = "";
  document.getElementById("filter-holocene").checked = true;
  document.getElementById("filter-pleistocene").checked = true;
  document.querySelectorAll(".continent-filter").forEach(cb => (cb.checked = true));
  document.querySelectorAll(".volcano-type-filter").forEach(cb => (cb.checked = true));
  document.getElementById("eruption-include-pre").checked = true;
  document.getElementById("eruption-include-unknown").checked = true;
  const sliderEl = document.getElementById("eruption-slider");
  if (sliderEl.noUiSlider) sliderEl.noUiSlider.set([0, CURRENT_YEAR]);
  renderLayers();
}

// ================================================================
// ANALYTICS CHARTS
// ================================================================
const chartInstances = {};

function initCharts() {
  Chart.defaults.color         = "#94a3b8";
  Chart.defaults.borderColor   = "#1e293b";
  Chart.defaults.font.family   = "system-ui, -apple-system, sans-serif";
  Chart.defaults.font.size     = 10;

  const barDefaults = (indexAxis = "x") => ({
    indexAxis,
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1e293b", borderColor: "#334155", borderWidth: 1, padding: 8 },
    },
    scales: {
      x: { grid: { color: indexAxis === "y" ? "#1e293b" : "transparent" }, ticks: { maxRotation: 45, font: { size: 9 } } },
      y: { grid: { color: indexAxis === "x" ? "#1e293b" : "transparent" }, ticks: { font: { size: 9 } }, beginAtZero: true },
    },
  });

  chartInstances.decades = new Chart(
    document.getElementById("chart-decades"),
    {
      type: "bar",
      data: {
        labels: [],
        datasets: [{ data: [], backgroundColor: "#f97316", borderRadius: 3, borderSkipped: false }],
      },
      options: {
        ...barDefaults("x"),
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 }, maxRotation: 45 } },
          y: { grid: { color: "#1e293b" }, ticks: { font: { size: 9 }, precision: 0 }, beginAtZero: true },
        },
      },
    }
  );

  chartInstances.types = new Chart(
    document.getElementById("chart-types"),
    {
      type: "bar",
      data: {
        labels: [],
        datasets: [{ data: [], backgroundColor: "#22d3ee", borderRadius: 3, borderSkipped: false }],
      },
      options: {
        ...barDefaults("y"),
        scales: {
          x: { grid: { color: "#1e293b" }, ticks: { font: { size: 9 }, precision: 0 }, beginAtZero: true },
          y: { grid: { display: false }, ticks: { font: { size: 9 } } },
        },
      },
    }
  );

  chartInstances.elevation = new Chart(
    document.getElementById("chart-elevation"),
    {
      type: "bar",
      data: {
        labels: [],
        datasets: [{ data: [], backgroundColor: "#84cc16", borderRadius: 3, borderSkipped: false }],
      },
      options: {
        ...barDefaults("y"),
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e293b", borderColor: "#334155", borderWidth: 1, padding: 8,
            callbacks: { label: item => `${Number(item.raw).toLocaleString()} m` },
          },
        },
        scales: {
          x: {
            grid: { color: "#1e293b" }, beginAtZero: true,
            ticks: { font: { size: 9 }, callback: v => v >= 1000 ? `${v / 1000}k m` : `${v} m` },
          },
          y: { grid: { display: false }, ticks: { font: { size: 9 } } },
        },
      },
    }
  );
}

function updateCharts(filteredH, filteredP) {
  if (!chartInstances.decades) return;
  const all = [...filteredH, ...filteredP];

  // --- Eruptions by decade (1800 → now) ---
  const decadeMap = {};
  all.forEach(f => {
    const y = parseEruptionYear(f.properties.Last_Eruption_Year);
    if (y !== null && y >= 1800) {
      const d = Math.floor(y / 10) * 10;
      decadeMap[d] = (decadeMap[d] || 0) + 1;
    }
  });
  const decadeLabels = [];
  for (let d = 1800; d <= CURRENT_YEAR; d += 10) decadeLabels.push(d);
  chartInstances.decades.data.labels                  = decadeLabels.map(String);
  chartInstances.decades.data.datasets[0].data        = decadeLabels.map(d => decadeMap[d] || 0);
  chartInstances.decades.update("none");

  // --- Top 8 volcano types ---
  const typeMap = {};
  all.forEach(f => {
    const t = f.properties.Primary_Volcano_Type;
    if (t) typeMap[t] = (typeMap[t] || 0) + 1;
  });
  const topTypes = Object.entries(typeMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
  chartInstances.types.data.labels           = topTypes.map(([name]) => name.length > 20 ? name.slice(0, 18) + "…" : name);
  chartInstances.types.data.datasets[0].data = topTypes.map(([, n]) => n);
  chartInstances.types.update("none");

  // --- Top 8 by elevation ---
  const topElev = all
    .filter(f => f.properties.Elevation != null && Number(f.properties.Elevation) > 0)
    .sort((a, b) => Number(b.properties.Elevation) - Number(a.properties.Elevation))
    .slice(0, 8)
    .map(f => ({
      name: (f.properties.Volcano_Name || "Unknown").slice(0, 16),
      elev: Number(f.properties.Elevation),
    }));
  chartInstances.elevation.data.labels           = topElev.map(v => v.name);
  chartInstances.elevation.data.datasets[0].data = topElev.map(v => v.elev);
  chartInstances.elevation.update("none");
}

function setupChartToggle() {
  const btn   = document.getElementById("chart-toggle");
  const panel = document.getElementById("chart-panel");
  const arrow = document.getElementById("chart-arrow");
  let open = false;

  btn.addEventListener("click", () => {
    open = !open;
    panel.classList.toggle("open", open);
    arrow.textContent = open ? "▼" : "▲";
    // After transition: resize map + charts so they paint correctly
    setTimeout(() => {
      map.invalidateSize();
      if (open) Object.values(chartInstances).forEach(c => c.resize());
    }, 320);
  });
}

// ================================================================
// MAP LEGEND CONTROL (floating, collapsible)
// ================================================================
function addLegendControl() {
  const legend = L.control({ position: "bottomleft" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = `
      <button class="legend-toggle" type="button">
        <span class="legend-toggle-icon">▾</span> Legend
      </button>
      <div class="legend-body">
        <p class="legend-cat">Eruption Recency</p>
        <ul class="legend-list">
          <li><span class="ldot" style="background:#dc2626"></span>Active / last 10 yrs</li>
          <li><span class="ldot" style="background:#ef4444"></span>10 – 50 years ago</li>
          <li><span class="ldot" style="background:#f97316"></span>50 – 200 years ago</li>
          <li><span class="ldot" style="background:#eab308"></span>200 – 500 years ago</li>
          <li><span class="ldot" style="background:#84cc16"></span>500 – 2,000 years ago</li>
          <li><span class="ldot" style="background:#22d3ee"></span>2,000 – 10,000 years ago</li>
          <li><span class="ldot" style="background:#6b7280"></span>Unknown / ancient</li>
        </ul>
        <p class="legend-cat">Marker Size = Elevation</p>
        <div class="legend-sizes">
          <span class="lsize lsize-sm"></span><span class="lsize-label">&lt;500 m</span>
          <span class="lsize lsize-md"></span><span class="lsize-label">500–1,500 m</span>
          <span class="lsize lsize-lg"></span><span class="lsize-label">&gt;1,500 m</span>
        </div>
        <p class="legend-credit">
          Data: <a href="https://volcano.si.edu" target="_blank" rel="noopener">Smithsonian GVP</a>
        </p>
      </div>`;

    const btn  = div.querySelector(".legend-toggle");
    const body = div.querySelector(".legend-body");
    const icon = div.querySelector(".legend-toggle-icon");

    // Start collapsed on mobile
    let open = window.innerWidth > 768;
    body.classList.toggle("legend-body-hidden", !open);
    icon.textContent = open ? "▾" : "▸";

    btn.addEventListener("click", () => {
      open = !open;
      body.classList.toggle("legend-body-hidden", !open);
      icon.textContent = open ? "▾" : "▸";
    });

    // Prevent map interactions from firing through the legend
    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.disableScrollPropagation(div);
    return div;
  };

  legend.addTo(map);
}

// ================================================================
// COLLAPSIBLE SECTIONS
// ================================================================
function setupCollapsibles() {
  document.querySelectorAll(".collapsible-header").forEach(header => {
    header.addEventListener("click", () => {
      header.closest(".collapsible-section").classList.toggle("collapsed");
    });
  });
}

// ================================================================
// ERUPTION YEAR SLIDER (noUiSlider)
// ================================================================
function initEruptionSlider() {
  const sliderEl  = document.getElementById("eruption-slider");
  const minLabel  = document.getElementById("eruption-min-label");
  const maxLabel  = document.getElementById("eruption-max-label");

  noUiSlider.create(sliderEl, {
    start:   [0, CURRENT_YEAR],
    connect: true,
    range:   { min: 0, max: CURRENT_YEAR },
    step:    5,
    tooltips: [
      { to: v => String(Math.round(v)) },
      { to: v => String(Math.round(v)) },
    ],
  });

  // Update labels in real-time while dragging
  sliderEl.noUiSlider.on("update", () => {
    const [lo, hi] = sliderEl.noUiSlider.get().map(v => Math.round(Number(v)));
    minLabel.textContent = lo === 0 ? "0 CE" : String(lo);
    maxLabel.textContent = String(hi);
  });

  // Re-render only when user releases handle (avoids rebuilding 2,657 markers on every pixel)
  sliderEl.noUiSlider.on("change", renderLayers);
}

// ================================================================
// EVENT LISTENERS
// ================================================================
function setupEventListeners() {
  document.getElementById("reset-filters").addEventListener("click", resetAllFilters);

  document.getElementById("filter-holocene").addEventListener("change", renderLayers);
  document.getElementById("filter-pleistocene").addEventListener("change", renderLayers);

  document.getElementById("name-filter").addEventListener("input", renderLayers);

  const countryInput = document.getElementById("country-filter");
  countryInput.addEventListener("input", e => {
    updateCountrySuggestions(e.target.value);
    renderLayers();
  });
  countryInput.addEventListener("blur", () => {
    setTimeout(() => { document.getElementById("country-suggestions").innerHTML = ""; }, 150);
  });

  document.getElementById("country-clear").addEventListener("click", () => {
    countryInput.value = "";
    document.getElementById("country-suggestions").innerHTML = "";
    renderLayers();
  });

  document.querySelectorAll(".continent-filter").forEach(el =>
    el.addEventListener("change", renderLayers)
  );
  document.getElementById("continent-select-all").addEventListener("click", () => {
    document.querySelectorAll(".continent-filter").forEach(cb => (cb.checked = true));
    renderLayers();
  });
  document.getElementById("continent-clear-all").addEventListener("click", () => {
    document.querySelectorAll(".continent-filter").forEach(cb => (cb.checked = false));
    renderLayers();
  });

  document.getElementById("eruption-include-pre").addEventListener("change", renderLayers);
  document.getElementById("eruption-include-unknown").addEventListener("change", renderLayers);

  document.getElementById("type-select-all").addEventListener("click", () => {
    document.querySelectorAll(".volcano-type-filter").forEach(cb => (cb.checked = true));
    renderLayers();
  });
  document.getElementById("type-clear-all").addEventListener("click", () => {
    document.querySelectorAll(".volcano-type-filter").forEach(cb => (cb.checked = false));
    renderLayers();
  });

  // Update URL when user pans or zooms the map (debounced)
  map.on("moveend zoomend", scheduleURLUpdate);
}

// ================================================================
// DESKTOP SIDEBAR COLLAPSE
// ================================================================
function setupSidebarCollapse() {
  const btn = document.getElementById("sidebar-collapse-btn");
  const app = document.getElementById("app");

  btn.addEventListener("click", () => {
    const isCollapsed = app.classList.toggle("sidebar-collapsed");
    btn.innerHTML = isCollapsed ? "›" : "‹";
    btn.title     = isCollapsed ? "Expand sidebar" : "Collapse sidebar";
    // Wait for CSS transition to finish before telling Leaflet to resize
    setTimeout(() => map.invalidateSize(), 280);
  });
}

// ================================================================
// RESET MAP VIEW CONTROL
// ================================================================
const DEFAULT_CENTER = [20, 0];
const DEFAULT_ZOOM   = 2;

function addResetViewControl() {
  const ctrl = L.control({ position: "topleft" });
  ctrl.onAdd = function () {
    const btn = L.DomUtil.create("button", "leaflet-bar leaflet-control reset-view-btn");
    btn.type        = "button";
    btn.title       = "Reset map view";
    btn.innerHTML   = "⌂";
    btn.addEventListener("click", () => {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    });
    L.DomEvent.disableClickPropagation(btn);
    return btn;
  };
  ctrl.addTo(map);
}

// ================================================================
// MOBILE BOTTOM SHEET (replaces floating popup on mobile)
// ================================================================
// Exposed so renderLayers can call openBottomSheet directly on mobile
let openBottomSheet = null;

function setupBottomSheet() {
  const sheet    = document.getElementById("bottom-sheet");
  const content  = document.getElementById("bottom-sheet-content");
  const titleEl  = document.getElementById("bottom-sheet-title");
  const closeBtn = document.getElementById("bottom-sheet-close");
  const dragZone = document.getElementById("bottom-sheet-drag-zone");

  function openSheet(html) {
    content.innerHTML = html;
    const nameEl = content.querySelector(".popup-name");
    titleEl.textContent = nameEl ? nameEl.textContent : "";
    const popupHeader = content.querySelector(".popup-header");
    if (popupHeader) popupHeader.style.display = "none";
    sheet.classList.add("open");
  }

  function closeSheet() {
    sheet.classList.remove("open");
    content.innerHTML = "";
    titleEl.textContent = "";
  }

  // Expose so renderLayers can use it
  openBottomSheet = openSheet;

  // Tap handle or close button to dismiss — no drag needed
  dragZone.addEventListener("click", closeSheet);
  closeBtn.addEventListener("click", closeSheet);

  // Close when user pans the map
  map.on("dragstart", () => {
    if (window.innerWidth <= 768) closeSheet();
  });
}

// ================================================================
// ABOUT MODAL
// ================================================================
function setupAboutModal() {
  const modal = document.getElementById("about-modal");
  const openBtn  = document.getElementById("about-btn");
  const closeBtn = document.getElementById("about-close");

  function open()  { modal.classList.add("visible"); document.body.style.overflow = "hidden"; }
  function close() { modal.classList.remove("visible"); document.body.style.overflow = ""; }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  // Click backdrop (outside panel) to close
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  // Esc key
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

// ================================================================
// MOBILE DRAWER
// ================================================================
function setupMobileDrawer() {
  const hamburger = document.getElementById("hamburger");
  const sidebar   = document.getElementById("sidebar");
  const backdrop  = document.getElementById("sidebar-backdrop");

  function openDrawer() {
    sidebar.classList.add("drawer-open");
    backdrop.classList.add("visible");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-label", "Close filters");
    document.body.style.overflow = "hidden"; // prevent body scroll while drawer open
  }

  function closeDrawer() {
    sidebar.classList.remove("drawer-open");
    backdrop.classList.remove("visible");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-label", "Open filters");
    document.body.style.overflow = "";
    setTimeout(() => map.invalidateSize(), 300);
  }

  hamburger.addEventListener("click", () => {
    sidebar.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
  });

  // Tap backdrop to close
  backdrop.addEventListener("click", closeDrawer);
}

// ================================================================
// CSV EXPORT
// ================================================================
const CSV_COLUMNS = [
  { header: "Volcano Name",        key: "Volcano_Name" },
  { header: "Period",              key: "_period" },
  { header: "Country",             key: "Country" },
  { header: "Region",              key: "Region" },
  { header: "Subregion",           key: "Subregion" },
  { header: "Volcano Type",        key: "Primary_Volcano_Type" },
  { header: "Elevation (m)",       key: "Elevation" },
  { header: "Last Eruption Year",  key: "Last_Eruption_Year" },
  { header: "Tectonic Setting",    key: "Tectonic_Setting" },
  { header: "Major Rock Type",     key: "Major_Rock_Type" },
  { header: "Geologic Epoch",      key: "Geologic_Epoch" },
  { header: "Evidence Category",   key: "Evidence_Category" },
  { header: "Latitude",            key: "_lat" },
  { header: "Longitude",           key: "_lon" },
  { header: "GVP URL",             key: "_url" },
];

function featureToRow(feature, period) {
  const p   = feature.properties;
  const [lon, lat] = feature.geometry.coordinates;
  const url = p.Volcano_Number
    ? `https://volcano.si.edu/volcano.cfm?vn=${p.Volcano_Number}` : "";

  return CSV_COLUMNS.map(col => {
    let val;
    switch (col.key) {
      case "_period": val = period === "holocene" ? "Holocene" : "Pleistocene"; break;
      case "_lat":    val = lat;   break;
      case "_lon":    val = lon;   break;
      case "_url":    val = url;   break;
      default:        val = p[col.key] ?? "";
    }
    // RFC 4180: wrap in quotes if value contains comma, quote, or newline
    const str = String(val);
    return str.includes(",") || str.includes('"') || str.includes("\n")
      ? `"${str.replace(/"/g, '""')}"` : str;
  });
}

function exportCSV() {
  const all = [
    ...lastFilteredH.map(f => featureToRow(f, "holocene")),
    ...lastFilteredP.map(f => featureToRow(f, "pleistocene")),
  ];

  if (all.length === 0) {
    alert("No volcanoes match the current filters — nothing to export.");
    return;
  }

  const header = CSV_COLUMNS.map(c => c.header).join(",");
  const csv    = [header, ...all.map(row => row.join(","))].join("\r\n");
  const blob   = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url    = URL.createObjectURL(blob);

  const a      = document.createElement("a");
  a.href       = url;
  a.download   = `volcanoes_${all.length}_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function setupExportButton() {
  document.getElementById("export-csv-btn").addEventListener("click", exportCSV);
}

// ================================================================
// INIT
// ================================================================
setupCollapsibles();
initEruptionSlider();
deserializeState();
setupEventListeners();
setupCopyLink();
setupExportButton();
setupAboutModal();
setupBottomSheet();
setupSidebarCollapse();
setupMobileDrawer();
addLegendControl();
addResetViewControl();
initCharts();
setupChartToggle();
fetchVolcanoes();
