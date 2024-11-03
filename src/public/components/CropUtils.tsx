export function filterCrops(crops, state) {
    return crops.filter(crop => crop.state === state);
}
