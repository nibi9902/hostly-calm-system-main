import { useEffect } from 'react';
import { DemoPlayer } from '@/components/demo-app/DemoPlayer';
import '@/styles/app-tokens.css';

export default function Demo() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Demo — Hostly';
    return () => {
      document.title = prev;
    };
  }, []);

  return <DemoPlayer />;
}
