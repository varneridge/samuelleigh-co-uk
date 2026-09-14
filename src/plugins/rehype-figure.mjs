/**
 * Captioned, aligned and scaled images in markdown.
 *
 *   ![alt](/images/photo.jpg "Caption")              full measure, caption
 *   ![alt](/images/photo.jpg#60)                     60% of the measure
 *   ![alt](/images/photo.jpg#centre-70 "Caption")    centred, 70%
 *   ![alt](/images/photo.jpg#wrap-right-40 "Cap")    floated right, text wraps
 *
 * Options go in the URL hash, separated by hyphens, in any order:
 *
 *   left | right | centre    where the image sits, text does not wrap
 *   wrap-left | wrap-right   image floats, text wraps around it
 *   a number, 1 to 100       width as a percentage of the text measure
 *
 * Markdown renders a lone image as <p><img></p>, which can carry neither a
 * caption nor alignment. This rewrites it as a <figure>, adding a <figcaption>
 * when the image has a title. Images inside a sentence are left alone, as are
 * images whose hash is not a recognised option, so a real URL fragment still
 * works.
 *
 * Written without unist-util-visit on purpose: that package is only present as
 * a transitive dependency of Astro and could disappear on an upgrade.
 */

const ALIGNMENTS = { left: 'left', right: 'right', centre: 'centre', center: 'centre' };

export default function rehypeFigure() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map(toFigure);
  node.children.forEach(walk);
}

function toFigure(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return node;

  // Only a paragraph holding nothing but the image becomes a figure.
  const contents = node.children.filter(
    (child) => !(child.type === 'text' && child.value.trim() === '')
  );
  if (contents.length !== 1) return node;

  const img = contents[0];
  if (img.type !== 'element' || img.tagName !== 'img') return node;

  const { title, ...properties } = img.properties ?? {};
  const caption = typeof title === 'string' && title.trim() !== '' ? title : null;
  const options = parseOptions(properties.src);

  // No caption and no options, so leave the plain paragraph as it is.
  if (!caption && !options) return node;

  if (options) properties.src = options.src;

  const children = [{ ...img, properties }];
  if (caption) {
    children.push({
      type: 'element',
      tagName: 'figcaption',
      properties: {},
      children: [{ type: 'text', value: caption }]
    });
  }

  return {
    type: 'element',
    tagName: 'figure',
    properties: {
      ...(options?.className ? { className: [options.className] } : {}),
      // Percentages resolve against the containing block, which is wider than
      // the text. Scale against the measure instead, so 60 per cent means 60
      // per cent of the column the reader is actually reading.
      ...(options?.width
        ? { style: `width: calc(var(--measure) * ${options.width / 100})` }
        : {})
    },
    children
  };
}

function parseOptions(src) {
  if (typeof src !== 'string') return null;

  const hash = src.indexOf('#');
  if (hash === -1) return null;

  const tokens = src.slice(hash + 1).toLowerCase().split('-').filter(Boolean);
  if (tokens.length === 0) return null;

  let align = null;
  let wrap = false;
  let width = null;

  for (const token of tokens) {
    if (token === 'wrap') wrap = true;
    else if (ALIGNMENTS[token]) align = ALIGNMENTS[token];
    else if (/^\d{1,3}$/.test(token) && +token >= 1 && +token <= 100) width = +token;
    // An unrecognised token means a genuine URL fragment, not options.
    else return null;
  }

  const className = wrap
    ? `fig-wrap-${align === 'right' ? 'right' : 'left'}`
    : align
      ? `fig-${align}`
      : null;

  return { src: src.slice(0, hash), className, width };
}
