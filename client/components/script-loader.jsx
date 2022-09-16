import React from 'react';
import CreateLogForm from './create-log-form';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

export default function Script() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDysHyCDjBRtu-50_S-8fnAedcD8_2V-0Y',
    libraries
  });

  if (!isLoaded) {
    return <div>...loading</div>;
  } else {
    return <CreateLogForm />;
  }
}
