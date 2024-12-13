# CV App

(Se rapport nederst)

A dynamic application for creating, updating, and exporting CVs. Users can customize their CV and export it as a PDF. Administrators can manage both users and CVs.

## Features

- **Create Your CV:** Users can fill out personal information, skills, education, experience, certificates and references.
- **Export CV to PDF:** Select which skills, certificates and experiences to include when exporting to PDF.
- **Admin Features:** Manage users and CVs (read, create, update, delete).
- **Dynamic Updates:** All data is handled using Redux and RTK Query for state management.

## Technology

- **Frontend:**
  - React with TypeScript
  - Redux and RTK Query for state management and API handling
  - React Router for navigation
  - @react-pdf/renderer for PDF export
- **Backend:**
  - CRUD API (https://crudapi.co.uk)
- **Build Tool:**

  - Vite
  - **Testing:**
  - Jest with React Testing Library (configured but not implemented)

  ## Testing

The project is configured with Jest and React Testing Library for testing. While the setup is complete, test cases have not yet been implemented. For now, testing is done manually via DevTools tabs.

When implemented, you can run tests using the following command:

```bash
npm run test
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/camillachr/cv-app.git
   cd cv-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

## Scripts include

- `npm run dev` - Starts the development server.
- `npm run start` - Starts the application for preview.
- `npm test` - Runs the tests (when tests are implemented).

## API

The application communicates with [crudapi.co.uk](https://crudapi.co.uk) to manage user and CV data.

- **Users**
  - Get all users: `GET /users`
  - Create user: `POST /users`
  - Update user: `PUT /users/{id}`
  - Delete user: `DELETE /users/{id}`
- **CVs**
  - Get all CVs: `GET /cvs`
  - Get a specific CV: `GET /cvs/{id}`
  - Create CV: `POST /cvs`
  - Update CV: `PUT /cvs/{id}`
  - Delete CV: `DELETE /cvs/{id}`

---

## Rapport

### Planlegging og diverse

Jeg startet med å lage wireframes av prosjektet for å få et overblikk av hva jeg skulle lage. Tanken var å lage CV-skjemaet i mindre deler for bedre brukervennlighet, derfor laget jeg CV-editor i flere deler som man kan navigere imellom. Dette angret jeg på etter en stund, da det nok sikkert hadde vært enklere å lage et stort skjema, men da var det for sent å snu. Jeg ønsket også å gjenbruke CV-editoren slik at både user og admin tar i bruk samme komponent, men på ulike routes.

Jeg valgte å bruke RTK Query hovedsaklig for å håndtere caching. Dette har jeg aldri brukt før, men tror jeg fikk til det grunnleggende.

LocalStorage er brukt til å lagre autorisasjonen fra forrige session, hovedsaklig slik at jeg fikk teste routes man ikke har tilgang til via frontend, ved å gå direkte til en gitt url.

### Typescript

TypeScript bruke jeg for andre gang på dette prosjektet, og det var veldig nyttig. Jeg er selvfølgelig ikke 100% trygg på det enda, og det mangler sikkert litt her og der, men det var til stor hjelp underveis og jeg kommer til å fortsette å bruke det.

### React PDF

Jeg har sett at enkelte ganger vises PDF-viewer som en tom firkant inne i applikasjonen, men det fungerer som normalt når man starter applikasjonen på nytt. Jeg kan ikke se hvorfor dette skjer.

### Chat-GTP

Jeg har brukt chat-GTP som sparrings-partner og for å utforske ulike tilnærminger. Som regel har jeg en plan for hva jeg ønsker og så stiller jeg spørsmål rundt dette før jeg går for en løsning. Jeg spør også hvis det er noe jeg ikke har brukt tidligere. Et eksempel på dette er RTK Query. Jeg leste RTK Query sin dokumentasjon, og stilte kontrollspørsmål til chat-GTP for å bekrefte at jeg forsto det riktig, eller å utdype det jeg ikke forsto. I tillegg har jeg brukt chat-GTP hvis jeg har en syntax-feil i koden som jeg ikke klarer å finne (når det blir litt mange () og {} etter hverandre etter x antall timer koding).

### .env

Env-filen er inkludert på github, selvom man egentlig ikke skal gjøre dette (det var også slik vi gjorde det på arbeidskravet). Bakgrunnen for dette er at sensor skal slippe å lage nøkkel og legge inn data selv.

### Testing og debugging

Jeg har testet og feilsøkt underveis med DevTools i Google Chrome og brukt Postman noe.
Jeg forsøkte å legge inn tester med Jest i prosjektet. Jeg fikk til å konfigurere selve testmiljøet, med hjelp av chat-GTP og youtube. De veiledningene vi har fått tidligere til å sette det opp fungerte ikke på mitt prosjekt. Virker som det skyldes Vite-versjonen jeg bruker, så det ble en del knot der. Forsøkte å implementere noen tester som inkluderte API-kall, men da ble det feil pga. API-nøklene. Dette har jeg ikke vært borti tidligere, og det ble desverre ikke nok tid til å finne ut av dette for meg og jeg måtte droppe disse testene.

### Forbedringer

Det er enkelte ting jeg skulle ønske jeg gjorde annerledes, og som jeg har tenkt på underveis men ikke hatt nok tid til å endre på:

- Inndeling av komponenter i CV-editor og logikken i de ulike seksjonene av CV-en kunne vært gjort på en bedre måte. Det ble mye gjentakende kode og logikk i alle delene av CV-editoren (PersonalInfo, Education, Certificates, osv. ).

- "Save changes"-knappene i CV-skjemaet ikke var like brukervennlig som først tenkt. Det er ikke så intutivt å måtte klikke først "Add", og så se at noe legges til i listen, og deretter huske å klikke "Save" før man navigerer videre til neste seksjon. En forbedring hadde vært å sette inn API-kall direkte på "Add"-knappen istedenfor (der hvor man legger til ting som skills, education, osv.), og samme med sletting; direkte DELETE request når man fjerner noe fra listen. Det ville blitt flere API-kall, men mer brukervennlig etter min mening.

- Bruken av provides- og validatestags i apiSplice kunne vært brukt på en bedre måte ved å angi type og id, slik at den bare invaliderer det som ble oppdatert, og ikke hele listen. (F.eks. invaliderer en spesifikk CV i en liste ved oppdatering av denne CV-en, istedenfor å invalidere hele listen med CV-er).

- Jeg burde også implementert at bruker kan velge å se/skjule passordet, samt validering på telefonnummer.

- I tillegg ser jeg nå, rett før jeg leverer, at jeg desverre ikke har lagt inn redigeringsmuligheter på skills, education osv., som allerede er lagt til i listen. Det skulle selvfølgelig vært med. Nå må man fjerne elementet og lage det på nytt.

Jaja, god jul!
