export default function validateCommentForm({
  name,
  customerComment,
  imageURL,
}) {
  const allErrors = {};

  if (name == '') {
    allErrors.name = 'Name is a mandatory field';
  }

  if (customerComment == '') {
    allErrors.customerComment = 'Comment is a mandatory field';
  }

  if (imageURL == '') {
    allErrors.imageURL = 'Image is required';
  }

  return allErrors;
}
