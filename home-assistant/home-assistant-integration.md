# 🏠 Home Assistant Integration - Wiener Linien Abfahrtsmonitor

Es gibt mehrere Möglichkeiten, den Abfahrtsmonitor in Home Assistant zu integrieren.

---

## 🎯 Option 1: Webpage Card (EINFACHSTE LÖSUNG)

### Voraussetzung
- Der Node.js-Server läuft lokal auf Ihrem Netzwerk

### Schritt 1: Server starten
```bash
node server.js
```
Server läuft dann auf: `http://localhost:8000`

### Schritt 2: Dashboard-Karte hinzufügen

In Ihrer Home Assistant Dashboard-Konfiguration (YAML):

```yaml
type: iframe
url: http://localhost:8000
aspect_ratio: 100%
```

Oder über die UI:
1. Dashboard bearbeiten
2. Karte hinzufügen
3. "Webpage" auswählen
4. URL eingeben: `http://localhost:8000`

### Vorteile
- ✅ Sehr einfach
- ✅ Volle Funktionalität
- ✅ Automatische Updates

---

## 🚀 Option 2: Home Assistant REST Sensor (FORTGESCHRITTEN)

Diese Lösung erstellt native Home Assistant Sensoren für jede Abfahrt.

### Schritt 1: REST Sensor konfigurieren

In `configuration.yaml`:

```yaml
rest:
  - resource: http://localhost:8000/api/departures?stopIds=272,377,249,273,365,458,4607,4622,5661,5667
    scan_interval: 30
    sensor:
      - name: "Wiener Linien Departures"
        value_template: "{{ value_json.message.serverTime }}"
        json_attributes_path: "$.data.monitors[*]"
        json_attributes:
          - lines
          - locationStop
```

### Schritt 2: Template Sensoren erstellen

```yaml
template:
  - sensor:
      - name: "Nächste Linie 5"
        state: >
          {% set data = state_attr('sensor.wiener_linien_departures', 'lines') %}
          {% if data %}
            {% for monitor in data %}
              {% for line in monitor %}
                {% if line.name == '5' %}
                  {{ line.departures.departure[0].departureTime.countdown }}
                {% endif %}
              {% endfor %}
            {% endfor %}
          {% else %}
            unavailable
          {% endif %}
        unit_of_measurement: "min"
        icon: mdi:tram
```

### Schritt 3: Lovelace Card erstellen

```yaml
type: entities
title: 🚊 Wiener Linien
entities:
  - entity: sensor.nachste_linie_5
    name: Linie 5
    icon: mdi:tram
  - entity: sensor.nachste_linie_2
    name: Linie 2
    icon: mdi:tram
  - entity: sensor.nachste_linie_12
    name: Linie 12
    icon: mdi:tram
  - entity: sensor.nachste_u6
    name: U6
    icon: mdi:subway
```

---

## 🎨 Option 3: Custom Card mit Picture Elements (KREATIV)

Erstellen Sie eine visuelle Karte mit Bildern und Overlays.

```yaml
type: picture-elements
image: /local/wiener-linien-background.jpg
elements:
  - type: state-label
    entity: sensor.nachste_linie_5
    prefix: "Linie 5: "
    suffix: " min"
    style:
      top: 20%
      left: 50%
      font-size: 24px
      color: white
      background-color: rgba(168, 98, 164, 0.8)
      padding: 10px
      border-radius: 10px
```

---

## 📱 Option 4: Panel iFrame (VOLLBILD)

Für eine dedizierte Seite im Home Assistant Menü.

In `configuration.yaml`:

```yaml
panel_iframe:
  wiener_linien:
    title: "Wiener Linien"
    icon: mdi:tram
    url: "http://localhost:8000"
```

Nach Neustart erscheint "Wiener Linien" in Ihrer Seitenleiste!

---

## 🔧 Option 5: Home Assistant Add-on (PROFESSIONELL)

Ich erstelle Ihnen ein vollständiges Home Assistant Add-on.

### Dateistruktur:
```
wiener-linien-monitor/
├── config.yaml
├── Dockerfile
├── run.sh
└── rootfs/
    └── app/
        ├── index.html
        ├── style.css
        ├── app.js
        └── server.js
```

### config.yaml:
```yaml
name: Wiener Linien Monitor
version: "1.0.0"
slug: wiener_linien_monitor
description: Abfahrtsmonitor für Wiener Linien
arch:
  - armhf
  - armv7
  - aarch64
  - amd64
  - i386
ports:
  8000/tcp: 8000
webui: http://[HOST]:[PORT:8000]
startup: application
boot: auto
options:
  stations:
    blindengasse: [272, 377]
    josefstaedter_strasse: [249, 273, 365, 458, 4607, 4622, 5661, 5667]
  lines: ["2", "5", "12", "U6"]
  refresh_interval: 30
schema:
  stations: 
    blindengasse: [int]
    josefstaedter_strasse: [int]
  lines: [str]
  refresh_interval: int
```

---

## 🎯 EMPFEHLUNG für Sie

Basierend auf Ihren Anforderungen empfehle ich:

### Für schnelle Integration:
**Option 1: Webpage Card**
- Einfachste Lösung
- 5 Minuten Setup
- Volle Funktionalität

### Für native Integration:
**Option 4: Panel iFrame**
- Eigener Menüpunkt
- Professionelles Aussehen
- Einfach zu konfigurieren

### Für maximale Kontrolle:
**Option 2: REST Sensor**
- Native Home Assistant Sensoren
- Kann in Automationen verwendet werden
- Mehr Konfigurationsaufwand

---

## 📋 Schnellstart-Anleitung

### 1. Server auf Home Assistant Host starten

Wenn Home Assistant auf einem Raspberry Pi läuft:

```bash
# SSH in Home Assistant
ssh root@homeassistant.local

# Dateien hochladen (z.B. via SCP)
# Dann:
cd /config/www/wiener-linien
node server.js &
```

### 2. Dashboard konfigurieren

```yaml
type: iframe
url: http://homeassistant.local:8000
aspect_ratio: 100%
```

### 3. Fertig! 🎉

---

## 🔒 Sicherheitshinweis

Wenn Sie den Monitor von außerhalb Ihres Netzwerks erreichen möchten:
- Verwenden Sie Home Assistant's Ingress-Funktion
- Oder: Nutzen Sie Nabu Casa Cloud
- NICHT: Port 8000 direkt ins Internet öffnen

---

## 💡 Bonus: Automationen

Beispiel-Automation: Benachrichtigung bei Verspätung

```yaml
automation:
  - alias: "Warnung bei Verspätung Linie 5"
    trigger:
      - platform: numeric_state
        entity_id: sensor.nachste_linie_5
        above: 15
    action:
      - service: notify.mobile_app
        data:
          title: "Verspätung!"
          message: "Linie 5 kommt erst in {{ states('sensor.nachste_linie_5') }} Minuten"
```

---

Welche Option interessiert Sie am meisten? Ich kann Ihnen dann die komplette Konfiguration dafür erstellen!