import styles from './HomePage.module.css';
import { lazy, Suspense } from 'react';
import { useBreakpoint } from '../../Hooks/useBreakpoint';

const MobileHome = lazy(() => import('../../Components/Mobile/MobileHomeLayout'));
const DesktopHome = lazy(() => import('../../Components/Desktop/DesktopHomeLayout'));

export default function HomePage() {
    const isMobile = useBreakpoint();

    return (
        <div className={styles.homePage}>
            <Suspense fallback={<div>Loading...</div>}>
                {isMobile ? <MobileHome /> : <DesktopHome />}
            </Suspense>
        </div>
    );
}