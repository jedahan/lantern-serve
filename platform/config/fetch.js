"use strict";

const LC = window.LC || {}; if (!window.LC) window.LC = LC;

/**
* JSON Requests with Fetch Command
*/
LC.fetch = {
    mode: "cors",
    cache: "no-cache",
    headers: {
       "Content-Type": "application/json; charset=utf-8"
    }
};