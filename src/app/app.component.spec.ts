import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";

declare const global;

import test from "ava";

require("core-js/es6");
require("core-js/es7/reflect");

require("zone.js/dist/zone-node");
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");

const testing = require("@angular/core/testing");
const browser = require("@angular/platform-browser-dynamic/testing");

if (typeof window === "undefined") {
  testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
  );
}

require("browser-env")();

window;

test("weird DomExceptions....", t => {
  TestBed.configureTestingModule({
    declarations: [AppComponent]
  }).compileComponents();

  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;

  t.is(app, app);
});
