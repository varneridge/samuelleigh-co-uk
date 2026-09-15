/**
 * Adds an "Image" block to the CMS body editor, so size, placement and caption
 * are set from fields rather than typed as markdown.
 *
 * It reads and writes the ordinary markdown image syntax the site already
 * understands, handled at build time by src/plugins/rehype-figure.mjs:
 *
 *   ![alt](/images/photo.jpg#centre-70 "Caption")
 *
 * Nothing here is required for the site to render. If this file fails to load,
 * images still work; they just have to be written by hand.
 */
(function () {
  var PLACEMENTS = {
    'Full width': '',
    Centred: 'centre',
    Left: 'left',
    Right: 'right',
    'Left, text wraps': 'wrap-left',
    'Right, text wraps': 'wrap-right'
  };

  // Matches a whole-line markdown image, with optional #hash and optional "title".
  var PATTERN = /^!\[([^\]]*)\]\(([^)\s#]+)(?:#([A-Za-z0-9-]*))?(?:\s+"([^"]*)")?\)$/;

  function hashToFields(hash) {
    var placement = '';
    var width = '';
    if (!hash) return { placement: placement, width: width };

    var tokens = hash.toLowerCase().split('-').filter(Boolean);
    var wrap = tokens.indexOf('wrap') !== -1;
    var align = '';

    tokens.forEach(function (token) {
      if (/^\d{1,3}$/.test(token)) width = token;
      else if (token === 'centre' || token === 'center') align = 'centre';
      else if (token === 'left' || token === 'right') align = token;
    });

    if (wrap) placement = 'wrap-' + (align === 'right' ? 'right' : 'left');
    else placement = align;

    return { placement: placement, width: width };
  }

  function fieldsToHash(placement, width) {
    var tokens = [];
    if (placement) tokens.push(placement);
    if (width) tokens.push(String(width));
    return tokens.length ? '#' + tokens.join('-') : '';
  }

  function labelFor(value) {
    var found = '';
    Object.keys(PLACEMENTS).forEach(function (label) {
      if (PLACEMENTS[label] === value) found = label;
    });
    return found || 'Full width';
  }

  function register(CMS) {
    CMS.registerEditorComponent({
      id: 'site-image',
      label: 'Image',
      icon: 'image',
      fields: [
        { name: 'image', label: 'Image', widget: 'image', required: true },
        {
          name: 'alt',
          label: 'Alt text',
          widget: 'string',
          required: false,
          hint: 'What is in the frame, for anyone who cannot see it. Not the same as the caption.'
        },
        {
          name: 'caption',
          label: 'Caption',
          widget: 'string',
          required: false,
          hint: 'Shown under the image. Leave empty for no caption.'
        },
        {
          name: 'placement',
          label: 'Placement',
          widget: 'select',
          required: false,
          default: 'Full width',
          options: Object.keys(PLACEMENTS),
          hint: 'The two wrapping options float the image so text runs beside it.'
        },
        {
          name: 'width',
          label: 'Width (%)',
          widget: 'number',
          required: false,
          value_type: 'int',
          min: 10,
          max: 100,
          step: 5,
          hint: 'Percentage of the text column. Leave empty for full width.'
        }
      ],
      pattern: PATTERN,
      fromBlock: function (match) {
        var parsed = hashToFields(match[3]);
        return {
          alt: match[1] || '',
          image: match[2] || '',
          caption: match[4] || '',
          placement: labelFor(parsed.placement),
          width: parsed.width ? Number(parsed.width) : ''
        };
      },
      toBlock: function (data) {
        var image = data.image || '';
        if (!image) return '';
        var hash = fieldsToHash(PLACEMENTS[data.placement] || '', data.width);
        var caption = data.caption ? ' "' + String(data.caption).replace(/"/g, "'") + '"' : '';
        return '![' + (data.alt || '') + '](' + image + hash + caption + ')';
      },
      toPreview: function (data) {
        if (!data.image) return '';
        var caption = data.caption
          ? '<figcaption style="font-size:0.8em;color:#55666F">' + data.caption + '</figcaption>'
          : '';
        return (
          '<figure><img src="' +
          data.image +
          '" alt="' +
          (data.alt || '') +
          '" style="max-width:100%">' +
          caption +
          '</figure>'
        );
      }
    });
  }

  // The CMS loads as a module, so the global may not exist yet.
  if (window.CMS) return register(window.CMS);

  var waited = 0;
  var timer = setInterval(function () {
    if (window.CMS) {
      clearInterval(timer);
      register(window.CMS);
    } else if ((waited += 100) > 10000) {
      clearInterval(timer);
      console.warn('Sveltia CMS did not load; the Image component was not registered.');
    }
  }, 100);
})();
