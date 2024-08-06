import { useEffect, useState } from 'react';

import { getComments } from '../../api/comments-api';

export default function useComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async function getCommentFunc() {
      const commentsResult = await getComments();
      setComments(commentsResult);
    })();
  }, []);

  return [comments, setComments];
}
