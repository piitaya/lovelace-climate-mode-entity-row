# climate-mode-entity-row

![Simple example](images/overview.png)

Show multiple climate preset and hvac mode on entity rows in Home Assistant's Lovelace UI

## Setup

Manually add [climate-mode-entity-row.js](https://raw.githubusercontent.com/piitaya/lovelace-climate-mode-entity-row/master/climate-mode-entity-row.js)
to your `<config>/www/` folder and add the following to your `ui-lovelace.yaml` file:

```yaml
resources:
  - url: /local/climate-mode-entity-row.js
    type: module
```

OR install using [HACS](https://hacs.xyz/) and add this instead:

```yaml
resources:
  - url: /community_plugin/lovelace-climate-mode-entity-row/climate-mode-entity-row.js
    type: module
```

## Options

| Name   | Type   | Required | Description                      |
| :----- | :----- | :------- | :------------------------------- |
| type   | string | Yes      | `custom:climate-mode-entity-row` |
| entity | string | Yes      | `domain.my_entity_id`            |
| name   | string | No       | Override entity `friendly_name`  |
| icon   | string | No       | Override entity `icon`           |
|        |        |          |
| modes  | object | Yes      | Modes (see below)                |

### Mode objects

| Name        | Type   | Required | Description                           |
| :---------- | :----- | :------- | :------------------------------------ |
| icon        | string | No       | A icon for the mode                   |
| hvac_mode   | string | No       | A valid hvac_mode for the entity      |
| preset_mode | string | No       | A valid preset_mode for the entity    |
| fan_mode    | string | No       | A valid fan_mode for the entity       |
| swing_mode  | string | No       | A valid swing_mode for the entity     |
| temperature | number | No       | A target temperature for the entity   |
| color       | string | No       | Custom color for the icon when toggle |

## Example

### Basic config

![Simple example](images/simple_example.png)

```yaml
type: entities
entities:
  - entity: climate.thermostat_kitchen
    type: "custom:climate-mode-entity-row"
    modes:
      - hvac_mode: "off"
      - preset_mode: "eco"
      - preset_mode: "comfort"
```

### Custom config

![Custom example](images/custom_example.png)

```yaml
type: entities
entities:
  - entity: climate.thermostat_kitchen
    type: 'custom:climate-mode-entity-row'
    name: My Thermostat
    icon: 'mdi:home'
    modes:
      - hvac_mode: "off"
        icon: "mdi:snowflake"
        color: "#B3E5FC"
      - preset_mode: "eco"
        icon: "mdi:moon-waxing-crescent"
        color: "#9575CD"
      - preset_mode: "comfort"
        icon: "mdi:weather-sunny"
        color: "#FFC107"
```

### Temperature shortcuts

If your thermostat entity does not support presets, you can directly define target temperature in the card

![Temperature example](images/temperature_example.png)

```yaml
type: entities
entities:
  - entity: climate.heatpump
    type: custom:climate-mode-entity-row
    modes:
      - hvac_mode: "off"
        icon: "mdi:power"
        color: "#ef5350"
      - hvac_mode: "heat"
        temperature: 19
        icon: "mdi:leaf"
        color: "#66bb6a"
      - hvac_mode: "heat"
        temperature: 21
        icon: "mdi:fire"
        color: "#FFC107"
```

### Multi mode config

You can combine or mix hvac_mode, preset_mode, fan_mode, swing_mode and temperature to build your custom controls.

![Multi example](images/multi_example.png)

```yaml
type: entities
entities:
  - entity: climate.thermostat_kitchen
    type: "custom:climate-mode-entity-row"
    name: My Thermostat
    icon: "mdi:home"
    modes:
      - icon: "mdi:brightness-auto"
        hvac_mode: "heat"
        fan_mode: "on_high"
        swing_mode: "auto"
        color: "#34c6eb"
      - hvac_mode: "off"
        icon: "mdi:snowflake"
        color: "#B3E5FC"
      - hvac_mode: "heat"
        icon: "mdi:fire"
        color: "#FFC107"
      - fan_mode: "off"
        swing_mode: "off"
        icon: "mdi:fan-off"
        color: "#FF6659"
      - fan_mode: "on_high"
        swing_mode: "auto"
        icon: "mdi:fan"
        color: "#76D275"
        
```
