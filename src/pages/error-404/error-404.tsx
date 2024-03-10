import { Link } from 'react-router-dom';

function Error404() {
  return(
    <article>
      <div>
        <p>ERROR 404: Page not found</p>
        <Link to='/'>На главную</Link>
      </div>
    </article>
  );
}

export default Error404;

