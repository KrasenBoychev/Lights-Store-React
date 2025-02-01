import {
  APIProvider,
  Map,
} from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '../../../api-keys/api-keys';
import './ourStore.css';

export default function OurStore() {
  return (
    <div className="our_store_section">
      <APIProvider
        apiKey={GOOGLE_MAPS_API_KEY}
      >
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: 43.204666, lng: 27.910543 }}
        ></Map>
      </APIProvider>
    </div>
  );
}
