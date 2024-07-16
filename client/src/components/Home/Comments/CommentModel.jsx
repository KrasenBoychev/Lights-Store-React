/* eslint-disable react/prop-types */
export default function CommentModel({ allComments }) {
  const { comment, comments, index } = allComments;

  return (
      <div className={index == 0 ? 'carousel-item active' : 'carousel-item'}>
                <h1 className="client_text">What our customers say</h1>
                <div className="clients_section2 layout_padding">
                   <div className="client_1">
                      <div className="row">
                         <div className="col-sm-3">
                            <div className="image_7"><img src={comment.imageURL} /></div>
                            <div className="quote_icon"><img src="images/quote-icon.png" /></div>
                         </div>
                         <div className="col-sm-9">
                            <h1 className="loksans_text">{comment.name}</h1>
                            <p className="dolor_ipsum_text">{comment.customerComment}</p>
                         </div>
                      </div>
                   </div>
                   <div className="client_2">
                      <div className="row">
                         <div className="col-sm-3">
                            <div className="image_7"><img src={comments[index + 1].imageURL} /></div>
                            <div className="quote_icon"><img src="images/quote-icon.png" /></div>
                         </div>
                         <div className="col-sm-9">
                            <h1 className="loksans_text">{comments[index + 1].name}</h1>
                            <p className="dolor_ipsum_text">{comments[index + 1].customerComment}</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
  );
}
