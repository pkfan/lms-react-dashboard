import { Image } from '@tiptap/extension-image';
import { nodeInputRule } from '@tiptap/core';

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const TipTapImageExtend = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '50%',
      },
      height: {
        default: 'auto',
      },
      style: {
        default: '',
      },
      onclick: {
        default: 'window.getTipTapImageAttributesCallback(this);',
      },
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title, width, height, style] = match;

          return { src, alt, title, width, height, style };
        },
      }),
    ];
  },
});

export default TipTapImageExtend;
