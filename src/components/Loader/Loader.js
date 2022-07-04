import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.Loader}>
      <Oval height="200" width="200" color="grey" ariaLabel="loading" />
    </div>
  );
}
