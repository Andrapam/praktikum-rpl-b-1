'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue in Next.js / webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom emerald marker icon
function createMarkerIcon(isSelected) {
  const size = isSelected ? 36 : 28;
  const bg = isSelected ? '#059669' : '#10b981';
  const border = isSelected ? '#047857' : '#059669';
  const shadow = isSelected ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.25)';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bg};
        border: 3px solid ${border};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 0 ${isSelected ? '16' : '8'}px ${shadow};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      ">
        <svg style="transform: rotate(45deg); width: ${size * 0.45}px; height: ${size * 0.45}px;" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6-3.56 0-7.56-2.54-8.5-6Z"/>
          <circle cx="15" cy="12" r="2"/>
          <path d="M2 12s1.5-2 3.5-2"/>
          <path d="M2 16s1-1.5 2.5-2"/>
          <path d="M2 8s1 1.5 2.5 2"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

// Sub-component that handles flying to selected spot
function FlyToSpot({ selectedSpot, spots }) {
  const map = useMap();

  useEffect(() => {
    if (selectedSpot) {
      const spot = spots.find((s) => s.id === selectedSpot);
      if (spot) {
        map.flyTo([spot.lat, spot.lng], 14, { duration: 1.2 });
      }
    }
  }, [selectedSpot, spots, map]);

  return null;
}

export default function MapView({ spots = [], selectedSpot, onSpotSelect }) {
  return (
    <>
      <style>{`
        .custom-marker { background: none !important; border: none !important; }
        .leaflet-popup-content-wrapper {
          background: #0f1923 !important;
          color: #fff !important;
          border-radius: 12px !important;
          border: 1px solid rgba(30, 58, 95, 0.5) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          font-family: 'Inter', system-ui, sans-serif !important;
        }
        .leaflet-popup-tip {
          background: #0f1923 !important;
          border: 1px solid rgba(30, 58, 95, 0.5) !important;
          border-top: none !important;
          border-left: none !important;
        }
        .leaflet-popup-close-button {
          color: #9ca3af !important;
          font-size: 18px !important;
          top: 6px !important;
          right: 8px !important;
        }
        .leaflet-popup-close-button:hover {
          color: #fff !important;
        }
        .leaflet-control-zoom a {
          background: #0f1923 !important;
          color: #d1d5db !important;
          border-color: rgba(30, 58, 95, 0.5) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #1a2332 !important;
          color: #fff !important;
        }
        .leaflet-control-attribution {
          background: rgba(15, 25, 35, 0.8) !important;
          color: #6b7280 !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: #10b981 !important;
        }
      `}</style>
      <MapContainer
        center={[-7.57, 110.82]}
        zoom={11}
        className="w-full h-full"
        zoomControl={true}
        style={{ background: '#0f1923' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FlyToSpot selectedSpot={selectedSpot} spots={spots} />
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={createMarkerIcon(selectedSpot === spot.id)}
            eventHandlers={{
              click: () => {
                if (onSpotSelect) onSpotSelect(spot.id);
              },
            }}
          >
            <Popup>
              <div className="p-4 min-w-[200px]">
                <h3 className="font-bold text-sm text-white mb-1">{spot.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`
                    inline-block rounded-md px-2 py-0.5 text-[10px] font-medium
                    ${spot.type === 'Air Tawar' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${spot.type === 'Sungai' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                    ${spot.type === 'Waduk' ? 'bg-indigo-500/20 text-indigo-400' : ''}
                    ${spot.type === 'Air Laut' ? 'bg-teal-500/20 text-teal-400' : ''}
                  `}>
                    {spot.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-3.5 h-3.5 ${star <= Math.round(spot.rating) ? 'text-emerald-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-emerald-400 font-bold text-xs ml-1">{spot.rating}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{spot.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
