# Tomatenklatsch

Mathe-Reaktionsspiel fürs iPad (Grundschule): bunte Heirloom-Tomaten schweben durchs All, wer die richtige zuerst antippt, pflückt sie. Allein (60 Sekunden) oder mit 2–4 Kindern (20 Runden, iPad flach auf dem Tisch, jedes Kind hat sein eigenes Feld).

## Themen
- **Einmaleins** – Tomaten-Spiel und Planeten-Reise (9 Planeten, 2er–10er-Reihe).
- **Zahlen bis 1000** (Klasse 3) – Tomaten-Spiel mit 15 Aufgabenarten (Vergleichen, < > =, Vorgänger/Nachfolger, Nachbarzehner/-hunderter, Zahlenfolgen, Stellentafel, Zahlenstrahl, Hunderterfeld), dazu
  - Zahlenstrahl-Landung, Ziffern-Duell, Hunderterfeld-Schatzsuche (allein oder zu zweit),
  - Zahlen-Galaxie (7 Themen-Planeten).

Profile mit Tomatenfiguren, Statistik pro Kind und Thema; der Astronauten-Anzug wächst mit den eroberten Planeten beider Reisen.

## Dateien
- `index.html` – das komplette Spiel (HTML, CSS, JS in einer Datei, keine externen Abhängigkeiten)
- `sw.js` – Service Worker für den Offline-Start
- `manifest.webmanifest`, `icons/` – App-Icon und Home-Bildschirm-Daten

## Aufs iPad
Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“. Nach dem ersten Laden läuft das Spiel auch offline. Spielstände liegen nur auf dem Gerät (localStorage).

## Updates
1. Dateien ändern.
2. In `sw.js` die Zeile `const VERSION = 'tk-…';` hochzählen.
3. Committen und pushen. Die iPads zeigen die neue Fassung beim nächsten Start mit Internet (ohne Internet läuft die zuletzt geladene Fassung).

## Tests
`index.html?test` prüft die Aufgaben-Logik: alle 100 Einmaleins-Aufgaben und alle 15 Aufgabenarten „Zahlen bis 1000“ (genau eine richtige Tomate, keine Duplikate, gültige Werte).
`index.html?icon` zeigt nur das App-Icon (zum Neuerzeugen der PNGs in `icons/`).
