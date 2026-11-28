/** Faixa na base do Spawn: um corte da via do Supremo Motorista (gramado do Eixo, meio-fio e asfalto com faixas). */
export function GroundStratum() {
  return (
    <div aria-hidden className="relative z-10 w-full">
      <div className="h-4 w-full road-grass" />
      <div className="h-1.5 w-full road-curb" />
      <div className="h-6 w-full border-b-4 border-surface-container-lowest road-asphalt" />
    </div>
  );
}
