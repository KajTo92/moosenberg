import { test } from 'node:test';
import assert from 'node:assert/strict';
import { beatOpacity, videoTime } from '../src/features/cinematic-experience/utils/progress.ts';
import { apartments, elevatorLevels } from '../src/data/property.ts';
import { cinematicConfig, storyBeats } from '../src/features/cinematic-experience/config/story.ts';
import { elevatorHotspots } from '../src/features/elevator/config/hotspots.ts';
test('video mapping handles loading and preserves endpoint hold', () => {
  assert.equal(videoTime(0.5, NaN, 0.82), 0);
  assert.equal(videoTime(0, 20, 0.82), 0);
  assert.equal(videoTime(0.82, 20, 0.82), 19.955);
  assert.equal(videoTime(1, 20, 0.82), 19.955);
  assert.ok(videoTime(0.3, 20, 0.82) < videoTime(0.6, 20, 0.82));
  assert.equal(videoTime(-1, 20, 0.82), 0);
});
test('beats start legibly and fade completely outside their interval', () => {
  assert.equal(beatOpacity(0, 0, 0.13), 1);
  assert.equal(beatOpacity(0.2, 0.15, 0.3), 1);
  assert.equal(beatOpacity(0.1, 0.15, 0.3), 0);
  assert.equal(beatOpacity(0.31, 0.15, 0.3), 0);
  assert.ok(beatOpacity(0.16, 0.15, 0.3) > 0 && beatOpacity(0.16, 0.15, 0.3) < 1);
  for (const beat of storyBeats)
    assert.ok(beat.start >= 0 && beat.end <= 1 && beat.start < beat.end);
  assert.ok(cinematicConfig.elevatorInteractive > cinematicConfig.filmEnd);
});
test('all fifteen units have stable unique IDs and consistent floor membership', () => {
  assert.deepEqual(elevatorLevels, ['04', '03', '02', '01', 'UG']);
  assert.equal(new Set(apartments.map((a) => a.id)).size, 15);
  for (const floor of ['01', '02', '03', '04']) {
    assert.equal(apartments.filter((a) => a.floor === floor).length, floor === '04' ? 3 : 4);
  }
  for (const unit of apartments) {
    assert.ok(unit.monthlyRent > 0 && unit.interiorArea > 0 && unit.terraceArea > 0);
    assert.equal(Number(unit.id.split('.')[0]), Number(unit.floor));
  }
});

test('elevator overlays map once to every physical button', () => {
  assert.deepEqual(
    elevatorHotspots.map((hotspot) => hotspot.level),
    elevatorLevels,
  );
  assert.equal(new Set(elevatorHotspots.map((hotspot) => hotspot.image)).size, 5);
  for (const hotspot of elevatorHotspots) {
    assert.ok(hotspot.x > 0 && hotspot.x < 100);
    assert.ok(hotspot.y > 0 && hotspot.y < 100);
  }
});
