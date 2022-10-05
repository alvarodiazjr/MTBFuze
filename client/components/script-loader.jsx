import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import App from '../app';
import LoadingSpinner from '../pages/loading-spinner';

const libraries = ['places'];

export default function Script() {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  });

  if (!isLoaded) {
    return <LoadingSpinner />;
  } else {
    return <App />;
  }
}
