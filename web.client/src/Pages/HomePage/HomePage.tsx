import styles from './HomePage.module.css';
import { lazy, Suspense } from 'react';
const HomeLayout = lazy(() => import('../../Components/Desktop/DesktopHomeLayout'));

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            <Suspense fallback={null}>
                <HomeLayout />
            </Suspense>
        </div>
    );
}
