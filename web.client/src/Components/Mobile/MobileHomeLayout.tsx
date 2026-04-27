import styles from './MobileHomeLayout.module.css';

export default function MobileHomeLayout() {
    return (
        <div className={styles.mobileContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Vítejte</h1>
                <p className={styles.subtitle}>Mobilní verze aplikace</p>
            </header>

            <main className={styles.content}>
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <h2>Hlavní obsah</h2>
                        <p>Toto je mobilní layout optimalizovaný pro menší obrazovky.</p>
                    </div>
                </section>

                <section className={styles.featuresSection}>
                    <h3>Funkce</h3>
                    <div className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <h4>📱 Mobilní design</h4>
                            <p>Optimalizováno pro dotykové ovládání</p>
                        </div>
                        <div className={styles.featureItem}>
                            <h4>⚡ Rychlé načítání</h4>
                            <p>Lazy loading komponent</p>
                        </div>
                        <div className={styles.featureItem}>
                            <h4>🎨 Moderní UI</h4>
                            <p>Čistý a přehledný design</p>
                        </div>
                    </div>
                </section>

                <section className={styles.actionSection}>
                    <button className={styles.ctaButton}>
                        Začít
                    </button>
                </section>
            </main>
        </div>
    );
}