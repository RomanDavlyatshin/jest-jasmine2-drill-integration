/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />

import type {AssertionError} from 'assert';
import type {AsymmetricMatchers} from '@jest/expect';
import type {Circus} from '@jest/types';
import type {Config} from '@jest/types';
import type {FailedAssertion} from '@jest/test-result';
import type {JestEnvironment} from '@jest/environment';
import type Runtime from 'jest-runtime';
import type {Status} from '@jest/test-result';
import type {TestResult} from '@jest/test-result';

declare interface AssertionErrorWithStack extends AssertionError {
  stack: string;
}

declare type Attributes = {
  id: string;
  resultCallback: (result: Spec['result']) => void;
  description: Circus.TestNameLike;
  throwOnExpectationFailure: unknown;
  getTestPath: () => string;
  queueableFn: QueueableFn;
  beforeAndAfterFns: () => {
    befores: Array<QueueableFn>;
    afters: Array<QueueableFn>;
  };
  userContext: () => unknown;
  onStart: (context: Spec) => void;
  getSpecName: (spec: Spec) => string;
  queueRunnerFactory: typeof queueRunner;
};

declare type Attributes_2 = {
  id: string;
  parentSuite?: Suite;
  description: Circus.TestNameLike;
  throwOnExpectationFailure?: boolean;
  getTestPath: () => string;
};

