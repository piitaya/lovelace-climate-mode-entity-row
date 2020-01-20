# climate-mode-entity-row
Show multiple entity states or attributes on entity rows in Home Assistant's Lovelace UI

## Setup

Manually add [climate-mode-entity-row.js](https://raw.githubusercontent.com/piitaya/lovelace-climate-mode-entity-row/master/climate-mode-entity-row.js)
to your `<config>/www/` folder and add the following to your `ui-lovelace.yaml` file:
```yaml
resources:
  - url: /local/climate-mode-entity-row.js?v=1.0.0
    type: module
```

OR install using [HACS](https://hacs.xyz/) and add this instead:
```yaml
resources:
  - url: /community_plugin/lovelace-climate-mode-entity-row/climate-mode-entity-row.js
    type: module
```

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:climate-mode-entity-row`
| entity | string | **Required** | `domain.my_entity_id`
| name | string | | Override entity `friendly_name`
| unit | string | | Override entity `unit_of_measurement`
| icon | string | | Override entity `icon`
| | | |
| modes | object | *see below* | Modes

### Mode objects

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| icon | string | **Required** | A icon for the mode
| hvac_mode | string | | A valid hvac_mode for the entity
| preset_mode | string | | A valid preset_mode for the entity
| color | string | | Custom color for the icon when toggle

## Example

```yaml
type: entities
  - entity: climate.thermostat_kitchen
    type: 'custom:climate-mode-entity-row'
    modes:
      - icon: 'mdi:snowflake'
        hvac_mode: 'off'
        color: '#B3E5FC'
      - icon: 'mdi:moon-waxing-crescent'
        preset_mode: eco
        color: '#9575CD'
      - icon: 'mdi:weather-sunny'
        preset_mode: comfort
        color: '#FFC107'

```
