export default function validateCommentForm({
  name,
  customerComment,
  imageURL,
}) {
  const allErrors = {};

  if (name == "") {
    allErrors.name = true;
  }

  if (customerComment == "") {
    allErrors.customerComment = true;
  }

  if (imageURL == "") {
    allErrors.imageURL = true;
  }

  return allErrors;
}
