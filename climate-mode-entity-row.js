((LitElement) => {
  const html = LitElement.prototype.html;
  const css = LitElement.prototype.css;

  const defaultColors = {
    auto: "#43a047",
    cool: "#2b9af9",
    dry: "#FFC107",
    fan_only: "#B0BEC5",
    heat: "#ff8100",
    heat_cool: "#43a047",
    off: "#ef5350",
    eco: "#66bb6a",
    away: "#90CAF9",
    boost: "#ef5350",
    comfort: "#FFC107",
    home: "#ff8100",
    sleep: "#9575CD",
    activity: "#43a047"
  };

  const defaultIcons = {
    auto: "mdi:calendar-sync",
    cool: "mdi:snowflake",
    dry: "mdi:water-percent",
    fan_only: "mdi:fan",
    heat: "mdi:fire",
    heat_cool: "mdi:autorenew",
    off: "mdi:power",
    away: "mdi:snowflake",
    eco: "mdi:leaf",
    boost: "mdi:rocket-launch",
    comfort: "mdi:weather-sunny",
    home: "mdi:home",
    sleep: "mdi:moon-waning-crescent",
    activity: "mdi:motion-sensor"
  };

  class ClimateModeEntity extends LitElement {
    static get properties() {
      return {
        _hass: {},
        _config: {},
        state: {},
      };
    }

    static get styles() {
      return css`
        .flex {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
        }
        ha-icon {
          cursor: pointer;
          color: var(--secondary-text-color);
        }
        ha-icon:not(:last-child) {
          margin-right: 8px;
        }
        ha-icon.active {
          color: var(--primary-color);
        }
      `;
    }

    render() {
      const config = this._config;
      const hass = this._hass;

      return html`
        <hui-generic-entity-row .hass="${hass}" .config="${config}" .catchInteraction=${false}>
          <div class="flex">
            ${config.modes.map((mode) => this.renderMode(mode))}
          </div>
        </hui-generic-entity-row>
      `;
    }

    renderMode(mode) {
      const isActive =
        (mode.preset_mode == null ||
          mode.preset_mode === this.state.preset_mode) &&
        (mode.hvac_mode == null || mode.hvac_mode === this.state.hvac_mode) &&
        (mode.fan_mode == null || mode.fan_mode === this.state.fan_mode) &&
        (mode.swing_mode == null ||
          mode.swing_mode === this.state.swing_mode) &&
        (mode.temperature == null ||
          mode.temperature === this.state.temperature);

      const onClick = () => {
        this.setMode(mode);
      }

      const defaultColor = defaultColors[mode.preset_mode || mode.hvac_mode];
      const defaultIcon = defaultIcons[mode.preset_mode || mode.hvac_mode];
      const color = mode.color || defaultColor;
      const style = color ? `color: ${color}` : "";

      return html`
        <ha-icon
          style="${isActive ? style : ""}"
          class="${isActive ? "active" : ""}"
          icon="${mode.icon || defaultIcon || "mdi-thermostat"}"
          @click="${onClick}"
        ></ha-icon>
      `;
    }

    setMode(mode) {
      if (mode.hvac_mode != null && mode.hvac_mode != this.state.hvac_mode) {
        this._hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: mode.hvac_mode,
        });
      }

      if (
        mode.preset_mode != null &&
        mode.preset_mode != this.state.preset_mode
      ) {
        this._hass.callService("climate", "set_preset_mode", {
          entity_id: this._config.entity,
          preset_mode: mode.preset_mode,
        });
      }

      if (mode.fan_mode != null && mode.fan_mode != this.state.fan_mode) {
        this._hass.callService("climate", "set_fan_mode", {
          entity_id: this._config.entity,
          fan_mode: mode.fan_mode,
        });
      }

      if (mode.swing_mode != null && mode.swing_mode != this.state.swing_mode) {
        this._hass.callService("climate", "set_swing_mode", {
          entity_id: this._config.entity,
          swing_mode: mode.swing_mode,
        });
      }

      if (
        mode.temperature != null &&
        mode.temperature != this.state.temperature
      ) {
        this._hass.callService("climate", "set_temperature", {
          entity_id: this._config.entity,
          temperature: mode.temperature,
        });
      }
    }

    setConfig(config) {
      if (!config.entity) throw new Error("Please define a entity.");
      if (config.entity.split(".")[0] !== "climate")
        throw new Error("Please define a climate entity.");
      this._config = config;
    }

    set hass(hass) {
      this._hass = hass;

      const entity = hass.states[this._config.entity];

      const hvac_mode = entity.state;
      const preset_mode = entity.attributes.preset_mode;
      const fan_mode = entity.attributes.fan_mode;
      const swing_mode = entity.attributes.swing_mode;
      const temperature = entity.attributes.temperature;

      this.state = {
        entity,
        hvac_mode,
        preset_mode,
        fan_mode,
        swing_mode,
        temperature,
      };
    }
  }

  customElements.define("climate-mode-entity-row", ClimateModeEntity);
})(
  window.LitElement ||
    Object.getPrototypeOf(
      customElements.get("hui-masonry-view") || customElements.get("hui-view")
    )
);