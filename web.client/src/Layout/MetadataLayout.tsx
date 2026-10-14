import { Outlet } from 'react-router';
import PageMetadata from '../metadata/PageMetadata';

export default function MetadataLayout() {
    return <><PageMetadata /><Outlet /></>;
}
