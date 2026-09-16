'use client';
import { useEffect, useRef, useState } from 'react';
export function InterestDialog({ unit, onClose }: { unit: string | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="interest-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="interest-title"
    >
      <div className="dialog-content">
        <button className="dialog-close" onClick={onClose} aria-label="Close interest form">
          Close ×
        </button>
        <p className="eyebrow">{unit ? `AUREL ${unit}` : 'AUREL / APRIL 2027'}</p>
        <h2 id="interest-title">
          YOUR NEXT
          <br />
          PERSPECTIVE.
        </h2>
        {complete ? (
          <div role="status">
            <p>Your preview is complete. No information was sent or saved.</p>
            <button className="solid-link" onClick={onClose}>
              Return to Aurel <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.reset();
              setComplete(true);
            }}
          >
            <p>
              This portfolio concept is not accepting enquiries. You can preview the interest form
              below.
            </p>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <button className="solid-link" type="submit">
              Preview registration <span aria-hidden="true">↗</span>
            </button>
            <small>Demo only. Nothing is sent or stored.</small>
          </form>
        )}
      </div>
    </dialog>
  );
}
