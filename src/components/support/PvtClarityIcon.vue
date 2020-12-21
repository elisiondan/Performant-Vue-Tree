<script lang="tsx">
import Vue from 'vue';
import * as clr from '@clr/icons';
import '@clr/icons/shapes/all-shapes';

const PvtClarityIcon = Vue.extend({
  name: 'PvtClarityIcon',
  functional: true,
  props: {
    /**
     * Clarity icon name, for options see https://clarity.design/icons#core-shapes<br>
     * All custom icons are shown in the examples below.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     *  Size in pixels (will be converted to font size)
     */
    size: {
      type: Number,
      default: 24,
    },
    /**
     * Direction of the icon `[up|right|down|left]`<br>
     * Rotates the icon 0, 90, 180 or 270 degrees.
     */
    dir: {
      type: String,
      validator: (prop: string) => {
        if (['up', 'down', 'left', 'right'].includes(prop)) {
          return true;
        }
        return false;
      },
      default: 'up',
    },
  },
  render(h, { props, data, listeners }) {
    // clr is lazyloaded, has to be called first
    clr.ClarityIcons.get(props.name);
    const onIconClick: any = listeners.click;
    /**
       * Rebind all data attributes using {...data}.
       * See https://vuejs.org/v2/guide/render-function.html?#The-Data-Object-In-Depth for more info.
       */
    return <clr-icon
      {...data}
      shape={props.name}
      size={props.size}
      dir={props.dir}
      onClick={() => {
        if (onIconClick) {
          onIconClick();
        }
      }}
    />;
  },
});
export default PvtClarityIcon;
</script>

<style lang="postcss">
/* purgecss start ignore */
@import "@clr/icons/clr-icons.min.css";
/* purgecss start end */
</style>
