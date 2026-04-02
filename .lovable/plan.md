
## Fix: Posicionament de les notificacions en desktop

### Problema detectat

A `PainBlock.tsx`, el contenidor dret de les notificacions (línia 191) té `h-[80px]` i `overflow-visible`. Les targetes fan `absolute inset-x-0 top-0`, cosa que significa que totes s'originen en el punt `top: 0` del contenidor. Com que el contenidor és molt baix (80px) i les notificacions surten per sota amb `overflow-visible`, en desktop el stack apareix desplaçat cap amunt i mal alineat amb el text de l'esquerra.

### Solució

**1. Donar alçada correcta al contenidor** — La targeta de notificació té uns `~72px` d'alçada real (padding `py-3.5` + contingut). El contenidor ha de tenir exactament aquesta alçada per alinear-se bé al centre de la grid.

Canviar `h-[80px]` → `h-[72px]` i afegir `flex items-center` al contenidor de la columna dreta per centrar verticalment dins de la grid.

**2. Centrar el stack dins de la columna** — Afegir `mx-auto` a la `motion.div` de cada targeta perquè el `max-w-[420px]` es centri dins la columna dreta (que pot ser més ample que 420px en pantalls grans).

**3. Alinear verticalment la grid** — Canviar `items-center` per `items-center` ja hi és, però afegir `min-h-0` al contenidor dret per evitar que la grid estiri el fill.

### Canvis concrets a `src/components/PainBlock.tsx`

**Línia 109** — `NotificationCard` motion.div: afegir `mx-auto` per centrar el bloc de 420px dins la columna:
```
className="absolute inset-x-0 top-0 will-change-transform max-w-[420px] mx-auto"
```

**Línia 191** — Contenidor dret: ajustar alçada i afegir centrat:
```tsx
<div className="relative h-[72px] w-full overflow-visible flex items-center">
```
I envoltar les targetes en un `div` `relative w-full` intern perquè el `absolute` de cada targeta tingui el parent correcte:
```tsx
<div className="relative w-full max-w-[420px] mx-auto h-[72px]">
  {notifications.map(...)}
</div>
```

### Resultat esperat

- En desktop (lg): les notificacions apareixeran centrades dins la columna dreta, alineades verticalment amb el text de l'esquerra.
- La targeta activa (visible) quedarà perfectament dins el seu espai sense desplaçaments.
- El `max-w-[420px]` es respectarà i les notificacions no s'eixamplaran en pantalles grans.
- En mòbil: el comportament es manté igual (columna única, notificacions a sota del text).

### Fitxers a modificar

- `src/components/PainBlock.tsx` — 2 canvis petits (motion.div className + contenidor dret)
