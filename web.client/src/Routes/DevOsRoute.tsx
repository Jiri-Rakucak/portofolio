import { DevOsProvider } from '../Contexts/DevOsContext';
import UIRender from '../Components/DevOS/UIRender';

export default function DevOsRoute() {
    return (
        <DevOsProvider>
            <UIRender />
        </DevOsProvider>
    );
}