declare class CallTracker {
  track: (context: Context) => void;
  any: () => boolean;
  count: () => number;
  argsFor: (index: number) => Array<unknown>;
  all: () => Array<Context>;
  allArgs: () => Array<unknown>;
  first: () => Context;
  mostRecent: () => Context;
  reset: () => void;
  constructor();
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare type Context = {
  object: unknown;
  args: Array<unknown>;
  returnValue?: unknown;
};

declare function createSpy(name: string, originalFn: Fn): Spy;

declare interface DoneFn {
  (error?: any): void;
  fail: (error: Error) => void;
}

declare class ExpectationFailed extends Error {}

declare function expectationResultFactory(
  options: Options,
  initError?: Error,
): FailedAssertion;

declare interface Fn extends Record<string, unknown> {
  (): unknown;
}

export declare type Jasmine = {
  _DEFAULT_TIMEOUT_INTERVAL: number;
  DEFAULT_TIMEOUT_INTERVAL: number;
  currentEnv_: ReturnType<typeof jasmineEnv>['prototype'];
  getEnv: () => ReturnType<typeof jasmineEnv>['prototype'];
  createSpy: typeof createSpy;
  Env: ReturnType<typeof jasmineEnv>;
  JsApiReporter: typeof JsApiReporter;
  ReportDispatcher: typeof ReportDispatcher;
  Spec: typeof Spec;
  SpyRegistry: typeof SpyRegistry;
  Suite: typeof Suite;
  Timer: typeof Timer;
  version: string;
  testPath: string;
  addMatchers: (matchers: JasmineMatchersObject) => void;
} & AsymmetricMatchers & {
    process: NodeJS.Process;
  };

declare function jasmine2(
  globalConfig: Config.GlobalConfig,
  config: Config.ProjectConfig,
  environment: JestEnvironment,
  runtime: Runtime,
  testPath: string,
): Promise<TestResult>;
export default jasmine2;

declare function jasmineEnv(j$: Jasmine): {
  new (): {
    specFilter: (spec: Spec) => boolean;
    catchExceptions: (value: unknown) => boolean;
    throwOnExpectationFailure: (value: unknown) => void;
    catchingExceptions: () => boolean;
    topSuite: () => Suite;
    fail: (error: Error | AssertionErrorWithStack) => void;
    pending: (message: string) => void;
    afterAll: (afterAllFunction: QueueableFn['fn'], timeout?: number) => void;
    fit: (
      description: Circus.TestNameLike,
      fn: QueueableFn['fn'],
      timeout?: number,
    ) => Spec;
    throwingExpectationFailures: () => boolean;
    randomizeTests: (value: unknown) => void;
    randomTests: () => boolean;
    seed: (value: unknown) => unknown;
    execute: (
      runnablesToRun?: Array<string>,
      suiteTree?: Suite,
    ) => Promise<void>;
    fdescribe: (
      description: Circus.TestNameLike,
      specDefinitions: SpecDefinitionsFn,
    ) => Suite;
    spyOn: (
      obj: Record<string, Spy>,
      methodName: string,
      accessType?: keyof PropertyDescriptor,
    ) => Spy;
    beforeEach: (
      beforeEachFunction: QueueableFn['fn'],
      timeout?: number,
    ) => void;
    afterEach: (afterEachFunction: QueueableFn['fn'], timeout?: number) => void;
    clearReporters: () => void;
    addReporter: (reporterToAdd: Reporter) => void;
    it: (
      description: Circus.TestNameLike,
      fn: QueueableFn['fn'],
      timeout?: number,
    ) => Spec;
    xdescribe: (
      description: Circus.TestNameLike,
      specDefinitions: SpecDefinitionsFn,
    ) => Suite;
    xit: (
      description: Circus.TestNameLike,
      fn: QueueableFn['fn'],
      timeout?: number,
    ) => Spec;
    beforeAll: (beforeAllFunction: QueueableFn['fn'], timeout?: number) => void;
    todo: () => Spec;
    provideFallbackReporter: (reporterToAdd: Reporter) => void;
    allowRespy: (allow: boolean) => void;
    describe: (
      description: Circus.TestNameLike,
      specDefinitions: SpecDefinitionsFn,
    ) => Suite;
  };
};

declare type JasmineMatcher = {
  (matchersUtil: unknown, context: unknown): JasmineMatcher;
  compare(...args: Array<unknown>): unknown;
  negativeCompare(...args: Array<unknown>): unknown;
};

declare type JasmineMatchersObject = {
  [id: string]: JasmineMatcher;
};

declare class JsApiReporter implements Reporter {
  started: boolean;
  finished: boolean;
  runDetails: RunDetails;
  jasmineStarted: (runDetails: RunDetails) => void;
  jasmineDone: (runDetails: RunDetails) => void;
  status: () => unknown;
  executionTime: () => unknown;
  suiteStarted: (result: SuiteResult) => void;
  suiteDone: (result: SuiteResult) => void;
  suiteResults: (index: number, length: number) => Array<SuiteResult>;
  suites: () => Record<string, SuiteResult>;
  specResults: (index: number, length: number) => Array<SpecResult>;
  specDone: (result: SpecResult) => void;
  specs: () => Array<SpecResult>;
  specStarted: (spec: SpecResult) => void;
  constructor(options: {timer?: Timer});
}

declare type Options = {
  matcherName: string;
  passed: boolean;
  actual?: any;
  error?: any;
  expected?: any;
  message?: string | null;
};

declare type Options_2 = {
  clearTimeout: typeof globalThis['clearTimeout'];
  fail: (error: Error) => void;
  onException: (error: Error) => void;
  queueableFns: Array<QueueableFn>;
  setTimeout: typeof globalThis['setTimeout'];
  userContext: unknown;
};

declare type PromiseCallback =
  | (() => void | PromiseLike<void>)
  | undefined
  | null;

declare type QueueableFn = {
  fn: (done: DoneFn) => void;
  timeout?: () => number;
  initError?: Error;
};

declare function queueRunner(options: Options_2): PromiseLike<void> & {
  cancel: () => void;
  catch: (onRejected?: PromiseCallback) => Promise<void>;
};

declare class ReportDispatcher implements Reporter {
  addReporter: (reporter: Reporter) => void;
  provideFallbackReporter: (reporter: Reporter) => void;
  clearReporters: () => void;
  jasmineDone: (runDetails: RunDetails) => void;
  jasmineStarted: (runDetails: RunDetails) => void;
  specDone: (result: SpecResult) => void;
  specStarted: (spec: SpecResult) => void;
  suiteDone: (result: SuiteResult) => void;
  suiteStarted: (result: SuiteResult) => void;
  constructor(methods: Array<keyof Reporter>);
}

declare type Reporter = {
  jasmineDone: (runDetails: RunDetails) => void;
  jasmineStarted: (runDetails: RunDetails) => void;
  specDone: (result: SpecResult) => void;
  specStarted: (spec: SpecResult) => void;
  suiteDone: (result: SuiteResult) => void;
  suiteStarted: (result: SuiteResult) => void;
};

declare type RunDetails = {
  totalSpecsDefined?: number;
  failedExpectations?: SuiteResult['failedExpectations'];
};

declare class Spec {
  id: string;
  description: string;
  resultCallback: (result: SpecResult) => void;
  queueableFn: QueueableFn;
  beforeAndAfterFns: () => {
    befores: Array<QueueableFn>;
    afters: Array<QueueableFn>;
  };
  userContext: () => unknown;
  onStart: (spec: Spec) => void;
  getSpecName: (spec: Spec) => string;
  queueRunnerFactory: typeof queueRunner;
  throwOnExpectationFailure: boolean;
  initError: Error;
  result: SpecResult;
  disabled?: boolean;
  currentRun?: ReturnType<typeof queueRunner>;
  markedTodo?: boolean;
  markedPending?: boolean;
  expand?: boolean;
  static pendingSpecExceptionMessage: string;
  static isPendingSpecException(e: Error): boolean;
  constructor(attrs: Attributes);
  addExpectationResult(passed: boolean, data: Options, isError?: boolean): void;
  execute(onComplete?: () => void, enabled?: boolean): void;
  cancel(): void;
  onException(error: ExpectationFailed | AssertionErrorWithStack): void;
  disable(): void;
  pend(message?: string): void;
  todo(): void;
  getResult(): SpecResult;
  status(
    enabled?: boolean,
  ): 'todo' | 'passed' | 'failed' | 'pending' | 'disabled';
  isExecutable(): boolean;
  getFullName(): string;
  isAssertionError(error: Error): boolean;
}

declare type SpecDefinitionsFn = () => void;

declare type SpecResult = {
  id: string;
  description: string;
  fullName: string;
  duration?: number;
  failedExpectations: Array<FailedAssertion>;
  testPath: string;
  passedExpectations: Array<ReturnType<typeof expectationResultFactory>>;
  pendingReason: string;
  status: Status;
  __callsite?: {
    getColumnNumber: () => number;
    getLineNumber: () => number;
  };
};

declare interface Spy extends Record<string, any> {
  (this: Record<string, unknown>, ...args: Array<any>): unknown;
  and: SpyStrategy;
  calls: CallTracker;
  restoreObjectToOriginalState?: () => void;
}

declare class SpyRegistry {
  allowRespy: (allow: unknown) => void;
  spyOn: (
    obj: Record<string, Spy>,
    methodName: string,
    accessType?: keyof PropertyDescriptor,
  ) => Spy;
  clearSpies: () => void;
  respy: unknown;
  private readonly _spyOnProperty;
  constructor({currentSpies}?: {currentSpies?: () => Array<Spy>});
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare class SpyStrategy {
  identity: () => string;
  exec: (...args: Array<any>) => unknown;
  callThrough: () => unknown;
  returnValue: (value: unknown) => unknown;
  returnValues: () => unknown;
  throwError: (something: string | Error) => unknown;
  callFake: (fn: Function) => unknown;
  stub: (fn: Function) => unknown;
  constructor({
    name,
    fn,
    getSpy,
  }?: {
    name?: string;
    fn?: Function;
    getSpy?: () => unknown;
  });
}

declare class Suite {
  id: string;
  parentSuite?: Suite;
  description: Circus.TestNameLike;
  throwOnExpectationFailure: boolean;
  beforeFns: Array<QueueableFn>;
  afterFns: Array<QueueableFn>;
  beforeAllFns: Array<QueueableFn>;
  afterAllFns: Array<QueueableFn>;
  disabled: boolean;
  children: Array<Suite | Spec>;
  result: SuiteResult;
  sharedContext?: object;
  markedPending: boolean;
  markedTodo: boolean;
  isFocused: boolean;
  constructor(attrs: Attributes_2);
  getFullName(): string;
  disable(): void;
  pend(_message?: string): void;
  beforeEach(fn: QueueableFn): void;
  beforeAll(fn: QueueableFn): void;
  afterEach(fn: QueueableFn): void;
  afterAll(fn: QueueableFn): void;
  addChild(child: Suite | Spec): void;
  status(): 'failed' | 'pending' | 'disabled' | 'finished';
  isExecutable(): boolean;
  canBeReentered(): boolean;
  getResult(): SuiteResult;
  sharedUserContext(): object;
  clonedSharedUserContext(): object;
  onException(...args: Parameters<Spec['onException']>): void;
  addExpectationResult(...args: Parameters<Spec['addExpectationResult']>): void;
  execute(..._args: Array<any>): void;
}

declare type SuiteResult = {
  id: string;
  description: string;
  fullName: string;
  failedExpectations: Array<ReturnType<typeof expectationResultFactory>>;
  testPath: string;
  status?: string;
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare class Timer {
  start: () => void;
  elapsed: () => number;
  constructor(options?: {now?: () => number});
}

export {};
