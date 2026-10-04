/** Faixa de grama e terra na base do Spawn. */
export function GroundStratum() {
  return (
    <div aria-hidden className="relative z-10 w-full">
      <div className="flex h-4 w-full border-t-2 border-primary-fixed bg-primary-container">
        <div className="size-full grass-stripes" />
      </div>
      <div className="flex h-6 w-full border-b-4 border-surface-container-lowest bg-tertiary-container">
        <div className="size-full opacity-60 dirt-stripes" />
      </div>
    </div>
  );
}
