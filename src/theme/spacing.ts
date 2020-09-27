/**
 * NOTE TO DEVS:
 *
 * Spacing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = xs    - elements contextually close to each other
 * 2 = s - for groups of closely related items or perhaps borders
 * 4 = m  - ?
 * 5 = xn - ?
 * 6 = l   - between groups of content that aren't related?
 * 7 = xl    - ?
 */

export interface SpacingInterface {
  [key: string]: number;
  none: number;
  xxs: number;
  xs: number;
  s: number;
  m: number;
  xm: number;
  l: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export const spacing: SpacingInterface = {
  none: 0,
  xxs: 3,
  xs: 5,
  s: 10,
  m: 15,
  xm: 20,
  l: 25,
  xl: 30,
  xxl: 35,
  xxxl: 40,
};
