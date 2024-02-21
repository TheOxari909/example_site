import './globals.css';
import Apps from '@/app/components/Apps';
import { AppType } from './types';

const appObjects: AppType[] = [
  {
      name: 'todo',
      address: '/pages/todo',
  },
  {
    name: 'Hello world',
    address: '/hello',
  }
];

export default function Home() {
  return (
    <Apps apps={appObjects} />
  );
}
