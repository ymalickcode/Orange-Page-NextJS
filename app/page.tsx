"use client"
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = '/api/open';
  }, []);

  return (
    <div>
      <p>Chargement...</p>
    </div>
  );
}
