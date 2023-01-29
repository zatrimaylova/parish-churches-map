/**
 * @prettier
 */
import icons from './icons-list';

const Icon = (props) => {
  return (
    icons[props.name]?.renderIcon({
      width: props.width || '16px',
      height: props.height || '16px',
      color: props.color,
    }) || null
  );
};

export default Icon;
