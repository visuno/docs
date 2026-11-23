'use client';
import { useEffect, useState } from 'react';
import { Map, type MapLocation } from '@visuno/map/Map';

/**
 * Live example for the Map docs page. Shows several real places on OpenStreetMap
 * with numbered pins, a list beside the map and a popup of details for the picked
 * one. The selection cycles on its own so the popup and the fly-to animation are
 * visible at rest; it stops respecting prefers-reduced-motion. Uses the real
 * Visuno React component, which loads Leaflet + OSM tiles on demand.
 */
const LOCATIONS: MapLocation[] = [
  {
    id: 'berlin',
    title: 'Visuno Berlin',
    kind: 'HQ',
    lat: 52.5096,
    lng: 13.3765,
    address: 'Potsdamer Platz 1, 10785 Berlin',
    description: 'The design studio and the home of the component library.',
    href: 'https://www.openstreetmap.org/?mlat=52.5096&mlon=13.3765#map=16/52.5096/13.3765',
    linkLabel: 'Directions',
  },
  {
    id: 'lisbon',
    title: 'Visuno Lisbon',
    kind: 'Engineering',
    lat: 38.7223,
    lng: -9.1393,
    address: 'Praça do Comércio, 1100-148 Lisboa',
    description: 'Where the three framework ports are built and kept in parity.',
    href: 'https://www.openstreetmap.org/?mlat=38.7223&mlon=-9.1393#map=16/38.7223/-9.1393',
    linkLabel: 'Directions',
  },
  {
    id: 'tokyo',
    title: 'Visuno Tokyo',
    kind: 'Support',
    lat: 35.6809,
    lng: 139.7673,
    address: '1 Chome Marunouchi, Chiyoda City, Tokyo',
    description: 'Follow-the-sun support and the APAC partnerships team.',
    href: 'https://www.openstreetmap.org/?mlat=35.6809&mlon=139.7673#map=16/35.6809/139.7673',
    linkLabel: 'Directions',
  },
];

export function MapExample() {
  const [selected, setSelected] = useState('berlin');

  useEffect(() => {
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const ids = LOCATIONS.map((l) => l.id as string);
    const t = setInterval(() => {
      setSelected((cur) => ids[(ids.indexOf(cur) + 1) % ids.length]);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 640 }}>
      <Map
        locations={LOCATIONS}
        selected={selected}
        onSelect={setSelected}
        label="Map of the Visuno offices"
        height={340}
      />
    </div>
  );
}
