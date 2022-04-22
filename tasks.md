# UnicornMedical - Mini Jira

## Sinn der Datei
Hier ist eine kleine Dokumentation für die Aufgabe. 

### Aufgaben

1. Fehlersuche
2. Erstelle eine Suchform
3. Detailansichten
4. Optionale Zusatzaufgabe: Erstellen von Unittests mit Jest für die SearchFacadeService

### 1. Fehlersuche

Zu Beginn der Aufgabe wird ein Fehler zu lösen sein, es gilt diesen ausfindig zu machen und eine Lösung zu implementieren.
Bei der Abgabe bitte kurz erklären, warum dieser Fehler aufgetreten ist.
Es reicht an der entsprechenden Stelle kurz einen Kommentar zu verfassen.

#### Fehlersuche
- `ng serve` klappt. Also muss wohl irgendwo ein Runtimefehler sein.
- Beim oeffnen den Anwendung kommt ein `NullInjectorError`.
- Der erste Fehlerloesungsversuch ist ein ersetzen der abstrakten Klasse durch die konkrete und bereitstellen des Providers. Allerdings wird dabei die abstrakte Klasse ad absudrum gefuehrt.
- Eine schönere Lösung ist, einen eigenen Provider zu schreiben. Mal schauen, ob das schnell geht.


### 2. Erstelle eine Suchform

Erstelle ein Formular mit einem Input für eine Freitextsuche und einem Dropdown für einen Filter.
Auf dem Inputfeld soll eine Validation stattfinden. Falls das Formular invalide ist, soll keine neue Suchanfrage abgeschickt werden.
Bei der Suchform sollten Reactive Forms verwendet werden.

Unter "ui/search-form" wurde hierfür bereits eine Komponente angelegt.

Für die Validation des Suchfelds gelten folgende Regeln:

1. Es sind alle Buchstaben erlaubt (außer Umlaute `ä ü ö`)
2. Es sind alle Zahlen erlaubt
3. Es sind keine Whitespaces erlaubt

Anmerkung: ein leerer String ist erlaubt

Über einen Dropdown soll der User die Ergebnisse auf Basis ihres FHIR Profiles weiter einschränken können.
Folgende Filtermöglichkeiten sollen implementiert werden:

1. Patients + Practitioners (Patient/Ärzte)
2. Patients (Patient)
3. Practitioners (Ärzte)

### 3. Detailansichten

Beim Klick auf einen Eintrag im Table soll sich eine detaillierte Ansicht für die jeweilige Entität öffnen.
Wie genau die Detailansicht implementiert wird, ist dir überlassen.

Folgende Daten sollten mindestens angezeigt werden:

1. Für den Patienten
   1. Resource Typ
   2. Name
   3. ID
   4. Geburtstag
   5. Gender
   6. Adresse
2. Für den Arzt (Practitioner)
   1. Resource Type
   2. Name
   3. ID
   4. Telecom

Unter "src/app/search/services/fhir.util.service.ts" findest du eine Methode, um die FHIR Daten für die Detailansicht
aufzubereiten.

### 4 Optionale Zusatzaufgabe: Erstellen von Unittests mit Jest für die SearchFacadeService

Die bereits angelegt Unittests für den SearchFacadeService sollten noch befüllt werden.
Siehe: src/app/search/services/search-facade.service.spec.ts

### Weiterführende Links

- Warum Fhir? <https://hl7.de/themen/hl7-fhir-mobile-kommunikation-und-mehr/warum-fhir/>
- Dokumentation Patient: <http://www.hl7.org/fhir/patient.html>
- Dokumentation Practitioner: <https://www.hl7.org/fhir/practitioner.html>

## Start der Applikation

Mit dem Befehl `ng serve` startet die Applikation auf folgender URL: `http://localhost:4200/`.
