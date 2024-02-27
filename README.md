# Spielprojekt

Dieses Repository bildet die Grundlage für ein Spielprojekt, das von Gruppen mit
jeweils vier Mitgliedern bearbeitet wird. Für die Umsetzung des Spiels wird die
Game-Engine [kaboom.js](https://kaboomjs.com/) verwendet.

## Installation

Damit wir [kaboom.js](https://kaboomjs.com/) und alle weiteren benötigten Dinge
verwenden können, müssen wir ein Terminal öffnen, und die beiden Befehle
ausführen.

```bash
npm install
npm run dev
```

Damit wird ein lokaler Webserver erstellt, wo wir unser Spiel direkt testen
können.

## Veröffentlichen

Das Spiel ist direkt über Github-Pages verfügbar. Das müssen Sie in den
Einstellungen des Repositories aktivieren, und zwar müssen Sie dort auf
Github-Actions umstellen, der Rest passiert dann automatisch. Eine neue VErsion
der Webseite wird immer dann erstellt, wenn ein neuer `commit` auf dem `main`
Branch gemacht wird, bzw. wenn ein `merge` in den `main` Branch gemacht wird.

## Arbeitsweise

Wir möchten jeweils in den Lektionen möglichst viel erledigt bekommen, und
dafür müssen wir effizient arbeiten. Wir arbeiten dafür in 4 Phasen.

### Phase 1 (ca. 15 Min)

In der ersten Phase besprechen wir uns als Team was wir heute für Aufgaben
erledigen, wer mit wem an welchen Aufgaben arbeitet, welche Branches wir
erstellen und wann diese gemerged werden. Wir versuchen dabei möglichst klug
mit den Änderungen vor zu gehen, so das nicht zu viele Merge-Konflikte
auftreten werden.

In dieser Phase bearbeiten wir nur Aufgaben die wir in der Datei
[backlog.md](backlog.md) aufgelistet haben.
