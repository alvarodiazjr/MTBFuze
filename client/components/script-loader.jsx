import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Home from '../pages/home';

const libraries = ['places'];

export default function Script() {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  });

  if (!isLoaded) {
    return <div>...loading</div>;
  } else {
    return <Home />;
  }
}
