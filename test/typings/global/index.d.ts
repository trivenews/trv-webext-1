/// <reference types="sinon-chrome"/>

import * as SinonChrome from 'sinon-chrome'

declare global {
  interface Window {
    browser: typeof SinonChrome

    // For self page messaging
    pageId?: number | string
    faviconURL?: string
    pageTitle?: string
    pageURL?: string

  }
  var browser: typeof SinonChrome
}

// var browser:SinonChrome = SinonChrome;
