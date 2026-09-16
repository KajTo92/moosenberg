import { storyBeats } from '../config/story';
export function StoryOverlay() {
  return (
    <div className="story-overlay">
      {storyBeats.map((beat, index) => (
        <div
          key={beat.id}
          data-story-beat
          className={`story-beat story-${beat.align ?? 'left'} story-${beat.id}`}
          style={{ opacity: index === 0 ? 1 : 0 }}
          aria-hidden={index !== 0}
        >
          {beat.eyebrow && <p className="eyebrow">{beat.eyebrow}</p>}
          {beat.title && (index === 0 ? <h1>{beat.title}</h1> : <h2>{beat.title}</h2>)}
          {beat.body && <p className="story-body">{beat.body}</p>}
        </div>
      ))}
    </div>
  );
}
