/**
 * Further specifies the type of an expression along the inheritance tree.
 *
 * This function returns {@link from} unmodified, but with type {@link To} for
 * all linting purposes.
 *
 * @remarks
 *
 * If {@link To} isn't assignable from {@link From}, the return type is `never`.
 * This helps prevent occurrences of always-throwing calls.
 *
 * Be aware that the function may throw even if {@link To} is assignable from
 * {@link From}, as even then {@link from} may not be an instance of {@link To}.
 *
 * @typeParam From - Source type.
 * @typeParam To - Target type.
 * @param from - Source expression.
 * @param to - Constructor of the target type.
 * @returns ඞ {@link from} but typed as {@link To} for type checking.
 *
 * @throws ඞ {@link TypeError}
 * Thrown if {@link from} is not an instance of {@link To}.
 *
 * @example Successful conversion.
 * ```ts
 * const element: HTMLElement = new Image();
 * const elementAsImg = trySpecify(element, HTMLImageElement);
 * elementAsImg.src = "image.png";
 * ```
 *
 * @example Failed conversion.
 * ```ts
 * const element: HTMLElement = new Image();
 * // The next function call will throw, because the object stored in element
 * // isn't an instance of `HTMLFormElement`
 * const elementAsForm = trySpecify(element, HTMLFormElement);
 * elementAsForm.method = "post";
 * ```
 *
 * @example Impossible conversion.
 * ```ts
 * const str = "A string";
 * // The return type is `never` since HTMLImageElement doesn't inherit `string`.
 * const strAsImg= trySpecify(str, HTMLImageElement);
 * // The following shows an error as type `never` has no property `src`.
 * strAsImg.src = "image.png";
 * ```
 */
export function trySpecify<From, To>(
  from: From,
  to: new (...args: any) => To
): To extends From ? To : never {
  if (from instanceof to)
    // @ts-ignore This line will never execute if the types are incompatible,
    //            but the compiler doesn't know that.
    return from;

  throw TypeError("trySpecify failed, from is not an instance of To");
}

/**
 * Just a regular TypeScript type assertion, but uglier so it's easier to find.
 *
 * @remarks
 *
 * Avoid using the word "uncheckedCast" in your code except when calling this
 * function. This helps you find problems in your code by making it easier to
 * search for calls of this function.
 *
 * @typeParam To - Target type.
 * @param from - Source expression.
 * @returns ඞ {@link from} but typed as {@link To} for type checking.
 */
export function uncheckedCast<To>(from: any): To {
  return from as To;
}

/**
 * Identity function if {@link from} is not `null` or `undefined`, otherwise
 * throws.
 *
 * @remarks
 *
 * This essentially returns {@link from} but with `null | undefined` removed
 * from its type union by ensuring that the function never returns if
 * {@link from} is `null`/`undefined`.
 *
 * Returns `never` if {@link T} has type `null`/`undefined`. This helps
 * prevent occurrences of always-throwing calls.
 *
 * @typeParam T - Type to return.
 * @param from - Value to cast.
 * @returns ඞ {@link from} with `null | undefined` removed from the its type
 * union.
 *
 * @throws ඞ {@link TypeError}
 *
 * @example Effect of {@link throwIfNull}.
 * ```ts
 * // element1 has type HTMLElement | null
 * const element1 = document.getElementById("img");
 *
 * // element2 has type HTMLElement
 * const element2 = throwIfNull(document.getElementById("form"));
 * ```
 */
export function throwIfNull<T>(
  from: T
): T extends undefined | null ? never : NonNullable<T> {
  if (from == null) throw TypeError("throwIfNull received null value");

  // @ts-ignore This line will never execute if the types are incompatible,
  //            but the compiler doesn't know that.
  return from;
}
