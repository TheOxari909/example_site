import { AppType } from '../types';
import Link from 'next/link';

const App = ({ app }: { app: AppType }) => {
    return (
        <Link className="h-full w-full" href={app.address}>
            <li className="bg-slate-300 m-2 p-2 hover:bg-slate-400">
                {app.name}
            </li>
        </Link>
    );
};

const Apps = ({ apps }: { apps: AppType[] }) => {
    return (
        <ul className="flex flex-col m-2 text-center w-1/4">
            {apps.map((e: AppType) => {
                return <App app={e} key={e.name} />;
            })}
        </ul>
    );
};

export default Apps;