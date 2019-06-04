import 'mocha';
import { expect } from 'chai';
import { addSegment, createTypedRoute } from '../src';

const base = createTypedRoute();

describe('addSegment', () => {
    it('adds a segment', () => {
        const value = 'my-test-path';

        const route = addSegment(value)(base);

        expect(route.template).to.equal('/' + value);
        expect(route.parameters).to.equal(undefined);
        expect(route.filled).to.equal('/' + value);
    });
    it('adds multiple segments', () => {
        const values = ['manage', 'policies', 'built-in'];

        const route = addSegment(values[2])(addSegment(values[1])(addSegment(values[0])(base)));

        expect(route.template).to.equal('/' + values.join('/'));
        expect(route.parameters).to.equal(undefined);
        expect(route.filled).to.equal('/' + values.join('/'));
    });
});
