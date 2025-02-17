import "./comments.css";

export default function CommentModel({ renderTwoComments }) {
  const { comments, commentOneIndex, commentTwoIndex } = renderTwoComments;
  const firstComment = comments[commentOneIndex];
  const secondComment = comments[commentTwoIndex];

  return (
    <>
      <div className="comment_wrapper">
        <div className="comment_author_image">
          <img src={firstComment.imageURL} alt="comment_author_image" />
        </div>
        <div className="comment_text">
          <h4>{firstComment.name}</h4>
          <p>{firstComment.customerComment}</p>
        </div>
      </div>
      <div className="comment_wrapper">
        <div className="comment_author_image">
          <img src={secondComment.imageURL} alt="comment_author_image" />
        </div>
        <div className="comment_text">
          <h4>{secondComment.name}</h4>
          <p>{secondComment.customerComment}</p>
        </div>
      </div>
    </>
  );
}
