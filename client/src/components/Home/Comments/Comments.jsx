import { useState, useEffect } from "react";
import useComments from "../../../hooks/useComments";

import CommentModel from "./CommentModel";
import "./comments.css";

export default function Comments() {
  const [comments, setComments] = useComments();

  const [commentOneIndex, setCommentOneIndex] = useState(0);
  const [commentTwoIndex, setCommentTwoIndex] = useState(1);
  const [activeCommentsIndex, setActiveCommentsIndex] = useState(0);
  const [listItemsArr, setListItemsArr] = useState([]);

  useEffect(() => {
    const listItems = [];

    for (let index = 0; index < 8; index += 2) {
      listItems.push(
        <li
          key={index}
          onClick={() => setNewComments(index, index + 1)}
          className={
            index === activeCommentsIndex
              ? "active_comment"
              : "no_active_comment"
          }
        ></li>
      );
    }
  
    setListItemsArr(listItems);
  }, [activeCommentsIndex]);

  const setNewComments = (indexOne, indexTwo) => {
    setCommentOneIndex(indexOne);
    setCommentTwoIndex(indexTwo);
    setActiveCommentsIndex(indexOne);
  };

  return (
    <div className="comments_container">
      <h2>What our customers say</h2>
      <section className="comment_model_container">
        {comments.length > 0 ? (
          <CommentModel
            renderTwoComments={{ comments, commentOneIndex, commentTwoIndex }}
          />
        ) : (
          <p className="no_comments_yet">No comments yet</p>
        )}
      </section>
      <section className="comments_list_btns">
        <ul>{listItemsArr}</ul>
      </section>
    </div>
  );
}
