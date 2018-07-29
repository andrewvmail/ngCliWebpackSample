import test from "ava";

var jsdom = require("jsdom");

const { JSDOM } = jsdom;

//var document = jsdom.jsdom('<!doctype html><html><head><title>Mocha Testing Page</title></head><body></body></html>');

const { document } = new JSDOM("").window;
var doc = global.document || document;

var window = document.defaultView;

global.document = doc;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;
global.Node = window.Node;

/*
if (typeof process !== 'undefined' && !process.browser) {
  window.indexedDB = global.indexedDB = require('fake-indexeddb');
}
*/

require("core-js/es6");
require("core-js/es6/promise");
require("core-js/es7/reflect");

// require("zone.js/dist/zone");
require('zone.js');
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");

import { AppComponent } from "./app.component";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,

} from "@angular/platform-browser-dynamic/testing";
import { ComponentFixture, async, getTestBed, TestBed } from "@angular/core/testing";

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

test("Test Ava works", t => {

  let fixtures

  TestBed.configureTestingModule({
    declarations: [AppComponent]
  })

  fixtures = TestBed.createComponent(AppComponent);


  console.log(fixtures);

  t.is(fixtures, fixtures);
});
