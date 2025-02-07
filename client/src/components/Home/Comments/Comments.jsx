import { useState, useEffect } from "react";
import useComments from "../../../hooks/useComments";

import CommentModel from "./CommentModel";
import "./comments.css";

export default function Comments() {
  const [comments, setComments] = useComments();

  const [commentOneIndex, setCommentOneIndex] = useState(0);
  const [commentTwoIndex, setCommentTwoIndex] = useState(1);
  const [listItemsArr, setListItemsArr] = useState([]);

  useEffect(() => {
    const listItems = [];

    for (let index = 0; index < 8; index += 2) {
      listItems.push(
        <li key={index} onClick={() => setNewComments(index, index + 1)}></li>
      );
    }

    setListItemsArr(listItems);
  }, []);

  const setNewComments = (indexOne, indexTwo) => {
    setCommentOneIndex(indexOne);
    setCommentTwoIndex(indexTwo);
  };

  return (
    <div className="comments_container">
      <h2>What our customers say</h2>
      <section>
        {comments.length > 0 ? (
          <CommentModel
            renderTwoComments={{ comments, commentOneIndex, commentTwoIndex }}
          />
        ) : (
          "No comments yet"
        )}
      </section>
      <section>
        <ul>{listItemsArr}</ul>
      </section>
    </div>
  );
}
