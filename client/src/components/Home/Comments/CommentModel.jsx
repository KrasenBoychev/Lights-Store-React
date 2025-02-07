import "./comments.css";

export default function CommentModel({ renderTwoComments }) {
  const { comments, commentOneIndex, commentTwoIndex } = renderTwoComments;
  return (
    <>
      <p>{comments[commentOneIndex].name}</p>
      <p>{comments[commentTwoIndex].name}</p>
    </>
  );
}
