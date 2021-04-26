((LitElement) => {
  const html = LitElement.prototype.html;
  const css = LitElement.prototype.css;

  const defaultColors = {
    heat: "#FF8100",
    off: "#ef5350",
    away: "#90CAF9",
    eco: "#66bb6a",
    comfort: "#FFC107",
  };

  const defaultIcons = {
    heat: "mdi:fire",
    off: "mdi:power",
    away: "mdi:snowflake",
    eco: "mdi:leaf",
    comfort: "mdi:weather-sunny",
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
        <hui-generic-entity-row .hass="${hass}" .config="${config}">
          <div class="flex">
            ${config.modes.map((mode) => this.renderMode(mode))}
          </div>
        </hui-generic-entity-row>
      `;
    }

    renderMode(mode) {
      const isActive =
        (!mode.preset_mode || mode.preset_mode === this.state.preset_mode) &&
        (!mode.hvac_mode || mode.hvac_mode === this.state.hvac_mode) &&
        (!mode.fan_mode || mode.fan_mode === this.state.fan_mode) &&
        (!mode.swing_mode || mode.swing_mode === this.state.swing_mode);

      const onClick = () => this.setMode(mode);

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
      if (mode.hvac_mode) {
        this._hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: mode.hvac_mode,
        });
      }

      if (mode.preset_mode) {
        this._hass.callService("climate", "set_preset_mode", {
          entity_id: this._config.entity,
          preset_mode: mode.preset_mode,
        });
      }

      if (mode.fan_mode) {
        this._hass.callService("climate", "set_fan_mode", {
          entity_id: this._config.entity,
          fan_mode: mode.fan_mode,
        });
      }

      if (mode.swing_mode) {
        this._hass.callService("climate", "set_swing_mode", {
          entity_id: this._config.entity,
          swing_mode: mode.swing_mode,
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

      this.state = {
        entity,
        hvac_mode,
        preset_mode,
        fan_mode,
        swing_mode,
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
