import React from 'react';
import CreateLogForm from './create-log-form';
import { useLoadScript } from '@react-google-maps/api';

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
    return <CreateLogForm />;
  }
}
