export default function CommentForm() {
  const commentSubmitHandler = (e) => {
    e.preventDefault();


  };
  return (
    <div className="contact_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="contact_text">Leave us a comment</h1>
            <div className="mail_sectin">
              <form onSubmit={commentSubmitHandler}>
                <input
                  type="text"
                  className="email-bt"
                  placeholder="Name"
                  name="Name"
                />
                <input
                  type="text"
                  className="email-bt"
                  placeholder="Email"
                  name="Name"
                />
                <input
                  type="text"
                  className="email-bt"
                  placeholder="Phone Number"
                  name="Name"
                />
                <textarea
                  className="massage-bt"
                  placeholder="Massage"
                  rows="5"
                  id="comment"
                  name="Massage"
                ></textarea>
                <div className="send_bt">
                  <button>SEND</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image_9">
              <img src="images/comment-lights.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
