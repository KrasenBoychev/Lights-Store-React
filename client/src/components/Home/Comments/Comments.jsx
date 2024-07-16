import { useEffect, useState } from 'react';
import { getComments } from '../../../../api/data';
import CommentModel from './CommentModel';

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async function getCommentFunc() {
      const commentsResult = await getComments();
      setComments(commentsResult);
    })();
  }, []);

  return (
    <div className="clients_section layout_padding">
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner">
            {comments.map((comment, index) => (
               index % 2 == 0
               ? <CommentModel
                key={comment._id}
                allComments={{ comment, comments, index }}
              />
              : ''
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
