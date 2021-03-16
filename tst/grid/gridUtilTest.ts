import { Location, getLocation, getLocString, 
getAdjacentLocations, getDirectlyAdjacentLocations } from '../../src/grid/gridUtil';
import { expect } from 'chai';


describe('grid:GridUtil', () => {

    it('test location type', () => {
        let location: Location = { x: 1, y: 1 };
        let locstr = getLocString(location);
        let loc = getLocation(locstr)
        expect(loc).to.eql(location);
    });

    it('test adjacent location', () => {
        let location: Location = { x: 1, y: 1 };
        let adjacents = getAdjacentLocations(3, location);
        expect(adjacents.length).to.equal(8);
        adjacents = getAdjacentLocations(2, location);
        expect(adjacents.length).to.equal(3);
        expect(adjacents[0]).to.eql({x: 0, y: 0});
    });

    it('test directly adjacent location', () => {
        let location: Location = { x: 1, y: 1 };
        let adjacents = getDirectlyAdjacentLocations(3, location);
        expect(adjacents.length).to.equal(4);
    });
});
