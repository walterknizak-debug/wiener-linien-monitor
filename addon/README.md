# Wiener Linien Monitor - Home Assistant Add-on

![Logo](logo.png)

Zeigt Echtzeitdaten der Wiener Linien direkt in Home Assistant an.

## Installation

1. Fügen Sie dieses Repository zu Ihren Add-on Repositories hinzu:
   - Gehen Sie zu **Supervisor** → **Add-on Store** → **⋮** (oben rechts) → **Repositories**
   - Fügen Sie hinzu: `https://github.com/yourusername/wiener-linien-monitor`

2. Installieren Sie das Add-on "Wiener Linien Monitor"

3. Konfigurieren Sie das Add-on (siehe unten)

4. Starten Sie das Add-on

5. Öffnen Sie die Web-UI oder fügen Sie eine iFrame-Karte zu Ihrem Dashboard hinzu

## Konfiguration

```yaml
stations:
  blindengasse:
    - 272
    - 377
  josefstaedter_strasse:
    - 249
    - 273
    - 365
    - 458
    - 4607
    - 4622
    - 5661
    - 5667
lines:
  - "2"
  - "5"
  - "12"
  - "U6"
refresh_interval: 30
theme: "homeassistant"
```

### Optionen

- **stations**: Liste der Stationen mit ihren RBL-Nummern
- **lines**: Liste der anzuzeigenden Linien
- **refresh_interval**: Aktualisierungsintervall in Sekunden (10-300)
- **theme**: Design-Theme (`default` oder `homeassistant`)

## RBL-Nummern finden

RBL-Nummern (Rechnergestütztes Betriebsleitsystem) finden Sie hier:
https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltepunkte.csv

## Dashboard Integration

### iFrame Card

```yaml
type: iframe
url: http://homeassistant.local:8000
aspect_ratio: 56%
```

### Panel iFrame

In `configuration.yaml`:

```yaml
panel_iframe:
  wiener_linien:
    title: "Wiener Linien"
    icon: mdi:tram
    url: "http://homeassistant.local:8000"
```

## Support

Bei Problemen oder Fragen erstellen Sie bitte ein Issue auf GitHub.

## Lizenz

MIT License