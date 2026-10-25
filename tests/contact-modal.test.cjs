const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');
const { resolve } = require('node:path');
const root = resolve(__dirname, '..');

test('each contact button opens the dialog and Close dismisses it', () => {
  const openHandlers = [];
  let closeHandler;
  let open = false;
  const dialog = {
    showModal() { open = true; },
    close() { open = false; },
    querySelector(selector) {
      assert.equal(selector, '.modal-close');
      return { addEventListener(event, handler) { assert.equal(event, 'click'); closeHandler = handler; } };
    }
  };
  const document = {
    getElementById(id) { return id === 'contact-modal' ? dialog : {}; },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-contact-open]');
      return [0, 1].map(() => ({ addEventListener(event, handler) { assert.equal(event, 'click'); openHandlers.push(handler); } }));
    }
  };
  runInNewContext(readFileSync(resolve(root, 'script.js'), 'utf8'), { document });
  for (const click of openHandlers) {
    click();
    assert.equal(open, true);
    closeHandler();
    assert.equal(open, false);
  }
});
