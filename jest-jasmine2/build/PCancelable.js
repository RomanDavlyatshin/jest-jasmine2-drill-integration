'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;
var Symbol = globalThis['jest-symbol-do-not-touch'] || globalThis.Symbol;
var Symbol = globalThis['jest-symbol-do-not-touch'] || globalThis.Symbol;
var Promise =
  globalThis[Symbol.for('jest-native-promise')] || globalThis.Promise;
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

class CancelError extends Error {
  constructor() {
    super('Promise was canceled');
    this.name = 'CancelError';
  }
}
class PCancelable {
  _pending = true;
  _canceled = false;
  _promise;
  _cancel;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _reject = () => {};
  constructor(executor) {
    this._promise = new Promise((resolve, reject) => {
      this._reject = reject;
      return executor(
        fn => {
          this._cancel = fn;
        },
        val => {
          this._pending = false;
          resolve(val);
        },
        err => {
          this._pending = false;
          reject(err);
        }
      );
    });
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
  cancel() {
    if (!this._pending || this._canceled) {
      return;
    }
    if (typeof this._cancel === 'function') {
      try {
        this._cancel();
      } catch (err) {
        this._reject(err);
      }
    }
    this._canceled = true;
    this._reject(new CancelError());
  }
}
exports.default = PCancelable;
