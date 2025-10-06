/**
 * Copyright 2025 Junyu Zhao
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    // default properties
    this.count = 16;
    this.min = 10;
    this.max = 25;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number , reflect: true },
      min: { type: Number },
      max: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      //Change color at min 10 and max 25
      :host([count="10"]) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host([count="25"]) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host(.at-min) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host(.at-max) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
      }
      .buttons {
        background-color: var(--ddd-theme-primary);
      }
      .buttons:focus,
      .buttons:hover {
        background-color: var(--ddd-theme-default-athertonViolet);
      }
    `];
  }

  updated(changedProperties) {
  if (changedProperties.has('count')) {
    // at minimum value add class
    this.classList.toggle('at-min', this.count === this.min);
    // at maximum value add class  
    this.classList.toggle('at-max', this.count === this.max);
  }
}

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <div class="counter">${this.count}</div>
        <div>
          <button class="buttons" @click="${this.decrease}">-1</button>
          <button class="buttons" @click="${this.increase}">+1</button>
        </div>
        <button class="buttons" @click="${this.reset}">Reset</button>
      </div>`;
  }
  
  // methods to modify count
  increase(){
    if (this.count < this.max){
      this.count++;
    }
  }

  decrease(){
    if (this.count > this.min){
      this.count--;
    }
  }

  reset(){
    this.count = 16;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);