import { getCatalogLights, getMarketplaceLights, getProfileLights } from '../../api/data';

export async function catalogFunc() {
    const allLights = await getCatalogLights('668cfe59f18d95a1f2f52a13');
    return allLights;
}

export async function marketplaceFunc() {
    const allLights = await getMarketplaceLights();
    return allLights;
}

export async function profileFunc() {
    const allLights = await getProfileLights();
    return allLights;
}


