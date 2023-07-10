import testPkg from "test";
const test = testPkg.test;

import assert from "assert";
import { trySpecify, uncheckedCast, throwIfNull } from "../../lib/index.js";

class A {
  a = null;
}

class B extends A {
  b = null;
}

class C {
  c = null;
}

test("trySpecify", async (t) => {
  await t.test("successful specification", (t) => {
    let a: A = new B();
    assert.doesNotThrow(() => {
      let a_as_b: B = trySpecify(a, B);
    }, "trySpecify throwed when it shouldn't");
  });

  await t.test("failed specification", (t) => {
    let c = new C();
    assert.throws(() => {
      trySpecify(c, A);
    }, "trySpecify didn't throw when it should");
  });
});

test("uncheckedCast compile test", () => {
  let a = new A();
  let c: C = uncheckedCast<C>(a);
});

test("throwIfNull", async (t) => {
  await t.test("successful", (t) => {
    let a = new A();
    assert.doesNotThrow(() => {
      throwIfNull(a);
    });
  });

  await t.test("with null", (t) => {
    let a: A | null = null;
    assert.throws(() => {
      throwIfNull(a);
    }, "throwIfNull didn't throw when it should");
  });

  await t.test("with undefined", (t) => {
    let a: undefined;
    assert.throws(() => {
      throwIfNull(a);
    }, "throwIfNull didn't throw when it should");
  });
});
