# TS Conversions

Utilities for safely and unsafely working around TypeScript type checking.

## Examples

- ### `trySpecify`

  - Successful conversion

    ```ts
    const element: HTMLElement = new Image();
    const elementAsImg = trySpecify(element, HTMLImageElement);
    elementAsImg.src = "image.png";
    ```

  - Failed conversion

    ```ts
    const element: HTMLElement = new Image();
    // The next function call will throw, because the object stored in element
    // isn't an instance of `HTMLFormElement`
    const elementAsForm = trySpecify(element, HTMLFormElement);
    elementAsForm.method = "post";
    ```

- ### `uncheckedCast`

  ```ts
  // element1 has type HTMLElement
  const element1 = uncheckedCast<HTMLElement>(document.getElementById("img"));
  ```

  ```ts
  function next(val: number) {
    return val + 1;
  }

  const str = "hello";
  const nextStr = next(uncheckedCast(str));
  ```

- ### `throwIfNull`

  ```ts
  // element1 has type HTMLElement | null
  const element1 = document.getElementById("img");

  // element2 has type HTMLElement
  const element2 = throwIfNull(document.getElementById("form"));
  ```

## Documentation

You can generate the documentation by running the `docs` script.

## Why are the docs full of amoguses?

TSDoc is rough around the edges and VS Code won't format correctly when a
`@link` tag follows some tags such as `@return`. Amoguses have been inserted to
circumvent this problem, and are easy to find and remove when it gets fixed.
