export type Location = {
    x: number;
    y: number;
}

export function getLocString(loc: Location): string {
    return JSON.stringify(loc);
}

export function getLocation(locStr: string): Location {
    return JSON.parse(locStr);
}

export function getAdjacentLocations(size: number, loc: Location): Location[] {
    let x = loc.x;
    let y = loc.y;
    let rangeFilter = (i: number) => i >= 0 && i < size;
    let xRange = [x-1, x, x+1].filter(rangeFilter);
    let yRange = [y-1, y, y+1].filter(rangeFilter);
    let results: Location[] = [];
    xRange.forEach(ix => {
        yRange.forEach(iy => {
            if (!(ix == x && iy == y)) {
                results.push({x: ix, y: iy});
            }
        })
    })
    return results;
}
