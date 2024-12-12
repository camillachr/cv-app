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

The project is configured with Jest and React Testing Library for testing. While the setup is complete, test cases have not yet been implemented due to time constraints.

You can run tests using the following command:

````bash
npm run test

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd cv-app
````

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

### API

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

Jeg ønsket å lage CV-skjemaet i mindre deler for bedre brukervennlighet, derfor laget jeg CV-editor i flere deler som man kan navigere imellom. Jeg ønsket også å gjenbruke CV-editoren slik at både user og admin tar i bruk samme komponent, bare på ulike routes.

Jeg valgte å bruke RTK Query hovedsaklig for å håndtere caching.

LocalStorage er brukt til å lagre autorisasjonen, hovedsaklig slik at man kan teste routes man ikke har tilgang til via frontend.

### React PDF

Jeg har sett at enkelte ganger vises PDF-viewer som en tom firkant inne i applikasjonen, men det fungerer som normalt når man starter applikasjonen på nytt. Jeg kan ikke se hvorfor dette skjer.

### Forbedringer

Det er enkelte ting jeg skulle ønske jeg gjorde annerledes, og som jeg har tenkt på underveis men ikke hatt nok tid til å endre på:

- Inndeling av komponenter i CV-editor og logikken i de ulike seksjonene av CV-en kunne vært gjort på en bedre måte. Det ble mye gjentakende kode og logikk i alle delene av CV-editoren (PersonalInfo, Education, Certificates, osv. ).

- "Save changes"-knappene i CV-skjemaet ikke var like brukervennlig som først tenkt. Det er ikke så intutivt å måtte klikke først "Add", og så se at noe legges til i listen, og deretter huske å klikke "Save" før man navigerer videre til neste seksjon. En forbedring hadde vært å sette inn API-kall direkte på "Add"-knappen istedenfor (der hvor man legger til ting som skills, education, osv.), og samme med sletting; direkte DELETE request når man fjerner noe fra listen. Det ville blitt flere API-kall, men mer brukervennlig etter min mening.

- Bruken av provides- og validatestags i apiSplice kunne vært brukt på en bedre måte ved å angi type og id, slik at den bare invaliderer det som ble oppdatert, og ikke hele listen. (F.eks. invaliderer en spesifikk CV i en liste ved oppdatering av denne CV-en, istedenfor å invalidere hele listen med CV-er).

- Jeg burde selvfølgelig også implementert testing, noe jeg ikke rakk da enkelte ting tok lenger tid enn først antatt. Men jeg har satt det opp og konfigurert slik at tester kan legges inn.
